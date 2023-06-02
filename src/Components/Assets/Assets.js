import React , {useEffect, useState} from 'react'
import "./Assets.css"
import {abi ,address} from "../../constant.js"
import { ethers } from 'ethers';
import { Spinner , Button} from '@chakra-ui/react'
import SingleNft from '../SingleNFt/SingleNft';

const Assets = () => {

    const [assetsArray , setassetsArray] = useState("")
    const [loading , setloading] = useState(false)

    const fetchMyNFTs = async () => {
        setloading(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const park3 = new ethers.Contract(address, abi, signer)

        const tx =  await park3.fetchMYNFTs() 
        console.log(tx)
        setassetsArray(tx)
        setloading(false)
    
    }

    // useEffect(() => {
    //     fetchMyNFTs()
    // },[])
        

      
  return (
    <div>
        <Button onClick={fetchMyNFTs}>Get Your Assets</Button>
        
        {loading ? 
        <Spinner/> :
        <div>
            {
                assetsArray ? 
           
           assetsArray.map(nft => {
                return (
                    <SingleNft img={nft.tokenURI} name={nft.name} isStateisTrue={nft.isStateisTrue} />
                )
            }):
            <div>Nothing to see mate </div>

        }
        </div>    
    }

    </div>
  )
}

export default Assets