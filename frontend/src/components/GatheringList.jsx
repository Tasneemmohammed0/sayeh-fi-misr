import React from "react";
import styles from "../styles/placeslist.module.css";
import Card from "./Card";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
function GatheringList({ search, filter, count = 100 }) {
  //// test before connecting to the backend

  // let gatherings = [];
  // const temp = {
  //   id: 2,
  //   name: " CMP Temple",
  //   city: "Giza",
  //   image: "/src/assets/images/CMP27.jpg",
  //   rate: 4,
  // };

  // for (let i = 0; i < count; i++) {
  //   gatherings.push(temp);
  // }

  // const temp2 = {
  //   id: 2,
  //   name: "Hany Temple",
  //   city: "Cairo",
  //   image: "/src/assets/images/temple.png",
  //   rate: 4,
  // };
  // gatherings.push(temp2);

  // const temp3 = {
  //   id: 2,
  //   name: "Hany Temple",
  //   city: "Luxor",
  //   image: "/src/assets/images/temple.png",
  //   rate: 4,
  // };
  // gatherings.push(temp3);
  let [gatherings, setGatherings] = React.useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint =
          location.pathname === "/"
            ? `http://localhost:1123/api/v1/exploregatherings`
            : `http://localhost:1123/api/v1/gatherings`;

        const response = await axios.get(endpoint);
        console.log("response");
        if (response.status === "fail") {
          console.log("error");
          return;
        }

        setGatherings(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [location.pathname]);

  const handleSelectedGathering = (id) => {
    console.log("nav");
    navigate(`/gatherings/${id}`);
  };

  if (search) {
    gatherings = gatherings.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filter && filter !== "all") {
    gatherings = gatherings.filter((item) => item.city === filter);
  }

  return (
    <div className={styles.list}>
      {gatherings.map((item, index) => (
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
            photo={item.photo}
            placeName={item.title}
            location={item.city}
            rate={item.rate}
            type="gathering"
            onClick={() => handleSelectedGathering(item.gathering_id)}
          />
        </div>
      ))}
    </div>
  );
}

export default GatheringList;
