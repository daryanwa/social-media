import React from 'react'
import Home from './Home'
import {Routes, Route } from 'react-router-dom'
import Login from './Login'
import FriendProfile from './FriendProfile'
import ChatMessenger from './ChatMessenger'


function Pages() {
  return (
    <div>
    
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile/:id' element={<FriendProfile />} />
          <Route path='/chat' element={<ChatMessenger/>}/>
        </Routes>
      
    </div>
  )
}

export default Pages