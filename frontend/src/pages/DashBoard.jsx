import React, { useState } from "react";
import Sidebar from "../Admin/components/Sidebar";
import style from "../Admin/styles/DashBoard.module.css";
import AdminUsers from "../Admin/components/AdminUsers";
import AdminPlaces from "../Admin/components/AdminPlaces";
import AdminReports from "../Admin/components/AdminReports";
function DashBoard() {
  const [active, setActive] = useState("Users");
  return (
    <main className={style.main}>
      <Sidebar active={active} setActive={setActive} />
      {active === "Users" && <AdminUsers />}
      {active === "Places" && <AdminPlaces />}
      {active === "Reports" && <AdminReports />}
    </main>
  );
}

export default DashBoard;
