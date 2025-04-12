'use client'
import HeroSection from "@/app/components/heroSection/heroSection";
import styles from "./page.module.css";
import { useState } from "react";

export default function UserProfile() {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const handleFetchUsers = async () => {
    setMessage("");
    try {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Error fetching users.");
    }
  };

  return (
    <div>
      <HeroSection className={styles.small}></HeroSection>
      <main className={styles.main}>
        <h2>Hello, User!</h2>
        <button
          onClick={handleFetchUsers}>
          Fetch Users
        </button>
        <div>
          <ul>
            {message ||
              users.map((user, index) =>
                <li key={index}>
                  <p>{user.id}</p>
                  <p>{user.username}</p>
                  <p>{user.email}</p>
                </li>
              )}
          </ul>
        </div>
      </main>
    </div>
  );
}