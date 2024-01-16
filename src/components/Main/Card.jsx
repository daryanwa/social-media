import React from 'react'



function Card({name,img,}) {
 
  return (
    <div>
     
            

            <div className='relative justify-center   flex'>
                <img src={img} alt={name} className='h-[95%] w-[95%]   rounded-xl cursor-pointer shadow-lg object-cover'/>
            </div>
       
            
    </div>
  )
}

export default Card