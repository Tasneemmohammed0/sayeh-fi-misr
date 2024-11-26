import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PlaceDetails() {
  const { placeId } = useParams();
  const [place, setPlace] = useState({});
  const [error, setError] = useState(null);

  // fetch place data from the API
  useEffect(() => {
    console.log(placeId);
    fetch(` http://localhost:1123/api/v1/places/${placeId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.Place);
        return setPlace(data.data.Place);
      })
      .then((err) => setError(err));
  }, [placeId]);

  return (
    <main>
      <div className="place-image">
        <h1 className="place-title">Pyramids of Giza</h1>
      </div>
    </main>
  );
}

export default PlaceDetails;
