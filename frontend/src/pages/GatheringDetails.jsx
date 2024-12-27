/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/GatheringDetails.module.css";
import Loading from "../components/Loading";
import Tabs from "../components/GatheringTabs";
import GatheringInfo from "../components/GatheringInfo";
import ReviewForm from "../components/ReviewForm";
import { IoIosAddCircleOutline, IoIosSearch, IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../App";
import axios from "axios";
import NavBar from "../components/NavBar";

function GatheringDetails() {
  const { gatheringId } = useParams();
  const navigate = useNavigate();
  const [gathering, setGathering] = useState({});
  const [place, setPlace] = useState({});
  const [host, setHost] = useState({});
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [finalLoading, setFinalLoading] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [deletedUser, setDeletedUser] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [isFull, setIsFull] = useState(false);
  const [currentCapacity, setCurrentCapacity] = useState(0);
  const { user } = useContext(UserContext);

  // close gathering when time of it is gone
  function checkGatheringTime() {
    const gatheringDate = new Date(gathering.gathering_date);
    const currentDate = new Date();

    // Set the time of both dates to 00:00:00 to ignore the time part
    currentDate.setHours(0, 0, 0, 0);
    gatheringDate.setHours(0, 0, 0, 0);
    const diffInMs = currentDate - gatheringDate;
    const oneDayInMs = 24 * 60 * 60 * 1000;

    // check if difference is one day or more
    if (diffInMs >= oneDayInMs) {
      setIsOpen(false);
    }
  }

  // Fetch gathering details
  useEffect(() => {
    const fetchGathering = async () => {
      try {
        setFinalLoading(true);
        const response = await axios.get(
          `http://localhost:1123/api/v1/gatherings/${gatheringId}`
        );

        // get gathering
        const gatheringData = response.data.data.gathering[0];

        // set all states
        setGathering(gatheringData);
        setIsOpen(gathering.is_open);

        setPlace({
          photo: gatheringData.photo,
          location: gatheringData.location,
          name: gatheringData.name,
        });

        setHost({
          profile_pic: gatheringData.profile_pic,
          first_name: gatheringData.first_name,
          last_name: gatheringData.last_name,
          phone_number: gatheringData.phone_number,
        });

        setUsers(response.data.data.users);
        setCurrentCapacity(response.data.data.current_capacity);
        setIsFull(response.data.data.isFull);

        checkGatheringTime();

        setFinalLoading(false);
      } catch (err) {
        toast(err.response.data.message);
        setFinalLoading(false);
      }
    };
    fetchGathering();
  }, [isJoined, addUser, deletedUser, deletedUser, isOpen]);

  // check joining status
  useEffect(() => {
    async function checkJoiningStatus() {
      try {
        if (!user) return;

        const response = await axios.get(
          `http://localhost:1123/api/v1/gatherings/${gatheringId}/checkJoined`,
          {
            withCredentials: true,
          }
        );

        // set joining status
        setIsJoined(response.data.data);
      } catch (err) {
        if (!user) return;
        toast(err.response.data.message);
      }
    }
    checkJoiningStatus();
  }, [addUser, deletedUser, user]);

  async function handleJoin() {
    try {
      // check if close
      if (!isOpen && !isJoined) {
        toast("Gathering is closed");
        return;
      }

      // check avalaible capacity
      if (isFull && !isJoined) {
        toast("Gathering is full");
        return;
      }

      const url = isJoined
        ? `http://localhost:1123/api/v1/gatherings/${gatheringId}/leave`
        : `http://localhost:1123/api/v1/gatherings/${gatheringId}/join`;

      // gathering is already joined
      if (isJoined) {
        // handle leave gathering
        const res = await axios.delete(url, {
          withCredentials: true,
        });

        toast("You left the gathering");
      } else {
        const joinData = {
          date: new Date().toISOString(),
        };
        // send join request to API
        const res = await axios.post(url, joinData, {
          withCredentials: true,
        });

        toast("🎉 Joined successfully");
      }

      // send join request to API
      setIsJoined((isJoined) => !isJoined);
    } catch (err) {
      toast.error(`${err.response.data.message}`);
    }
  }

  async function handleAddUser() {
    if (!search) return;

    // check if close
    if (!isOpen) {
      toast("Gathering is closed");
      return;
    }

    if (isFull) {
      toast("Can't join, Gathering is full");
      return;
    }

    try {
      // send join request to API
      const res = await axios.post(
        `http://localhost:1123/api/v1/gatherings/${gatheringId}/addToGathering`,
        { username: search, date: new Date().toISOString() },
        {
          withCredentials: true,
        }
      );

      setAddUser(search);
      setSearch("");

      toast("🎉 Joined successfully");
    } catch (err) {
      // show descriptive message
      toast(`⚠️ ${err.response.data.message}`);
    }
  }

  async function handleDeleteUser(userId) {
    try {
      // send join request to API
      const res = await axios.delete(
        `http://localhost:1123/api/v1/gatherings/${gatheringId}/${userId}`,

        {
          withCredentials: true,
        }
      );

      setDeletedUser(userId);

      toast("Deleted successfully");
    } catch (err) {
      // show descriptive message
      toast(`⚠️ ${err.response.data.message}`);
    }
  }
  return (
    <>
      {finalLoading && <Loading />}
      <ToastContainer />
      {place && (
        <main className={styles.main}>
          <NavBar open={false} />
          <div
            className={styles.backgroundImage}
            style={{ backgroundImage: `url(${place.photo})` }}
          >
            {isFull && <button className={styles.fullLabel}>FULL</button>}
            {isJoined && <button className={styles.joinLabel}>JOINED</button>}

            <h1 className={styles.title}>{gathering.title}</h1>
          </div>
          <div className={styles.container}>
            {gathering.description && (
              <div className={styles.breif}>
                <h3>Breif</h3>
                <div className={styles.description}>
                  {gathering.description}
                </div>
              </div>
            )}
            {user && (
              <div className={styles.gatheringBtns}>
                <div
                  onClick={() => handleJoin()}
                  className={styles.btnContainer}
                >
                  {!isJoined && isOpen && (
                    <IoIosAddCircleOutline className={styles.addIcon} />
                  )}
                  <p>{isJoined ? `Leave` : isOpen ? `JOIN` : `CLOSED`}</p>
                </div>

                <div
                  onClick={() => setIsReportFormOpen(true)}
                  className={styles.btnContainer}
                >
                  <IoIosAddCircleOutline className={styles.addIcon} />
                  <p>Add Report</p>
                </div>
              </div>
            )}
            <hr style={{ marginTop: "10px" }}></hr>

            <div className={styles.info}>
              <Tabs
                destination={{
                  title: "Destination",
                  name: place.name,
                }}
                host={host}
                hostId={gathering.host_id}
              />
              <div className={styles.gatheringInfo}>
                <GatheringInfo
                  gathering={gathering}
                  currentCapacity={currentCapacity}
                />
              </div>
            </div>
            <ReviewForm
              isOpen={isReportFormOpen}
              setIsOpen={setIsReportFormOpen}
              isReport={true}
              gatheringId={gatheringId}
            />
            <hr style={{ marginTop: "10px" }}></hr>
          </div>
          {/* Gatherings Participants */}
          <div className={styles.usersSection}>
            <div className={styles.usersHeader}>
              <h2>Gather Together, Explore Together!</h2>
              <h3 style={{ margin: "10px" }}>Get to Know the Group!</h3>
            </div>
            {user?.user_id === gathering.host_id && (
              <div className={styles.inviteUserContainer}>
                <div className={styles.searchWrapper}>
                  <IoIosSearch className={styles.searchIcon} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="search for a user by username "
                    className={styles.searchInput}
                  />
                </div>

                <button className={styles.btn} onClick={handleAddUser}>
                  Add User
                </button>

                <button
                  className={styles.DeleteBtn}
                  onClick={() => setDeleteUser(!deleteUser)}
                >
                  Delete User
                </button>
              </div>
            )}

            <div className={styles.usersContainer}>
              {users.map((user) => (
                <div key={user.user_id} className={styles.user}>
                  <img
                    src={user.profile_pic}
                    alt="user-pic"
                    onClick={() => navigate(`/profile/${user.user_id}`)}
                  />

                  <p onClick={() => navigate(`/profile/${user.user_id}`)}>
                    {user.first_name} {user.last_name}
                  </p>
                  {deleteUser && (
                    <IoIosClose
                      className={styles.xBtn}
                      onClick={() => handleDeleteUser(user.user_id)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default GatheringDetails;
