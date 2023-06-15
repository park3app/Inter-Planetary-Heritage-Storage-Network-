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
      url: 'https://polygon-mumbai.g.alchemy.com/v2/9Nw1K0EmuEt0TOuhcAAXGwsoW13OJVNh',
      accounts: ["2af3750a8b8d2533e310182d00fbd9fc3fdb2926b303d220c9779e031f23c61b"],
      gas: "auto",
      gasPrice: 8000000000000,
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