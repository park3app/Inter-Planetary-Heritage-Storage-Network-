import React, { useState , useRef , useEffect } from 'react';
import { NFTStorage, File } from 'nft.storage'
import { ethers } from 'ethers';
import {abi , address} from "../../constant.js"
import "./UploadAssets.css"
import { useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from '@chakra-ui/react';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Center,
  HStack,
  Stack,
  VStack,
  Heading,
  Card,
  CardBody,
  GithubLogo,
  Text,
  Link
} from '@chakra-ui/react'
import { Box, Input } from '@chakra-ui/react';


const UploadAssets = () => {

  // definign all states 
    const [name , setname] = useState("");
    const [description , setdescription] = useState("");
    const [costtobuild ,setcosttobuild] = useState("");
    const [insurance , setinsurance] = useState("");
    const [location , setlocation] = useState("")
    const [url , seturl] = useState('')
    const [isuploaded,setuploaded] = useState(false)



  // defining  useRef for all inputes
  const fileRef = useRef(null)

   //load blockchain data funtion
  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const park3 = new ethers.Contract(address, abi, signer)

    console.log(park3)
  }

  // upload image function
  const uploadImage = async (imageData) => {

    const nftstorage = new NFTStorage({ token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZhRTg0MTllNTkyOThBYzc4NGU0QTlkQkUxNzRjMzBCZkY1RDllRjAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NTY5MzYwMjI1MSwibmFtZSI6IlBBUkszIn0.B8vY3MT9t6MH1hU6mujP6Q7FKVGtdNsLj7WbDXFX8Dk` })

    // Send request to store image
    const { ipnft } = await nftstorage.store({
      image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
      name: name,
      description: description,
      costtobuild:costtobuild,
      insurance:insurance,
      location:location
    })
    // Save the URL
    const NFturl = `https://ipfs.io/ipfs/${ipnft}/metadata.json`
    seturl(NFturl)
    console.log('Url of Imageis this -> ' , url)
    return url
  }

  const mintnfthandler = async() => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(address, abi, signer)
    // let listingPrice = await contract.getListPrice()
    // listingPrice = listingPrice.toString()
    const gasLimit = 2000000;
    let transaction = await contract.createToken(url, ethers.utils.parseUnits(costtobuild,'ether'),ethers.utils.parseUnits(insurance,'ether') ,location , false,description , "Parks", name)
    await transaction.wait()
    alert("Successfully listed your NFT!");
    setuploaded(true);

  }

  // handle upload Function
  const handleUpload = async(event) => {
    event.preventDefault();

    const files = fileRef.current.files[0];
    console.log(files)

    console.log(name,description,location,costtobuild,insurance,fileRef)
    uploadImage(files)
    mintnfthandler()
  }

  // useEffect
  useEffect(() => {
    loadBlockchainData()
  }, [])



  return (
    <div className="uploadassets">
 
      <Box>
      <Center>
        <Stack spacing='4'>
          <VStack as='header' spacing='6' mt='8'>
            <Heading
              as='h1'
              fontWeight='600'
              fontSize='1.8rem'
              letterSpacing='-0.5px'
              color='rgba(0, 0, 0, 0.53)'
            >
              Upload Assets
            </Heading>
          </VStack>
          <Card bg='#F5F4E4' variant='outline' borderColor='#d8dee4' w='308px'>
            <CardBody>
              <form onSubmit={handleUpload} >
                <Stack spacing='4'>
                  <FormControl>
                    <FormLabel size='sm'>Name of The Asset</FormLabel>
                    <Input
                      type='text'
                      onChange={(event) => setname(event.target.value)}
                      placeholder='Name of Asset...'
                      bg='white'
                      borderColor='#d8dee4'
                      size='sm'
                      borderRadius='6px'
                      required
                    />
                  </FormControl>
                  <FormControl>
                      <FormLabel size='sm'>Description</FormLabel>
                    <Input
                      type='text'
                      bg='white'
                      onChange={(event) => setdescription(event.target.value)}
                      placeholder='A Little Description...'
                      borderColor='#d8dee4'
                      size='sm'
                      borderRadius='6px'
                      required
                    />
                  </FormControl>
                  <FormControl>
                      <FormLabel size='sm'>Cost To Build ($)</FormLabel>
                    <Input
                      type='number'
                      bg='white'
                      onChange={(event) => setcosttobuild(event.target.value)}
                      placeholder='Cost to build it...'
                      borderColor='#d8dee4'
                      size='sm'
                      required
                      borderRadius='6px'
                    />
                  </FormControl>
                  <FormControl>
                      <FormLabel size='sm'>Insurance Coverage($)</FormLabel>
                    <Input
                      type='number'
                      bg='white'
                      onChange={(event) => setinsurance(event.target.value)}
                      placeholder='Insurance Coverage...'
                      borderColor='#d8dee4'
                      size='sm'
                      required
                      borderRadius='6px'
                    />
                  </FormControl>
                  <FormControl>
                      <FormLabel size='sm'>Location</FormLabel>
                    <Input
                      type='text'
                      bg='white'
                      placeholder='location....'
                      onChange={(event) => setlocation(event.target.value)}
                      borderColor='#d8dee4'
                      size='sm'
                      borderRadius='6px'
                      required
                    />
                  </FormControl>

                  <FormControl>
                  <Input
              required
              type={'file'}
              accept="image/*,video/*"
              multiple
              ref={fileRef}
              css={{
                '&::file-selector-button': {
                  border: 'none',
                  borderColor:'#d8dee4',
                  width: 'calc(100% + 36px)',
                  height: '100%',
                  color: 'rgba(0, 0, 0, 0.53)',
                  backgroundColor: '#F5F4E4',
                  cursor: 'pointer',
                  fontSize:'1rem',
                  fontWeight:'700'
                },
              }}
            />
                  </FormControl>

                  <Button
                    bg='#F5F4E4'
                    color='rgba(0, 0, 0, 0.53)'
                    className='btn-upload'
                    size='md'
                    _hover={{ bg: 'rgba(0, 0, 0, 0.53)' }}
                    _active={{ bg: '#298e46' }}
                    type='submit'
                    // onClick={handleUpload}
                  >
                    Upload
                  </Button>
                </Stack>
              </form>
            </CardBody>
          </Card>

         
        </Stack>
      </Center>
      
    </Box>
    </div>
  );

  }
export default UploadAssets;
