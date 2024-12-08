import { React, useState, useContext } from "react";
import styles from "../styles/placeslist.module.css";

import { useNavigate, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoAddSharp } from "react-icons/io5";

import { FiSettings } from "react-icons/fi";
import Card from "./Card";
import { UserContext } from "../App";

function PlacesList({
  search,
  filter,
  gridCount = "4",
  count = 100,
  role = "user",
  setShowAddPlace,
  showAddPlace,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState(null);

  const { places: Places, setPlaces } = useContext(UserContext);
  let places = Places;
  if (count !== 100) {
    places = Places.slice(0, count);
  }

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

  if (search) {
    places = places.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filter && filter !== "all") {
    places = places.filter((item) => item.city === filter);
  }

  const styleslist = {
    display: "grid",
    gridTemplateColumns: `repeat(${gridCount}, minmax(350px, 1fr))`,
    rowGap: "30px",
    margin: "50px 0",
    position: "relative",
  };

  function handleOptions() {
    setShowOptions((op) => !op);
    setSelectedOption(null);
  }

  async function handleDelete() {
    setSelectedOption((op) => (op === "delete" ? null : "delete"));
  }
  function handleEdit() {
    setSelectedOption((op) => (op === "edit" ? null : "edit"));
  }

  function addPlace() {
    setShowAddPlace(true);
  }

  console.log("places", places);

  return (
    <>
      <div style={styleslist} className={styles.list}>
        {/* for admin  */}
        {role == "admin" && (
          <div style={{ position: "absolute", top: "-40px", right: "10px" }}>
            {showOptions && (
              <>
                <IoAddSharp
                  className={styles.addIcon}
                  onClick={() => addPlace()}
                />

                <CiEdit
                  className={styles.editIcon}
                  onClick={() => {
                    handleEdit();
                  }}
                />
                <MdDelete
                  className={styles.deleteIcon}
                  onClick={handleDelete}
                />
              </>
            )}

            <FiSettings onClick={handleOptions} className={styles.optionIcon} />
          </div>
        )}
        {/* for admin  */}

        {places.map((item, index) => (
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
              selectedOption={selectedOption}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default PlacesList;
