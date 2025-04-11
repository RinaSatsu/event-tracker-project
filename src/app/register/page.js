'use client'
import { useState } from "react";
import HeroSection from "../components/heroSection/heroSection";
import InputField from "../components/inputField/inputField";
import styles from "./page.module.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Registration sucessfull!");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.error || "Failed to add user");
        throw new Error(data.message);
      }
    } catch (error) {
      setMessage("Error adding user");
    }
  }


  return (
    <div className={styles.page}>
      <HeroSection className={styles.small}></HeroSection>
      <main className={styles.main}>
        <form
          className={styles.form}
          onSubmit={handleUserSubmit}>
          <h1 className={styles.title}>Register </h1>
          <p className={styles.subtitle}>Signup now and get full access to our app.</p>
          <InputField
            className={styles.input}
            label="Username"
            placeholder=""
            type="text"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            className={styles.input}
            label="Email"
            placeholder=""
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            className={styles.input}
            label="Password"
            placeholder=""
            type="password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$"
            autoComplete="new-password"
            required
            alue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            className={styles.input}
            label="Confirm Password"
            placeholder=""
            type="password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$"
            autoComplete="off"
            required
          />
          <p className={styles.message}>{message}</p>
          <button className={styles.submit}>Submit</button>
          <p className={styles.signin}>Already have an acount ? <a href="#">Signin</a> </p>
        </form>
      </main>
    </div>
  );
}