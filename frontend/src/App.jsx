import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AllPlaces from "./pages/AllPlaces";
import UserProfile from "./pages/UserProfile";
import PlaceDetails from "./pages/PlaceDetails";
import GatheringDetails from "./pages/GatheringDetails";
import WishList from "./components/WishList";
import AllGathering from "./pages/AllGathering";
import AccountSetting from "./pages/AccountSetting";
import Loading from "./components/Loading";
import Bazaar from "./pages/Bazaar";
import DashBoard from "./pages/DashBoard";
import Page404 from "./pages/Page404";
import axios from "axios";

export const UserContext = createContext();

function App() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch places
        const endpoint =
          location.pathname === "/"
            ? `http://localhost:1123/api/v1`
            : `http://localhost:1123/api/v1/places`;

        const response = await axios.get(endpoint);
        if (response.status === "fail") {
          console.log("error");
          return;
        }

        setPlaces(response.data.data);

        // Fetch user
        const userResposne = await axios.get(
          "http://localhost:1123/api/v1/users/me",
          { withCredentials: true }
        );
        setUser(userResposne.data?.data.user);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location.pathname]);

  return (
    <UserContext.Provider value={{ user, setUser, places, setPlaces }}>
      {loading && <Loading />}
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route path="/home" element={<Home />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/places/:placeId" element={<PlaceDetails />} />
        <Route path="/places" element={<AllPlaces />} />

        <Route path="/gatherings" element={<AllGathering />} />

        <Route path="/gatherings" element={<AllGathering />} />
        <Route
          path="/gatherings/:gatheringId"
          element={<GatheringDetails />}
        ></Route>

        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route
          path="/profile/:id/accountsetting"
          element={<AccountSetting />}
        />

        <Route path="/profile/wishlist/:id" element={<WishList />} />
        <Route path="/profile/:id/wishlist/:id" element={<WishList />} />

        <Route path="/places/:placeId" element={<PlaceDetails />} />
        <Route path="/bazaar" element={<Bazaar />} />

        <Route path="/dashboard" element={<DashBoard />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
