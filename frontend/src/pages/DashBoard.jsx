import React, { useContext, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Sidebar from "../Admin/components/Sidebar";
import style from "../Admin/styles/DashBoard.module.css";
import AdminUsers from "../Admin/components/AdminUsers";
import AdminPlaces from "../Admin/components/AdminPlaces";
import AdminReports from "../Admin/components/AdminReports";
import AdminBazaar from "../Admin/components/AdminBazaar";
import AdminStatistics from "../Admin/components/AdminStatistics";
import axios from "axios";
import { UserContext } from "../App";
function DashBoard() {
  const [active, setActive] = useState("Users");
  const { user } = useContext(UserContext);
  const currentUser = useLoaderData();
  if (currentUser?.role !== "admin") return <h1>Unauthorized</h1>;
  console.log(user);
  return (
    <main className={style.main}>
      <Sidebar active={active} setActive={setActive} user={currentUser} />
      {active === "Users" && <AdminUsers />}
      {active === "Places" && <AdminPlaces />}
      {active === "Reports" && <AdminReports />}
      {active === "Bazaar" && <AdminBazaar />}
      {active === "Statistics" && <AdminStatistics />}
    </main>
  );
}

export default DashBoard;
export async function dashboardLoader() {
  let cu = null;
  try {
    console.log("loader user  called");
    const response = await axios.get(`http://localhost:1123/api/v1/users/me`, {
      withCredentials: true,
    });
    cu = response.data.data.user;
  } catch (err) {
    console.log(err);
  }

  return cu;
}
