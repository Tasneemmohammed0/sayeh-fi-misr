import React from 'react'
import { Formik } from 'formik';
import * as Yup from 'Yup'
import {Link} from 'react-router-dom'
import '../styles/SignIn.css'
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi";
function SignIn() {

  // const formik = useFormik({}); 



  return (
    <div className='background'>
        <form className='form'>
          <h1> Welcome Back </h1>
          <div className='input-wapper'>
            <HiOutlineMail className="input-icon" />
            <input type='email' name='email' placeholder='Email' autoComplete="off" />
          </div>
          <div className='input-wapper'>
            <HiOutlineLockClosed className="input-icon" />
            <input type='password' name='password' placeholder='Password'  autoComplete="off" />
          </div>

          <Link to="/forgetpassword" className='forget'> Forget Password ? </Link>
          <button type='submit'>Sign In</button>
         <p> Don't have an account ?
            <Link to="/signup"> Register </Link>
            </p>
        </form>
    </div>
  )
}

export default SignIn