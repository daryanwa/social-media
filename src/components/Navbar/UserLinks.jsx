import React, { useContext } from 'react'
import { Tooltip, Avatar } from '@material-tailwind/react'
import avatar from '../../assets/images/avatar.jpg'
import { AuthContext } from '../AppContext/AppContext'





function UserLinks() {

  const {signOutUser, user, userData} = useContext(AuthContext)


  return (
    <div className='flex w-300 justify-center cursor-pointer flex-row-reverse '>
        <div className='hover:translate-y-1 duration-500  ease-in-out hover:text-blue-500'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-4 w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>

        </div>
        <div className='hover:translate-y-1 duration-500  ease-in-out hover:text-blue-500'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-4 w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
</svg>

        </div>
        <div className='hover:translate-y-1 duration-500  ease-in-out hover:text-blue-500'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-4 w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
</svg>

        </div>
      

        <div className='flex mx-4 items-center' onClick={signOutUser}>
            
            <Tooltip 
            className='px-2 font-roboto pt-5 text-sm font-medium bg-yellow-500 border-gray-200 border shadow-sm rounded-lg opacity-0  text-black'
            content="Sign out" placement='bottom'>
                <Avatar src={userData?.image ? userData?.image : avatar} size="sm" alt='avatar' className='z-30 w-8 h-8 object-cover rounded-full' />
            </Tooltip>
            <p className='ml-4 font-roboto text-sm text-black font-medium no-underline'>
                {user?.displayName === null && userData?.name !== undefined ? userData?.name?.CharAt(0)?.toUppercase() + userData?.name?.slice(1) : user?.displayName?.split(" ")[0]}
            </p>
        
        </div>
    </div>
  )
}

export default UserLinks