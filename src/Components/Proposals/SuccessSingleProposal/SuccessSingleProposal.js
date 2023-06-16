import React, { useEffect, useState } from 'react'
import { ipcsAddress,ipcsABI } from '../../../constant.js';
import { useParams, Link } from "react-router-dom";
import { Button, Container, HStack , Center , Spinner, VStack , Image, Box, Text , Heading, StepDescription } from '@chakra-ui/react';
import { ethers } from 'ethers';
import screenshot from "../../../screenshot.png"
import {ExternalLinkIcon} from "@chakra-ui/icons"
import lighthouse from '@lighthouse-web3/sdk';


const SuccessSingleProposal = () => {
    const { id } = useParams()
    const [tokenid , settokenid] = useState('')
    const [nftdata , setnftdata] = useState('')
    const [tokenuri, settokenuri] = useState('')
    const [owner,setowner] = useState('');
    const [name , setname ] = useState('')
    const [description  , setdescription] = useState('');
    const [significance , setsignificance ] = useState('');
    const [location , setlocation] = useState('');
    const [image , setimage] = useState('')
    const [loading , setloading ] = useState(false);
    const [progress , setprogress] = useState('')

    const ProposalInfo = async() => {
        setloading(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const ipcs = new ethers.Contract(ipcsAddress, ipcsABI, signer)
    
        const data = await ipcs.getproposalInfobyId(id)
        setnftdata(data)
        settokenuri(data.tokenURI.toString());
        setowner(data.owner);
        settokenid(data.tokenId)
        setloading(false)

     
        // await uploadFile(tokenuri)
          
      }


      const progressCallback = (progressData) => {
        let percentageDone =
          100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        console.log(percentageDone);
        setprogress(percentageDone);
      };
      
      const uploadFile = async (cid) => {
        try {
          if (!cid) {
            console.log("Token URI is undefined");
            return;
          }
          setloading(true);
          console.log("CID:", cid);
          const metadataUrl = `https://ipfs.io/ipfs/${cid}/metadata.json`;
          const response = await fetch(metadataUrl);
          console.log(response);
          const metadata = await response.json();
      
          console.log(metadata);
      
          const dataObject = {
            cid: cid,
            name: metadata.name,
            description: metadata.description,
            significance: metadata.significance,
            location: metadata.location,
            otherNote: metadata.otherNote,
            storeddatahash: "",
            image: metadata.image,
          };
      
          const data = JSON.stringify(dataObject);
          const output = await lighthouse.uploadText(
            data,
            "e9cd2959.f90553b9a66c40468880eebeaebe1a5e",
          );
          console.log("File Status:", output);
          console.log(
            "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
          );
          setloading(false);
        } catch (error) {
          console.log("Error:", error);
        }
      };
      
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
          setimage(metadata.image)
          setloading(false)
        } catch (error) {
          console.error('Error fetching metadata:', error);
        }
      };
      useEffect(() => {
        ProposalInfo();
      }, [id]);


      useEffect(() => {
        if (tokenuri) {
          fetchMetadata(tokenuri);
        }
      }, [tokenuri]);



     

  return(
    <Container maxW={"100vw"}>
    {
      loading ? 
      <Center h={'30vh'} >
      <Spinner thickness='5px'speed='0.5s'emptyColor='gray.200'color='blue.500'size='xl' />
      {/* {loading && <Loading progress={progress} />} */}
  </Center> 
  :

  <div className='asset-details-div'>

  <HStack spacing={8} >
    {/* <Link  to={tokenuri} target='_blank' > */}
    <Image src={image} alt={name}  fallbackSrc={screenshot} maxW={'40%'} />
    {/* </Link> */}
    
      <VStack spacing={6}   align='stretch' marginLeft={'5rem'}>
      <div className='details-div'>
      <Heading as="h3"  m={'1'} size="lg" >
        #{id}<Link style={{marginLeft:'3px'}} target='_blank' to={tokenuri}><ExternalLinkIcon/></Link>
      </Heading>
      <Heading as="h6" m={'1'} size="lg" fontWeight={'1000'} color={'rgba(0, 0, 0, 0.53)'}>
        {name.toUpperCase()}
      </Heading>
      <Text  color={'rgba(0, 0, 0, 0.53)'} fontWeight={'700'} m={'1'} fontSize={'xl'}>{description}</Text>
      <Text  color={'rgba(0, 0, 0, 0.53)'} fontWeight={'700'} m={'1'} fontSize={'md'}>Culutural significance:   {significance}</Text>
      <Text fontSize="2xl" m={'1'} color={'rgba(0, 0, 0, 0.53)'} fontWeight={'600'}>{`${location.charAt(0).toUpperCase()}${location.slice(1)}`}</Text>
      <Text fontSize="md" color={'rgba(0, 0, 0, 0.53)'} fontWeight={'400'} m={'1'}>{owner}</Text>
      </div>

     <HStack>

<Button colorScheme={'green'} onClick={() =>  uploadFile(tokenuri)}>Upload Data</Button>
     </HStack>
     
    
    </VStack>
  </HStack>
  </div>

    }

  </Container>
  )
}

export default SuccessSingleProposal


