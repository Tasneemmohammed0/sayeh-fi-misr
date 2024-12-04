import React, { useEffect } from "react";
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
import Bazaar from "./pages/Bazaar";

import Page404 from "./pages/Page404";

import axios from "axios";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} index />
      <Route path="/home" element={<Home />} />

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/places/:placeId" element={<PlaceDetails />} />
      <Route path="/places" element={<AllPlaces />} />

      <Route path="/gatherings" element={<AllGathering />} />
      <Route
        path="/gatherings/:gatheringId"
        element={<GatheringDetails />}
      ></Route>

      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/profile/:id/accountsetting" element={<AccountSetting />} />

      <Route path="/profile" element={<UserProfile />} />
      <Route path="/profile/:id/wishlist/:id" element={<WishList />} />
      <Route path="/places/:placeId" element={<PlaceDetails />} />
      <Route path="/bazaar" element={<Bazaar />} />

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
