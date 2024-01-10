import React, {useState, useRef, useEffect} from 'react'
import {cardData} from '../../assets/cardData'
import Card from './Card'



function CardSection() {

    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    // useEffect(() => {
    //   const intervalId = setInterval(() => {
     
    //     setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardData.length);
    //   }, 5000);
  

    //   return () => clearInterval(intervalId);
    // }, []);   меняются карточки

  return (
    <div>
       
        

            <div className=' grid grid-cols-1 gap-1 pt-5 mb-10'>
                {cardData.map((card, index) => {
                return  <div key={card.id} className='flex flex-col items-center justify-center'>
              
                        {index === currentCardIndex && <Card name={card.name} id={card.id} img={card.image} />}
                       
                    </div>
                })}
            </div>
            
        

    </div>
  )
}

export default CardSection