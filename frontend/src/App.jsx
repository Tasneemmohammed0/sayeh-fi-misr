import React from 'react'
import {Routes,Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} index />
      <Route path="/home" element={<Home />}  />\
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      

    </Routes>

    </>
  )
}

export default App
