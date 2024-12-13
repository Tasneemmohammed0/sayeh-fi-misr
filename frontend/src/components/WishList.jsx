import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/placeslist.module.css";
import styles2 from "../styles/allplaces.module.css";
import Loading from "../components/Loading";
import Card from "./Card";
import axios from "axios";

import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
function WishList() {
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  /// get places by the wishlist id
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:1123/api/v1/wishlist/${id}`
        );
        setWishlist(response.data.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSelectedPlace = (e, id) => {
    // admin
    console.log(e.target.tagName.toLowerCase());
    if (
      e.target.tagName.toLowerCase() !== "svg" &&
      e.target.tagName.toLowerCase() !== "path"
    ) {
      navigate(`/places/${id}`);
    }
  };

  const cities = [
    "Cairo",
    "Giza",
    "Alexandria",
    "Luxor",
    "Aswan",
    "Suez",
    "Ismailia",
    "Marsa Matrouh",
    "Al-Beheira",
    "Kafr al-Sheikh",
    "Gharbiyya",
    "Sharqiyya",
    "Fayyum",
    "Beni Suef",
    "Minya",
    "Asyut",
    "New Valley",
    "Sohag",
    "Qena",
    "The Red Sea",
    "South Sinai",
  ];

  return (
    <div style={{ backgroundColor: "#f5e8d4", paddingTop: "20px" }}>
      <h2
        style={{
          textAlign: "center",
          color: "black",
          fontSize: "25px",
          marginBottom: "25px",
        }}
      >
        {wishlist[0]?.wishlist_name}
      </h2>
      {/* Search  and filter */}
      <div className={styles2.bar}>
        <div className={styles2.searchWrapper}>
          <IoIosSearch className={styles2.searchIcon} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search for a place "
            className={styles2.searchInput}
          />
        </div>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={styles2.select}
        >
          <option value="" disabled className={styles2.option}>
            Filter by City{" "}
          </option>
          <option value="all" className={styles2.option}>
            All
          </option>
          {cities.map((item, index) => (
            <option key={index} value={item} className={styles2.option}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.list}>
        {wishlist.map((item, index) => {
          if (city && city !== "all" && item?.city != city) return null;
          if (search && !item?.name.toLowerCase().includes(search)) return null;
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
              key={index}
            >
              <Card
                key={index}
                card={item}
                onClick={(e) => handleSelectedPlace(e, item.place_id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WishList;
