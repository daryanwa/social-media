import React from 'react';
import { Avatar } from '@material-tailwind/react';
import avatar from '../../assets/images/avatar.jpg';


function Comment({ name, comment, image, commentTimestamp }) {
  return (
    <div className='flex items-center mt-2 w-full'>
      <div className='mx-2'>
        <Avatar src={image || avatar} className='rounded-full size-12' />
      </div>
      <div className='flex flex-col items-start bg-gray-100 rounded-2xl p-1 max-w-[600px]'>
        <p className='font-roboto text-black text-sm no-underline tracking-normal leading-none p-1 font-medium'>{name}</p>
        <p className='font-roboto text-black text-sm no-underline tracking-normal leading-none p-1 font-medium'>
          {commentTimestamp && new Date(commentTimestamp.toDate()).toUTCString()}
        </p>
        <p className='font-roboto text-black text-sm no-underline tracking-normal leading-none p-1 font-medium'>{comment}</p>
      </div>
    </div>
  );
}

export default Comment;
