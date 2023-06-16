import React, { useEffect, useState } from 'react'
import { ipcsAddress, ipcsABI } from '../../constant';
import { ipcsnftAddress, ipcsnftABI } from '../../constant';
import { useParams, Link } from "react-router-dom";
import { Button, Container, HStack, Center, Spinner, VStack, Image, Box, Text, Heading, Alert, AlertIcon } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { ExternalLinkIcon } from "@chakra-ui/icons"
import "./eachasset.css";
import screenshot from "../../screenshot.png"
import lighthouse from '@lighthouse-web3/sdk';
import { ENS } from '@ensdomains/ens';
import { getEnsAddress } from '@ensdomains/resolver';

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
  const [type, setType] = useState('');
  const [ensData, setEnsData] = useState({ name: '', avatar: '' });


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


   const getENSData = async() => {
     const provider = new ethers.providers.JsonRpcProvider("https://filecoin-calibration-testnet.rpc.thirdweb.com");
     const ens = new ENS({ provider, ensAddress: getEnsAddress(provider.network.chainId) })
     try {
       const name = await ens.getName(owner) 
        const avatar = await ens.getAvatar(owner);
       return { name, avatar }
     } catch (error) {
       console.error('Error fetching ENS data:', error);
       return { name: '', avatar: '' };
     }
   }


  useEffect(() => {
    getNftInfo();
  }, [id]);

  useEffect(() => {
    if (tokenuri) {
      fetchMetadata(tokenuri);
    }
    // if(owner){
    //   const fetchData = async () => {
    //     const data = await getENSData(owner);
    //     setEnsData(data);
    //   };
  
    //   fetchData();
    // }
  }, [tokenuri]);



  return (
    <div className='w-full bg-[#0a1930]'>
      {showMetamaskAlert && <Alert status={type}  className=' w-10/12  '><AlertIcon />{status}</Alert>}
      {
        loading ?
          <Center h={'30vh'} >
            <Spinner thickness='5px' speed='0.5s' emptyColor='#454545' color='#454545' size='xl' />
          </Center>
          :
          <div className='px-28 py-20 bg-[#0a1930]'  >
            <HStack spacing={8} className='bg-[#17173d] shadow-xl shadow-black rounded-2xl p-8'   >
              <div className='w-6/12 h-full'>

              <img className='border-cyan-500 border-2 w-full rounded-xl' borderColor={'#CCEABB'} borderRadius={'10px'} src={`${image.replace('ipfs://', 'https://nftstorage.link/ipfs/')}`} alt={name} maxW={'40%'} />
              </div>
              <VStack spacing={6} align='stretch' marginLeft={'5rem'}>
                <div className='details-div'>
                  <Heading as="h3" m={'1'} size="lg" color={'rgb(209 213 219)'}>
                    #{id}  <Link target='_blank' style={{ marginLeft: '3px' }} to={`https://ipfs.io/ipfs/${tokenuri}/metadata.json`}><ExternalLinkIcon fontWeight={'1000'} fontSize={'2rem'} color={"#CCEABB"} /></Link>
                  </Heading>
                  <Heading as="h6" m={'1'} size="md" color={'rgb(209 213 219)'}>
                    <Text style={{ display: 'inline', color: 'rgb(209 213 219)', fontWeight: '1000' }}>Name:  </Text> {name}
                  </Heading>
                  <p className='text-slate-300' fontWeight={'700'} m={'1'} fontSize={'xl'}> <Text style={{ display: 'inline', color: 'rgb(209 213 219)', fontWeight: '1000' }}>Description:  </Text>{description}</p>
                  <p className='text-slate-300' color={'#454545'} fontWeight={'700'} m={'1'} fontSize={'xl'}><Text style={{ display: 'inline', color: 'rgb(209 213 219)', fontWeight: '1000' }}>Significance: </Text>  {significance}</p>
                  <p className='text-slate-300' fontSize="xl" m={'1'} color={'rgb(209 213 219)'} fontWeight={'600'}><Text style={{ display: 'inline', color: 'rgb(209 213 219)', fontWeight: '1000' }}>Location:   </Text>{`${location.charAt(0).toUpperCase()}${location.slice(1)}`}</p>
                  <p className='text-slate-300' fontSize="md" color={'rgb(209 213 219)'} fontWeight={'400'} m={'1'}>{owner}</p>
                  <p className='text-slate-300' noOfLines={1}> {isstatetrue ? <Text p={'4px'} fontWeight={'700'} color={'green'} fontSize={'xl'}>State is True</Text> : <Text color={"red"} p={'4px'} fontWeight={'600'} fontSize={'xl'} size='lg'>State is False</Text>}</p>
                </div>
                <HStack>
                  {isproposed ? <Text color={"white"} p={'4px'} fontWeight={'600'} fontSize='2xl' >Already Proposed</Text> : <Button onClick={handleCreateProposal} size='lg' colorScheme='green' borderRadius={'4px'} fontWeight={'700'} >Propose</Button>}
                </HStack>

              </VStack>


            </HStack>
          </div>

      }

    </div>
  )
}

export default EachAsset