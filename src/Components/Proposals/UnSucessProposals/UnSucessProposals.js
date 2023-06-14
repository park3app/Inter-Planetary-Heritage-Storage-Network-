import React , {useEffect, useState} from 'react'
import { ipcsAddress,ipcsABI } from '../../../constant';
import { Button , Box, Center , Heading, VStack , HStack , Spinner } from '@chakra-ui/react';
import {ExternalLinkIcon} from "@chakra-ui/icons"
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import ExecutedProposalTile from '../ExecutedProposalTile/ExecutedProposalTile';

const UnSuccesFullProposals = () => {

  const [assetsArray , setassetsArray] = useState([]);
  const [loading , setloading] = useState("")
  
  const fetchSuccesfullProposals = async() => {
    setloading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const ipcs = new ethers.Contract(ipcsAddress, ipcsABI, signer)

    const tx = await ipcs.fetchUnSuccesfullProposals()
    const proposalsArray = Object.values(tx); 
    console.log(tx)
    setassetsArray(proposalsArray)
    setloading(false)
    console.log('Reading tx--> ')
    console.log(tx)
    console.log(assetsArray)
  }


  useEffect(() => {
    fetchSuccesfullProposals()
  },[])


  return (
    <Box bg={'hsl(0, 0%, 90%)'} minH={'50vh'} >
        <Center justifyContent={'center'}>
        <VStack as='header' spacing='6' mt='8' wrap={'wrap'} justifyContent={'space-evenly'}>
            <Heading
              as='h1'
              fontWeight='700'
              fontSize='2rem'
              color={'#454545'}
            >
              All UnSuccesfull Proposals
            </Heading>
         
            <Button
                    bg='#F5F4E4'
                    color={'#454545'}
                    className='btn-upload'
                    size='md'
                    _hover={{ bg: 'rgba(0, 0, 0, 0.53)' }}
                    _active={{ bg: '#298e46' }}
                    type='submit'
                    onClick={fetchSuccesfullProposals}
                  >
                    Get UnSuccesfull Proposals
                  </Button>
          </VStack>
        </Center>
        <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
        {loading ? 
                <Center h={'30vh'} justifyContent={'center'} >
                    <Spinner alignSelf={'center'} thickness='5px'speed='0.5s'emptyColor='gray.200'color='blue.500'size='xl' />
                </Center>
                 :
              <HStack wrap={'wrap'} justifyContent={'flex-start'}>
                {assetsArray ? 
                assetsArray.map(items => {
                        return (
                          <>
                        
                          <ExecutedProposalTile state={false} tokenURI={items.tokenURI} proposalid={items.proposalId.toString()} yesvotes={items.yesvotes.toString()} novotes={items.novotes.toString()} />
                          <div>
                          {/* {items.proposalId.toString()} */}
                          </div>
                          </>
                        )
                })  :
                <Center  h={'50vh'}>
                <div className='message'>No UnSuccesFullProposals... Pretty Strange <Link to='/uploadassets'><ExternalLinkIcon/></Link> </div>
                </Center>
               
            }
              </HStack>
}

        </HStack>

        
        
    


    </Box>
  )
}

export default UnSuccesFullProposals