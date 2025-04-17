'use client';
import { useEffect, useState } from 'react';
import { isFavorite, toggleFavorite } from '../../utils/favoritesService';
import styles from "./favoriteButton.module.css";
import StarFullIcon from "/public/star-full.svg";
import StarIcon from "/public/star.svg";

export default function FavoriteButton({ event }) {
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
  );
}