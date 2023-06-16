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
      accounts: ["7dae538411d32f39596b35736d0e47334324864a8bbb30149581f9fe5edf75cd"],
      gas: "auto",
      gasPrice: 8000000000000,
      allowUnlimitedContractSize: true
    },


  calibrationnet: {
    chainId: 314159,
    url: "https://api.calibration.node.glif.io/rpc/v1",
    accounts: ["7dae538411d32f39596b35736d0e47334324864a8bbb30149581f9fe5edf75cd"],
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