/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "../styles/PlaceTicketPrice.module.css";
import PlaceLocation from "./PlaceLocation";
import { IoNavigateCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Tabs({ destination, host, hostId }) {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(destination.title);
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Gathering Info</h3>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            selectedTab == destination.title ? styles.active : ""
          }`}
          onClick={() => setSelectedTab(destination.title)}
        >
          {destination.title}
        </button>
        <button
          className={`${styles.tab} ${
            selectedTab == "Host" ? styles.active : ""
          }`}
          onClick={() => setSelectedTab("Host")}
        >
          Host
        </button>
      </div>
      <div>
        {selectedTab === destination.title ? (
          <div
            style={{
              marginTop: "30px",
              padding: "0 20px",
            }}
          >
            <PlaceLocation
              location={destination.location}
              name={destination.name}
            />
          </div>
        ) : (
          <div
            onClick={() => navigate(`/profile/${hostId}`)}
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
              padding: "0 40px",
            }}
          >
            {host.profile_pic && (
              <img
                src={host.profile_pic}
                alt="host-pic"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: "2px solid var(--our-brown)",
                }}
              />
            )}
            <div
              style={{
                marginLeft: "20px",
                marginRight: "10px",
                fontWeight: "bold",
                fontSize: "23px",
                color: "var(--our-brown)",
                cursor: "pointer",
              }}
            >
              {host.first_name} {host.last_name}
            </div>
            <IoNavigateCircleOutline
              className={styles.icon}
              color="var(--our-brown)"
              fontSize="25px"
              onClick={() => {
                navigate(`/profile/${hostId}`);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;
