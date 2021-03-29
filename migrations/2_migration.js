const BIRBToken = artifacts.require("BIRBToken");

module.exports = function (deployer) {
  deployer.deploy(BIRBToken);
};
