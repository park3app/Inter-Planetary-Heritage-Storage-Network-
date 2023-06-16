import React from 'react'
import { Box } from '@chakra-ui/react';
import img from './img1.png'
import img2 from './img2.png'
import imageSrc from './img1.png'
import { FaCircle } from 'react-icons/fa';


const Home = () => {
  return (
    <div className='w-full h-full'>
      <div className='w-8/12 mx-auto py-28 text-[#00000087]'>
        <p style={{color:"#454545" ,  fontSize:"2rem" , fontWeight:"600" }}>IPCS</p>
        <p className='text-7xl mt-8 mb-5'>Cultural Storage</p>
        <p style={{fontSize:'1.2rem'}}> <span style={{fontWeight:'600'}}>"Inter Planetary Cultural Storage"</span>  preserves the Histories and Cultures of the world. We believe that diversity of cultures is priceless, so we are recording the worlds stories in immutable blockchain records.</p>
      </div>
      <div className='w-10/12 mx-auto  bg-[#f5f4e4] flex rounded text-[#00000087]'>
        <div className='px-auto w-6/12' >
          <div className='w-9/12  mx-auto py-20'>
            <p className='text-sm ' >Mathews Park Est. 2023</p>
            <p className='text-3xl mt-8 mb-6'>Los Angeles CA</p>
            <p className='w-10/12'>One of the most diverse urban neighborhoods in the world is getting a unique new park and cultural storage solution.</p>
            <button className='py-2 px-7 mx-auto border rounded-full mt-4 text-xs '>LERN  MORE</button>
          </div>
        </div>
        <div className='w-8/12 '>
          <img src={img} className='w-full' alt="Description of the image" />
        </div>
      </div>
      <div className='w-8/12 mx-auto py-28 text-[#00000087] flex'>
        <div >
          <div className='w-11/12'>
            <p className='text-xs'>Riches Are Everywhere</p>
            <p className=' text-2xl mt-8 mb-6'>Cultural Preservation</p>
            <p>There are priceless treasures in every city around the world. These treasures are the culture and histories of the people and places that have made the area unique.</p>
            <button className='py-2 px-7 mx-auto border rounded-full mt-4 text-xs '>JOIN</button>
          </div>
        </div>
        <div >
          <div className='w-11/12'>
            <p className='text-xs'>Responsibility Is Ours</p>
            <p className=' text-2xl mt-8 mb-6'>Economic
              Development</p>
            <p>We believe in responsible economic development that preserves cultural histories while adding revenue for local businesses and governments.</p>
            <button className='py-2 px-7 mx-auto border rounded-full mt-4 text-xs '>LEARN  MORE</button>
          </div>
        </div>
      </div>
      <div className='w-10/12 mx-auto  bg-[#f5f4e4] flex rounded text-[#00000087]'>
        <div className='px-auto w-6/12' >
          <div className='w-9/12  mx-auto pt-36'>
            <p className='text-sm ' >Innovations Serving People</p>
            <p className='text-3xl mt-5 mb-3'>New Horizons</p>
            <p className='w-10/12'>Something special is on the horizon that is impacting cultures and people around the world. Preserving the things you cherish will never be the same.</p>
            <button className='py-2 px-7 mx-auto border rounded-full mt-4 text-xs '>JOIN</button>
          </div>
        </div>
        <div className='w-8/12 '>
          <img src={img2} className='w-full' alt="Description of the image" />
        </div>
      </div>

      <div className='w-8/12 mx-auto py-28 text-[#00000087]'>
        <p>Preserving What You Love</p>
        <p className='text-7xl mt-8 mb-5'>Insurance for public art and history</p>
        <p>Be a part of history yourself as one of the first people to preserve the uniqueness of your community.</p>
      </div>

    </div>
  )
}

export default Home