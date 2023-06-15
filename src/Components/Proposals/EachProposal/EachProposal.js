import React, { useEffect, useState } from 'react'
import { ipcsAddress,ipcsABI } from '../../../constant.js';
import { useParams, Link } from "react-router-dom";
import { Button, Container, HStack , Center , Spinner, VStack , Image, Box, Text , Heading, StepDescription } from '@chakra-ui/react';
import { ethers } from 'ethers';
import screenshot from "../../../screenshot.png"
import {ExternalLinkIcon} from "@chakra-ui/icons"
import lighthouse from '@lighthouse-web3/sdk';




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
    const [progress , setprogress] = useState('0')

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
        setloading(false)
      }

      const progressCallback = (progressData) => {
        let percentageDone =
          100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        console.log(percentageDone);
        setprogress(percentageDone);
      };
      
      const uploadFile = async(cid) => {
        try {
          setloading(true);
          console.log("CID:", cid);
          const response = await fetch(`https://ipfs.io/ipfs/${cid}/metadata.json`);
          console.log(response)
          const metadata = await response.json();

          const dataObject = {
            cid : cid,
            name : metadata.name,
            description : metadata.description,
            significance : metadata.significance,
            location : metadata.location,
            otherNote : metadata.otherNote,
            storeddatahash : ""
          }

          const data = JSON.stringify(dataObject);
          const output = await lighthouse.uploadText(data, "f5d8c9db.d5db2e0370a9429b9321faef8a749cdc", progressCallback);
          console.log("File Status:", output);
          console.log("Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash);
          setloading(false);
        } catch (error) {
          console.log("Error:", error);
        }
      };

      const handleUpload = async() =>{
          try{
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const ipcs = new ethers.Contract(ipcsAddress, ipcsABI, signer)
            alert(3)
            const tx = await ipcs.getproposalInfobyId(id);
            const state = await tx.isStateisTrue;
            const tokenURI = await  tx.tokenURI;

            if(state === true){
              await uploadFile(tokenURI);
              alert('File Uploaded to the Storage Succefully')
            }else{
              alert('Proposal Result to Unsuccefull.')
            }}catch(error){
            alert('Some Error While Interacting with LightHouse APIs...')
          }
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
    
            const tx = await ipcs.executeProposal(id);
            console.log('yes votes tx -->');
            console.log(tx)

            await handleUpload()
        }catch(error){
            alert('Deadline not passed  passed or Proposal is already Executed')
            console.log(error)
        }
      }
      

  return(
    <Container maxW={"100vw"}>
    {
      loading ? 
      <Center h={'30vh'} >
      <Spinner thickness='5px'speed='0.5s'emptyColor='gray.200'color='blue.500'size='xl' />
      {loading && <Loading progress={progress} />}
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
        {executed ? <Text fontSize="2xl" m={'1'} color={'rgba(0, 0, 0, 0.53)'} fontWeight={'600'}></Text> :  <Button onClick={handleYESVote} colorScheme='green'>Vote Yes</Button>}
       {executed ? <Text fontSize="2xl" m={'1'} color={'rgba(0, 0, 0, 0.53)'} fontWeight={'600'}></Text> :   <Button onClick={handleNoVote} colorScheme='red'>Vote No</Button>}
        {executed ? <Text fontSize="2xl" m={'1'} color={'rgba(0, 0, 0, 0.53)'} fontWeight={'600'}>Proposal Executed</Text> :  <Button onClick={handleExecute} colorScheme='purple'>Execute Proposal</Button> }
     </HStack>

     <button onClick={() => uploadFile("bafyreiag5yatteawckhtka65jya24ikwiqwrmwuktmsmrrhk4mlb6tenwy")}>Store Data to LightHouse</button>
    
    </VStack>
  </HStack>
  </div>

    }

  </Container>
  )
}

export default EachProposal



const Loading = ({ progress }) => {
  if (progress === 100) {
    return <div>Upload completed</div>;
  }

  return (
    <div className="loading">
      <div
        className="bar"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
  );
};