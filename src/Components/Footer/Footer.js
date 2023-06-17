import {
    Box,
    Button,
    Heading,
    Image,
    Stack,
    Text,
    VStack,
  } from '@chakra-ui/react';
  import React from 'react';
  import IPCS_logo from "../../IPCS_logo.jpg"
  import { FaCopyright } from 'react-icons/fa';

  
  const Footer = () => {
    return (
      <Box bgColor={'hsl(0, 0%, 90%)'} minH={'30'} p={'16'} color={'454545'} >
        <Stack direction={['column', 'row']}>
          <VStack alignItems={'stretch'} w={'full'} px={'4'}>
            <Heading
              size="md"
              textTransform={'uppercase'}
              textAlign={['center', 'left']}
            >
              INTER PLANATERY CULTURAL STORAGE
            </Heading>

            <Image src={IPCS_logo} width={'4rem'} height={'4rem'}  style={{borderRadius:'12px'}} />
          </VStack>
  
          <VStack
            w={'full'}
            borderLeft={['none', '2px solid #454545']}
            borderRight={['none', '2px solid #454545']}
          >
            <Heading textTransform={'uppercase'} textAlign={'center'} textDecoration={'underline'}>
              IPCS
            </Heading>
            <Text color={'#454545'} display={'inline'} fontSize={'1rem'}>All rights reserved <FaCopyright className='inline' /></Text>
          </VStack>
  
          <VStack w={'full'}>
            <Heading size={'md'} textTransform={'uppercase'}>
              Social Media
            </Heading>
            <Button variant={'link'} colorScheme={'white'}>
              <a target={'black'} href="https://twitter.com/Park3official">
                Twitter
              </a>
            </Button>
  
            <Button variant={'link'} colorScheme={'white'}>
              <a target={'black'} href="https://github.com/park3app/Inter-Planetary-Heritage-Storage-Network-">
                Github
              </a>
            </Button>

            <Button variant={'link'} colorScheme={'white'}>
              <a target={'black'} href="https://discord.gg/WgGmUsf6">
                Discord
              </a>
            </Button>
          </VStack>
        </Stack>
      </Box>
    );
  };
  
  export default Footer;