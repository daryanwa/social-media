import React from 'react'



function Card({name,img}) {
 
  return (
    <div>
     
            

            <div className='relative'>
                <img src={img} alt={name} className='h-80 w-full rounded-xl hover:scale-105 duration-700 cursor-pointer shadow-lg'/>
            </div>
       
            
    </div>
  )
}

export default Card