
import React from 'react'
import { FaStar } from "react-icons/fa";
function Stars({count=5,fontSize="18px"}) {

  count = parseInt(count);


  const rate = [];
  for (let i = 1; i <= count; i++) {
    if (i <= count) {
      rate.push(i);
    }
  }

  return (
    <ul style={{display:"flex" , flexDirection:"rows" ,gap:"3px"}}>
      {rate.map((item) => (
        <li key={item} style={{color:"gold " , fontSize:`${fontSize}`}} >
          <FaStar />
        </li>
      ))}
    </ul>
  )
}


export default Stars