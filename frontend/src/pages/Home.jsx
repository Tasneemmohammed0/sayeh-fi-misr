import React from 'react'
import TrendingPlaces from '../components/TrendingPlaces'
function Home() {

   const  trendingPlaces=[{
  src:"/src/assets/images/SignIn_image.jpg",   
  title:"Luxor Temple",

   }
  ,
  {
    src:"/src/assets/images/SignIn_image.jpg",   
    title:"Luxor Temple",
  }
  ,
  {
    src:"/src/assets/images/SignIn_image.jpg",   
    title:"Luxor Temple",
      
  }
  
  
  
  ]
  return (
    <>
    <TrendingPlaces places={trendingPlaces} />
    </>
  )
}

export default Home