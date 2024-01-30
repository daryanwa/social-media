import React from 'react'
import Home from './Home'
import {Routes, Route } from 'react-router-dom'
import Login from './Login'
import FriendProfile from './FriendProfile'
// import Register from './Register'


function Pages() {
  return (
    <div>
    
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/register' element={<Register />} /> */}
          <Route path='/profile/:id' element={<FriendProfile />} />
        </Routes>
      
    </div>
  )
}

export default Pages