'use client'
import { useState } from "react";
import HeroSection from "../components/heroSection/heroSection";
import InputField from "../components/inputField/inputField";
import styles from "./page.module.css";
import Link from "next/link";

function validateForm(values) {
  const { username, email, password, confirmPassword } = values;
  const errors = {};

  if (!username.trim()) {
    errors.username = "Username is required.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email address.";
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]{8,}$/;
  if (!password) {
    errors.password = "Password is required.";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Password must be at least 8 characters, include upper and lowercase letters, and a number.";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

function validateFormField(name, values) {
  console.log(values);
  return validateForm(values)[name];
}

export default function RegisterPage() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const fieldError = validateFormField(name, values);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const validationErrors = validateForm(values);

    setErrors(validationErrors);

    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    // try {
    //   const res = await fetch("/api/register", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ username, email, password }),
    //   });

    //   const data = await res.json();
    //   if (res.ok) {
    //     setMessage("Registration sucessfull!");
    //     setUsername("");
    //     setEmail("");
    //     setPassword("");
    //   } else {
    //     setMessage(data.error || "Failed to add user");
    //     throw new Error(data.message);
    //   }
    // } catch (error) {
    //   setMessage("Error adding user");
    // }
    if (Object.keys(validationErrors).length === 0) {
      setMessage("Registration successful!");
      setValues({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } else {
      setMessage("");
    }
  }


  return (
    <div className={styles.page}>
      <HeroSection className={styles.small}></HeroSection>
      <main className={styles.main}>
        <form
          className={styles.form}
          onSubmit={handleUserSubmit}>
          <h1 className={styles.title}>Register</h1>
          <p className={styles.subtitle}>Signup now and get full access to our app.</p>
          <div>
            <InputField
              className={styles.input}
              label="Username"
              name="username"
              placeholder=""
              type="text"
              autoComplete="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.username && errors.username && <div className={styles.error}>{errors.username}</div>}
          </div>
          <div>
            <InputField
              className={styles.input}
              label="Email"
              name="email"
              placeholder=""
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <div className={styles.error}>{errors.email}</div>
            )}
          </div>
          <div>
            <InputField
              className={styles.input}
              label="Password"
              name="password"
              placeholder=""
              type="password"
              autoComplete="new-password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
          </div>
          <div>
            <InputField
              className={styles.input}
              label="Confirm Password"
              name="confirmPassword"
              placeholder=""
              type="password"
              autoComplete="off"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <div className={styles.error}>{errors.confirmPassword}</div>
            )}
          </div>
          <p className={styles.message}>{message}</p>
          <button className={styles.submit}>Submit</button>
          <p className={styles.signin}>Already have an acount? <Link href="/login">Sign in</Link></p>
        </form>
      </main>
    </div>
  );
}