import WalletConnectProvider from "@walletconnect/web3-provider";
import { BscConnector } from "@binance-chain/bsc-connector";
import config from "../config";
import { ethers } from "ethers";

export const walletConnect = async (
  setAddr,
  handleClose,
  setContract,
  firstTimeConnect
) => {
  //  Create WalletConnect Provider
  // const walletConnectProvider = new WalletConnectProvider({
  //   infuraId: config.tokenContract.infuraKey, // Required
  // });

  //for bsc
  const walletConnectProvider = new WalletConnectProvider({
    rpc: {
      97: "https://data-seed-prebsc-1-s1.binance.org:8545",
    },
  });

  //  Enable session (triggers QR Code modal)
  await walletConnectProvider.enable();

  if (walletConnectProvider.connected) {
    setAddr(walletConnectProvider.accounts[0]);
  }

  /////////////////////////Ethers
  const provider = new ethers.providers.Web3Provider(walletConnectProvider);

  if (firstTimeConnect) {
    //set value to localhost
    localStorage.setItem("wallet-header", "wallet_connect");
    //Close Modal
    handleClose();
  }

  const _signer = provider.getSigner();

  const _contract = new ethers.Contract(
    config.tokenContract.contractAddress,
    config.tokenContract.contractABI,
    _signer
  );
  setContract(_contract);
};

//Binance Wallet Connection
export const binanceWalletConnect = async (binanceInstance) => {
  try {
    binanceInstance = new BscConnector({
      supportedChainIds: [56, 97], // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
    });
    // invoke method on bwc e.g.
    await binanceInstance.activate();
    let binanceAccount = await binanceInstance.getAccount();
    await binanceInstance.getChainId();

    return { binanceInstance, binanceAccount };
  } catch (e) {
    console.log(e);
  }
};

export const disconnectWalletConnect = async () => {
  //  Create WalletConnect Provider
  // const provider = new WalletConnectProvider({
  //   infuraId: config.tokenContract.infuraKey, // Required
  // });
  //for bsc
  const provider = new WalletConnectProvider({
    rpc: {
      97: "https://data-seed-prebsc-1-s1.binance.org:8545",
    },
  });
  localStorage.removeItem("walletconnect");
  localStorage.removeItem("wallet-header");
  await provider.disconnect();
};
