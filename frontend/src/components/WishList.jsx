import React from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/placeslist.module.css";
import styles2 from "../styles/allplaces.module.css";
import Card from "./Card";

import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
function WishList() {
  const { id } = useParams();
  /// get places from the wishlist id
  /// from the id we can get the wish list name

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
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

  let wishListPlaces = [];

  const temp = {
    id: 2,
    name: "Karnak Temple",
    city: "Cairo",
    image: "/src/assets/images/temple.png",
    rate: 4,
  };
  for (let i = 0; i < 5; i++) {
    wishListPlaces.push(temp);
  }

  if (search) {
    wishListPlaces = wishListPlaces.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (city && city !== "all") {
    wishListPlaces = wishListPlaces.filter((item) => item.city === city);
  }

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
        {" "}
        Hany Wish List{" "}
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
        {wishListPlaces.map((item, index) => (
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
              photo={item.image}
              placeName={item.name}
              location={item.city}
              rate={item.rate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishList;
