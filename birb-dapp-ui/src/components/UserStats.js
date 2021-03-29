import React, { useEffect, useState } from 'react';
import {
  getTotalHatched,
  getNestSize,
  getMyRewardsMetaMask,
  getMyWalletMetaMask,
  getMyRewardsWalletConnect,
  getMyWalletWalletConnect,
  getMyRewardsBscWallet,
  getMyWalletBscWallet
} from '../services/UserStatsFunctions';

const UserStats = ({ addr, contract }) => {
  const [totalHatchedPerBIRB, setTotalHatchedPerBIRB] = useState(null);
  const [nestSize, setNestSize] = useState(null);
  const [myRewardsMetaMask, setMyRewardsMetaMask] = useState(null);
  const [myWalletMetaMask, setMyWalletMetaMask] = useState(null);
  const [myRewardsWalletConnect, setMyRewardsWalletConnect] = useState(null);
  const [myWalletWalletConnect, setMyWalletWalletConnect] = useState(null);
  const [myRewardsBscWallet, setMyRewardsBscWallet] = useState(null);
  const [myWalletBscWallet, setMyWalletBscWallet] = useState(null); 



  useEffect(() => {
    getTotalHatched(setTotalHatchedPerBIRB);
    getNestSize(setNestSize);
  }, []);
  const checkChangeWalletHeader = localStorage.getItem('wallet-header');
  useEffect(() => {
    if (localStorage.getItem('wallet-header') === 'metamask') {
      getMyRewardsMetaMask(setMyRewardsMetaMask, addr);
      getMyWalletMetaMask(setMyWalletMetaMask, addr);
    }else if (localStorage.getItem('wallet-header') === 'binance') {
      getMyRewardsBscWallet(setMyRewardsBscWallet, addr);
      getMyWalletBscWallet(setMyWalletBscWallet, addr);
    }else if (localStorage.getItem('walletconnect')) {
      getMyRewardsWalletConnect(setMyRewardsWalletConnect, addr, contract);
      getMyWalletWalletConnect(setMyWalletWalletConnect, addr, contract);
      return;
    }
  }, [addr, checkChangeWalletHeader, contract]);

  return (
    <div className="row">
      <div className="col-12 col-lg-6 col-xl">
        {/* Value  */}
        <div className="card">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col">
                {/* Title */}
                <h6 className="text-uppercase text-muted mb-2">
                  Total hatched
                </h6>
                {/* Heading */}
                <span className="h2 mb-0">
                  {totalHatchedPerBIRB && totalHatchedPerBIRB} BIRB
                </span>
                {/* Badge */}
                <span className="badge bg-soft-success mt-n1">$24,500</span>
              </div>
              <div className="col-auto">
                {/* Avatar */}
                <a href="#!" className="avatar avatar-lg">
                  <img
                    src="./img/files/earth.png"
                    alt="..."
                    className="avatar-img rounded"
                  />
                </a>
              </div>
            </div>{' '}
            {/* / .row */}
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6 col-xl">
        {/* Hours */}
        <div className="card">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col">
                {/* Title */}
                <h6 className="text-uppercase text-muted mb-2">Nest Size</h6>
                {/* Heading */}
                <span className="h2 mb-0">{nestSize && nestSize} BIRB</span>
                {/* Badge */}
                <span className="badge bg-soft-success mt-n1">$6,480</span>
              </div>
              <div className="col-auto">
                {/* Avatar */}
                <a href="#!" className="avatar avatar-lg">
                  <img
                    src="./img/files/nest.png"
                    alt="..."
                    className="avatar-img rounded"
                  />
                </a>
              </div>
            </div>{' '}
            {/* / .row */}
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6 col-xl">
        {/* Exit */}
        <div className="card">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col">
                {/* Title */}
                <h6 className="text-uppercase text-muted mb-2">My Rewards</h6>
                {/* Heading */}
                <span className="h2 mb-0">
                  {addr &&
                    localStorage.getItem('wallet-header') === 'metamask' &&
                    myRewardsMetaMask &&
                    myRewardsMetaMask}
                  {addr &&
                    localStorage.getItem('walletconnect') &&
                    myRewardsWalletConnect &&
                    myRewardsWalletConnect}{' '}
                  {addr &&
                    localStorage.getItem('wallet-header') === 'binance'&&
                    myRewardsBscWallet &&
                    myRewardsBscWallet}{' '}
                  BIRB
                </span>
              </div>
              <div className="col-auto">
                {/* Avatar */}
                <a href="#!" className="avatar avatar-lg">
                  <img
                    src="./img/files/read.png"
                    alt="..."
                    className="avatar-img rounded"
                  />
                </a>
              </div>
            </div>{' '}
            {/* / .row */}
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6 col-xl">
        {/* Time */}
        <div className="card">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col">
                {/* Title */}
                <h6 className="text-uppercase text-muted mb-2">My Wallet</h6>
                {/* Heading */}
                <span className="h2 mb-0">
                  {addr &&
                    localStorage.getItem('wallet-header') === 'metamask' &&
                    myWalletMetaMask &&
                    myWalletMetaMask}
                  {addr &&
                    localStorage.getItem('walletconnect') &&
                    myWalletWalletConnect &&
                    myWalletWalletConnect}{' '}
                    {addr &&
                    localStorage.getItem('wallet-header') === 'binance' &&
                    myWalletBscWallet &&
                    myWalletBscWallet}
                  BIRB
                </span>
              </div>
              <div className="col-auto">
                {/* Avatar */}
                <a href="#!" className="avatar avatar-lg">
                  <img
                    src="./img/files/mainbirb.png"
                    alt="..."
                    className="avatar-img rounded"
                  />
                </a>
              </div>
            </div>{' '}
            {/* / .row */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
