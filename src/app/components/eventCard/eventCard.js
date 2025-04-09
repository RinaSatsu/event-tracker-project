'use client'
import Link from "next/link";
import styles from "./eventCard.module.css";
import StarIcon from "/public/star.svg";
import StarFullIcon from "/public/star-full.svg";

const formatMonth = (month) => {
  return month.trim().substring(0, 3).toUpperCase();
}

const handleSaveEvent = (event) => {
  console.log(event);
} 

export default function EventCard({ event }) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <button 
          className={styles.saveBtn}
          onClick={handleSaveEvent}>
          <StarIcon className={`${styles.icon} ${styles.default}`}/>
          <StarFullIcon className={`${styles.icon} ${styles.hover}`}/>
        </button>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.contentContainer}>
          <div className={styles.infoContainer}>
            <div className={styles.dateContainer}>
              <span className={styles.month}>{formatMonth(event.date.month)}</span>
              <span className={styles.day}>{event.date.day}</span>
              <span className={styles.time}>{event.date.time}</span>
            </div>
            <div className={styles.info}>
              <span className={styles.title}>{event.name}</span>
              <span className={styles.address}>{event.address}</span>
            </div>
          </div>
          <Link
            className={styles.buttonLink}
            href={`/event/${encodeURIComponent(event.link)}`}>
            See More
          </Link>
        </div>
      </div>
    </div>
  );
}