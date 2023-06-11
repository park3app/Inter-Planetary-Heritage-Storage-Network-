import React, { useEffect, useState } from 'react'
import { ipcsAddress,ipcsABI } from '../../../constant.js';
import { useParams, Link } from "react-router-dom";
import { Button, Container, HStack , Center , Spinner, VStack , Image, Box, Text , Heading } from '@chakra-ui/react';
import { ethers } from 'ethers';
import screenshot from "../../../screenshot.png"
import {ExternalLinkIcon} from "@chakra-ui/icons"



const EachProposal = () => {
    const { id } = useParams()
    const [tokenid , settokenid] = useState('')
    const [nftdata , setnftdata] = useState('')
    const [tokenuri, settokenuri] = useState('')
    const [owner,setowner] = useState('');
    const [name , setname ] = useState('')
    const [description  , setdescription] = useState('');
    const [significance , setsignificance ] = useState('');
    const [note , setnote] = useState('');
    const [location , setlocation] = useState('');
    const [image , setimage] = useState('')
    const [loading , setloading ] = useState(false)
    const [novotes , ssetnovotes]  = useState('');
    const [yesvotes , setyesvotes] = useState('');
    const [executed,setisexecuted] = useState(false)

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
        setyesvotes(data.yesvotes)
        ssetnovotes(data.novotes)
        setisexecuted(data.executed)
        
        // setstate(data._isStateisTrue);
    
        // setisproposed(data.isproposed)
        setloading(false)
      }

      const fetchMetadata = async (tokenURI) => {
        try {
          setloading(true)
          const response = await fetch(tokenURI);
          const metadata = await response.json();
          const metadataName = metadata.name;
          setname(metadataName)
          setdescription(metadata.description)
          setsignificance(metadata.significance);
          setlocation(metadata.location);
          setnote(metadata.otherNote);
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


      // handleYESVote
      const handleYESVote = async() =>{
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const ipcs = new ethers.Contract(ipcsAddress, ipcsABI, signer)
    
            const tx = await ipcs.voteonProposal(id ,true);
            console.log('yes votes tx -->');
            console.log(tx)
        }catch(error){
            console.log(error)
            alert("You have already Voted")
        }
    
    
      }

      // handleNoVote
      const handleNoVote =  async() =>{
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const ipcs = new ethers.Contract(ipcsAddress, ipcsABI, signer)
    
            const tx = await ipcs.voteonProposal(id ,false);
            console.log('yes votes tx -->');
            console.log(tx)
        }catch(error){
            console.log(error)
            alert("You have already Voted")
        }
      }

      //handleexecute
      const handleExecute = async() =>{
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const ipcs = new ethers.Contract(ipcsAddress, ipcsABI, signer)
    
            const tx = await ipcs.executeProposal();
            console.log('yes votes tx -->');
            console.log(tx)
        }catch(error){
            alert('Deadline not passed  passed or Proposal is already Executed')
        }
      }
      

  return(
    <Container maxW={"100vw"}>
    {
      loading ? 
      <Center h={'30vh'} >
      <Spinner thickness='5px'speed='0.5s'emptyColor='gray.200'color='blue.500'size='xl' />
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
        {executed ? <Text fontSize="2xl" m={'1'} color={'rgba(0, 0, 0, 0.53)'} fontWeight={'600'}>Proposal Executed</Text> :  <Button onClick={handleYESVote} colorScheme='green'>Vote Yes</Button>}
       {executed ? <Text fontSize="2xl" m={'1'} color={'rgba(0, 0, 0, 0.53)'} fontWeight={'600'}>Proposal Executed</Text> :   <Button onClick={handleNoVote} colorScheme='red'>Vote No</Button>}
        {executed ? <Text fontSize="2xl" m={'1'} color={'rgba(0, 0, 0, 0.53)'} fontWeight={'600'}>Proposal Executed</Text> :  <Button onClick={handleExecute} colorScheme='purple'>Execute Proposal</Button> }
     </HStack>
    </VStack>
  </HStack>
  </div>

    }

  </Container>
  )
}

export default EachProposal