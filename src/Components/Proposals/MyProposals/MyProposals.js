import React , {useEffect, useState} from 'react'
import { ipcsAddress,ipcsABI } from '../../../constant';
import { Button , Box, Center , Heading, VStack , HStack ,Spinner } from '@chakra-ui/react';
import {ExternalLinkIcon} from "@chakra-ui/icons"
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import ProposalTile from '../ProposalTile/ProposalTile';

const MyProposals = () => {
  const [assetsArray , setassetsArray] = useState([])
  const [loading , setloading] = useState(false)
  
  const fetchMYProposals = async() => {
    setloading(true)
    const accounts = await window.ethereum.request({
      method: 'eth_accounts'
    });

  const account = accounts[0]

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const ipcs = new ethers.Contract(ipcsAddress, ipcsABI, signer)

    const tx = await ipcs.fetchMYProposals(account)
    const proposalsArray = Object.values(tx); 
    console.log(tx)
    setassetsArray(proposalsArray)
    console.log('Reading tx--> ')
    console.log(tx)
    console.log(assetsArray)
    setloading(false)
  }


  useEffect(() => {
    fetchMYProposals()
  },[])

  
  const handlebtn = async() => {
    const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });

    const account = accounts[0]
    
    console.log(account)
    await fetchMYProposals(account)
    
}


  return (
    <div className='bg-[#0a1930] h-full' style={{minHeight:'100vh'}} >
        <Center justifyContent={'center'}>
        <VStack as='header' spacing='6' mt='8' wrap={'wrap'} justifyContent={'space-evenly'} p={'2'}>
            <Heading
              as='h1'
              fontWeight='700'
              fontSize='2rem'
              color={"white"}
            >
              My Proposals
            </Heading>
       
         
            <Button
                    bg='#F5F4E4'
                    color={"#454545"}
                    className='btn-upload'
                    size='md'
                    _hover={{ bg: 'rgba(0, 0, 0, 0.53)' }}
                    _active={{ bg: '#298e46' }}
                    type='submit'
                    onClick={handlebtn}
                  >
                    Get My Proposals
                  </Button>
          </VStack>
        </Center>
        <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
        {loading ? 
                <Center h={'30vh'} justifyContent={'center'} >
                    <Spinner alignSelf={'center'} thickness='5px'speed='0.5s'emptyColor='gray.200'color='blue.500'size='xl' />
                </Center>
                 :
              <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                {assetsArray.length !== 0 ? 
                <div className="grid sm:grid-cols-2 w-fit md:grid-cols-3 lg:grid-cols-4 mx-auto pb-10 gap-6">
                {assetsArray.map((items) => {
                  return (
                    <>
                      {items.tokenURI && (
                        <div className="col-span-1 w-72 rounded-3xl border-2 border-sky-800 bg-[#17173d] pt-2.5 shadow-md hover:shadow-lg hover:shadow-black transition ease-in-out delay-150 shadow-black">
                          <ProposalTile tokenURI={items.tokenURI} proposalid={items.proposalId.toString()} yesvotes={items.yesvotes.toString()} novotes={items.novotes.toString()} />
                        </div>
                      )}
                      <div style={{ color: '#fff' }}>
                      </div>
                    </>
                  );
                })}
              </div>
                :
                <Center  h={'50vh'}>
                <div className='message text-white'>No Assets... Pretty Strange <Link to='/uploadassets'><ExternalLinkIcon/></Link> </div>
                </Center>
               
            }
              </HStack>
}

        </HStack>

    </div>
  )
}

export default MyProposals


