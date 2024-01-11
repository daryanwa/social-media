import React from 'react'



function Card({name,img}) {
 
  return (
    <div>
     
            

            <div className='relative'>
                <img src={img} alt={name} className='h-full w-full rounded-xl cursor-pointer shadow-lg object-cover'/>
            </div>
       
            
    </div>
  )
}

export default Card