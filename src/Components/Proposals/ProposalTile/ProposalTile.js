import React, { useEffect, useState } from 'react'
import { Box, VStack, Heading, Image, Text, HStack, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { AiOutlineArrowUp } from 'react-icons/ai';

const ProposalTile = ({ tokenURI, proposalid, yesvotes, novotes }) => {

  const [name, setname] = useState();
  const [image, setimage] = useState('')

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(`https://ipfs.io/ipfs/${tokenURI}/metadata.json`);
        console.log(response)
        const metadata = await response.json();
        // console.log(metadata.text())
        setname(metadata.name)
        let tokenImagex = metadata.image;
        setimage(tokenImagex)


      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    }
    fetchMetadata();
  }, [tokenURI]);

  return (
    <div className="m-3" key={tokenURI}>
  {tokenURI !== "" ? (
    <Link to={`/activeproposals/${proposalid.toString()}`} maxw="30" key={proposalid.toString()}>
      <img
        src={`${image.replace('ipfs://', 'https://nftstorage.link/ipfs/')}`}
        className="w-11/12 mx-auto rounded-2xl"
        w={"100"}
        h={"70"}
        borderRadius={'2px'}
        objectFit={"contain"}
        alt={name}
      />
      <div className="mx-3 mt-2 text-xl w-fit py-1 px-2 text-white font-bold">{`#${proposalid.toString()} ${name}`}</div>
      <div className="w-fit flex mx-auto">
        <p className="text-lime-500 mr-2 font-bold text-4xl">{yesvotes}</p>
        <p className="text-red-700 ml-2 font-bold text-4xl">{novotes}</p>
      </div>
      <p
        className="bg-[#17173d] border-green-700 text-center rounded-lg mt-6 border-2 py-2 p-2 text-white font-bold mx-3"
        color="#fff"
        borderRadius={'3px'}
        m={'3'}
        backgroundColor={'green.300'}
        p={'2'}
        fontWeight={'700'}
        size="xs"
      >
        VOTE
      </p>
    </Link>
  ) : (
    <div></div>
  )}
</div>

  )
}

export default ProposalTile