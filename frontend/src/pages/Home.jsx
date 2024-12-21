import React, { useEffect, useState } from "react";
import axios from "axios";

import TrendingPlaces from "../components/TrendingPlaces";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import ExploreSection from "../components/ExploreSection";
import Loading from "../components/Loading";
import { useLoaderData } from "react-router-dom";

function Home() {
  const [trendingPlaces, setTrendingPlaces] = useState([]);
  let currentUser = useLoaderData();
  const [curU, setcurU] = useState(currentUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const endpoint = `http://localhost:1123/api/v1/trendingsection`;
        const response = await axios.get(endpoint);
        setTrendingPlaces(response.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {}, [curU]);
  return (
    <main>
      <NavBar currentUser={curU} setCurrentUser={setcurU} />
      <Hero />
      <TrendingPlaces places={trendingPlaces} />

      <ExploreSection />
    </main>
  );
}

export default Home;
