import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { ethers } from 'ethers';
import { ipcsnftAddress, ipcsnftABI } from "../../constant.js"
import { Spinner, Button, Center, Container, Box, VStack, Heading, HStack } from '@chakra-ui/react'
import { ExternalLinkIcon } from "@chakra-ui/icons"
import SingleNft from '../SingleNFt/SingleNft';
import { Link } from 'react-router-dom';

const Assets = () => {

  const [assetsArray, setassetsArray] = useState([])
  const [loading, setloading] = useState(false)


  const fetchMyNFTs = async (address_) => {
    setloading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const park3 = new ethers.Contract(ipcsnftAddress, ipcsnftABI, signer)



    const tx = await park3.fetchMYNFTs(address_)
    console.log(tx)
    setassetsArray(tx)
    console.log('Reading tc --> ')

    console.log('Reading assets array --. ')
    console.log(assetsArray)
    setloading(false)

  }


  const handlebtn = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });

      const account = accounts[0]

      console.log(account)
      await fetchMyNFTs(account)
    } catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {
    handlebtn()
  }, [])
  return (
    <div className='bg-[#0a1930]'>
      <Center>
        <VStack as='header' spacing='6' mt='8'>
          <Heading
            as='h1'
            fontWeight='700'
            fontSize='2rem'
            color='white'
          >
            See Your Assets
          </Heading>


          <Button
            bg='#F5F4E4'
            color='#454545'
            className='btn-upload'
            size='md'
            _hover={{ bg: "#454545" }}
            _active={{ bg: '#298e46' }}
            type='submit'
            onClick={handlebtn}
          >
            Get Your Assets
          </Button>
        </VStack>
      </Center>
      <HStack style={{ margin: '1rem' }} wrap={'wrap'} justifyContent={'flex-start'} >
        {loading ?
          <Center h={'30vh'} justifyContent={'center'} alignItems={'center'} >
            <Spinner justifyContent={'center'} alignItems={'center'} thickness='5px' speed='0.5s' emptyColor='gray.200' color='#454545' size='xl' />
          </Center>
          :
          <HStack wrap={'wrap'} justifyContent={'flex-start'} >
            {assetsArray.length !== 0 ?
              assetsArray.map(items => {
                return (
                  <SingleNft tokenId={items.tokenId} tokenURI={items.tokenURI} isStateisTrue={items.isStateisTrue} isproposed={items.isproposed} />
                )
              }) :
              <Center justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
                <div className='message' style={{color:"#fff"}}>You Don't have any Assets <Link to='/uploadassets'><ExternalLinkIcon /></Link> </div>
              </Center>
            }
          </HStack>
        }
      </HStack>
    </div>
  )
}

export default Assets


