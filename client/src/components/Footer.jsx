import React from 'react'
import { location } from '../assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className=' bg-[#145DA0] flex justify-between w-full h-[100px] text-white font-sans px-7 py-5 font-bold'>
        <div className='flex justify-evenly gap-10  max-w-full capitalize'>
          <div className='flex flex-col gap-2 w-[150px] text-left text-nowrap'>
            <h1 className='text-gray-300'>about</h1>
            <h2 className='mb-5 hover:cursor-pointer hover:text-blue-400' onClick={() => navigate('/about')}>about us</h2> 
          </div>
        </div>
        <div>
          <div className='flex gap-4 cursor-pointer'>
            <img src={location} width={18} height={18}/>
            <p>India</p>
          </div>
        </div>
    </div>
  )
}

export default Footer
