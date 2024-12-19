import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PlaceDetails from "../pages/PlaceDetails";
import AllPlaces from "../pages/AllPlaces";
import AllGathering from "../pages/AllGathering";
import GatheringDetails from "../pages/GatheringDetails";
import UserProfile from "../pages/UserProfile";
import AccountSetting from "../pages/AccountSetting";
import WishList from "../components//WishList";
import Bazaar from "../pages/Bazaar";
import DashBoard from "../pages/DashBoard";
import Page404 from "../pages/Page404";

///////////////////////////////////////////////////////////////
/// loaders

import { UserLoader } from "../pages/UserProfile";
import { dashboardLoader } from "../pages/DashBoard";

// Define the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/places/:placeId",
    element: <PlaceDetails />,
  },
  {
    path: "/places",
    element: <AllPlaces />,
  },
  {
    path: "/gatherings",
    element: <AllGathering />,
  },
  {
    path: "/gatherings/:gatheringId",
    element: <GatheringDetails />,
  },
  {
    path: "/profile/:id",
    element: <UserProfile />,
    loader: UserLoader,
  },
  {
    path: "/profile",
    element: <UserProfile />,
    loader: UserLoader,
  },
  {
    path: "/profile/accountsetting",
    element: <AccountSetting />,
    loader: dashboardLoader,
  },
  {
    path: "/profile/wishlist/:id",
    element: <WishList />,
  },
  {
    path: "/profile/:id/wishlist/:id",
    element: <WishList />,
  },
  {
    path: "/bazaar",
    element: <Bazaar />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    loader: dashboardLoader,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default router;
