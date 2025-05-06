'use client'
import ThemeToggle from '@/components/themeToggle/themeToggle';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from "./navbar.module.css";
import UserIcon from "/public/circle-user.svg";

export default function Navbar() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const updateUsername = () => {
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername || '');
    };

    updateUsername();

    window.addEventListener('login', updateUsername);
    window.addEventListener('logout', updateUsername);

    return () => {
      window.removeEventListener('login', updateUsername);
      window.removeEventListener('logout', updateUsername);
    };
  }, []);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logoText}>EventHorizon</div>
          <ul>
            <li><Link
              className={styles.link}
              href="/">
              Discover
            </Link></li>
            <li><Link
              className={styles.link}
              href="/search">
              Find
            </Link></li>
            <li><Link
              className={styles.link}
              href="/favevents">
              List
            </Link></li>
            <li><Link
              className={styles.link}
              href="/calendar">
              Plan
            </Link></li>
          </ul>
        </nav>
        <ul>
          <li>
            <Link
              className={styles.linkButton}
              href={username ? '/userprofile' : '/login'}>
              <UserIcon />
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </div>
  );
}