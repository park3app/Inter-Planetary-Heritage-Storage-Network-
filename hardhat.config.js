require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */


module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: process.env.POLYGON_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY],
      gas: "auto",
      gasPrice: 80000000000,
      allowUnlimitedContractSize: true
    },
  },

  solidity:{
    version:"0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }

};