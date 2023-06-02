
const hre = require("hardhat");

//0xc2a96851Ea48046082e4168537Fb363d9BD73a13

let contractAddress;

async function main() {
 const PARK3 = await hre.ethers.getContractFactory("PARK3");
 const park3 = await PARK3.deploy('PARK3','PRK');
 park3.deployed();

 console.log(`PARK3 deployed on ${park3.address}`)
 contractAddress  = park3.address
}

// export {contractAddress};


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
