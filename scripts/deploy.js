
const hre = require("hardhat");



async function main() {
//  const IPCSNFT = await hre.ethers.getContractFactory("IPCSNFT");
//  const ipcsnft = await IPCSNFT.deploy('IPCSNFT','CNFT');
//  ipcsnft.deployed();
//  console.log(`IPCSNFT deployed on ${ipcsnft.address}`)


//   const IPCSToken = await hre.ethers.getContractFactory("IPCSToken");
//   const ipcstoken = await IPCSToken.deploy();
//   ipcstoken.deployed();
//   console.log(`IPCSTOKEN deployed on ${ipcstoken.address}`)


  const IPCS = await hre.ethers.getContractFactory("IPCS");
  // const ipcs = await IPCS.deploy(ipcstoken.address , ipcsnft.address);
  const ipcs = await IPCS.deploy("0x3590D57ce4CC85252F5cfb1B9abD5F2dedd8C25A" , "0x2ad10065dc0f8805Fa474CdBee40E187Ec991755");
  ipcs.deployed();
  console.log(`IPCS deployed on ${ipcs.address}`)


}




main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
