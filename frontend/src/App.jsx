import React, { useEffect } from 'react'
import {Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import AllPlaces from './pages/AllPlaces'
import axios from 'axios'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} index />
      <Route path="/home" element={<Home />}  />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/allplaces" element={<AllPlaces/>} />
    </Routes>
  );
}

export default App;
