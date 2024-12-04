import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/placeDetails.module.css";
import SeeMoreText from "../components/SeeMoreText";
import PlaceTicketPrice from "../components/PlaceTicketPrice";
import OpeningHours from "../components/OpeningHours";
import PlaceLocation from "../components/PlaceLocation";
import DetailsPlaceCards from "../components/DetailsPlaceCards";
import { IoAddCircleSharp } from "react-icons/io5";
import AddToListForm from "../components/AddToListForm";
import Loading from "../components/Loading";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import axios from "axios";

function GatheringDetails() {
  const { gatheringId } = useParams();
  const [gathering, setGathering] = useState({});
  const [placeId, setPlaceId] = useState(0);
  const [place, setPlace] = useState([]);
  const [error, setError] = useState(null);
  const [finalLoading, setFinalLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  // Fetch gathering details
  useEffect(() => {
    const fetchGathering = async () => {
      try {
        console.log("fetching...");
        console.log(gatheringId);
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
        setGathering(response.data.data);

        // get place details
        setPlaceId(response.data.data.place_id);

        setLoadingData(false);
      } catch (err) {
        console.log(err.message);
        setLoadingData(false);
      }
    };
    fetchGathering();
  }, []);

  // fetch place details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        setFinalLoading(true);
        const response = await axios.get(
          `http://localhost:1123/api/v1/places/${placeId}`
        );

        if (response.status === "fail") {
          console.log("error");
          return;
        }

        setPlace(response.data.data);

        setLoadingData(false);
      } catch (err) {
        console.log(err.message);
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);

  return <></>;
}

export default GatheringDetails;
