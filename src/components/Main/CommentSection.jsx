import React, { useContext, useRef } from 'react'
import { Avatar } from '@material-tailwind/react'
import avatar from '../../assets/images/avatar.jpg'
import { AuthContext } from '../AppContext/AppContext'
// import {Input} from '@material-tailwind/react'


function CommentSection({postId}) {


    const comment = useRef('')
    const {user, userData} = useContext(AuthContext)



  return (
    <div className='flex flex-col bg-white w-full py-2 rounded-3xl'>
        <div className='flex items-center'>
            <div className='mx-2'>
                <Avatar src={user?.photoURL || avatar} size='sm' variant='circular' ></Avatar>
            </div>
            <div className='w-full pr-2'>
                <form className='flex items-center w-full' onSubmit=''>
                    <input label='Username' name='comment' className='w-full rounded-2xl outline-none border-0 p-2 bg-gray-100' ref={comment} placeholder='Write a comment...' type='text' />
                <button type='submit' className='hidden' >
                    Submit
                </button>
                </form>
            </div>
        </div>
        {/* ...comments */}
    </div>
  )
}

export default CommentSection