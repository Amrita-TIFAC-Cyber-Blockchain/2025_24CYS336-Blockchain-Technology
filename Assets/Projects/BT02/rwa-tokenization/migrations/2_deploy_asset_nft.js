const AssetNFT = artifacts.require("AssetNFT");

module.exports = function (deployer) {
  deployer.deploy(AssetNFT);
};
