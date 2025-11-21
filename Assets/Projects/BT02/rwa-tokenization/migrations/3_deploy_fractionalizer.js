const Fractionalizer = artifacts.require("Fractionalizer");
const AssetNFT = artifacts.require("AssetNFT");

module.exports = function (deployer) {
  deployer.deploy(Fractionalizer, AssetNFT.address);
};
