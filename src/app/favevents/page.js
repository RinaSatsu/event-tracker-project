'use client';
import { useState, useEffect } from 'react';
import HeroSection from "../components/heroSection/heroSection";
import EventCard from "../components/eventCard/eventCard";
import { getFavorites } from '../utils/favoritesService';
import styles from "./page.module.css";
import CardContainer from '../components/cardContainer/cardContainer';

function sortByDateAsc(a, b) {
  const year = a.date.year;
  const dateA = new Date(
      year,
      a.date.month - 1,
      a.date.day,
      ...a.date.time.split(":").map(Number)
  );
  const dateB = new Date(
      year,
      b.date.month - 1,
      b.date.day,
      ...b.date.time.split(":").map(Number)
  );
  return dateA - dateB;
};

export default function FavEventsPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setFavorites(getFavorites());
      } catch (error) {
        console.error('Error:', error);
      }
    };

    loadData();

    const handleStorageChange = () => {
      setFavorites(getFavorites());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className={styles.page}>
      <HeroSection
        title="Your Favorite Events">
      </HeroSection>

      <div>
        {favorites.length === 0 &&
          <p className={styles.message}>You don't have any favorite events yet</p>}
        <CardContainer>
          {favorites && favorites.sort(sortByDateAsc).map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </CardContainer>
      </div>
    </div>
  );
}