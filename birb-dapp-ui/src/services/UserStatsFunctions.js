import Web3 from "web3";
import config from "../config";

var web3 = new Web3(
  new Web3.providers.HttpProvider(config.tokenContract.web3Endpoint)
);

export const getTotalHatched = async (setTotalHatchedPerBIRB) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );

  let res = await _contract.methods.totalHatched().call();
  var resp = await web3.utils.fromWei(res, "ether");
  if (parseFloat(resp) === 0) {
    setTotalHatchedPerBIRB(parseInt(resp));
  } else {
    setTotalHatchedPerBIRB(parseFloat(resp).toFixed(4));
  }
};

export const getNestSize = async (setNestSize) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );

  let res = await _contract.methods.balanceOf(config.uniSwap.pool).call();
  let resp = await web3.utils.fromWei(res, "ether");
  if (parseFloat(resp) === 0) {
    setNestSize(parseInt(resp));
  } else {
    setNestSize(parseFloat(resp).toFixed(4));
  }
};

////////////////MetaMask
export const getMyRewardsMetaMask = async (setMyRewardsMetaMask, addr) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );

  if (addr) {
    let res = await _contract.methods.unclaimedRewards(addr).call();
    let resp = await web3.utils.fromWei(res, "ether");
    if (parseFloat(resp) === 0) {
      setMyRewardsMetaMask(parseInt(resp));
    } else {
      setMyRewardsMetaMask(parseFloat(resp).toFixed(4));
    }
  }
};

export const getMyWalletMetaMask = async (setMyWalletMetaMask, addr) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );

  if (addr) {
    let res = await _contract.methods.balanceOf(addr).call();
    let resp = await web3.utils.fromWei(res, "ether");
    if (parseFloat(resp) === 0) {
      setMyWalletMetaMask(parseInt(resp));
    } else {
      setMyWalletMetaMask(parseFloat(resp).toFixed(4));
    }
  }
};
////////////////BscWallet
export const getMyRewardsBscWallet = async (setMyRewardsBscWallet, addr) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );

  if (addr) {
    let res = await _contract.methods.unclaimedRewards(addr).call();
    let resp = await web3.utils.fromWei(res, "ether");
    if (parseFloat(resp) === 0) {
      setMyRewardsBscWallet(parseInt(resp));
    } else {
      setMyRewardsBscWallet(parseFloat(resp).toFixed(4));
    }
  }
};

export const getMyWalletBscWallet = async (setMyWalletBscWallet, addr) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );

  if (addr) {
    let res = await _contract.methods.balanceOf(addr).call();
    let resp = await web3.utils.fromWei(res, "ether");
    if (parseFloat(resp) === 0) {
      setMyWalletBscWallet(parseInt(resp));
    } else {
      setMyWalletBscWallet(parseFloat(resp).toFixed(4));
    }
  }
};
////////////////Wallet Connect
export const getMyRewardsWalletConnect = async (
  setMyRewardsWalletConnect,
  addr,
  contract
) => {
  if (addr && Object.keys(contract).length !== 0) {
    const tx = await contract.unclaimedRewards(addr);
    let data = web3.utils.hexToNumberString(tx._hex);
    let resp = await web3.utils.fromWei(data, "ether");
    if (parseFloat(resp) === 0) {
      setMyRewardsWalletConnect(parseInt(resp));
    } else {
      setMyRewardsWalletConnect(parseFloat(resp).toFixed(4));
    }
  }
};

export const getMyWalletWalletConnect = async (
  setMyWalletWalletConnect,
  addr,
  contract
) => {
  if (addr && Object.keys(contract).length !== 0) {
    const tx = await contract.balanceOf(addr);
    let data = web3.utils.hexToNumberString(tx._hex);
    let resp = await web3.utils.fromWei(data, "ether");
    if (parseFloat(resp) === 0) {
      setMyWalletWalletConnect(parseInt(resp));
    } else {
      setMyWalletWalletConnect(parseFloat(resp).toFixed(4));
    }
  }
};
