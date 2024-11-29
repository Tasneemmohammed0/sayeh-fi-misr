import React, { useState } from "react";
//// form validation
import { useFormik } from "formik";
import * as yup from "Yup";
//// router
import { Link } from "react-router-dom";
///// icons

import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi";
////
import styles from "../styles/signIn.module.css";

import ErrorMessage from "../components/ErrorMessage";
function SignIn() {
  const [submit, setSubmit] = useState(false);
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required(" Email is Required"),
    password: yup
      .string()
      .min(8, "Password is too short - should be 8 chars minimum")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required(" Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // add it to the database by calling an API
      // but now conslog the values
      console.log(values);
    },
  });

  return (
    <div className={styles.background}>
      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
        <h2> Welcome back! </h2>
        <div className={styles.inputWrapper}>
          <HiOutlineMail className={styles.inputIcon} />
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>

        <div className={styles.inputWrapper}>
          <HiOutlineLockClosed className={styles.inputIcon} />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>

        <Link to="/forgetpassword" className={styles.forget}>
          {" "}
          Forget Password ?{" "}
        </Link>
        <button
          type="submit"
          onClick={() => setSubmit(true)}
          className={styles.button}
        >
          Sign In
        </button>
        <p>
          {" "}
          Don't have an account ?<Link to="/signup"> Register </Link>
        </p>
        {submit && (
          <ul className={styles.errorList}>
            {formik.touched.email && formik.errors.email && (

              <li>
                {" "}
                <ErrorMessage error={formik.errors.email} />{" "}
              </li>
            )}
            {formik.touched.password && formik.errors.password && (
              <li>
                {" "}
                <ErrorMessage error={formik.errors.password} />{" "}
              </li>

            )}
          </ul>
        )}
      </form>
    </div>
  );
}

export default SignIn;
