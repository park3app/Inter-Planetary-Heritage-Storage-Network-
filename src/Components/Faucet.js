import React, { useState } from 'react';
import { ethers } from 'ethers';
import { ipcstokenAddress, Apecoinabi } from "../constant"
import { Alert, AlertIcon } from '@chakra-ui/react';


function Faucet() {
  const [address, setAddress] = useState('');

  const [showMetamaskAlert, setShowMetamaskAlert] = useState(false);
  const [status, setstatus] = useState('')
  const [type,settype] = useState('')



  const handleMint = async () => {
    try {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();


      const contract = new ethers.Contract(ipcstokenAddress, Apecoinabi, signer);

      let tokens = ethers.utils.parseUnits("1", 'ether')

      // Call the mint function on the contract
      const tx = await contract.mint(address, tokens);
      const transactionHash = tx.hash;
      signer.provider.on(transactionHash, (receipt) => {
        /// aleert message will come here
      });



      // Wait for the transaction to be confirmed
      await tx.wait();

      setShowMetamaskAlert(true)
      setstatus('Transaction confirmed:')
      settype('success')
      setTimeout(() => {
        setstatus("")
        settype('')
        setShowMetamaskAlert(false)
      }, 5000);
      // });


      console.log('Tokens minted successfully!');
    } catch (error) {
      console.log('Error minting tokens:', error);
      if (error.code === 4001) {
        // Display an alert or error message for the 4001 error
        console.error("User cancelled the transaction.");
        setstatus("User cancelled the transaction.")
        settype('error')
        setShowMetamaskAlert(true)
      } else {
        // Display a generic error message for other types of errors
        console.error("Some Error Occurred. Please Try Again Later...");
        setstatus("User cancelled the transaction.")
        settype('error')
        setShowMetamaskAlert(true)
      }
      setTimeout(() => {
        setstatus("")
        settype('')
        setShowMetamaskAlert(false)
      }, 5000);
    }
  };

  return (
    <div className='bg-[#0a1930] pb-20'>
      {showMetamaskAlert&&
        <Alert className=' w-10/12  ' status={type}><AlertIcon />{status}</Alert>
      }
        <div className='pt-20'>
      <div className='bg-[#008e8e] w-3/12 my-8  rounded-xl mx-auto px-4 py-8 shadow-xl shadow-black p-8'>
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
        <label className='text-[#0a1930] text-xl font-semibold ' htmlFor="amount">Credited Amount: 1 APE</label>
        <br />
        <button className='bg-[#0a1930] text-white w-full rounded-lg text-center py-2 px-4' onClick={handleMint}>Mint Tokens</button>
        </div>
      </div>
    </div>
  );
}

export default Faucet;
