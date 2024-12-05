import React, { useState } from "react";
import styles from "../styles/UserList.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
function UserList({ search, role, users }) {
  const [loading, setLoading] = useState(false);

  const tempusers = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "  Giude",
    },
    {
      id: 1568,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      role: "User",
    },
    {
      id: 5,
      name: "David Miller",
      email: "david.miller@example.com",
      role: "Admin",
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "  Giude",
    },
    {
      id: 7,
      name: "Chris Wilson",
      email: "chris.wilson@example.com",
      role: "User",
    },
    {
      id: 8,
      name: "Sophia Garcia",
      email: "sophia.garcia@example.com",
      role: "User",
    },
    {
      id: 9,
      name: "Ethan Martinez",
      email: "ethan.martinez@example.com",
      role: "  Giude",
    },
    {
      id: 10,
      name: "Mia Robinson",
      email: "mia.robinson@example.com",
      role: "Admin",
    },
    {
      id: 11,
      name: "James Clark",
      email: "james.clark@example.com",
      role: "User",
    },
    {
      id: 12,
      name: "Olivia Lewis",
      email: "olivia.lewis@example.com",
      role: "User",
    },
    {
      id: 13,
      name: "Liam Walker",
      email: "liam.walker@example.com",
      role: "Admin",
    },
    {
      id: 14,
      name: "Ava Hall",
      email: "ava.hall@example.com",
      role: "  Giude",
    },
    {
      id: 15,
      name: "Noah Allen",
      email: "noah.allen@example.com",
      role: "User",
    },
    {
      id: 16,
      name: "Isabella Young",
      email: "isabella.young@example.com",
      role: "User",
    },
    {
      id: 17,
      name: "Lucas King",
      email: "lucas.king@example.com",
      role: "  Giude",
    },
    {
      id: 18,
      name: "Charlotte Wright",
      email: "charlotte.wright@example.com",
      role: "Admin",
    },
    {
      id: 19,
      name: "Henry Adams",
      email: "henry.adams@example.com",
      role: "User",
    },
    {
      id: 20,
      name: "Amelia Scott",
      email: "amelia.scott@example.com",
      role: "  Giude",
    },
    {
      id: 21,
      name: "Benjamin Green",
      email: "benjamin.green@example.com",
      role: "Admin",
    },
    {
      id: 22,
      name: "Ella Baker",
      email: "ella.baker@example.com",
      role: "User",
    },
    {
      id: 23,
      name: "Daniel Perez",
      email: "daniel.perez@example.com",
      role: "User",
    },
    {
      id: 24,
      name: "Grace Lee",
      email: "grace.lee@example.com",
      role: "  Giude",
    },
    {
      id: 25,
      name: "Sebastian Carter",
      email: "sebastian.carter@example.com",
      role: "User",
    },
    {
      id: 26,
      name: "Scarlett Rivera",
      email: "scarlett.rivera@example.com",
      role: "Admin",
    },
    {
      id: 27,
      name: "Elijah Mitchell",
      email: "elijah.mitchell@example.com",
      role: "  Giude",
    },
    {
      id: 28,
      name: "Lily Hernandez",
      email: "lily.hernandez@example.com",
      role: "User",
    },
    {
      id: 29,
      name: "Jack White",
      email: "jack.white@example.com",
      role: "Admin",
    },
    {
      id: 30,
      name: "Emily Torres",
      email: "emily.torres@example.com",
      role: "User",
    },
    {
      id: 31,
      name: "Alexander Sanders",
      email: "alexander.sanders@example.com",
      role: "User",
    },
    {
      id: 32,
      name: "Victoria Rogers",
      email: "victoria.rogers@example.com",
      role: "  Giude",
    },
    {
      id: 33,
      name: "Matthew Reed",
      email: "matthew.reed@example.com",
      role: "Admin",
    },
    { id: 34, name: "Zoe Cook", email: "zoe.cook@example.com", role: "User" },
    {
      id: 35,
      name: "Ryan Morgan",
      email: "ryan.morgan@example.com",
      role: "  Giude",
    },
    {
      id: 36,
      name: "Harper Bell",
      email: "harper.bell@example.com",
      role: "Admin",
    },
    {
      id: 37,
      name: "Mason Murphy",
      email: "mason.murphy@example.com",
      role: "User",
    },
    {
      id: 38,
      name: "Ella Foster",
      email: "ella.foster@example.com",
      role: "User",
    },
    {
      id: 39,
      name: "Leo Howard",
      email: "leo.howard@example.com",
      role: "  Giude",
    },
    {
      id: 40,
      name: "Hannah Ward",
      email: "hannah.ward@example.com",
      role: "Admin",
    },
    {
      id: 41,
      name: "Dylan Simmons",
      email: "dylan.simmons@example.com",
      role: "User",
    },
    {
      id: 42,
      name: "Aria Butler",
      email: "aria.butler@example.com",
      role: "  Giude",
    },
    {
      id: 43,
      name: "Nathan Sanders",
      email: "nathan.sanders@example.com",
      role: "User",
    },
    {
      id: 44,
      name: "Chloe Bryant",
      email: "chloe.bryant@example.com",
      role: "Admin",
    },
    {
      id: 45,
      name: "Evan James",
      email: "evan.james@example.com",
      role: "User",
    },
    {
      id: 46,
      name: "Sofia Griffin",
      email: "sofia.griffin@example.com",
      role: "User",
    },
    {
      id: 47,
      name: "Samuel Hayes",
      email: "samuel.hayes@example.com",
      role: "  Giude",
    },
    {
      id: 48,
      name: "Luna Carter",
      email: "luna.carter@example.com",
      role: "Admin",
    },
    {
      id: 49,
      name: "Jackson Brooks",
      email: "jackson.brooks@example.com",
      role: "User",
    },
    {
      id: 50,
      name: "Avery Perry",
      email: "avery.perry@example.com",
      role: "  Giude",
    },
  ];

  //  async function handleDelete(id) {

  //     try{
  //       setLoading(true);
  //       const response = await axios.delete(`http://localhost:1123/api/v1/users/${id}`);
  //       console.log(response);
  //     }catch(err){

  //       console.log(err.message);
  //       setLoading(false);
  //     }finally{
  //       setLoading(false);
  //     }

  //   }

  //   async function handleEdit(id,role) {

  //       try{
  //         setLoading(true);
  //         const response = await axios.put(`http://localhost:1123/api/v1/users/${id}`,{role});
  //         console.log(response);
  //       }catch(err){

  //         console.log(err.message);
  //         setLoading(false);
  //       }finally{
  //         setLoading(false);
  //   }
  // }

  return (
    <section className={styles.section}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>User Name</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Role</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {tempusers.length > 0 ? (
            tempusers.map((user) => (
              <tr key={user.id} className={styles.tr}>
                <td className={styles.td}>
                  <Link to={`/profile/${user.id}`} style={{ color: "black" }}>
                    {user.name}
                  </Link>
                </td>
                <td className={styles.td}>{user.email}</td>
                <td className={styles.td}>{user.role}</td>
                <td className={styles.td}>
                  {user.role != "Admin" && (
                    <button className={`${styles.button} ${styles.editButton}`}>
                      Edit
                    </button>
                  )}
                  <button
                    className={`${styles.button} ${styles.deleteButton}`}
                    onClick={(e) => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={styles.emptyRow}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default UserList;
