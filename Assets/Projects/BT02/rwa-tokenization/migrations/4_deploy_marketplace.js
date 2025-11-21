const Marketplace = artifacts.require("Marketplace");
const AssetNFT = artifacts.require("AssetNFT");

module.exports = function (deployer) {
  deployer.deploy(Marketplace, AssetNFT.address);
};
