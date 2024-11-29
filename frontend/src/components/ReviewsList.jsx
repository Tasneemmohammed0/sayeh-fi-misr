import React from "react";
import Review from "../components/Review";
import { useParams } from "react-router-dom";
import axios from "axios";

function ReviewsList({ user }) {
  const [reviews, setReviews] = React.useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1123/api/v1/users/reviews/${id}`
        );
        if (response.status === "fail") {
          console.log("error");
          return;
        }
        setReviews(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [id]);
  console.log(reviews);
  return (
    <ul>
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
