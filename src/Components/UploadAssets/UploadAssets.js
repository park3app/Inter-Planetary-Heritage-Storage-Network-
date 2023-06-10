import React, { useState , useRef , useEffect } from 'react';
import { NFTStorage, File } from 'nft.storage'
import {ipcsnftAddress , ipcsnftABI} from "../../constant.js"
import { ethers } from 'ethers';
import "./UploadAssets.css"
import {
  FormControl,
  FormLabel,
  Center,
  Stack,
  VStack,
  Heading,
  Card,
  CardBody,
  Button
} from '@chakra-ui/react'
import { Box, Input } from '@chakra-ui/react';

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";


const UploadAssets = () => {

  // definign all states 
    const [name , setname] = useState("");
    const [description , setdescription] = useState("");
    const [significance , setsignificance] = useState("")
    const [note,setnote] = useState("")
    const [location , setlocation] = useState("")
    const [url , seturl] = useState('')
    const [isuploaded,setuploaded] = useState(false)



  // defining  useRef for all inputes
  const fileRef = useRef(null)

 

  // upload image function
  const uploadImage = async (imageData) => {

    const nftstorage = new NFTStorage({ token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAzM2Y5Mzc1ZEQ5ODY1YzhmN2FiODVENGRiRTM3NDhERWI4NTljRkYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NTc3MTE1MDk5NiwibmFtZSI6IlBBUkszIn0.eHLoAl-RBIxAqXmHm_KTQ553Ha-_18sZrnoxuXpGxMI` })

    // Send request to store image
    const { ipnft } = await nftstorage.store({
      image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
      name: name,
      description: description,
      significance:significance,
      otherNote:note,
      location:location,
      storeddatahash: "",
    })
    // Save the URL
    const NFturl = `https://ipfs.io/ipfs/${ipnft}/metadata.json`
    seturl(NFturl)
    return NFturl
  }

  const mintnfthandler = async(tokenuri) => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(ipcsnftAddress, ipcsnftABI, signer)
    let listingPrice = await contract.getListPrice()
    listingPrice = listingPrice.toString()

    let transaction = await contract.createToken(tokenuri,false,false, {value:listingPrice} )
    await transaction.wait()
    alert("Successfully listed your NFT!");
    setuploaded(true);

  }

  // handle upload Function
  const handleUpload = async(event) => {
    event.preventDefault();

    const files = fileRef.current.files[0];
    console.log(files)

    console.log(name,description,location,significance , note, fileRef)
    
    

    const nfturl = await  uploadImage(files)
    console.log(nfturl)
    await mintnfthandler(nfturl)
  }




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
                      placeholder='Taj Mahal....'
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
                      placeholder='A Little Description... About it '
                      borderColor='#d8dee4'
                      size='sm'
                      borderRadius='6px'
                      required
                    />
                  </FormControl>
                  <FormControl>
                      <FormLabel size='sm'>Location</FormLabel>
                    <Input
                      type='text'
                      bg='white'
                      onChange={(event) => setlocation(event.target.value)}
                      placeholder='Where it is located...'
                      borderColor='#d8dee4'
                      size='sm'
                      required
                      borderRadius='6px'
                    />
                  </FormControl>
                  <FormControl>
                      <FormLabel size='sm'>Cultural Significance</FormLabel>
                    <Input
                      type='text'
                      bg='white'
                      onChange={(event) => setsignificance(event.target.value)}
                      placeholder='Insurance Coverage...'
                      borderColor='#d8dee4'
                      size='sm'
                      required
                      borderRadius='6px'
                    />
                  </FormControl>
                  <FormControl>
                      <FormLabel size='sm'>Any Other Note...</FormLabel>
                    <Input
                      type='text'
                      bg='white'
                      placeholder='If you want to specify more...'
                      onChange={(event) => setnote(event.target.value)}
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





