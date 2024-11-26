function PlaceDetails({ place }) {
  return (
    <main>
      <div className="place-image">
        <img src={place.image} alt="place" />
      </div>
      <h1>Place Details</h1>
    </main>
  );
}

export default PlaceDetails;
