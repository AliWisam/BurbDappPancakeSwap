import React, { Fragment, useEffect, useState } from "react";
import UserStats from "./UserStats";
import Leaderboard from "./Leaderboard";
import {
  claimRewardsMetaMask,
  claimRewardsWalletConnect,
  hatchNestMetaMask,
  hatchNestWalletConnect,
  claimRewardsBscWallet,
  hatchNestBscWallet
} from "../services/DashboardFunctions";
import AdditionalFunctionality from "./AdditinalFunctionality";
import { getContractOwner } from "../services/AdditionalFunctions";
import { disconnectWalletConnect } from "../services/WalletConnection";

const Dashboard = ({ addr, setAddr, setShow, contract }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [errorSendTransaction, setErrorSendTransaction] = useState("");
  const [errorClaimReward, setErrorClaimReward] = useState("");
  const [contractOwner, setContractOwner] = useState("");

  const disconnectWallet = () => {
    setAddr("");
    if (localStorage.getItem("wallet-header") === "metamask") {
      localStorage.removeItem("wallet-header");
    } else if (localStorage.getItem("wallet-header") === "binance") {
      localStorage.removeItem("wallet-header");
    } else if (localStorage.getItem("walletconnect")) {
      disconnectWalletConnect();
    }
  };
  // console.log(addr);
  // console.log('walletconnect', localStorage.getItem('walletconnect'));
  // console.log(localStorage.getItem('wallet-header'));
  // console.log('addr', addr);

  const connectWallet = () => {
    setShow(true);
  };

  const hatchBirbs = () => {
    if (localStorage.getItem("wallet-header") === "metamask") {
      hatchNestMetaMask(addr, setErrorSendTransaction);
    } else if (localStorage.getItem("walletconnect")) {
      hatchNestWalletConnect(setErrorSendTransaction, contract);
    } else if(localStorage.getItem("wallet-header") === "binance"){
      hatchNestBscWallet(addr, setErrorSendTransaction);
    }
  };

  const claimReward = () => {
    if (localStorage.getItem("wallet-header") === "metamask") {
      claimRewardsMetaMask(addr, setErrorClaimReward);
    } else if (localStorage.getItem("wallet-header") === "binance") {
      claimRewardsBscWallet(addr, setErrorClaimReward);
    } else if (localStorage.getItem("walletconnect")) {
      claimRewardsWalletConnect(setErrorClaimReward, contract);
    }
  };

  useEffect(() => {
    getContractOwner(setContractOwner);
  }, [addr]);
  // console.log(localStorage.getItem('wallet-header'));

  useEffect(() => {
    let countError = 0;
    if (addr && leaderboard.length !== 0) {
      leaderboard.forEach((item) => {
        if (addr.toLowerCase() === item.address.toLowerCase()) {
          return;
        } else {
          countError++;
          // setErrorClaimReward('Current Address is not in Top 50 Holders')
        }
      });
      if (leaderboard.length === countError) {
        setErrorClaimReward("Current Address is not in Top 50 Holders");
      } else {
        setErrorClaimReward("");
      }
    }
  }, [addr, leaderboard]);

  return (
    <div className="main-content">
      {/* HEADER */}
      <div className="header">
        <div className="container">
          {/* Body */}
          <div className="header-body">
            <div className="row align-items-end">
              <div className="col" style={{ textAlign: "left" }}>
                {/* Pretitle */}
                <h6 className="header-pretitle">Welcome</h6>
                {/* Title */}
                <h1 className="header-title">BIRB Portal</h1>
              </div>
              <div className="col-auto">
                {addr && localStorage.getItem("wallet-header") ? (
                  //Button
                  <button
                    className="btn btn-light mb-2 lift"
                    onClick={disconnectWallet}
                  >
                    Disconnect
                  </button>
                ) : (
                  // Button
                  <button
                    className="btn btn-success mb-2 lift"
                    onClick={connectWallet}
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>{" "}
            {/* / .row */}
          </div>{" "}
          {/* / .header-body */}
        </div>
      </div>{" "}
      {/* / .header */}
      {/* CARDS */}
      <div className="container">
        {/* Additional Functions for owner */}
        {localStorage.getItem("wallet-header") &&
          addr &&
          contractOwner &&
          contractOwner.toLowerCase() === addr.toLowerCase() && (
            <AdditionalFunctionality addr={addr} contract={contract} />
          )}

        <div className="row">
          <div className="col-12 col-lg-6">
            {/* Card */}
            <div className="card card-fill-lg">
              <div className="card-body text-center">
                {/* Image */}
                <div className="text-center">
                  <img
                    src="./img/files/earth.png"
                    alt="..."
                    className="img-fluid mt-lg-0 mb-4"
                    style={{ maxWidth: 200 }}
                  />
                </div>
                {/* Heading */}
                <h2 className="mb-3 mt-3">Hatching</h2>
                {/* Text */}
                <p className="card-text text-muted">
                  Start hatching and claim your 1% reward of $BIRB tokens.
                  Available every day.
                </p>
                {/* Button */}
                {addr && localStorage.getItem("wallet-header") && (
                  <button
                    className="btn btn-block btn-primary lift"
                    onClick={hatchBirbs}
                  >
                    Hatch some BIRBs
                  </button>
                )}
                {/* Alert */}
                {localStorage.getItem("wallet-header") && errorSendTransaction && (
                  <div
                    className="alert alert-warning alert-dismissible fade show mt-3 mb-0"
                    role="alert"
                  >
                    <h2>
                      {errorSendTransaction.timeStatus ? (
                        <Fragment>OOOPS... </Fragment>
                      ) : (
                        <Fragment>No BIRB </Fragment>
                      )}

                      <span role="img" aria-label="sad-emoji">
                        😢
                      </span>
                    </h2>
                    {errorSendTransaction.timeStatus ? (
                      errorSendTransaction.msg
                    ) : (
                      <Fragment>
                        The account connected to your wallet doesn't seem to
                        hold any BIRB. <strong>Acquire BIRB</strong> to play or
                        connect another account.
                      </Fragment>
                    )}

                    {/* Button */}
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            {/* Card */}
            <div className="card card-fill-lg">
              <div className="card-body text-center">
                {/* Image */}
                <div className="text-center">
                  <img
                    src="./img/files/nest.png"
                    alt="..."
                    className="img-fluid mt-lg-0 mb-4"
                    style={{ maxWidth: 200 }}
                  />
                </div>
                {/* Heading */}
                <h2 className="mb-3 mt-3">Claim BIRB Nest</h2>
                {/* Text */}
                <p className="card-text text-muted">
                  This delicious reward is available to the top 50 holders and
                  distributed every 3 days.
                </p>
                {/* Button */}
                {addr && localStorage.getItem("wallet-header") && (
                  <button
                    className="btn btn-block btn-primary lift"
                    onClick={claimReward}
                  >
                    Claim Rewards
                  </button>
                )}
                {/* Alert */}
                {localStorage.getItem("wallet-header") && errorClaimReward && (
                  <div
                    className="alert alert-warning alert-dismissible fade show mt-3 mb-0"
                    role="alert"
                  >
                    <h2>
                      Not a TOP 50 Holder{" "}
                      <span role="img" aria-label="sad-emoji">
                        😢
                      </span>
                    </h2>
                    Oops, It looks like you're not in the top 50 holders to
                    receive this reward.
                    {/* Button */}
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <UserStats addr={addr} contract={contract} />
        {/* <UserStats /> */}

        <Leaderboard
          leaderboard={leaderboard}
          setLeaderboard={setLeaderboard}
        />
      </div>
    </div>
  );
};

export default Dashboard;
