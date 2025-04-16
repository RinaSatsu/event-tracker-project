'use client';
import Link from "next/link";
import styles from "./eventCard.module.css";
import StarIcon from "/public/star.svg";
import StarFullIcon from "/public/star-full.svg";

const formatMonth = (month) => {
  return month?.trim()?.substring(0, 3)?.toUpperCase() || '';
};

const EventCard = ({ event, isFavorite, onToggleFavorite }) => {
  const handleSaveEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <div className={styles.card}>
      <button 
        className={`${styles.saveBtn} ${isFavorite ? styles.active : ''}`}
        onClick={handleSaveEvent}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? (
          <StarFullIcon className={`${styles.icon} ${styles.hover}`} />
        ) : (
          <StarIcon className={`${styles.icon} ${styles.default}`} />
        )}
      </button>
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
            href={`/event/${encodeURIComponent(event.link)}`}
          >
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;