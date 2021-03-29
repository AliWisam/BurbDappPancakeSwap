import Web3 from "web3";
import config from "../config";
import { toast } from "react-toastify";
//import { ArtTrack, ShopTwo } from "@material-ui/icons";

var web3 = new Web3(
  new Web3.providers.HttpProvider(config.tokenContract.web3Endpoint)
);

export const findTime = (unix_timestamp) => {
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime;
};
export const findLastHatchTime = (currentDate, hatchTime) => {
  let dateCurrent = new Date(currentDate * 1000);
  let dateHatch = new Date(hatchTime * 1000);
  console.log(dateHatch);
  let hoursCurrent = dateCurrent.getHours();
  let minutesCurrent = "0" + dateCurrent.getMinutes();
  let secondsCurrent = "0" + dateCurrent.getSeconds();
  let hoursHatch = dateHatch.getHours();

  let minutesHatch = "0" + dateHatch.getMinutes();
  let secondsHatch = "0" + dateHatch.getSeconds();
  let hoursDiff = hoursCurrent - hoursHatch;
  let minDiff = minutesCurrent.substr(-2) - minutesHatch.substr(-2);
  let secDiff = secondsCurrent.substr(-2) - secondsHatch.substr(-2);
  let time = hoursDiff + ":" + minDiff + ":" + secDiff;
  let timestamp = hoursDiff * 3600 + minDiff * 60 + secDiff;
  return { time: time, timestamp: timestamp };
};

const hatchTimeVerification = async (_contract) => {
  let hatchTime = await _contract.methods.lastHatchTime().call();
  console.log("hatch time" +hatchTime);
  
  let timePassedAfterTransaction = await findLastHatchTime(
    Date.now() / 1000,
    hatchTime
  );
  console.log(timePassedAfterTransaction);
  //find time left
  let timestampLeftAftertransaction =
    // 900 - timePassedAfterTransaction.timestamp; //900s = 15 min
    180 - timePassedAfterTransaction.timestamp; //3 minutes
  console.log(timestampLeftAftertransaction);
  let hoursLeft = Math.floor(timestampLeftAftertransaction / 3600);
  console.log(hoursLeft);
  let minutesLeft = Math.floor(
    (timestampLeftAftertransaction / 3600 - hoursLeft) * 60
  );
  console.log(minutesLeft);
  let secondsLeft = Math.floor(
    ((timestampLeftAftertransaction / 3600 - hoursLeft) * 60 - minutesLeft) * 60
  );
  console.log(secondsLeft);
  let timeLeft = hoursLeft + ":" + minutesLeft + ":" + secondsLeft;
  console.log(timeLeft);

  //900s = 15 min
  // 180 = 3 minutes
  if (timePassedAfterTransaction.timestamp >= 180) {
    return {
      status: true,
      timeLeft: timeLeft,
    };
  } else {
    return {
      status: false,
      timeLeft: timeLeft,
    };
  }
};

//Metamask Functions
//Send Transaction
//Hatch Nest
export const hatchNestMetaMask = async (
  senderAddr,
  setErrorSendTransaction
) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );

  let response = await hatchTimeVerification(_contract);
  if (!response.status) {
    return setErrorSendTransaction({
      timeStatus: true,
      msg: "Already Hatched - Hatch in " + response.timeLeft,
    });
  }

  let holderBalance = await _contract.methods.balanceOf(senderAddr).call();
  let holderBalanceInt = parseInt(holderBalance);
  if (holderBalanceInt === 0) {
    return setErrorSendTransaction({
      timeStatus: false,
      msg: "Account doesn't have any BIRB Tokens",
    });
  }

  //   const data = await _contract.methods.hatchNest().encodeABI();
  const data = await _contract.methods.hatchNest().encodeABI();
  const gasPrice = 20000000000;
  const gasLimit = 150000;

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

//Claim Rewards
export const claimRewardsMetaMask = async (senderAddr, setErrorClaimReward) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );

  const data = await _contract.methods.claimRewards().encodeABI();
  const gasPrice = 20000000000;
  const gasLimit = 60000;
 //console.log(senderAddr);
  await window.web3.eth.sendTransaction(
    {
      from: senderAddr,
      to: config.tokenContract.contractAddress,
      data: data,
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
    },
    function (error, hash) {
      //console.log(error);
      if (error) {
        toast.error("Transaction Failed");
      } else {
        toast.success("Transaction Success");
      }
    }
  );
};

//////////////////Wallet Connect Functions

//Hatch Nest
export const hatchNestWalletConnect = async (
  setErrorSendTransaction,
  contract
) => {
  try {
    const tx = await contract.hatchNest();
    if (tx) toast.success("Transaction Success");
  } catch (error) {
    toast.error("Transaction Failed");
    setErrorSendTransaction({ timeStatus: false, msg: error });
  }
};
//Claim Rewards
export const claimRewardsWalletConnect = async (
  setErrorClaimReward,
  contract
) => {
  try {
    const tx = await contract.claimRewards();
    if (tx) toast.success("Transaction Success");
  } catch (error) {
    toast.error("Transaction Failed");
    setErrorClaimReward(error);
  }
};

//////////////////Binance wallet Functions


//Hatch Nest
export const hatchNestBscWallet = async (
  senderAddr,
  setErrorSendTransaction
) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );

  let response = await hatchTimeVerification(_contract);
  if (!response.status) {
    return setErrorSendTransaction({
      timeStatus: true,
      msg: "Already Hatched - Hatch in " + response.timeLeft,
    });
  }

  let holderBalance = await _contract.methods.balanceOf(senderAddr).call();
  let holderBalanceInt = parseInt(holderBalance);
  if (holderBalanceInt === 0) {
    return setErrorSendTransaction({
      timeStatus: false,
      msg: "Account doesn't have any BIRB Tokens",
    });
  }

  //   const data = await _contract.methods.hatchNest().encodeABI();
  const data = await _contract.methods.hatchNest().encodeABI();
  const gasPrice = 20000000000;
  const gasLimit = 150000;
  
  let params= [
    {
      from: senderAddr,
      to: config.tokenContract.contractAddress,
      gasLimit: web3.utils.toHex(gasLimit), // 30400
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

//Claim Rewards
export const claimRewardsBscWallet = async (senderAddr, setErrorClaimReward) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );

  const data = await _contract.methods.claimRewards().encodeABI();
  const gasPrice = 20000000000;
  const gasLimit = 60000;

  let params= [
    {
      from: senderAddr,
      to: config.tokenContract.contractAddress,
      gasLimit: web3.utils.toHex(gasLimit), 
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



  
 //console.log(senderAddr);
  // await window.web3.eth.sendTransaction(
  //   {
  //     from: senderAddr,
  //     to: config.tokenContract.contractAddress,
  //     data: data,
  //     gasPrice: web3.utils.toHex(gasPrice),
  //     gasLimit: web3.utils.toHex(gasLimit),
  //   },
  //   function (error, hash) {
  //     //console.log(error);
  //     if (error) {
  //       toast.error("Transaction Failed");
  //     } else {
  //       toast.success("Transaction Success");
  //     }
  //   }
  // );
};





