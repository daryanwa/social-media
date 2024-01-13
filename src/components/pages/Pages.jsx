import React from 'react'
import Home from './Home'
import {Routes, Route } from 'react-router-dom'
import Login from './Login'


function Pages() {
  return (
    <div>
    
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login />} />
        </Routes>
      
    </div>
  )
}

export default Pages