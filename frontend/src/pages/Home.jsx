import React from "react";
import TrendingPlaces from "../components/TrendingPlaces";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";

import Loading from "../components/Loading";


function Home() {
  const trendingPlaces = [
    {
      src: "/src/assets/images/SignIn_image.jpg",
      title: "Luxor Temple",
    },
    {
      src: "/src/assets/images/SignIn_image.jpg",
      title: "Luxor Temple",
    },
    {
      src: "/src/assets/images/SignIn_image.jpg",
      title: "Luxor Temple",
    },
  ];
  return (
    <main>
      <NavBar />
      <Hero />
      <TrendingPlaces places={trendingPlaces} />
      {/*for testing only any one can change color for more matching colors */}

      {/* <Loading /> */}

    </main>
  );
}

export default Home;
