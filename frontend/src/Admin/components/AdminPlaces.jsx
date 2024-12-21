import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

import styles from "../../styles/AllPlaces.module.css";
import PlacesList from "../../components/PlacesList";
import CreatePlaceForm from "./CreatePlaceForm";
import Loading from "../../components/Loading";

function AdminPlaces() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
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

  const [showAddPlace, setShowAddPlace] = useState(false);

  return (
    <section id="places">
      {loading && <Loading />}
      <h2 style={{ textAlign: "center", margin: "20px" }}>Places </h2>
      <div className={styles.bar} style={{ marginBottom: "30px" }}>
        <div className={styles.searchWrapper}>
          <IoIosSearch className={styles.searchIcon} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search for a place "
            className={styles.searchInput}
          />
        </div>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={styles.select}
        >
          <option value="" disabled className={styles.option}>
            Filter by City{" "}
          </option>
          <option value="all" className={styles.option}>
            All
          </option>
          {cities.map((item, index) => (
            <option key={index} value={item} className={styles.option}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <PlacesList
        search={search}
        filter={city}
        gridCount="3"
        role="admin"
        showAddPlace={showAddPlace}
        setShowAddPlace={setShowAddPlace}
      />

      {showAddPlace && (
        <CreatePlaceForm
          isOpen={showAddPlace}
          setLoading={setLoading}
          onClose={() => setShowAddPlace(false)}
        />
      )}
    </section>
  );
}

export default AdminPlaces;
