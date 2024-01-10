import React, {useState} from 'react'
import waterslide from '../../assets/images/waterslide.jpg'


function RightSide() {


let [input, setInput] = useState('')



  return (
    <div className='h-screen flex flex-col bg-white shadow-lg border-2 rounded-l-xl'>
        <div className='flex flex-col items-center relative pt-10'>
            <img src={waterslide} alt='nature' className='h-48 rounded-md' />   
        </div>
        <p className='font-roboto font-normal text-sm mb-2 text-gray-700 max-w-fit no-underline tracking-normal leading-tight py-2 mx-2'>  
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium minima, natus iusto quidem laborum eum obcaecati blanditiis aperiam odit consequatur, sed et perferendis doloremque nobis optio 
            velit voluptates similique nam.
        </p>
        <div className='mx-2 mt-10'>
            <p className='font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
              Users:  
            </p>
            <input 
            className='border-0 outline-none mt-4'
            type='text' 
            placeholder='Search...'
            value={input}
            onChange={(e)=> setInput(e.target.value)}
            >

            </input>
        </div>
    </div>
  )
}

export default RightSide