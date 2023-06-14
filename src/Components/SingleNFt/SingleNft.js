import React , {useState  , useEffect} from 'react'
import {  VStack,Heading,Text,Image , Button , Box} from '@chakra-ui/react'
import {Link} from "react-router-dom"
import { includesErrorMessage } from '@thirdweb-dev/react';
import {ipcsAddress , ipcsABI} from "../../constant.js"
import { ethers } from 'ethers';


const SingleNft = ({tokenURI ,isStateisTrue , isproposed , tokenId}) => {
  const [name, setName] = useState('');
  const [img,setimg] = useState('')

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        let tokenURIx= "https://ipfs.io/ipfs/"+ tokenURI + "/metadata.json";
        const response = await fetch(`https://ipfs.io/ipfs/${tokenURI}/metadata.json`);
        const metadata = await response.json();
        const metadataName = metadata.name;
        let tokenImagex= metadata.image;
        

        setimg(tokenImagex);
        setName(typeof metadataName === 'string' ? metadataName : '');

      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };

    fetchMetadata();
  }, [tokenURI]);
  

  return (
    <Box key={tokenURI}>
    {
      tokenURI !== "" ?
    <Link to={`/assets/${tokenId.toString()}`} maxW="30">
    <VStack
      h={"350"}
      w={"300"}
      shadow={"lg"}
      p={"8"}
      bg={'#63686E'}
      transition={"all 0.3s"}
      m={"6"}
      borderWidth={'3px'}
      borderRadius={'10px'}
      borderColor={'#CCEABB'}
      transitionDelay={'15ms'}
      css={{
        "&:hover": {
          transform: "scale(1.02)",
          boxSshadow:' 1px 1px 1px #111'
        
        },
      }}
    >
      <Heading  noOfLines={1} fontWeight={'1000'}  fontSize = {'2rem'} color={"#CCEABB"}>
        #{tokenId.toString()}
        </Heading>
      <Image
        src={`${img.replace('ipfs://', 'https://nftstorage.link/ipfs/')}`}
        w={"100"}  
        h={"70"}
        borderRadius={'2px'}
        objectFit={"contain"}
        alt={name}
      />
      <Heading size={"sm"} noOfLines={2} fontWeight={'700'} color={'#fff'} padding={'2'} textDecoration={'underline'}>
      {name.toUpperCase()}
      </Heading>

      <Text noOfLines={1}>{isStateisTrue  ? <Text p={'2'}  backgroundColor={'red.300'} fontWeight={'700'} color='#fff'  m={'3'} borderRadius={'6px'} size='xs'>Voting Closed</Text> : <Text color='#fff' borderRadius={'3px'} p={'2'} m={'3'} backgroundColor={'green.300'} fontWeight={'600'} size='xs'>Voting Open</Text>}</Text>
      <Text noOfLines={1}>{isproposed ? <Text p={'2'} backgroundColor={'red.400'} fontWeight={'700'} color='#fff'  m={'3'} size='xs' borderRadius={'6px'}>Proposed</Text> : <Text   color='#fff' borderRadius={'3px'}  m={'3'} backgroundColor={'green.300'} p={'2'} fontWeight={'700'} size='xs'>Propose</Text>}</Text>
    </VStack>
  </Link>:
  <div>
  </div>
    }
    </Box>
  )
    
}

export default SingleNft