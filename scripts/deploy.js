
const hre = require("hardhat");



async function main() {
 const IPCSNFT = await hre.ethers.getContractFactory("IPCSNFT");
 const ipcsnft = await IPCSNFT.deploy('IPCSNFT','CNFT');
 await ipcsnft.deployed();
 console.log(`IPCSNFT deployed on ${ipcsnft.address}`)


  // const IPCSToken = await hre.ethers.getContractFactory("IPCSToken");
  // const ipcstoken = await IPCSToken.deploy();
  // await ipcstoken.deployed();
  // console.log(`IPCSTOKEN deployed on ${ipcstoken.address}`)


  const IPCS = await hre.ethers.getContractFactory("IPCS");
  // const ipcs = await IPCS.deploy(ipcstoken.address , ipcsnft.address);
  const ipcs = await IPCS.deploy("0x82EE73E6B47d3E144439E7b1ad6fd7a964FC69a2", ipcsnft.address);
  ipcs.deployed();
  console.log(`IPCS deployed on ${ipcs.address}`)


}




main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
