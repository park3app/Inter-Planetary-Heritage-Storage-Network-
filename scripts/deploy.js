
const hre = require("hardhat");



async function main() {

  // deployinh the ipcsnft contract --> 0xeA52dD03048e6745C4e88a727Ea6209E7db611BE
//  const IPCSNFT = await hre.ethers.getContractFactory("IPCSNFT");
//  const ipcsnft = await IPCSNFT.deploy('IPCSNFT','CNFT');
//  ipcsnft.deployed();
//  console.log(`IPCSNFT deployed on ${ipcsnft.address}`)

  // deploying the IPCS Token contract --> 0xdfD2538c5e84E28A32cD17792f751eaC0442A7b2
  // const IPCSToken = await hre.ethers.getContractFactory("IPCSToken");
  // const ipcstoken = await IPCSToken.deploy();
  // ipcstoken.deployed();
  // console.log(`IPCSTOKEN deployed on ${ipcstoken.address}`)

  // deploying the IPCS DAO Contract --> 0x65ce98df0d3de436A7363530Ecd95A3278924770
  const IPCS = await hre.ethers.getContractFactory("IPCS");
  // const ipcs = await IPCS.deploy(ipcstoken.address , ipcsnft.address);
  const ipcs = await IPCS.deploy("0xdfD2538c5e84E28A32cD17792f751eaC0442A7b2" , "0xD0b63E9e483C609CB85EBaf4EaE4C49510Ac7A55");
  ipcs.deployed();
  console.log(`IPCS deployed on ${ipcs.address}`)


}




main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
