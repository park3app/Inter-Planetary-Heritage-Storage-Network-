import React , {useEffect , useState} from 'react'
import {Box , VStack , Heading , Image , Text, HStack, Button} from "@chakra-ui/react"
import {Link} from "react-router-dom"

const ProposalTile = ({tokenURI , proposalid , yesvotes , novotes}) => {

    const [name , setname] = useState();
    const [image , setimage] = useState('')

    useEffect(() => {
        const fetchMetadata = async () => {
          try {
            const response = await fetch(tokenURI);
            const metadata = await response.json();
            setname(metadata.name)
            setimage(image)

            
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
    
    
    <Link to={`/activeproposals/${proposalid.toString()}`} target='_blank' >
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
        TOKEN ID: {proposalid.toString()}
      </Heading>
      <Image
        src={image}
        w={"50"}  
        h={"50"}
        objectFit={"contain"}
        alt={name}
      />
      <Heading size={"md"} noOfLines={2} fontWeight={'500'} color={'rgba(0, 0, 0, 0.53)'}>
      { name ? name.toUpperCase() : 'Loading...'}
      </Heading>
      <HStack>
      <Text noOfLines={1} color={'green'} size='xs'>{yesvotes}</Text>
      <Text noOfLines={1} color={'red'} size='xs'>{novotes}</Text>
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