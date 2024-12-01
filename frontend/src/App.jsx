import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AllPlaces from "./pages/AllPlaces";
import UserProfile from "./pages/UserProfile";
import PlaceDetails from "./pages/PlaceDetails";
import WishList from "./components/WishList";
import AllGathering from "./pages/AllGathering";
import AccountSetting from "./pages/AccountSetting";
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

      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/profile/:id/accountsetting" element={<AccountSetting />} />

      <Route path="/profile" element={<UserProfile />} />
      <Route path="/profile/wishlist/:id" element={<WishList />} />
      <Route path="/places/:placeId" element={<PlaceDetails />} />
    </Routes>
  );
}

export default App;
