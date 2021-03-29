import React from "react";
import { Modal } from "react-bootstrap";
import {
  walletConnect,
  binanceWalletConnect,
} from "../services/WalletConnection";
import Web3 from "web3";
// import wallet from '/img/wallet.png';
// import metamask from '/img/metamask.png';

const WalletModal = ({ show, handleClose, setAddr, setContract }) => {
  const firstTimeConnect = true;
  const onClickWalletConnect = () => {
    walletConnect(setAddr, handleClose, setContract, firstTimeConnect);
  };

  const onClickMetaMaskWallet = () => {
    const ethEnabled = () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        setAddr(window.ethereum.selectedAddress);
        // window.ethereum.send('eth_requestAccounts');
        return true;
      }
      return false;
    };
    if (!ethEnabled()) {
      alert(
        "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"
      );
      handleClose();
    } else {
      localStorage.setItem("wallet-header", "metamask");
      handleClose();
    }
  };

  /**
   * Connect with Binance Wallet
   */
  const onClickBianceWallet = async () => {
    const binanceEnabled = async () => {
      if (window.BinanceChain) {
        //Pass window.BinanceChain to BSC Connector
        let { binanceInstance, binanceAccount } = await binanceWalletConnect(
          window.BinanceChain
        );
        //console.log(window.BinanceChain.isConnected());
        //Set Binance Address
        setAddr(binanceAccount);

        //Initiate web3 instance from Binance Instance
        window.web3 = new Web3(binanceInstance);

        return true;
      }
      return false;
    };
    if (!binanceEnabled()) {
      alert(
        "Please install an Ethereum-compatible browser or extension like Binance Wallet Extension to use this dApp!"
      );
      handleClose();
    } else {
      localStorage.setItem("wallet-header", "binance");
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ opacity: 1 }} centered>
        <Modal.Body className="modal-background">
          <div className="modal-wallet" onClick={onClickMetaMaskWallet}>
            <img src="/img/metamask.png" alt="..." />
            <p>
              <span>METAMASK</span>
            </p>
            <p>Connect to your MetaMask Wallet</p>
          </div>
          <div className="modal-wallet" onClick={onClickWalletConnect}>
            <img src="/img/wallet.png" alt="..." />
            <p>
              <span>WalletConnect</span>
            </p>
            <p>Scan with WalletConnect to connect</p>
          </div>

          <div className="modal-wallet" onClick={onClickBianceWallet}>
            <img src="/img/bscLogo.png" alt="..." />
            <p>
              <span>Binance Wallet Connect</span>
            </p>
            <p>Connect to your Binance Wallet</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WalletModal;
