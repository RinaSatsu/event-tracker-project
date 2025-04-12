'use client'
import HeroSection from "@/app/components/heroSection/heroSection";
import styles from "./page.module.css";
import { useState } from "react";
import UserCard from "../components/userCard/userCard";
import ActionButton from "../components/actionButton/actionButton";

export default function UserProfile() {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const handleFetchUsers = async () => {
    setMessage("Loading...");
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
    setMessage("");
  };

  return (
    <div>
      <HeroSection className={styles.small}></HeroSection>
      <main className={styles.main}>
        <h2 className={styles.greeting}>Hello, <span>User</span>!</h2>
        <ActionButton
          className={styles.btn}
          clickHandler={handleFetchUsers}>
          Fetch Users
        </ActionButton>
        <div className={styles.userDiv}>
          <div>
            {message && <p className={styles.message}>{message}</p>}
            {users?.length > 0 && (
              <ul className={styles.userContainer}>
                {users.map((user, index) => (
                  <li key={index}>
                    <UserCard
                      id={user.id}
                      username={user.username}
                      email={user.email}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}