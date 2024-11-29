import React from 'react'
import styles from "../styles/placeslist.module.css";
import Card from "./Card";
function VistedList({user}) {

  /// fetching by user id to get the visited places

  const visitedPlaces = [];
  const temp ={
    id:2,
    name:"Karnak Temple",
    city:"Luxor",
    image:"/src/assets/images/temple.png",
    rate:4,
  }
  for(let i=0;i<user.placesVisited;i++){
    visitedPlaces.push(temp)
  }




  return (
   
    <div className={styles.list}>
      {
        visitedPlaces.map((item,index)=>
        <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"} }> 
        <Card key={index} photo={item.image} placeName={item.name } location={item.city} rate={item.rate} />
        </div>)
        
      }
    </div>
  )
}

export default VistedList