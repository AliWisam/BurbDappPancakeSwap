import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Web3 from "web3";
import WalletModal from "./components/WalletModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { binanceWalletConnect, walletConnect } from "./services/WalletConnection";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import config from "./config";
//import config from "./config";

function App() {
  const [addr, setAddr] = useState("");
  const [show, setShow] = useState(false);
  const [contract, setContract] = useState({});

  //for metamask
  const ethereum = window.ethereum;
  //for walletconnect
  // const walletConnectProvider = new WalletConnectProvider({
  //   infuraId: config.tokenContract.infuraKey, // Required
  // });
  
  // for walletconnect bsc
  //const walletConnectProvider = new WalletConnectProvider({
    //rpc: {
    //97: "https://data-seed-prebsc-1-s1.binance.org:8545",
    //},
  //});

  const walletConnectProvider = new WalletConnectProvider({
    rpc: config.tokenContract.web3Endpoint,
  });
  const provider = new ethers.providers.Web3Provider(walletConnectProvider);
  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    console.log("change", accounts);
  });
  const checkChangeWalletHeader = localStorage.getItem("wallet-header");
  const localStorageValue = JSON.parse(localStorage.getItem("walletconnect"));
  //On first time window load

  useEffect(() => {
    if (localStorage.getItem("wallet-header") === "metamask" && ethereum) {
      
      setAddr(ethereum.selectedAddress);
      ethereum.on("accountsChanged", function (accounts) {
        setAddr(accounts[0]);
      });
    } else if (localStorage.getItem("walletconnect")) {
      setAddr(localStorageValue.accounts[0]);
      //  Create WalletConnect Provider
    } else return;
  }, [ethereum, addr, localStorageValue, checkChangeWalletHeader]);

  //Handling Confirmation Modal On Blocking a User
  const handleClose = () => setShow(false);
  useEffect(() => {
    if (localStorage.getItem("wallet-header") !== 'binance') {
      const ethEnabled = async () => {
        console.log(window)
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
          setAddr(window.ethereum.selectedAddress);
          return true;
        }
        return false;
      };
      ethEnabled()
      setShow(false);
    }
    else if (localStorage.getItem("wallet-header") === 'binance') {
      const binanceEnabled = async () => {
        if (window.BinanceChain) {
          window.BinanceChain = await binanceWalletConnect(setAddr);
          return true;
        }
        return false;
      };
      binanceEnabled()
      setShow(false);
    } else {
      setShow(true);
    }
    if (localStorage.getItem("walletconnect")) {
      const firstTimeConnect = false;
      walletConnect(setAddr, handleClose, setContract, firstTimeConnect);
    }
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <WalletModal
        show={show}
        handleClose={handleClose}
        setAddr={setAddr}
        setContract={setContract}
      />
      <Header />
      <Dashboard
        addr={addr}
        setAddr={setAddr}
        setShow={setShow}
        contract={contract}
      />
    </div>
  );
}

export default App;
