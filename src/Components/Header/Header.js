import React from 'react'
import "./Header.css"
import { ConnectWallet } from '@thirdweb-dev/react'
import {Menu , MenuButton , MenuList , MenuItem ,Text} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import IPCS_logo from "../../IPCS_logo.jpg"
 
const Header = () => {
  return (

    <>
    
    <div>
        <header className="header ">
    <div className="container mx-auto px-4 py-4">
      <nav className="flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className=" font-bold text-2xl park3-heading ">
            <img style={{borderRadius:'10px' , display:'inline'}} src={IPCS_logo}  width={'50px'} height={'50px'} alt='IPCS'/>
            
          </a>
        </div>
        <ul className="flex items-center space-x-6">
          <li>
          <Menu>
          <MenuButton className="a" as={Text} fontWeight="500" fontSize="lg" _hover={{ textDecoration: 'underline' , cursor:'pointer'}}>
            Proposal
          </MenuButton>
          <MenuList>
            <MenuItem className='header-link'>Proposal</MenuItem>
            <MenuItem><Link className='header-link' to={'/myproposals'} >My Proposals</Link></MenuItem>
            <MenuItem><Link className='header-link' to={'/activeproposals'}>Active Proposals</Link></MenuItem>
            <MenuItem><Link className='header-link' to={"/sucessproposals"}>Succesfull Proposals</Link></MenuItem>
            <MenuItem><Link className='header-link' to={"/unsucessproposals"}>UnSuccesFull Proposals</Link></MenuItem>
          </MenuList>
        </Menu>
          </li>
          <li>
          <Menu>
          <MenuButton  className=' a'  as={Text} fontWeight="500" fontSize="lg" _hover={{ textDecoration: 'underline', cursor:'pointer' }}>
            Assets
          </MenuButton>
          <MenuList>
            <MenuItem>  <Link  className='header-link'  to={'/uploadassets'}>Create One</Link>  </MenuItem>
            <MenuItem> <Link   className='header-link' to={'/profile'}>My Assets</Link></MenuItem>
            <MenuItem> <Link   className='header-link' to={"/assets"}>All Assets</Link>  </MenuItem>
          </MenuList>
        </Menu>
          </li>
          <ConnectWallet className='btn-upload'    btnTitle="Connect" />
        </ul>
      </nav>
    </div>
  </header>
    </div>

    </>
  )
}

export default Header