import React, { useEffect, useState } from 'react'
import { ipcsAddress, ipcsABI } from '../../constant';
import { useParams, Link } from "react-router-dom";
import { Button, Container, HStack, Center, Spinner, VStack, Image, Box, Text, Heading, StepDescription } from '@chakra-ui/react';
import { ethers } from 'ethers';
import screenshot from "../../screenshot.png"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import lighthouse from '@lighthouse-web3/sdk';


const UnSuccessSingleProposal = () => {
  const { id } = useParams()
  const [tokenid, settokenid] = useState('')
  const [nftdata, setnftdata] = useState('')
  const [tokenuri, settokenuri] = useState('')
  const [owner, setowner] = useState('');
  const [name, setname] = useState('')
  const [description, setdescription] = useState('');
  const [significance, setsignificance] = useState('');
  const [location, setlocation] = useState('');
  const [image, setimage] = useState('')
  const [loading, setloading] = useState(false);
  const [progress, setprogress] = useState('')

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
    setloading(false)


    // await uploadFile(tokenuri)

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





  return (
    <Container maxW={"100vw"}>
      {
        loading ?
          <Center h={'30vh'} >
            <Spinner thickness='5px' speed='0.5s' emptyColor='gray.200' color='blue.500' size='xl' />
            {/* {loading && <Loading progress={progress} />} */}
          </Center>
          :

          <div className='px-28 py-20 bg-[#0a1930]'  >

<HStack spacing={8} className='bg-[#17173d] shadow-xl shadow-black rounded-2xl p-8'>
              {/* <Link  to={tokenuri} target='_blank' > */}
              <div className='w-6/12 h-full'>
              <img className="border-cyan-500 border-2 w-full mx-auto rounded-xl" src={`${image.replace('ipfs://', 'https://nftstorage.link/ipfs/')}`} alt={name} fallbackSrc={screenshot} style={{ maxWidth: '60%' }} />
              </div>
              {/* </Link> */}

              <VStack spacing={6} className='text-[#b1aeae]' align='stretch' marginLeft={'5rem'}>
                <div className='details-div'>
                  <Heading as="h3" m={'1'} size="lg" >
                    #{id}<Link style={{ marginLeft: '3px' }} target='_blank' to={tokenuri}><ExternalLinkIcon /></Link>
                  </Heading>
                  <Heading as="h6" m={'1'} size="lg" fontWeight={'1000'} className='text-white'>
                    {name.toUpperCase()}
                  </Heading>
                  <Text fontWeight={'700'} m={'1'} fontSize={'xl'}>{description}</Text>
                  <Text  fontWeight={'700'} m={'1'} fontSize={'md'}>Culutural significance:   {significance}</Text>
                  <Text fontSize="2xl" m={'1'} fontWeight={'600'}>{`${location.charAt(0).toUpperCase()}${location.slice(1)}`}</Text>
                  <Text fontSize="md"  fontWeight={'400'} m={'1'}>{owner}</Text>
                </div>

                <HStack>
                  <Text fontSize="2xl"  className='text-red-600' fontWeight={'400'} m={'1'}>Proposal Result to Unsuccessful</Text>
                </HStack>

              </VStack>
            </HStack>
          </div>

      }

    </Container>
  )
}

export default UnSuccessSingleProposal


