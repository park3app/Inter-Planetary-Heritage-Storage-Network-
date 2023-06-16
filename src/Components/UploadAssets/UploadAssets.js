import React, { useState, useRef } from 'react';
import { NFTStorage, File } from 'nft.storage'
import { ipcsnftAddress, ipcsnftABI } from "../../constant.js"
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
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'


const UploadAssets = () => {

  // definign all states 
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [significance, setsignificance] = useState("")
  const [note, setnote] = useState("")
  const [location, setlocation] = useState("")
  const [url, seturl] = useState('')
  const [isuploaded, setuploaded] = useState();
  const [loading, setloading] = useState(false)
  const [showUploadAlert, setShowUploadAlert] = useState(false);
  const [showMintAlert, setShowMintAlert] = useState(false);
  const [showMetamaskAlert, setShowMetamaskAlert] = useState(false);
  const [status,setstatus] = useState('')
  // defining  useRef for all inputes
  const fileRef = useRef(null)



  // upload image function
  const uploadImage = async (imageData) => {
    setloading(true)
    const nftstorage = new NFTStorage({ token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAzM2Y5Mzc1ZEQ5ODY1YzhmN2FiODVENGRiRTM3NDhERWI4NTljRkYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NTc3MTE1MDk5NiwibmFtZSI6IlBBUkszIn0.eHLoAl-RBIxAqXmHm_KTQ553Ha-_18sZrnoxuXpGxMI` })

    // Send request to store image
    const { ipnft } = await nftstorage.store({
      assets: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
      name: name,
      description: description,
      significance: significance,
      otherNote: note,
      location: location,
      storeddatahash: "",
    })

    // Save the URL
    // const NFturl = `https://ipfs.io/ipfs/${ipnft}/metadata.json`
    seturl(ipnft)
    setuploaded(true);
    setloading(false);
    setShowUploadAlert(true); // Set showUploadAlert to true after uploadImage function is completed
    setTimeout(() => {
      setShowUploadAlert(false); // Set showUploadAlert back to false after 5 seconds
    }, 5000);
    return ipnft

  }

  const mintnfthandler = async (tokenuri) => {
    try {
      setloading(true)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      let contract = new ethers.Contract(ipcsnftAddress, ipcsnftABI, signer)
      let listingPrice = await contract.getListPrice()
      listingPrice = listingPrice.toString()

      let transaction = await contract.createToken(tokenuri, false, false, { value: listingPrice })
      await transaction.wait()
      alert("Successfully listed your NFT!");
      setuploaded(true);
      setloading(false)
      setShowMintAlert(true); // Set showMintAlert to true after mintnfthandler function is completed
      setTimeout(() => {
        setShowMintAlert(false); // Set showMintAlert back to false after 5 seconds
      }, 5000);
    } catch (error) {
        if (error.code === 4001) {
          // Display an alert or error message for the 4001 error
            console.error("User cancelled the transaction.");
            setstatus("User cancelled the transaction.")
          setShowMetamaskAlert(true)
        } else {
          // Display a generic error message for other types of errors
            console.error("Some Error Occurred. Please Try Again Later...");
            setstatus("User cancelled the transaction.")
            setShowMetamaskAlert(true)
        }
        setTimeout(() => {
          setstatus("")
        setShowMetamaskAlert(false)
        }, 5000);
    }

  }

  // handle upload Function
  const handleUpload = async (event) => {
    try {
      event.preventDefault();
      const files = fileRef.current.files[0];
      console.log(files);
      console.log(name, description, location, significance, note, fileRef);
  
      const nfturl = await uploadImage(files);
      console.log(nfturl);
      await mintnfthandler(nfturl);
    } catch (error) {
      console.error(error); // Print the error on the console
  
      if (error.code === 4001) {

        // Display an alert or error message for the 4001 error
          console.error("User cancelled the transaction.");
          setstatus("User cancelled the transaction.")
          setShowMetamaskAlert(true)
      } else {
        // Display a generic error message for other types of errors
        setTimeout(() => {
          console.error("Some Error Occurred. Please Try Again Later...");
          setstatus("User cancelled the transaction.")
          setShowMetamaskAlert(true)
        }, 5000);
      }
    }
  };




  return (
    <div className="uploadassets">
      {showUploadAlert && (
        <Alert status='success' transition={'ease-in-out'}>
          <AlertIcon />
          Data Uploaded to IPFS. Now Minting the NFT...
        </Alert>
      )}
      {showMintAlert && (
        <Alert status='success'>
          <AlertIcon />
          NFT Minted Successfully
        </Alert>
      )}
      {showMetamaskAlert&&
        <Alert status='error'>{status}</Alert>
      }
      <Box>
        <Center>
          <VStack spacing='4'>
            <VStack as='header' spacing='6' mt='8'>
              <Heading
                as='h1'
                fontWeight='600'
                fontSize='2rem'
                letterSpacing='-0.5px'
                color='#393646'
              >
                Upload Assets
              </Heading>
            </VStack>
            <Card bg='#454545' variant='outline' borderColor='#d8dee4' w='308px'>
              <CardBody>
                <form onSubmit={handleUpload} >
                  <VStack spacing='4'>
                    <FormControl>
                      <FormLabel size='sm' color={'#fff'}>Name of The Asset</FormLabel>
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
                      <FormLabel size='sm' color={'#fff'}>Description</FormLabel>
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
                      <FormLabel size='sm' color={'#fff'}>Location</FormLabel>
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
                      <FormLabel size='sm' color={'#fff'}>Cultural Significance</FormLabel>
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
                      <FormLabel size='sm' color={'#fff'}>Any Other Note...</FormLabel>
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
                            width: 'calc(100% + 36px)',
                            height: '100%',
                            color: 'rgba(0, 0, 0, 0.53)',
                            backgroundColor: '#F5F4E4',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '700'
                          },
                        }}
                      />
                    </FormControl>

                    <Button
                      bg='#F5F4E4'
                      color='#454545'
                      className='btn-upload'
                      size='md'
                      _hover={{ bg: '#454545', border: '2px solid #fff' }}
                      _active={{ bg: '#298e46' }}
                      type='submit'
                      onClick={handleUpload}
                    >
                      Upload
                    </Button>
                    
                  </VStack>
                </form>
                
              </CardBody>
            </Card>
          </VStack>
        </Center>
      </Box>
    </div>
  );

}
export default UploadAssets;




