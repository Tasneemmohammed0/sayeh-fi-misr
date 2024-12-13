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

  return (
    <main>
      <NavBar />
      <Hero />
      <TrendingPlaces places={trendingPlaces} />

      <ExploreSection />
    </main>
  );
}

export default Home;
