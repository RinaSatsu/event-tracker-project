'use client'
import Link from 'next/link';
import Image from "next/image";
import styles from "./navbar.module.css";

const changeTheme = () => {
  setTheme(theme === 'dark' ? 'light' : 'dark');
}

export default function Navbar() {
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
              href="/eventlist">
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
            <button>
              <Image
                className={styles.icon}
                src="/circle-user.svg"
                alt=""
                width={28}
                height={28}
              />
            </button>
          </li>
          <li>
            <button onClick={changeTheme}>
              <Image
                className={styles.icon}
                src="/night-day.svg"
                alt=""
                width={28}
                height={28}
              />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}