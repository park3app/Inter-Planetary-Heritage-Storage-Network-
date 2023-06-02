import React from 'react'
import {  VStack,Heading,Text,Image} from '@chakra-ui/react'
import {Link} from "react-router-dom"

const SingleNft = ({img,name,isStateisTrue}) => {
  return (
    
    <Link to={`/assets`} target='_blank' >
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
    //   borderRadius={"full"}
      transition={"all 0.3s"}
      m={"4"}
      transitionDelay={'15ms'}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        //   color: '#fff',
        //   backgroundColor : 'rgba(0, 0, 0, 0.64)',
          boxSshadow:' 5px 5px 5px #111'
        
        },
      }}
    >
      <Image
        src={img}
        w={"50"}
        h={"50"}
        objectFit={"contain"}
        alt={"Public Places"}
      />
      <Heading size={"md"} noOfLines={1} fontWeight={'200'}>
        {name}
      </Heading>

      <Text noOfLines={1}>{isStateisTrue ? `Voting Closed` : "Voting  Opened"}</Text>
    </VStack>
  </Link>

  )
}

export default SingleNft