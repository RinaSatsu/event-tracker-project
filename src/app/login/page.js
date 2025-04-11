'use client'
import Link from "next/link";
import { useState } from "react";
import HeroSection from "@/app/components/heroSection/heroSection";
import InputField from "@/app/components/inputField/inputField";
import styles from "./page.module.css";

export default function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    const errs = {};

    if (!values.email.trim()) errs.email = "Email is required.";
    if (!values.password) errs.password = "Password is required.";

    setErrors(errs);
    
    if (Object.keys(errs).length === 0) {
      setMessage("Signing in...", values);
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
          onSubmit={handleUserLogin}
          noValidate>
          <h1 className={styles.title}>Sign In</h1>
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
            />
            {errors.email && (
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
            />
            {errors.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
          </div>
          <p className={styles.message}>{message}</p>
          <button className={styles.submit}>Submit</button>
          <p className={styles.signin}>Don't have an acount? <Link href="/register">Sign up</Link></p>
        </form>
      </main>
    </div>
  );
}