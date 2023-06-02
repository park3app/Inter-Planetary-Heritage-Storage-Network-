import React from 'react'
import "./Header.css"
import { ConnectWallet } from '@thirdweb-dev/react'

const Header = () => {
  return (
    <div>
        <header class="header ">
    <div class="container mx-auto px-4 py-6">
      <nav class="flex items-center justify-between">
        <div class="flex items-center">
          <a href="/" class=" font-bold text-2xl park3-heading ">PARK3</a>
        </div>
        <ul class="flex items-center space-x-6">
          <li><a href="/assets" className="  hover:text-gray-300 ">Assets</a></li>
          <li><a href="/profile" className="  hover:text-gray-300">Profile</a></li>
          <li><a href="/uploadassets" className="  hover:text-gray-300">Upload</a></li>
          <ConnectWallet className='btn-upload'    btnTitle="Connect" />
        </ul>
      </nav>
    </div>
  </header>
    </div>
  )
}

export default Header