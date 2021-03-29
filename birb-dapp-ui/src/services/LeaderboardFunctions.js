import Web3 from 'web3';
import config from '../config';

var web3 = new Web3(
  new Web3.providers.HttpProvider(config.tokenContract.web3Endpoint)
);

export const getAllLeaderboard = async (leaderboard, setLeaderboard, desc) => {
  const _contract = new web3.eth.Contract(
    config.tokenContract.contractABI,
    config.tokenContract.contractAddress
  );

  const arr = [];
  //changing index from 50 to 200
  for (let index = 0; index < 200; index++) {
    let holderAddress = await _contract.methods.topHolder(index).call();

    if (holderAddress === '0x0000000000000000000000000000000000000000') break;

    let holderBalance = await _contract.methods.balanceOf(holderAddress).call();
    let convertedBalance = await web3.utils.fromWei(holderBalance, 'ether');

    const obj = {
      id: index,
      address: holderAddress,
      balance: convertedBalance,
    };

    arr.push(obj);
  }
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i].balance >= arr[j].balance) {
        arr[i].id = i;
      } else {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        arr[i].id = i;
        arr[j].id = j;
      }
    }
  }
  setLeaderboard(arr);
};
