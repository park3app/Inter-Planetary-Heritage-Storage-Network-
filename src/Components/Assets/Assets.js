import React , {useEffect, useState} from 'react'
import "./Assets.css"
import {ipcsnftAddress , ipcsnftABI} from "../../constant.js"
import { ethers } from 'ethers';
import { Spinner , Button, Center , Box , VStack , Heading , HStack } from '@chakra-ui/react'
import {ExternalLinkIcon} from "@chakra-ui/icons"
import SingleNft from '../SingleNFt/SingleNft';
import { Link } from 'react-router-dom';

const Assets = () => {

    const [assetsArray , setassetsArray] = useState("")
    const [loading , setloading] = useState(false)

    const fetchMyNFTs = async (address_) => {
      setloading(true)
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const park3 = new ethers.Contract(ipcsnftAddress, ipcsnftABI, signer)

      const tx =  await park3.fetchALLNFTs() 
      console.log(tx)
      setassetsArray(tx)
      
      console.log('Reading tc --> ')
     


      console.log('Reading assets array --. ')
      console.log(assetsArray)
      setloading(false)
  
  }


    const handlebtn = async() => {
        const accounts = await window.ethereum.request({
            method: 'eth_accounts'
          });

        const account = accounts[0]
        
        console.log(account)
        await fetchMyNFTs(account)
        
    }

    useEffect(() => {
        handlebtn()
    },[])
    return(
      
    <Box  className='bg-[#0a1930] h-full ' minH={'100vh'}>
        <Center >
        <VStack as='header' spacing='6' mt='8' p={'4'} wrap={'wrap'} justifyContent={'space-evenly'}>
            <Heading
              as='h1'
              fontWeight='700'
              fontSize='2rem'
              color='white'
            >
              See All Assets
            </Heading>
       
         
            <Button
                    bg='#F5F4E4'
                    color='#454545'
                    className='btn-upload'
                    size='md'
                    _hover={{ bg: 'rgba(0, 0, 0, 0.53)' }}
                    _active={{ bg: '#298e46' }}
                    type='submit'
                    onClick={handlebtn}
                  >
                    Get All Assets
                  </Button>
          </VStack>
        </Center>
        <HStack  wrap={'wrap'} justifyContent={'flex-center'}>
        {loading ? 
                <Center h={'30vh'} justifyContent={'center'} >
                    <Spinner alignSelf={'center'} thickness='5px'speed='0.5s'emptyColor='gray.200'color='blue.500'size='xl' />
                </Center>
                 :
              <HStack  wrap={'wrap'} justifyContent={'flex-start'} >
                {assetsArray.length !== 0  ? 
                <div style={{margin:'2rem'}} className="grid sm:grid-cols-2 w-fit md:grid-cols-3 lg:grid-cols-4 mx-auto pb-10 gap-6">
                {assetsArray.map((items) => {
                  return (
                    <>
                      {items.tokenURI && (
                        <div style={{margin:'1rem'}} className="col-span-1 w-72 rounded-3xl border-2 border-sky-800 bg-[#17173d] pt-2.5 shadow-md hover:shadow-lg hover:shadow-black transition ease-in-out delay-150 shadow-black">
                          <SingleNft
                            tokenId={items.tokenId}
                            tokenURI={items.tokenURI}
                            isStateisTrue={items.isStateisTrue}
                            isproposed={items.isproposed}
                          />
                        </div>
                      )}
                    </>
                  );
                })}
              </div>  :
                <Center  h={'50vh'}>
                <div className='message'>No Assets... Pretty Strange <Link to='/uploadassets'><ExternalLinkIcon/></Link> </div>
                </Center>
               
            }
              </HStack>
}

        </HStack>

        
        
    


    </Box>
  )
}

export default Assets



// {loading ? 
//     <Spinner/> :
//     <Box>
//         {
//             assetsArray ? 
       
//        assetsArray.map(nft => {
//             return (
//                 <SingleNft img={nft.tokenURI} name={nft.name} isStateisTrue={nft.isStateisTrue} />
//             )
//         }):
//         <div>Nothing to see mate </div>

//     }