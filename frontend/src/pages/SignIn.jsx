import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "Yup";
import { Link } from "react-router-dom";
import "../styles/SignIn.css";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi";
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
    <div className="background">
      <form className="form" onSubmit={formik.handleSubmit} noValidate>
        <h1> Welcome Back </h1>
        <div className="input-wapper">
          <HiOutlineMail className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>

        <div className="input-wapper">
          <HiOutlineLockClosed className="input-icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>

        <Link to="/forgetpassword" className="forget">
          {" "}
          Forget Password ?{" "}
        </Link>
        <button type="submit" onClick={() => setSubmit(true)}>
          Sign In
        </button>
        <p>
          {" "}
          Don't have an account ?<Link to="/signup"> Register </Link>
        </p>
        {submit && (
          <ul className="error-list">
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
            {formik.touched.password && formik.errors.password && (
              <li className="error">{formik.errors.password}</li>
            )}
          </ul>
        )}
      </form>
    </div>
  );
}

export default SignIn;
