import React , {useEffect, useState} from 'react'
import { ipcsAddress,ipcsABI } from '../../../constant';
import { Button , Box, Center , Heading, VStack , HStack } from '@chakra-ui/react';
import {ExternalLinkIcon} from "@chakra-ui/icons"
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import ProposalTile from '../ProposalTile/ProposalTile';

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
  },[])

  return (
    <div className='bg-[#0a1930] h-screen' >
      <Center>
        <VStack>
       
      <Heading
              as='h1'
              fontWeight='700'
              fontSize='2rem'
              color={"white"}
              mt='10'
            >
              All Active Proposals
            </Heading>
            
            <HStack wrap={'wrap'} justifyContent={'flex-start'}>
      {assetsArray.length !== 0 ?
      assetsArray.map(items => {
        return (
          <>
          <ProposalTile tokenURI={items.tokenURI} proposalid={items.proposalId.toString()} yesvotes={items.yesvotes.toString()} novotes={items.novotes.toString()} />
          </>
        )
      })   :
      <Center  h={'50vh'}>
                <div className='message'>Currently No Active proposals <Link to='/uploadassets'><ExternalLinkIcon/></Link> </div>
                </Center>
    }
      </HStack>
     </VStack>
      </Center>

     
    </div>
  )
}

export default ActiveProposals