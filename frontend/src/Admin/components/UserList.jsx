import React from "react";
import styles from "../styles/UserList.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function UserList({ users, setLoading, setUsers }) {
  async function handleDelete(id) {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:1123/api/v1/users/${id}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user.user_id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(id, role) {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:1123/api/v1/users/createadmin/${id}`,
        {
          role: `${role}`,
        },
        {
          withCredentials: true,
        }
      );

      setUsers(
        users.map((user) => {
          if (user.user_id === id) {
            return { ...user, role: "admin" };
          }
          return user;
        })
      );
    } catch (err) {
      console.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

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
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index} className={styles.tr}>
                <td className={styles.td}>
                  <Link
                    to={`/profile/${user.user_id}`}
                    style={{ color: "black" }}
                  >
                    {user.username}
                  </Link>
                </td>
                <td className={styles.td}>{user.email}</td>
                <td className={styles.td}>{user.role}</td>
                <td className={styles.td}>
                  {user.role !== "admin" && (
                    <button
                      className={`${styles.button} ${styles.editButton}`}
                      onClick={() => handleEdit(user.user_id, user.role)}
                    >
                      Change to Admin
                    </button>
                  )}
                  <button
                    className={`${styles.button} ${styles.deleteButton}`}
                    onClick={() => handleDelete(user.user_id)}
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
