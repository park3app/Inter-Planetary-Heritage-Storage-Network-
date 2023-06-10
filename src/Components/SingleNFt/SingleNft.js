import React , {useState  , useEffect} from 'react'
import {  VStack,Heading,Text,Image , Button , Box} from '@chakra-ui/react'
import {Link} from "react-router-dom"
import { includesErrorMessage } from '@thirdweb-dev/react';
import {ipcsAddress , ipcsABI} from "../../constant.js"
import { ethers } from 'ethers';


const SingleNft = ({tokenURI ,isStateisTrue , isproposed , tokenId}) => {
  console.log('Single NFT' ,  tokenURI)
  const [name, setName] = useState('');
  const [img,setimg] = useState('')

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(tokenURI);
        const metadata = await response.json();
        const metadataName = metadata.name;
        setName(typeof metadataName === 'string' ? metadataName : '');
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };
    // function getImageUrlFromIPFS() {
    //   try{
    //   const ipfsHash = tokenURI.split('/ipfs/')[1].split("/")[0]
    //   // alert(ipfsHash)
    //   setimg(`https://ipfs.io/ipfs/${ipfsHash}/image.jpeg`)   
    //   // alert('Image hash', img)
    // }catch(error){
    //   console.log(error)
    // }
    // }
    // getImageUrlFromIPFS()
    fetchMetadata();
  }, [tokenURI]);


  

  return (
    <Box key={tokenURI}>
    {
      tokenURI !== "" ?
    
    
    <Link to={`/assets/${tokenId.toString()}`} target='_blank' >
    <VStack
      maxW={"400"}
      maxh={"200"}
      shadow={"lg"}
      p={"10"}
      bg={'#F5F4E4'}
      transition={"all 0.3s"}
      m={"6"}
      borderWidth={'3px'}
      borderRadius={'10px'}
      borderColor={'rgba(0, 0, 0, 0.53)'}
      transitionDelay={'15ms'}
      css={{
        "&:hover": {
          transform: "scale(1.02)",
          boxSshadow:' 1px 1px 1px #111'
        
        },
      }}
    >
      <Heading size={"md"} noOfLines={1} fontWeight={'500'} color={'rgba(0, 0, 0, 0.53)'}>
        TOKEN ID: {tokenId.toString()}
      </Heading>
      <Image
        src={img}
        w={"50"}  
        h={"50"}
        objectFit={"contain"}
        alt={name}
      />
      <Heading size={"md"} noOfLines={2} fontWeight={'500'} color={'rgba(0, 0, 0, 0.53)'}>
      {name.toUpperCase()}
      </Heading>

      <Text noOfLines={1}>{isStateisTrue  ? <Text p={'4px'}  backgroundColor={'red.400'} fontWeight={'700'} color='#fff' borderRadius={'6px'} size='xs'>Voting Closed</Text> : <Text color='#fff' borderRadius={'4px'} p={'4px'} backgroundColor={'green.300'} fontWeight={'600'} size='xs'>Voting Open</Text>}</Text>
      <Text noOfLines={1}>{isproposed ? <Text p={'4px'} backgroundColor={'red.400'} fontWeight={'700'} color='#fff' size='xs' borderRadius={'6px'}>Proposed</Text> : <Text   color='#fff' borderRadius={'4px'} backgroundColor={'green.300'} p={'4px'} fontWeight={'600'} size='xs'>Propose</Text>}</Text>
    </VStack>
  </Link>:
  <div></div>
    }
    </Box>
  )
    
}

export default SingleNft