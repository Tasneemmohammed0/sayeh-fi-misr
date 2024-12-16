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
      <h3 className={styles.header}>Ticket Price</h3>
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
            }}
          >
            <PlaceLocation
              location={destination.location}
              name={destination.name}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            {host.profile_pic && (
              <img
                onClick={() => navigate(`/profile/${hostId}`)}
                src={host.profile_pic}
                alt="host-pic"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            )}
            <div
              style={{
                marginLeft: "20px",
                marginRight: "10px",
                fontWeight: "bold",
                fontSize: "22px",
                color: "var(--our-blue)",
                cursor: "pointer",
              }}
            >
              {host.first_name} {host.last_name}
            </div>
            <IoNavigateCircleOutline
              onClick={() => navigate(`/profile/${hostId}`)}
              className={styles.icon}
              color="var(--our-blue)"
              fontSize="25px"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;
