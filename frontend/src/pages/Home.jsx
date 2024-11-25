import React from 'react'
import TrendingPlaces from '../components/TrendingPlaces'
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Card from "../components/Card";

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
    <main>
      <NavBar />
      <Hero />
      <Card />
      <TrendingPlaces places={trendingPlaces} />
    </main>
  );
}

export default Home;
