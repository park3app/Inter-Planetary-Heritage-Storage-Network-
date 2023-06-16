import React, { useEffect, useState } from 'react'
import { ipcsAddress, ipcsABI } from '../../constant';
import { ipcsnftAddress, ipcsnftABI } from '../../constant';
import { useParams, Link } from "react-router-dom";
import { Button, Container, HStack, Center, Spinner, VStack, Image, Box, Text, Heading, Alert } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { ExternalLinkIcon } from "@chakra-ui/icons"
import "./eachasset.css";
import screenshot from "../../screenshot.png"
import lighthouse from '@lighthouse-web3/sdk';

const EachAsset = () => {
  const { id } = useParams()
  const [nftdata, setnftdata] = useState('')
  const [tokenuri, settokenuri] = useState('')
  const [owner, setowner] = useState('');
  const [isstatetrue, setstate] = useState('')
  const [isproposed, setisproposed] = useState(false)
  const [name, setname] = useState('')
  const [description, setdescription] = useState('');
  const [significance, setsignificance] = useState('');
  const [note, setnote] = useState('');
  const [location, setlocation] = useState('');
  const [image, setimage] = useState('')
  const [loading, setloading] = useState(false)
  const [showMetamaskAlert, setShowMetamaskAlert] = useState(false)
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')


  // calls the createProposal Function 
  const handleCreateProposal = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const ipcs = new ethers.Contract(ipcsAddress, ipcsABI, signer)
      const tx = await ipcs.createProposal(id)
      console.log(tx)
      setStatus('Asset Proposed Successfully')
      setType('success')
      setShowMetamaskAlert(true)

      setTimeout(() => {
        setStatus('')
        setType('')
        setShowMetamaskAlert(false)
      }, 5000);
    } catch (error) {
      console.log(error)
      setStatus('user rejected transaction')
      setType('error')
      setShowMetamaskAlert(true)

      setTimeout(() => {
        setStatus('')
        setType('')
        setShowMetamaskAlert(false)
      }, 5000);


    }

  }

  // function for getting the info for each NFT with tokenid
  const getNftInfo = async () => {
    // alert(tokenuri)
    setloading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const ipcsnft = new ethers.Contract(ipcsnftAddress, ipcsnftABI, signer)

    const data = await ipcsnft.getNFTInfobyId(id)
    setnftdata(data)
    settokenuri(data.tokenURI);
    setowner(data.owner);
    setstate(data._isStateisTrue);

    setisproposed(data.isproposed)
    setloading(false)
  }

  const fetchMetadata = async (tokenURI) => {
    try {
      setloading(true)
      const response = await fetch(`https://ipfs.io/ipfs/${tokenURI}/metadata.json`);
      const metadata = await response.json();
      const metadataName = metadata.name;
      setname(metadataName)
      setdescription(metadata.description)
      setsignificance(metadata.significance);
      setlocation(metadata.location);
      setnote(metadata.otherNote);
      setimage(metadata.image)
      setloading(false)
      let tokenImagex = metadata.image;
      setimage(tokenImagex);

    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  };


  useEffect(() => {
    getNftInfo();
  }, [id]);

  useEffect(() => {
    if (tokenuri) {
      fetchMetadata(tokenuri);
    }
  }, [tokenuri]);



  return (
    <Container maxW={"100vw"} bgColor={'hsl(0, 0%, 90%)'} bg={'hsl(0, 0%, 90%)'}>
      {showMetamaskAlert && <Alert status={type} className='rounded-xl mb-3'>{status}</Alert>}
      {
        loading ?
          <Center h={'30vh'} >
            <Spinner thickness='5px' speed='0.5s' emptyColor='#454545' color='#454545' size='xl' />
          </Center>
          :
          <div className='asset-details-div' borderColor={'#CCEABB'} >
            <HStack spacing={8} borderColor={'#CCEABB'}   >

              <Image borderColor={'#CCEABB'} borderRadius={'10px'} src={`${image.replace('ipfs://', 'https://nftstorage.link/ipfs/')}`} alt={name} maxW={'40%'} />

              <VStack spacing={6} align='stretch' marginLeft={'5rem'}>
                <div className='details-div'>
                  <Heading as="h3" m={'1'} size="lg" color={'#454545'}>
                    #{id}  <Link target='_blank' style={{ marginLeft: '3px' }} to={`https://ipfs.io/ipfs/${tokenuri}/metadata.json`}><ExternalLinkIcon fontWeight={'1000'} fontSize={'2rem'} color={"#CCEABB"} /></Link>
                  </Heading>
                  <Heading as="h6" m={'1'} size="md" color={'#454545'}>
                    <Text style={{ display: 'inline', color: 'rgba(0, 0, 0, 0.53)', fontWeight: '1000' }}>Name:  </Text> {name}
                  </Heading>
                  <Text color={'#454545'} fontWeight={'700'} m={'1'} fontSize={'xl'}> <Text style={{ display: 'inline', color: 'rgba(0, 0, 0, 0.53)', fontWeight: '1000' }}>Description:  </Text>{description}</Text>
                  <Text color={'#454545'} fontWeight={'700'} m={'1'} fontSize={'xl'}><Text style={{ display: 'inline', color: 'rgba(0, 0, 0, 0.53)', fontWeight: '1000' }}>Significance: </Text>  {significance}</Text>
                  <Text fontSize="xl" m={'1'} color={'rgba(0, 0, 0, 0.53)'} fontWeight={'600'}><Text style={{ display: 'inline', color: 'rgba(0, 0, 0, 0.53)', fontWeight: '1000' }}>Location:   </Text>{`${location.charAt(0).toUpperCase()}${location.slice(1)}`}</Text>
                  <Text fontSize="md" color={'rgba(0, 0, 0, 0.53)'} fontWeight={'400'} m={'1'}>{owner}</Text>
                  <Text noOfLines={1}> {isstatetrue ? <Text p={'4px'} fontWeight={'700'} color={'green'} fontSize={'xl'}>State is True</Text> : <Text color={"red"} p={'4px'} fontWeight={'600'} fontSize={'xl'} size='lg'>State is False</Text>}</Text>
                </div>
                <HStack>
                  {isproposed ? <Text color={"#1F4068"} p={'4px'} fontWeight={'600'} fontSize='2xl' >Already Proposed</Text> : <Button onClick={handleCreateProposal} size='lg' colorScheme='green' borderRadius={'4px'} fontWeight={'700'} >Propose</Button>}
                </HStack>
               
              </VStack>


            </HStack>
          </div>

      }

    </Container>
  )
}

export default EachAsset