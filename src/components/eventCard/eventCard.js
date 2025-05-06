'use client';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { isFavorite, toggleFavorite } from '@/lib/favoritesService';
import styles from "./eventCard.module.css";
import StarFullIcon from "/public/star-full.svg";
import StarIcon from "/public/star.svg";

const formatMonth = (month) => {
  if (isNaN(month)) {
    return month.trim().substring(0, 3).toUpperCase();
  } else {
    return new Date(month).toLocaleString('default', { month: 'short' }).toUpperCase();
  }
}

export default function EventCard({ event }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(event.id));

    const handleStorageChange = () => {
      setFavorite(isFavorite(event.id));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [event.id]);

  const handleSaveEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(event);
  };

  if (!event?.id) return null;

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${event.image || '/event-placeholder.webp'})`,
        }}>
        <button
          className={`${styles.saveBtn} ${favorite ? styles.active : ''}`}
          onClick={handleSaveEvent}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? (
            <StarFullIcon className={`${styles.icon} ${styles.full}`} />
          ) : (
            <StarIcon className={`${styles.icon} ${styles.default}`} />
          )}
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
            className={`${styles.buttonLink} button-link`}
            href={`/event/${event.id}?name=${encodeURIComponent(event.name)}`}>
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};