import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import styles from "../styles/AdminUsers.module.css";
import UserList from "./UserList";
import Loading from "../../components/Loading";
import axios from "axios";
function AdminUsers() {
  // const [search, setSearch] = useState("");
  // const [role, setRole] = useState("");
  // const [users, setUsers] = useState([]);
  // const [loading,setLoading]=useState(false)

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setLoading(true);
  //       const res = await axios.get("/api/users/");
  //       setUsers(res.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     finally{
  //       setLoading(false);
  //     }
  //   }
  //   fetchData();
  // },[])

  // useEffect(() => {
  //    async function Search() {
  //     try{
  //       const res = await axios.get("/api/users/");
  //       setUsers(res.data);
  //     }
  //     catch(err){
  //       console.log(err)
  //     }
  //   }
  //   Search();

  // },[search])

  return (
    <section className={styles.section}>
      <h1 style={{ textAlign: "center" }}>Users</h1>
      <div className={styles.bar}>
        <div className={styles.searchWrapper}>
          <IoIosSearch className={styles.searchIcon} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a user by user name "
            className={styles.searchInput}
          />
        </div>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={styles.select}
        >
          <option value="" disabled className={styles.option}>
            Filter by Role{" "}
          </option>
          <option value="all" className={styles.option}>
            All
          </option>
          <option value="toursit" className={styles.option}>
            Tourist
          </option>
          <option value="guide" className={styles.option}>
            Guide
          </option>
          <option value="admin" className={styles.option}>
            Admin
          </option>
        </select>
      </div>
      <UserList search={search} role={role} users={users} />
    </section>
  );
}

export default AdminUsers;
