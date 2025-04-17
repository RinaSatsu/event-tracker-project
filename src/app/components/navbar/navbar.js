'use client'
import ThemeToggle from '@/app/components/themeToggle/themeToggle';
import Link from 'next/link';
import styles from "./navbar.module.css";
import UserIcon from "/public/circle-user.svg";

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
            <Link
              className={styles.linkButton}
              href="/login">
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