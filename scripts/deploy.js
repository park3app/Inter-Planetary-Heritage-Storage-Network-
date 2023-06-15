
const hre = require("hardhat");



async function main() {
 const IPCSNFT = await hre.ethers.getContractFactory("IPCSNFT");
 const ipcsnft = await IPCSNFT.deploy('IPCSNFT','CNFT');
 ipcsnft.deployed();
 console.log(`IPCSNFT deployed on ${ipcsnft.address}`)


  const IPCSToken = await hre.ethers.getContractFactory("IPCSToken");
  const ipcstoken = await IPCSToken.deploy();
  ipcstoken.deployed();
  console.log(`IPCSTOKEN deployed on ${ipcstoken.address}`)


  const IPCS = await hre.ethers.getContractFactory("IPCS");
  // const ipcs = await IPCS.deploy(ipcstoken.address , ipcsnft.address);
  const ipcs = await IPCS.deploy(ipcstoken.address , ipcsnft.address);
  ipcs.deployed();
  console.log(`IPCS deployed on ${ipcs.address}`)


}




main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
