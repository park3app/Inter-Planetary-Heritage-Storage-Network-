import React , {useEffect , useState} from 'react'
import {Box , VStack , Heading , Image , Text, HStack, Button} from "@chakra-ui/react"
import {Link} from "react-router-dom"
import { AiOutlineArrowUp } from 'react-icons/ai';

const ProposalTile = ({tokenURI , proposalid , yesvotes , novotes}) => {

    const [name , setname] = useState();
    const [image , setimage] = useState('')

    useEffect(() => {
        const fetchMetadata = async () => {
          try {
            // alert(tokenURI)
            const response = await fetch(`https://ipfs.io/ipfs/${tokenURI}/metadata.json`);
            const metadata = await response.json();
            console.log(metadata.text())
            setname(metadata.name)
            let tokenImagex= metadata.image;
            setimage(tokenImagex)

            
          } catch (error) {
            console.error('Error fetching metadata:', error);
          }
        }
        fetchMetadata();
    }, [tokenURI]);
  
  return (
    <Box key={tokenURI}>
    {
      tokenURI !== "" ?
    
    
    <Link to={`/activeproposals/${proposalid.toString()}`}  maxW="30" key={proposalid.toString()}>
    <VStack
       h={"350"}
       w={"300"}
      shadow={"lg"}
      p={"10"}
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
        #{proposalid.toString()}
        </Heading>
      <Image
        src={`${image.replace('ipfs://', 'https://nftstorage.link/ipfs/')}`}
        w={"100"}  
        h={"70"}
        borderRadius={'2px'}
        objectFit={"contain"}
        alt={name}
      />
   <Heading size={"sm"} noOfLines={2} fontWeight={'700'} color={'#fff'} padding={'2'} textDecoration={'underline'}>
      {name ? name.toUpperCase(): "Loading..."}
      </Heading>
      <HStack>
      <Text noOfLines={1} color={'green.800'} fontSize={'2xl'}>{yesvotes}</Text>
      <Text noOfLines={1} color={'red'} fontSize={'2xl'}>{novotes}</Text>
      </HStack>

      <Button size='md' colorScheme='green' borderRadius={'4px'}  fontWeight={'700'} >Vote</Button>
     
      </VStack>
  </Link>:
  <div></div>
    }
    </Box>
  )
}

export default ProposalTile