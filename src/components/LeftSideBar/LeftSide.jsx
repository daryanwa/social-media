import React from 'react'
import nature from '../../assets/images/nature.jpg'
import { Tooltip, Avatar } from '@material-tailwind/react'
import avatar from '../../assets/images/avatar.jpg'
import location from '../../assets/images/location.png'
import tik from '../../assets/images/tik.jpg'

function LeftSide() {
  return (
    <div className='flex flex-col h-screen  border-2 rounded-r-xl shadow-lg pb-4 '>
        <div className='flex flex-col items-center relative'>
            <img src={nature} alt='nature' className='h-28 w-full rounded-r-xl object-cover' />
      
        <div className='absolute -bottom-4'>
            <Tooltip content='Profile' placement='top'>
                <Avatar src={avatar} className='z-30 w-20 h-20 object-cover rounded-full' size='md' />
            </Tooltip>
        </div>
        </div>
        <div className='flex flex-col items-center pt-6'>
            <p className='font-roboto font-medium text-md mb-2 text-gray-700 no-underline tracking-normal leading-none'>
                User email
            </p>
            <p className='font-roboto font-medium text-md mb-2 text-gray-700 no-underline tracking-normal leading-none'>
                Name Surname
            </p>
            <p className='font-roboto font-medium text-xl mb-2 text-gray-700 no-underline tracking-normal leading-none'>
                Parents of 
            </p>
            <p className='font-roboto font-medium text-xl mb-2 text-gray-700 no-underline tracking-normal leading-none'>
                Phone
            </p>
        </div>
        <div className='flex flex-col items-center pt-6'>
            <img src={location} alt='location' />
            <p className='font-roboto font-medium text-xl mb-2 text-gray-700 no-underline tracking-normal leading-none'>
                Address: 
            </p>
        </div>
        <div className='flex flex-col items-center pt-6'>
            <p className='font-roboto font-medium text-xl mb-2 text-gray-700 no-underline tracking-normal leading-none'>
                Group:
            </p>
        </div>
        <div className='flex flex-col items-center pt-6'>
            <p className='font-roboto font-medium text-xl mb-2 text-gray-700 no-underline tracking-normal leading-none'>
                Group:
            </p>
        </div>
    </div>
  )
}

export default LeftSide