
const hre = require("hardhat");



async function main() {
 const IPCSNFT = await hre.ethers.getContractFactory("IPCSNFT");
 const ipcsnft = await IPCSNFT.deploy('IPCSNFT','CNFT');
 await ipcsnft.deployed();
 console.log(`IPCSNFT deployed on ${ipcsnft.address}`)


  const APECOIN = await hre.ethers.getContractFactory("APECOINTOKENS");
  const apetokens = await APECOIN.deploy();
  await apetokens.deployed();
  console.log(`APECOIN deployed on ${apetokens.address}`)

  const IPCS = await hre.ethers.getContractFactory("IPCS");
  // const ipcs = await IPCS.deploy(ipcstoken.address , ipcsnft.address);
  const ipcs = await IPCS.deploy(apetokens.address, ipcsnft.address);
  ipcs.deployed();
  console.log(`IPCS deployed on ${ipcs.address}`)


}




main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
