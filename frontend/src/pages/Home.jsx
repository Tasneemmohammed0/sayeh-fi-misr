import React, { useEffect, useState } from "react";
import axios from "axios";

import TrendingPlaces from "../components/TrendingPlaces";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import ExploreSection from "../components/ExploreSection";
import Loading from "../components/Loading";

function Home() {
  const [trendingPlaces, setTrendingPlaces] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `http://localhost:1123/api/v1/trendingsection`;
        const response = await axios.get(endpoint);
        setTrendingPlaces(response.data.data);
        console.log(trendingPlaces);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  // const trendingPlaces = [
  //   {
  //     src: "/src/assets/images/SignIn_image.jpg",
  //     title: "Luxor Temple",
  //   },
  //   {
  //     src: "/src/assets/images/SignIn_image.jpg",
  //     title: "Luxor Temple",
  //   },
  //   {
  //     src: "/src/assets/images/SignIn_image.jpg",
  //     title: "Luxor Temple",
  //   },
  // ];
  return (
    <main>
      <NavBar />
      <Hero />
      <TrendingPlaces places={trendingPlaces} />
      {/*for testing only any one can change color for more matching colors */}

      {/* <Loading /> */}
      <ExploreSection />
    </main>
  );
}

export default Home;
