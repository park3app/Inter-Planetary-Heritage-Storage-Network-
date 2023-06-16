import React, { useState } from 'react';
import { ethers } from 'ethers';
import {ipcstokenAddress , Apecoinabi} from "../constant"

const provider = new ethers.providers.Web3Provider(window.ethereum);

function Faucet() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleMint = async () => {
    try {   

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();


      const contract = new ethers.Contract(ipcstokenAddress, Apecoinabi, signer);

      let tokens = ethers.utils.parseUnits(amount, 'ether')

      // Call the mint function on the contract
      const tx = await contract.mint(address, tokens);

      

      // Wait for the transaction to be confirmed
      await tx.wait();

      console.log('Tokens minted successfully!');
    } catch (error) {
      console.error('Error minting tokens:', error);
    }
  };

  return (
    <div>
      <label htmlFor="address">Address:</label>
      <input
        id="address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <br />
      <label htmlFor="amount">Amount:</label>
      <input
        id="amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <button onClick={handleMint}>Mint Tokens</button>
    </div>
  );
}

export default Faucet;
