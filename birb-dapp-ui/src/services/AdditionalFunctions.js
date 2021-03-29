import Web3 from "web3";
import config from "../config";
import { toast } from "react-toastify";

var web3 = new Web3(
new Web3.providers.HttpProvider(config.tokenContract.web3Endpoint)
);
//var web3 = new Web3(Web3.givenProvider || config.tokenContract.web3Endpoint);

//////////////////////////MetaMask Wrappers
//Update Top Holders
export const updateTopHoldersMetaMask = async (senderAddr, topHoldersList) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );
  //   const data = await _contract.methods.hatchNest().encodeABI();
  const data = await _contract.methods
    .updateTopHolders(topHoldersList)
    .encodeABI();
  const gasPrice = 20000000000;
  const gasLimit = 2000000;

  window.web3.eth.sendTransaction(
    {
      from: senderAddr,
      to: config.tokenContract.contractAddress,
      data: data,
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
    },
    function (error, hash) {
      if (error) {
        toast.error("Transaction Failed");
      } else {
        toast.success("Transaction Success");
      }
    }
  );
};

//Pause
export const pauseMetaMask = async (senderAddr) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );
  const data = await _contract.methods.pause().encodeABI();
  const gasPrice = 20000000000;
  const gasLimit = 40000;

  window.web3.eth.sendTransaction(
    {
      from: senderAddr,
      to: config.tokenContract.contractAddress,
      data: data,
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
    },
    function (error, hash) {
      if (error) {
        toast.error("Transaction Failed");
      } else {
        toast.success("Transaction Success");
      }
    }
  );
};

//Unpause
export const unPauseMetaMask = async (senderAddr) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );
  console.log(senderAddr);
  //   const data = await _contract.methods.hatchNest().encodeABI();
  const data = await _contract.methods.unpause().encodeABI();
  const gasPrice = 20000000000;
  const gasLimit = 90000;

//   let accounts;

//   accounts = async()=> {
//   web3.eth.getAccounts(function (error, result) {
//     console.log(result);
//   });
// };
// accounts();
  window.web3.eth.sendTransaction(
    {
      from: senderAddr,
      to: config.tokenContract.contractAddress,
      data: data,
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
    },
    function (error, hash) {
      if (error) {
        toast.error("Transaction Failed");
      } else {
        toast.success("Transaction Success");
      }
    }
  );
};

//Set UniswapPool
export const setUniswapPoolMetaMask = async (senderAddr) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );
  //   const data = await _contract.methods.hatchNest().encodeABI();
  
  //const data = await _contract.methods.setUniswapPool().encodeABI();

  //function of bsc contract
  const data = await _contract.methods.setPancakeSwapPool().encodeABI();

  const gasPrice = 20000000000;
  const gasLimit = 3814000;

  window.web3.eth.sendTransaction(
    {
      from: senderAddr,
      to: config.tokenContract.contractAddress,
      data: data,
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
    },
    function (error, hash) {
      if (error) {
        toast.error("Transaction Failed");
      } else {
        toast.success("Transaction Success");
      }
    }
  );
};

export const getContractOwner = async (setContractOwner) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );
  let contractOwner = await _contract.methods.owner().call();
  setContractOwner(contractOwner);
};


//////////////////Binance wallet Functions
//Update Top Holders
export const updateTopHoldersBscWallet = async (senderAddr, topHoldersList) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );
  //   const data = await _contract.methods.hatchNest().encodeABI();
  const data = await _contract.methods
    .updateTopHolders(topHoldersList)
    .encodeABI();
  const gasPrice = 20000000000;  //20gwei for bsc
  const gasLimit = 2000000;

  let params= [
    {
      from: senderAddr,
      to: config.tokenContract.contractAddress,
      gas: web3.utils.toHex(gasLimit), // 30400
      gasPrice: web3.utils.toHex(gasPrice), // 10000000000000
      //value: '0x9184e72a', // 2441406250
      data: data,
    },
  ];
  
  window.BinanceChain
    .request({
      method: 'eth_sendTransaction',
      params,
    })
    .then((result) => {
      // The result varies by by RPC method.
      // For example, this method will return a transaction hash hexadecimal string on success.
      toast.success("Transaction Success");
    })
    .catch((error) => {
      // If the request fails, the Promise will reject with an error.
      toast.error("Transaction Failed");
    });
};

//Pause
export const pauseBscWallet = async (senderAddr) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );
  const data = await _contract.methods.pause().encodeABI();
  const gasPrice = 20000000000;
  const gasLimit = 40000;

 
  let params= [
    {
      from: senderAddr,
      to: config.tokenContract.contractAddress,
      gas: web3.utils.toHex(gasLimit), 
      gasPrice: web3.utils.toHex(gasPrice),
      //value: '0x9184e72a', // 2441406250
      data: data,
    },
  ];
  
  window.BinanceChain
    .request({
      method: 'eth_sendTransaction',
      params,
    })
    .then((result) => {
      // The result varies by by RPC method.
      // For example, this method will return a transaction hash hexadecimal string on success.
      toast.success("Transaction Success");
    })
    .catch((error) => {
      // If the request fails, the Promise will reject with an error.
      toast.error("Transaction Failed");
    });
};

//Unpause
export const unPauseBscWallet = async (senderAddr) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );
  console.log(senderAddr);
  //   const data = await _contract.methods.hatchNest().encodeABI();
  const data = await _contract.methods.unpause().encodeABI();
  const gasPrice = 20000000000;
  const gasLimit = 90000;

//   let accounts;

//   accounts = async()=> {
//   web3.eth.getAccounts(function (error, result) {
//     console.log(result);
//   });
// };
// accounts();
let params= [
  {
    from: senderAddr,
    to: config.tokenContract.contractAddress,
    gas: web3.utils.toHex(gasLimit), // 30400
    gasPrice: web3.utils.toHex(gasPrice), // 10000000000000
    //value: '0x9184e72a', // 2441406250
    data: data,
  },
];

window.BinanceChain
  .request({
    method: 'eth_sendTransaction',
    params,
  })
  .then((result) => {
    // The result varies by by RPC method.
    // For example, this method will return a transaction hash hexadecimal string on success.
    toast.success("Transaction Success");
  })
  .catch((error) => {
    // If the request fails, the Promise will reject with an error.
    toast.error("Transaction Failed");
  });
};

//Set PancakeSwapPool
export const setUniswapPoolBscWallet = async (senderAddr) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );
  //   const data = await _contract.methods.hatchNest().encodeABI();
  
  //const data = await _contract.methods.setUniswapPool().encodeABI();

  //function of bsc contract
  const data = await _contract.methods.setPancakeSwapPool().encodeABI();

  const gasPrice = 20000000000;
  const gasLimit = 3814000;
  let params= [
    {
      from: senderAddr,
      to: config.tokenContract.contractAddress,
      gas: web3.utils.toHex(gasLimit), // 30400
      gasPrice: web3.utils.toHex(gasPrice), // 10000000000000
      //value: '0x9184e72a', // 2441406250
      data: data,
    },
  ];
  
  window.BinanceChain
    .request({
      method: 'eth_sendTransaction',
      params,
    })
    .then((result) => {
      // The result varies by by RPC method.
      // For example, this method will return a transaction hash hexadecimal string on success.
      toast.success("Transaction Success");
    })
    .catch((error) => {
      // If the request fails, the Promise will reject with an error.
      toast.error("Transaction Failed");
    });
};


//////////Wallet Connect

export const updateTopHoldersWalletConnect = async (
  contract,
  topHoldersList
) => {
  try {
    console.log("top", topHoldersList);
    const tx = await contract.updateTopHolders(topHoldersList);
    if (tx) toast.success("Transaction Success");
  } catch (error) {
    toast.error("Transaction Failed");
  }
};

export const pauseWalletConnect = async (contract) => {
  try {
    const tx = await contract.pause();
    if (tx) toast.success("Transaction Success");
  } catch (error) {
    toast.error("Transaction Failed");
  }
};

export const unPauseWalletConnect = async (contract) => {
  try {
    const tx = await contract.unpause();
    if (tx) toast.success("Transaction Success");
  } catch (error) {
    toast.error("Transaction Failed");
  }
};

export const setUniswapPoolWalletConnect = async (contract) => {
  try {
    const tx = await contract.setUniswapPool();
    if (tx) toast.success("Transaction Success");
  } catch (error) {
    toast.error("Transaction Failed");
  }
};
