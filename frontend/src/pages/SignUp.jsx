import React, { useEffect, useState,useReducer  } from 'react';
import  styles from '../styles/signup.module.css';
import PersonalForm from '../components/PersonalForm';
import AccountForm from '../components/AccountForm';

function reducer(state, action) {
  switch (action.type) {
    case "updateFirstname":
      if(action.payload.length < 1){
        return {...state, error_firstname: "Firstname must be at least 3 characters long"};
      }
      else if(action.payload.length > 50){
      return {...state, error_firstname: "Firstname must be less than 50 characters long"};
      }
      else if (!/^[a-zA-Z\s]+$/.test(action.payload)) {
        return {
          ...state,
          error_firstname: "Firstname must only contain letters and spaces",
        };
      }
      return { ...state, first_name: action.payload, error_firstname: "" };

    case "updateLastname":
      if(action.payload.length < 3){
        return {...state, error_lastname: "Lastname must be at least 3 characters long"};
      }
      else if(action.payload.length > 50){
      return {...state, error_lastname: "Lastname must be less than 50 characters long"};
      }
      else if (!/^[a-zA-Z\s]+$/.test(action.payload)) {
        return {
          ...state,
          error_lastname: "Lastname must only contain letters and spaces"}
        }
      return { ...state, last_name: action.payload, error_lastname: "" };
    case "updateAge":
      return { ...state, age: action.payload };
    case "updateGender":
      return  { ...state , gender: action.payload };
    case "updateCountry":
      return { ...state, country: action.payload };
    case "updateCity":
      return { ...state, city: action.payload };
    case "updateNationality":
      return { ...state , nationality: action.payload };

///////////////////////////////////////////////////////////
    case "updateUsername":
      if(action.payload.length < 3){
        return {...state, error_username: "Username must be at least 3 characters long"};
      }
      else if(action.payload.length > 50){
      return {...state, error_username: "Username must be less than 50 characters long"};
      }
      return { ...state, username: action.payload, error_username: "" };
    case "updateProfilepic":
      return { ...state, profilepic: action.payload };
    case "updateEmail":
      if (!action.payload.includes("@")) {
        return { ...state, error_email: "Invaild email " };
      } 
      return { ...state, email: action.payload, error_email: "" };
      case "updatePassword":

        if(action.payload.length < 8){
          return {...state, error_password: "Password must be at least 8 characters long"};
        }
        else if(!action.payload.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)){
          return {...state, error_password: "Password must contain at least one uppercase letter, one lowercase letter, and one number"};
        }
        return { ...state, password: action.payload, error_password: "" };
    case "updateRole":
      return { ...state, role: action.payload };

      
    default:
      throw new Error("Unknown action type");
  }
}

function SignUp() {

  const initialState = {
    first_name: "",
    error_firstname: "",
    last_name: "",
    error_lastname: "",
    age: 0,
    gender: "",
    country: "",
    city: "",
    nationality: "",
    username: "",
    error_username: "",
    profilepic: "",
    email: "",
    error_email: "",
    password: "",
    error_password: "",
    role: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);


  const [count, setCount] = useState(0);


function handleCount(e,dir) {

if(count === 0 && dir !== "next"){
  return ;
}
if(count === 1 && dir !== "back"){
  return ;
}


if(dir === "next"){
  setCount((count)=>count+1);
}else{
  setCount((count)=>count-1);
}
}




  return(
    <div className={styles.backGround}>
    
<h2 className={styles.head}>Explore the beauty of Egypt</h2>

      {count==0 && <PersonalForm   state={state} dispatch={dispatch}  handleCount={handleCount}/>}
      {count ==1 && <AccountForm  state={state} dispatch={dispatch}  handleCount={handleCount}/>}
    </div>
  )













  // Fetch countries on initial load
  // useEffect(() => {
  //   async function getCountries() {
  //     const url = 'https://country-state-city-search-rest-api.p.rapidapi.com/allcountries';
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         'x-rapidapi-key': 'ca3fc7c7c0mshdd4992f90c668c4p1a3606jsn59fff8298748',
  //         'x-rapidapi-host': 'country-state-city-search-rest-api.p.rapidapi.com',
  //       },
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       let result = await response.json();
  //       //// remove this non country from the list (don't remove it) 
  //       result= result.filter((item) => item.name !== 'Israel');
  //       ///////////////////////////////////////////////////////
  //       setCountries(result);
  //       console.log(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getCountries();
  // }, []);

  // // Fetch cities when a country is selected
  // useEffect(() => {
  //   if (!selectedCountry) return;

  //   async function getCities() {
  //     const country = countries.find((item) => item.name === selectedCountry);
  //     if (!country || !country.isoCode) return;

  //     const countryCode = country.isoCode; 
  //     const url = `https://country-state-city-search-rest-api.p.rapidapi.com/states-by-countrycode?countrycode=${countryCode}`;
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         'x-rapidapi-key': 'ca3fc7c7c0mshdd4992f90c668c4p1a3606jsn59fff8298748',
  //         'x-rapidapi-host': 'country-state-city-search-rest-api.p.rapidapi.com',
  //       },
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.json();
  //       setCities(result);
  //       console.log(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getCities();
  // }, [selectedCountry, countries]);


////////////////////////////////////////////////////


// function handleCount(e,dir) {
// e.preventDefault(); 

// if(count === 0 && dir !== "next"){
//   return ;
// }
// if(count === 2 && dir !== "back"){
//   return ;
// }


// if(dir === "next"){
//   setCount((count)=>count+1);
// }else{
//   setCount((count)=>count-1);
// }
// }


//   return (
//     <div className={styles.backGround}>
//       <form className={styles.form}>
//         <h2 className={styles.head}>Explore the beauty of Egypt</h2>
//         {/* person info   */ }
//         {count === 0 && (
//           <>
//             <div className={styles.inputWapper  }>
//               <label className={styles.label}>First Name</label>
//               <input className={styles.input}   type="text" name="firstname" placeholder="First Name" />
//             </div>
//             <div className={styles.inputWapper}>
//               <label className={styles.label}>Last Name</label>
//               <input className={styles.input}  type="text" name="lastname" placeholder="Last Name" />
//             </div>
//             <div className={`${styles.inputWapper} ${styles.start}`}>
//               <label className={`${styles.label} ${styles.marginR}`}>Age</label>
//               <select className={styles.select} name="age" required>
//                 {age.map((item, index) => (
//                   <option key={index} value={item}>
//                     {item}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className={`${styles.inputWapper}`}>
//               <label className={`${styles.label} ${styles.marginR}`}>Gender</label>
//               <select name="gender" >
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//             </div>
//           </>
//         )}

//         {/* account info   */ }

//         {count === 1 && (
//           <>
//             <div className={styles.inputWapper}>
//               <label className={styles.label}>User Name </label>
//               <input className={styles.input} type="text" name="username" placeholder="User Name" />
//             </div>
//             <div className={styles.inputWapper}>
//               <label className={styles.label}>Profile Image</label>
//               <input className={styles.input} type="file" name="profilepic" />
//             </div>
//             <div className={styles.inputWapper}>
//               <label>Email</label>
//               <input type="email" name="email" placeholder="Email" />
//             </div>
//             <div className={styles.inputWapper}>
//               <label>Password</label>
//               <input type="password" name="password" placeholder="Password" />
//             </div>
//           </>
//         )}
//         {count === 2 && (
//           <>
//             


//             <div className={styles.inputWapper}>
//             <label>Role</label>
//               <select name="role" placeholder="">
//                 <option value="tourist">Tourist</option>
//                 <option value="guide">Guide</option>
//               </select>
//             </div>
//           </>
//         )}
//         <div>
//           {count < 2 && <button className={styles.btn} onClick={(e)=>handleCount(e,"next") }>Next</button>}
//           {count === 2 && <button className={styles.btn} type='submit'>Submit</button>}
//         </div>
//       </form>

  
//     </div>
//   );
 }

export default SignUp;