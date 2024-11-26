import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import styles from  "../styles/AllPlaces.module.css";
import PlacesList from "../components/PlacesList";
function AllPlaces() {

  const [search,setSearch]=useState("");
  const [city,setCity]=useState("");
  const cities=["Cairo","Giza","Alexandria","Luxor","Aswan","Suez","Ismailia","Marsa Matrouh","Al-Beheira","Kafr al-Sheikh","Gharbiyya","Sharqiyya","Fayyum","Beni Suef","Minya","Asyut","New Valley","Sohag","Qena","The Red Sea","South Sinai"   ];

  return (
    <main>
      <div className={styles.imageContainer }>
        <img src="/src/assets/images/temple.png" alt='AllPlaces' className={styles.mainImage}/>
      </div>
      <div className={styles.bar}>
        <div className={styles.searchWrapper}>
          <IoIosSearch className={styles.searchIcon} />
          <input type='text' value={search} onChange={(e)=>setSearch(e.target.value)}   placeholder='search for a place ' className={styles.searchInput}/>
        </div>
        <select value={city} onChange={(e)=>setCity(e.target.value)} className={styles.select}>
          <option value="" disabled className={styles.option}>Filter by City </option>
          <option value="all" className={styles.option}>All</option>
          {cities.map((item,index)=><option key={index} value={item} className={styles.option}>{item}</option>)}
        </select>

      </div>       
     
        <PlacesList search={search} filter={city}/>
    
    </main>
  )
}

export default AllPlaces