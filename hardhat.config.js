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
      accounts: ["f1694101cc2cda683d39556bf6f16ddb3007072c53f76735de8769cfb1c0163b"],
      gas: "auto",
      gasPrice: 8000000000000,
      allowUnlimitedContractSize: true
    },


  calibrationnet: {
    chainId: 314159,
    url: "https://api.calibration.node.glif.io/rpc/v1",
    accounts: ["f1694101cc2cda683d39556bf6f16ddb3007072c53f76735de8769cfb1c0163b"],
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