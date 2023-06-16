import React, { useState } from 'react';
import { ethers } from 'ethers';
import { ipcstokenAddress, Apecoinabi } from "../constant"

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
    <div className='bg-[#0a1930] py-20'>
      <div className='bg-[#008e8e] w-3/12 my-8 rounded-xl mx-auto px-4 py-8 shadow-xl shadow-black p-8'>
          <label className='text-[#0a1930] text-xl font-semibold ' htmlFor="address">Address:</label>
        <input
          id="address"
          className='w-full rounded-lg py-2 px-4 mt-2 mb-4'
          type="text"
          placeholder='Put Address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <label className='text-[#0a1930] text-xl font-semibold ' htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          className='w-full rounded-lg py-2 px-4 mt-2 mb-4'
          value={amount}
          placeholder='Enter Amount'
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <button className='bg-[#0a1930] text-white w-full rounded-lg text-center py-2 px-4' onClick={handleMint}>Mint Tokens</button>
      </div>
    </div>
  );
}

export default Faucet;
