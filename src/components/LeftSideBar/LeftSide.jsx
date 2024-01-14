import React, {useState, useEffect, useRef, useContext} from 'react'
import nature from '../../assets/images/nature.jpg'
import { Tooltip, Avatar } from '@material-tailwind/react'
import avatar from '../../assets/images/avatar.jpg'
import location from '../../assets/images/location.png'
import tik from '../../assets/images/tik.jpg'
import laptop from '../../assets/images/laptop.jpg'
import apps from '../../assets/images/apps.jpg'
import media from '../../assets/images/media.jpg'
import Timer from './Timer'
import { AuthContext } from '../AppContext/AppContext'



function LeftSide() {

let [data, setData] = useState([])

const count = useRef(0)
const {user, userData} = useContext(AuthContext)


const handleRandom = (arr) => {
    setData(arr[Math.floor(Math.random() * arr?.length)])
}


useEffect(() => {


    const imagelist = [
        {
            id: '1',
            image: laptop
        },
        {
            id: '2',
            image: media
        },
        {
            id: '3',
            image: apps
        },
        {
            id: '4',
            image: tik
        },
    ]
    handleRandom(imagelist)
    let imgAdd = 0
    let startImg = setInterval(() =>{
        imgAdd++
        handleRandom(imagelist)
        count.current = imgAdd
        if(imgAdd === 5){
            clearInterval(startImg)
        }
    }, 2000)
    return ()=> {
        clearInterval(startImg)
    }
}
    , [])





  return (
    <div className='flex flex-col h-screen  border-2 rounded-r-xl shadow-lg pb-4 '>
        <div className='flex flex-col items-center relative'>
            <img src={nature} alt='nature' className='h-28 w-full rounded-r-xl object-cover' />
      
        <div className='absolute -bottom-4'>
            <Tooltip content='Profile' placement='top'>
                <Avatar src={userData?.image ? userData?.image : avatar} className='z-30 w-20 h-20 object-cover rounded-full' size='md' />
            </Tooltip>
        </div>
        </div>
        <div className='flex flex-col items-center pt-6'>
            <p className='font-roboto font-medium text-md mb-2 text-gray-700 no-underline tracking-normal leading-none'>
                {user?.email || userData?.email}
            </p>
            <p className='font-roboto font-medium text-md mb-2 text-gray-700 no-underline tracking-normal leading-none'>
                {user?.name || userData?.name}
            </p>
            <p className='font-roboto font-medium text-xl mb-2 text-gray-700 no-underline tracking-normal leading-none'>
                 {userData?.childname ? `Parents of ${userData?.childname}` : ''}
            </p>
            <p className='font-roboto font-medium text-xl mb-2 text-gray-700 no-underline tracking-normal leading-none'>
                {userData?.phone ? userData?.phone : ' '}
            </p>
        </div>
        <div className='flex flex-col items-center pt-6'>
            <img src={userData?.adress ? location : ''} alt='None location' />
            <p className='font-roboto font-medium text-xl mb-2 text-gray-700 no-underline tracking-normal leading-none'>
                {userData?.adress ? userData?.adress : ' '}
            </p>
        </div>
        <div className='flex flex-col items-center pt-6'>
            <p className='font-roboto font-medium text-xl mb-2 text-gray-700 no-underline tracking-normal leading-none'>
                Group:
                {userData?.group ? userData?.group : ' '}
            </p>
        </div>
        <div className='flex flex-col justify-center items-center pt-4'>
            <p className='font-roboto font-medium text-xl mb-2 text-gray-700 no-underline tracking-normal leading-none'>
                Gallery
            </p>
            <div>
                <img src={data.image} className='h-36 rounded-lg'/>
            </div>
            
        </div>
    </div>
  )
}

export default LeftSide