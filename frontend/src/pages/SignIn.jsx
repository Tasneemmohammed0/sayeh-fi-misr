import React, { useState } from "react";
import axios from "axios";

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
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage";
function SignIn() {
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required(" Email is Required"),
    password: yup.string().required(" Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      // add it to the database by calling an API
      const res = await axios.post(
        `http://localhost:1123/api/v1/users/login`,
        values,
        { withCredentials: true }
      );
      setLoading(false);
      console.log(res.data);
      navigate("/home");
    },
  });

  return (
    <div className={styles.background}>
      {loading && <Loading />}
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
