import React , {useEffect, useState} from 'react'
import { ipcsAddress,ipcsABI } from '../../../constant';
import { Button } from '@chakra-ui/react';
import { ethers } from 'ethers';
import SingleNft from '../../SingleNFt/SingleNft';

const ActiveProposals = () => {
  const [assetsArray , setassetsArray] = useState([])

  const fetchActiveProposals = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const ipcs = new ethers.Contract(ipcsAddress, ipcsABI, signer)

    const tx = await ipcs.fetchActiveProposals()
    const proposalsArray = Object.values(tx); 
    console.log(tx)
    setassetsArray(proposalsArray)
    console.log('Reading tx--> ')
    console.log(tx)
    console.log(assetsArray)
  }


  useEffect(() => {
    fetchActiveProposals()
  },[assetsArray])

  return (
    <div>

      {assetsArray !== [] ?
      assetsArray.map(items => {
        return (
          <div key={items.tokenId}>
            {items.tokenURI.toString()}
          </div>
        )
      })   :

      <div>Nothing to see mf</div>
    }
    </div>
  )
}

export default ActiveProposals