import React, { useState, useEffect, createContext, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
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
import router from "./Routes/Routers";
export const UserContext = createContext();

function App() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:1123/api/v1/places/"
        );
        setPlaces(response.data.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) return;

    async function fetchUser() {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:1123/api/v1/users/me",
          {
            withCredentials: true,
          }
        );
        if (response.data.status === "success") {
          setUser(response.data.data.user);
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const contextValue = React.useMemo(
    () => ({
      user,
      setUser,
      places,
      setPlaces,
    }),
    [user, places]
  );
  return (
    <UserContext.Provider value={contextValue}>
      {loading && <Loading />}
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
