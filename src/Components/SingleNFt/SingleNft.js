import React, { useState, useEffect } from 'react'
import { VStack, Heading, Text, Image, Button, Box } from '@chakra-ui/react'
import { Link } from "react-router-dom"
import { includesErrorMessage } from '@thirdweb-dev/react';
import { ipcsAddress, ipcsABI } from "../../constant.js"
import { ethers } from 'ethers';


const SingleNft = ({ tokenURI, isStateisTrue, isproposed, tokenId }) => {
  const [name, setName] = useState('');
  const [img, setimg] = useState('')

  console.log("max",tokenURI);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        let tokenURIx = "https://ipfs.io/ipfs/" + tokenURI + "/metadata.json";
        const response = await fetch(`https://ipfs.io/ipfs/${tokenURI}/metadata.json`);
        const metadata = await response.json();
        const metadataName = metadata.name;
        let tokenImagex = metadata.image;


        setimg(tokenImagex);
        setName(typeof metadataName === 'string' ? metadataName : '');

      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };

    fetchMetadata();
  }, [tokenURI]);


  return (
    <div className=" m-3 " key={tokenURI}>
      {
        tokenURI !== "" &&

        <div >
          <img
            src={`${img.replace('ipfs://', 'https://nftstorage.link/ipfs/')}`}
            className='w-11/12 mx-auto rounded-2xl max-h-52'
            borderRadius={'2px'}
            objectFit={"contain"}
            alt={name}
          />

          <div className='mx-3 mt-2 text-xl w-fit py-1 px-2 text-gray-300 font-bold  '>{`#${tokenId.toString()} ${name.toUpperCase()} `}</div>
          <Text noOfLines={1}>
            <Link to={`/assets/${tokenId.toString()}`}>
            {isStateisTrue ?
              <p
                p={'2'}
                backgroundColor={'red.300'}
                fontWeight={'700'}
                color='#fff'
                m={'3'}
                className='bg-[#17173d] border-red-700 rounded-lg border-2 py-2 p-2 text-white font-bold mx-3 mt-2'
                size='xs'>Voting Closed</p> :

              <p
                color='#fff'
                borderRadius={'3px'}
                p={'2'}
                m={'3'}
                className='bg-[#17173d] border-green-700 rounded-lg border-2 py-2 px-4   text-white font-bold mx-3 mt-2 '
                fontWeight={'600'}
                size='xs'>Voting Open</p>}
                </Link></Text>

          <Text noOfLines={1}>
          <Link to={`/assets/${tokenId.toString()}`}>
            {isproposed ?
              <Text p={'2'}
        
                fontWeight={'700'}
                color='#fff'
                m={'3'}
                size='xs'
                className='bg-[#17173d] border-blue-800 rounded-lg border-2 py-2 p-2 text-white font-bold mx-3 mt-2  '
                borderRadius={'6px'}>Sended To Storage</Text>

              :

              <p
                className='bg-[#17173d] border-green-700 rounded-lg border-2 py-2 p-2 text-white font-bold mx-3 mt-2  '
                color='#fff'
                borderRadius={'3px'}
                m={'3'}
                p={'2'}
                fontWeight={'700'}
                size='xs'>Send To Storage</p>
            }</Link></Text>
        </div>
        
      }
    </div>
  )

}

export default SingleNft