import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/GatheringDetails.module.css";
import Loading from "../components/Loading";
import Tabs from "../components/GatheringTabs";
import GatheringInfo from "../components/GatheringInfo";
import ReviewForm from "../components/ReviewForm";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function GatheringDetails() {
  const { gatheringId } = useParams();
  const navigate = useNavigate();
  const [gathering, setGathering] = useState({});
  const [place, setPlace] = useState({});
  const [host, setHost] = useState({});
  const [users, setUsers] = useState([]);
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [finalLoading, setFinalLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  // Fetch gathering details
  useEffect(() => {
    const fetchGathering = async () => {
      try {
        setLoadingData(true);
        setFinalLoading(true);
        const response = await axios.get(
          `http://localhost:1123/api/v1/gatherings/${gatheringId}`
        );

        if (response.status === "fail") {
          console.log("error");
          return;
        }
        // get gathering
        const gatheringData = response.data.data.gathering[0];

        console.log(gatheringData);
        // set all states
        setGathering(gatheringData);
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

        setLoadingData(false);
        setFinalLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoadingData(false);
      }
    };
    fetchGathering();
  }, []);

  function handleJoin() {
    // send join request to API
    setIsJoined(() => setIsJoined(!isJoined));
  }

  return (
    <>
      {finalLoading && <Loading />}
      <ToastContainer />
      {place && (
        <main className={styles.main}>
          <div
            className={styles.backgroundImage}
            style={{ backgroundImage: `url(${place.photo})` }}
          >
            {isJoined && <button className={styles.joinLabel}>JOINED</button>}
            <h1 className={styles.title}>{gathering.title}</h1>
          </div>
          <div className={styles.container}>
            {gathering.description != " " && (
              <div className={styles.breif}>
                <h3>Breif</h3>
                <div className={styles.description}>
                  {gathering.description}
                </div>
              </div>
            )}
            <div className={styles.gatheringBtns}>
              <div className={styles.btnContainer}>
                <IoIosAddCircleOutline
                  onClick={handleJoin}
                  className={styles.addIcon}
                />
                <p>JOIN</p>
              </div>

              <div className={styles.btnContainer}>
                <IoIosAddCircleOutline
                  onClick={() => setIsReportFormOpen(true)}
                  className={styles.addIcon}
                />
                <p>Add Report</p>
              </div>
            </div>
            <hr style={{ marginTop: "10px" }}></hr>

            <div className={styles.info}>
              <Tabs
                destination={{
                  title: "Destination",
                  name: place.name,
                  hostId: gathering.host_id,
                }}
                host={host}
              />
              <div className={styles.gatheringInfo}>
                <GatheringInfo gathering={gathering} />
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
