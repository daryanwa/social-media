import React, {useState, useEffect} from 'react'

function Timer() {

const [timer, setTimer] = useState(0)
const [intervalId, setIntervalId] = useState(null)


const startTimer = () =>{
 const id = setInterval(()=> {
    setTimer((prevTimer) => prevTimer + 1 )
 }, 1000)
 setIntervalId(id)
}
const stopTimer = () =>{
clearInterval(intervalId)
}

useEffect(() => {
    return () => {
        clearInterval(intervalId)
    }
}, [intervalId])

const resetTimer = () => {
    setTimer(0)
    setIntervalId(null)
}


  return (
    <div>
        {timer}
        <button onClick={startTimer}>start</button>
        <button onClick={stopTimer}>stop</button>
        <button onClick={resetTimer}>reset</button>
    </div>
  )
}

export default Timer