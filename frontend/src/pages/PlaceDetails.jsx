import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/placedetails.css";
import SeeMoreText from "../components/SeeMoreText";

function PlaceDetails() {
  const { placeId } = useParams();
  const [place, setPlace] = useState({});
  const [error, setError] = useState(null);

  // fetch place data from the API
  useEffect(() => {
    console.log(placeId);
    fetch(` http://localhost:1123/api/v1/places/${placeId}`)
      .then((res) => res.json())
      .then((data) => setPlace(data.data.Place))
      .then((err) => setError(err));
  }, [placeId]);

  return (
    <main>
      <div
        className="place-image"
        style={{ backgroundImage: `url(${place.image})` }}
      >
        <h1 className="place-title">Pyramids of Giza</h1>
      </div>
      <div className="place-details-container">
        <div className="place-breif">
          <h3>Breif</h3>
          <SeeMoreText text={place.breif} />
        </div>
      </div>
    </main>
  );
}

export default PlaceDetails;
