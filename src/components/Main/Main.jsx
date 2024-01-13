import React from 'react'
import { Avatar, Button } from '@material-tailwind/react'
import avatar from '../../assets/images/avatar.jpg'
import live from '../../assets/images/live.png'
import smile from '../../assets/images/smile.png'
import addImage from '../../assets/images/add-image.png'

function Main() {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg'>
        <div className='flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full'>
          <Avatar src={avatar} size='sm' className='w-12 h-12' variant='circular' alt='avatar' ></Avatar>
          <form className='w-full'>
            <div className='flex justify-between items-center'>
              <div className='w-full ml-4'>
                <input placeholder='Write post...' className=' block py-2.5 px-0  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer w-full bg-white rounded-md' type='text' name='text'  />
              </div>
              <div className='mx-4'>
                {/* put PreviewImag */}
              </div>
              <div className='mr-4'>
                <Button className=' bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-500 text-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' variant='text' type='submit' >
                  Share
                </Button>
              </div>
            </div>
          </form>
        </div>
        <span>
          {/* progressBar */}
        </span>
        <div className='flex justify-around items-center pt-4'>
          <div className='flex items-center'>
                <label htmlFor='addImage' className='cursor-pointer flex items-center'>
                  <img src={addImage} alt='addimg' className='h-10 mr-4' />
                  <input id='addImage' type='file' style={{display:'none'}} />
                </label>
                {/* <Button className='bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-500 text-blue-500 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2' variant='text' type='submit'>
                  Upload
                </Button> */}
          </div>
          <div className='flex items-center'>
            <img src={live} alt='live' className='h-10 mr-4' />
            <p className='font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>Live</p>
          </div>
          <div className='flex items-center'>
            <img src={smile} alt='live' className='h-10 mr-4' />
            <p className='font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>Smile</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col py-4 w-full'>
        {/* posts */}
      </div>
      <div >
        {/* ref for later */}
      </div>
    </div>
  )
}

export default Main