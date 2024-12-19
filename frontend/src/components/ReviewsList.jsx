import React, { useEffect, useState } from "react";
import Review from "../components/Review";
import Loading from "../components/Loading";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function ReviewsList({ id, canEdit, setStats }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:1123/api/v1/users/reviews/${id}`
        );
        setReviews(response.data.data);
        setLoading(false);
      } catch (err) {
        toast.error(err.response.data.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  return (
    <ul id="reviews" style={{ margin: "0 70px" }}>
      {loading && <Loading />}
      {reviews &&
        reviews.map((review, index) => {
          return (
            <li key={index}>
              {" "}
              <Review
                setStats={setStats}
                review={review}
                setReviews={setReviews}
                setLoading={setLoading}
                loading={loading}
                canEdit={canEdit}
              />{" "}
            </li>
          );
        })}
    </ul>
  );
}

export default ReviewsList;
