import React, { useEffect } from 'react'
import {Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import axios from 'axios'
function App() {


// useEffect(() => {
//   async function fetchData() {
//     try {
//       const response = await axios.get(
//         "https://vercel-test-teal-three-97.vercel.app/api/v1/users/me"
//       );
//       console.log(response.data); // Use response.data to access the data
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }
//   fetchData();
// }, []);


  return (
    // <>
    // </>
    <Routes>
      <Route path="/" element={<Home />} index />
      <Route path="/home" element={<Home />}  />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      

    </Routes>
    )
{/* 
    <SignIn/>

    <SignUp/>  */}

//     </>
  
}

export default App
