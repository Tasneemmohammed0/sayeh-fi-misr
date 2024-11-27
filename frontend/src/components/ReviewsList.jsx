import React from 'react'
import Review from "../components/Review"
function ReviewsList({user}) {

  //// fetch reviews from the server for this user 

  const dummyReviews = [];
  console.log(user.reviews);
  const temp ={
    title:"Great Place",
    description:"Luxor Temple is a stunning manmade marvel from ancient Egypt, located in Luxor on the Nile's east bank. Built around 1400 BCE, this temple, dedicated to the god Amun-Ra, showcases colossal statues, towering columns, and intricate carvings by pharaohs like Amenhotep III and Ramesses II. It was a key site for the Opet Festival, celebrating kingship, and later saw additions by figures like Alexander the Great and the Romans. Uniquely, it still houses the active Mosque of Abu al-Haggag. Visiting at night, when it's beautifully illuminated, adds to its mystical allure and timeless grandeur.",
    place:"Luxxor Temple",
    date:"2021-10-10",
    rating:5,
    placePhoto:"/src/assets/images/temple.png"
  }

  for (let i = 0; i < user.reviews; i++) {
    dummyReviews.push(temp);
  }

  console.log(dummyReviews);

  return (
    <ul>
      {
      dummyReviews.map((review,index)=>{
     return <li key={index} > <Review  review={review}  /> </li>
      })
      }
 
    </ul>
  )
}

export default ReviewsList