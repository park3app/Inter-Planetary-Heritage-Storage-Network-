import React, { useEffect, useState } from 'react'
import { ipcsAddress, ipcsABI } from '../../../constant.js';
import { useParams, Link } from "react-router-dom";
import { Button, Container, HStack, Center, Spinner, VStack, Image, Box, Text, Heading, StepDescription, Alert } from '@chakra-ui/react';
import { ethers } from 'ethers';
import screenshot from "../../../screenshot.png"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import lighthouse from '@lighthouse-web3/sdk';


const EachProposal = () => {
  const { id } = useParams()
  const [tokenid, settokenid] = useState('')
  const [nftdata, setnftdata] = useState('')
  const [tokenuri, settokenuri] = useState('')
  const [owner, setowner] = useState('');
  const [name, setname] = useState('')
  const [description, setdescription] = useState('');
  const [significance, setsignificance] = useState('');
  const [note, setnote] = useState('');
  const [location, setlocation] = useState('');
  const [image, setimage] = useState('')
  const [loading, setloading] = useState(false)
  const [novotes, ssetnovotes] = useState('');
  const [yesvotes, setyesvotes] = useState('');
  const [executed, setisexecuted] = useState(false)
  const [progress, setprogress] = useState('0')
  const [showMintAlert, setShowMintAlert] = useState(false);
  const [showMetamaskAlert, setShowMetamaskAlert] = useState(false);
  const [status, setstatus] = useState('')
  const [type, settype] = useState('')


  const ProposalInfo = async () => {
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
  

  const handleUpload = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const ipcs = new ethers.Contract(ipcsAddress, ipcsABI, signer)
      alert(3)
      const tx = await ipcs.getproposalInfobyId(id);
      const state = await tx.isStateisTrue;
      const tokenURI = await tx.tokenURI;

      // set a timeout here like 10 seconds 

      if (state === true) {
        // alert message will come here , that proposal is sucess
      } else {
         // alert message will come here , that proposal is unsucess
      }
    } catch (error) {
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
  const handleYESVote = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const ipcs = new ethers.Contract(ipcsAddress, ipcsABI, signer)

      const tx = await ipcs.voteonProposal(id, true);
      console.log('yes votes tx -->');
      console.log(tx)
      settype('success')
      setstatus('Successfuly voted')
      setShowMetamaskAlert(true)
      setTimeout(() => {
        settype('')
        setstatus('')
        setShowMetamaskAlert(false)
      }, 5000);
    } catch (error) {
      console.log(error)
      settype('error')
      setstatus('You are already voted')
      setShowMetamaskAlert(true)
      setTimeout(() => {
        settype('')
        setstatus('')
        setShowMetamaskAlert(false)
      }, 5000);
    }
  }

  // handleNoVote
  const handleNoVote = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const ipcs = new ethers.Contract(ipcsAddress, ipcsABI, signer)

      const tx = await ipcs.voteonProposal(id, false);
      console.log('yes votes tx -->');
      console.log(tx)
      settype('success')
      setstatus('Successfuly voted')
      setShowMetamaskAlert(true)
      setTimeout(() => {
        settype('')
        setstatus('')
        setShowMetamaskAlert(false)
      }, 5000);
    } catch (error) {
      console.log(error)
      settype('error')
      setstatus('You are already voted')
      setShowMetamaskAlert(true)
      setTimeout(() => {
        settype('')
        setstatus('')
        setShowMetamaskAlert(false)
      }, 5000);
    }
  }

  //handleexecute
  const handleExecute = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const ipcs = new ethers.Contract(ipcsAddress, ipcsABI, signer)

      const tx = await ipcs.executeProposal(id);
      console.log('yes votes tx -->');
      console.log(tx)
      const transactionHash = tx.hash;
      signer.provider.on(transactionHash, (receipt) => {
        console.log('Transaction confirmed:', receipt);
        handleUpload();
      });

      
    } catch (error) {
      alert('Deadline not passed  passed or Proposal is already Executed')
      console.log(error)
    }
  }


  return (
    <div className='w-full bg-[#0a1930]'>
      {showMetamaskAlert &&
        <Alert status={type}>{status}</Alert>
      }
      {
        loading ?
          <Center h={'30vh'} >
            <Spinner thickness='5px' speed='0.5s' emptyColor='gray.200' color='blue.500' size='xl' />
            {loading && <Loading progress={progress} />}
          </Center>
          :

          <div className='px-28 py-20 bg-[#0a1930]'  >
            <HStack spacing={8} className='bg-[#17173d] shadow-xl shadow-black rounded-2xl p-8'>
            <div className='w-6/12 h-full'>
              
              <img className='border-cyan-500 border-2 w-full mx-auto rounded-xl' src={`${image.replace('ipfs://', 'https://nftstorage.link/ipfs/')}`} alt={name} fallbackSrc={screenshot} style={{ maxWidth: '60%' }} />
              
              </div>

              <VStack className='text-[#b9b6b6]' spacing={6} align='stretch' marginLeft={'5rem'}>
                <div className='details-div'>
                  <Heading as="h3" m={'1'} size="lg" >
                    #{id}<Link style={{ marginLeft: '3px' }} target='_blank' to={tokenuri}><ExternalLinkIcon /></Link>
                  </Heading>
                  <Heading as="h6" m={'1'} size="lg" fontWeight={'1000'} >
                    {name.toUpperCase()}
                  </Heading>
                  <Text  fontWeight={'700'} m={'1'} fontSize={'xl'}>{description}</Text>
                  <Text fontWeight={'700'} m={'1'} fontSize={'md'}>Culutural significance:   {significance}</Text>
                  <Text fontSize="2xl" m={'1'}  fontWeight={'600'}>{`${location.charAt(0).toUpperCase()}${location.slice(1)}`}</Text>
                  <Text fontSize="md"  fontWeight={'400'} m={'1'}>{owner}</Text>
                </div>

                <HStack>
                  {executed ? <Text fontSize="2xl" m={'1'} color={'rgba(0, 0, 0, 0.53)'} fontWeight={'600'}></Text> : <Button onClick={handleYESVote} colorScheme='green'>Vote Yes</Button>}
                  {executed ? <Text fontSize="2xl" m={'1'} color={'rgba(0, 0, 0, 0.53)'} fontWeight={'600'}></Text> : <Button onClick={handleNoVote} colorScheme='red'>Vote No</Button>}
                  {executed ? <Text fontSize="2xl" m={'1'} color={'rgba(0, 0, 0, 0.53)'} fontWeight={'600'}>Proposal Executed</Text> : <Button onClick={handleExecute} colorScheme='purple'>Execute Proposal</Button>}
                </HStack>
              </VStack>
            </HStack>
          </div>

      }

    </div>
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