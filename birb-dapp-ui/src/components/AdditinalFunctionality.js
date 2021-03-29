import React, { useState } from 'react';
import UploadCsvFile from './UploadCsvFile';
import {
  pauseMetaMask,
  unPauseMetaMask,
  setUniswapPoolMetaMask,
  pauseWalletConnect,
  unPauseWalletConnect,
  setUniswapPoolWalletConnect,
  pauseBscWallet,
  unPauseBscWallet,
  setUniswapPoolBscWallet
} from '../services/AdditionalFunctions';

const AdditionalFunctionality = ({ addr, contract }) => {
  const [open, setOpen] = useState(false);

  const addCsv = () => {
    setOpen(true);
  };

  const pauseFunction = () => {
    if (localStorage.getItem('wallet-header') === 'metamask') {
      pauseMetaMask(addr);
    } else if(localStorage.getItem('wallet-header') === 'binance') {
      pauseBscWallet(addr);
    } else if (localStorage.getItem('walletconnect')) {
      pauseWalletConnect(contract);
    }
  };

  const unPauseFunction = () => {
    if (localStorage.getItem('wallet-header') === 'metamask') {
      unPauseMetaMask(addr);
    } else if(localStorage.getItem('wallet-header') === 'binance') {
      unPauseBscWallet(addr);
    } else if (localStorage.getItem('walletconnect')) {
      unPauseWalletConnect(contract);
    }
  };

  const setUniswapPoolFunction = () => {
    if (localStorage.getItem('wallet-header') === 'metamask') {
      setUniswapPoolMetaMask(addr);
    } else if(localStorage.getItem('wallet-header') === 'binance') {
      setUniswapPoolBscWallet(addr);
    } else if (localStorage.getItem('walletconnect')) {
      setUniswapPoolWalletConnect(contract);
    }
  };

  return (
    <div className="row">
      <div className="col-12 col-lg-6 col-xl">
        {/* Value  */}
        <div className="card">
          <div className="card-body">
            <div className="row align-items-center">
              <button className="btn btn-primary" onClick={addCsv}>
                Update top holders
              </button>
            </div>{' '}
            {/* / .row */}
          </div>
        </div>
      </div>
      <UploadCsvFile
        setOpen={setOpen}
        open={open}
        addr={addr}
        contract={contract}
      />
      <div className="col-12 col-lg-6 col-xl">
        {/* Hours */}
        <div className="card">
          <div className="card-body">
            <div className="row align-items-center">
              <button className="btn btn-primary" onClick={pauseFunction}>
                Pause
              </button>
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
              <button className="btn btn-primary" onClick={unPauseFunction}>
                Unpause
              </button>
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
              <button
                className="btn btn-primary"
                onClick={setUniswapPoolFunction}
              >
                SetPancakeSwapPool
              </button>
            </div>{' '}
            {/* / .row */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalFunctionality;
