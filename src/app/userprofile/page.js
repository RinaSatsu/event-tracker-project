'use client'
import HeroSection from "@/app/components/heroSection/heroSection";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserCard from "../components/userCard/userCard";
import ActionButton from "../components/actionButton/actionButton";

export default function UserProfile() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem('username');
    setUsername(username);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('username');
    window.dispatchEvent(new Event('logout'));
    router.push("/login");
  }

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
        <h2 className={styles.greeting}>Hello, <span>{username}</span>!</h2>
        <button
          onClick={handleLogout}
          className={styles.logoutBtn}>
          Log out
        </button>
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