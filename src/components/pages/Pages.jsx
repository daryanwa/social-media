import React from 'react'
import Home from './Home'
import {Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './Login'


function Pages() {
  return (
    <div>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter >
    </div>
  )
}

export default Pages