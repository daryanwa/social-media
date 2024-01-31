import React from 'react'
import Navbar from '../Navbar/Navbar'



function ChatMessenger() {
  return (
    <div className='w-full'>
    <div className='fixed top-0 z-10 w-full bg-white'>
      {/* Navbar component */}
      <Navbar />
    </div>
  
    <div className='flex bg-gray-100 h-screen'>
      {/* Sidebar on the left */}
      <div className='flex-auto w-[20%] fixed top-12 bg-gray-200 p-4'>
        {/* Sidebar content goes here */}
      </div>
  
      {/* Main chat area in the center */}
      <div className='flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl p-4'>
        <div className='w-80% mx-auto'>
          {/* Chat messages and input go here */}
        </div>
      </div>
  
      {/* Sidebar on the right */}
      <div className='flex-auto w-[20%] fixed right-0 top-12 bg-gray-200 p-4'>
        {/* Sidebar content goes here */}
      </div>
    </div>
  </div>
  
  )
}

export default ChatMessenger