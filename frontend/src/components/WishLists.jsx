
import React from 'react'
import { useState } from "react";
import WishListForm from "./WishListForm";
import WishList from './WishList';

import {NavLink} from "react-router-dom";

import styles from "../styles/WishLists.module.css";

function WishLists({user}) {

  ////// fetching by user id to get the wishlists
  const [isFormOpen, setIsFormOpen] = useState(false);

  const wishLists = [];
  let temp ={
    id:1,
    name:"My Wishlist",
    description:"This is my wishlist",
  }
  
  let temp2 ={
    id:2,
    name:"hany Wishlist",
    description:"This is my  bad wishlist",
  }
  


  wishLists.push(temp)
  wishLists.push(temp2)

//// note validation if the user has no wishlists no need 
console.log(wishLists)


  return (

    <div style={{position:'relative'}}>    

        <button  className={styles.create} onClick={() => setIsFormOpen(true)}>Create Wishlist</button>
        <WishListForm isOpen={isFormOpen} handleForm={setIsFormOpen} />
      
        <ul style={{display:"flex",gap:"20px", flexDirection:"column" ,paddingTop:"30px"}}>
       {
       wishLists.map((wishList,index)=>{
        return  <NavLink key={index} to={`wishlist/${wishList.id}`}>
        <li key={index} className={styles.wishListInfo}>
            <h2 className={styles.titleStyle}>{wishList.name}</h2>
            <p className={styles.description}>{wishList.description}</p>
        </li>
      </NavLink>
        }
       )
        }
        </ul>
    </div>
  )
}

export default WishLists

