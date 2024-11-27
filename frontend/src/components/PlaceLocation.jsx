import { FaSearchLocation } from "react-icons/fa";
function PlaceLocation({ location }) {
  return (
    <div>
      <a href={location} target="_blank">
        <h3>View Location on Google Maps</h3>
        <FaSearchLocation />
      </a>
    </div>
  );
}

export default PlaceLocation;
