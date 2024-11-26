import React from 'react'
import styles from "../styles/placeslist.module.css";
import Card from "./Card";
function PlacesList({search,filter,count=100}) {




  //// test before connecting to the backend

  let places=[]
  const temp ={
    id:2,
    name:"Karnak Temple",
    city:"Luxor",
    image:"/src/assets/images/temple.png",
    rate:4,
  }
  for(let i=0;i<count;i++){
    places.push(temp)
  }

  const temp2 ={
    id:2,
    name:"Hany Temple",
    city:"Cairo",
    image:"/src/assets/images/temple.png",
    rate:4,
  }
  places.push(temp2);

  const temp3 ={
    id:2,
    name:"Hany Temple",
    city:"Luxor",
    image:"/src/assets/images/temple.png",
    rate:4,
  }
  places.push(temp3);


  if(search){
    places=places.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
  }
  
  if(filter && filter!=="all"){
      places=places.filter((item)=>item.city===filter)
  }


  return (
    <div className={styles.list}>
      {
        places.map((item,index)=>
        <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"} }> 
        <Card key={index} photo={item.image} placeName={item.name } location={item.city} rate={item.rate} />
        </div>)
        
      }
    </div>
  )
}

export default PlacesList