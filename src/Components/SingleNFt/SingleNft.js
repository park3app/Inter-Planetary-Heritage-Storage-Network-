import React from 'react'
import {  VStack,Heading,Text,Image , Button} from '@chakra-ui/react'
import {Link} from "react-router-dom"
import { includesErrorMessage } from '@thirdweb-dev/react'


const SingleNft = ({img,name,isStateisTrue}) => {
  console.log(img)
  const array = img.split("/")
  const cid = array[-2]
  console.log(cid)
  const ipfsurl = img.replace("metadata.json", "image.jpeg");
  // console.log(ipfsurl)
  return (
    
    <Link to={`/assets`} target='_blank' >
    <VStack
      w={"70"}
      h={"200"}
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
          transform: "scale(1.1)",
          boxSshadow:' 5px 5px 5px #111'
        
        },
      }}
    >
      <Image
        src={ipfsurl}
        w={"50"}
        h={"50"}
        objectFit={"contain"}
        alt={"Public Places"}
      />
      <Heading size={"md"} noOfLines={1} fontWeight={'500'} color={'rgba(0, 0, 0, 0.53)'}>
        {name.toUpperCase()}
      </Heading>

      <Text noOfLines={1}>{isStateisTrue ? <Button colorScheme='red' size='xs'>Voting Closed</Button> : <Button colorScheme='green' size='xs'>Voting Open</Button>}</Text>
      {/* <Text noOfLines={3}>{img}</Text> */}
    </VStack>
  </Link>

  )
}

export default SingleNft