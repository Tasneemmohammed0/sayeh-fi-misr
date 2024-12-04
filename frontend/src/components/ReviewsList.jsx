import React, { useEffect, useState } from "react";
import Review from "../components/Review";
import Loading from "../components/Loading";
import axios from "axios";

function ReviewsList({ id }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:1123/api/v1/users/reviews/${id}`
        );
        if (response.status === "fail") {
          console.log("error");
          return;
        }
        setReviews(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  return (
    <ul>
      {loading && <Loading />}
      {reviews &&
        reviews.map((review, index) => {
          return (
            <li key={index}>
              {" "}
              <Review review={review} />{" "}
            </li>
          );
        })}
    </ul>
  );
}

export default ReviewsList;
