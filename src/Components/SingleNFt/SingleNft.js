import React, { useState, useEffect } from 'react'
import { VStack, Heading, Text, Image, Button, Box } from '@chakra-ui/react'
import { Link } from "react-router-dom"
import { includesErrorMessage } from '@thirdweb-dev/react';
import { ipcsAddress, ipcsABI } from "../../constant.js"
import { ethers } from 'ethers';


const SingleNft = ({ tokenURI, isStateisTrue, isproposed, tokenId }) => {
  const [name, setName] = useState('');
  const [img, setimg] = useState('')

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
    <div className="bg-[#0a1930] m-3" key={tokenURI}>
      {
        tokenURI !== "" &&

        <div className='w-72 rounded-3xl h-96 border-2 border-sky-800  bg-[#172a48] pt-2.5'>
          <img
            src={`${img.replace('ipfs://', 'https://nftstorage.link/ipfs/')}`}
            className='w-11/12 mx-auto rounded-2xl'
            borderRadius={'2px'}
            objectFit={"contain"}
            alt={name}
          />

          <div className='mx-3 mt-2 text-xl w-fit py-1 px-2 text-white font-bold  '>{`#${tokenId.toString()} ${name.toUpperCase()} `}</div>
          <Text noOfLines={1}>
            <Link to={`/assets/${tokenId.toString()}`}>
            {isStateisTrue ?
              <p
                p={'2'}
                backgroundColor={'red.300'}
                fontWeight={'700'}
                color='#fff'
                m={'3'}
                className='bg-red-500 rounded-lg border-2 py-2 p-2 text-white font-bold mx-3 mt-2  border-slate-700'
                size='xs'>Voting Closed</p> :

              <p
                color='#fff'
                borderRadius={'3px'}
                p={'2'}
                m={'3'}
                className='bg-green-600 rounded-lg border-2 py-2 px-4   text-white font-bold mx-3 mt-2  border-slate-700'
                fontWeight={'600'}
                size='xs'>Voting Open</p>}
                </Link></Text>

          <Text noOfLines={1}>
          <Link to={`/assets/${tokenId.toString()}`}>
            {isproposed ?
              <Text p={'2'}
                backgroundColor={'red.400'}
                fontWeight={'700'}
                color='#fff'
                m={'3'}
                size='xs'
                className='bg-red-500 rounded-lg border-2 py-2 p-2 text-white font-bold mx-3 mt-2  border-slate-700'
                borderRadius={'6px'}>Proposed</Text>

              :

              <p
                className='bg-green-600 rounded-lg border-2 py-2 p-2 text-white font-bold mx-3 mt-2  border-slate-700'
                color='#fff'
                borderRadius={'3px'}
                m={'3'}
                backgroundColor={'green.300'}
                p={'2'}
                fontWeight={'700'}
                size='xs'>Propose</p>
            }</Link></Text>
        </div>
        
      }
    </div>
  )

}

export default SingleNft