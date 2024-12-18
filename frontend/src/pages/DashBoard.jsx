import React, { useContext, useState } from "react";
import Sidebar from "../Admin/components/Sidebar";
import style from "../Admin/styles/DashBoard.module.css";
import AdminUsers from "../Admin/components/AdminUsers";
import AdminPlaces from "../Admin/components/AdminPlaces";
import AdminReports from "../Admin/components/AdminReports";
import AdminBazaar from "../Admin/components/AdminBazaar";
import AdminStatistics from "../Admin/components/AdminStatistics";
import { UserContext } from "../App";
function DashBoard() {
  const [active, setActive] = useState("Users");
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <main className={style.main}>
      <Sidebar active={active} setActive={setActive} user={user} />
      {active === "Users" && <AdminUsers />}
      {active === "Places" && <AdminPlaces />}
      {active === "Reports" && <AdminReports />}
      {active === "Bazaar" && <AdminBazaar />}
      {active === "Statistics" && <AdminStatistics />}
    </main>
  );
}

export default DashBoard;
