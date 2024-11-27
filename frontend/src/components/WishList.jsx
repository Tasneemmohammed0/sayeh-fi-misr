import React from 'react'
import { useParams } from "react-router-dom";
import styles from "../styles/placeslist.module.css";
import Card from "./Card";
function WishList() {

  const { id } = useParams(); 
  /// get places from the wishlist id
  /// from the id we can get the wish list name 
  const wishListPlaces = [];
  
const temp ={
  id:2,
  name:"Karnak Temple",
  city:"Luxor",
  image:"/src/assets/images/temple.png",
  rate:4,
}
for(let i=0;i<5;i++){
  wishListPlaces.push(temp)
}

  return (
  <div>
     <h2 style={{textAlign:"center",color:"black" , fontSize:"25px"}}> Hany Wish List </h2>

     <div className={styles.list}>
     {
       wishListPlaces.map((item,index)=>
       <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}  } key={index}> 
       <Card key={index} photo={item.image} placeName={item.name } location={item.city} rate={item.rate} />
       </div>)

     }
    </div>
  </div>
  )
}

export default WishList






