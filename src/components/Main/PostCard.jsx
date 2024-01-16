import React from 'react'
import { Avatar } from '@material-tailwind/react'
import avatar from '../../assets/images/avatar.jpg'
import like from '../../assets/images/like.png'
import comment from '../../assets/images/comment.png'
import remove from '../../assets/images/delete.png'


function PostCard({uid, id, logo, name, text, email, image, timestamp}) {
  return (
    <div className='mb-4'>
        <div className='flex flex-col py-4 bg-white rounded-t-3xl'>
            <div className='flex items-center pb-4 ml-2'>
                <Avatar size='sm' variant='circular' alt='avatar' src={logo || avatar} /> 
                <div className='flex flex-col'>
                    <p className='ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>{email}</p>
                    <p className='ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>Published: {timestamp}</p>
                </div>
            {/* addFriendImage */}
            </div>
            <div className=''>
                <p className='ml-4 pb-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
                    {text}
                </p>
                {image && <img src={image} alt='postImage' className='h-[500px] w-full' />}
            </div>
            <div className='flex justify-around items-center pt-4'>
                <button className='flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100'>
                    <img src={like} className='h-8 mr-4' alt='/' />
                    {/* <p>display Likes</p> */}
                </button>
                <div className='flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100'>
                    <div className='flex items-center cursor-pointer'>
                        <img src={comment} alt='comment' className='h-8 mr-4' />
                        <p className='font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>Comments</p>
                    </div>
                </div>  
                <div className='flex place-items-center'>
                    <img src={remove} alt='delete' className='h-8 mr-4' />
                    <p className='font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>Delete</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostCard