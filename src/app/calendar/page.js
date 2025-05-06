'use client';
import HeroSection from "@/components/heroSection/heroSection";
import EventListCard from "@/components/userCard/eventListCard";
import { getFavorites } from '@/lib/favoritesService';
import { format, isSameDay } from 'date-fns';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import styles from "./page.module.css";
import StarIcon from "/public/star.svg";

function isEventOnDate(event, targetDate) {
  if (!event?.date || !targetDate) return false;

  const eventDate = new Date(
    event.date.year,
    event.date.month - 1,
    event.date.day
  );

  return isSameDay(eventDate, targetDate);
};

export default function ConcertCalendarPage() {
  const [date, setDate] = useState(new Date());
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

  const todaysEvents = favorites
    .filter(event => isEventOnDate(event, date));

  return (
    <div>
      <HeroSection
        title="Plan with Calendar">
      </HeroSection>
      <main className={styles.calendarPage}>
        <div className={styles.calendarContainer}>
          <Calendar
            onChange={setDate}
            value={date}

            tileContent={({ date, view }) =>
              view === 'month' && favorites.some(event => isEventOnDate(event, date)) ? (
                <StarIcon className={styles.concertMarker} />
              ) : null
            }
            tileClassName={({ date, view }) =>
              view === 'month' && favorites.some(event => isEventOnDate(event, date))
                ? 'has-concert'
                : ''
            }
          />
        </div>

        <div className={styles.concertsList}>
          <h2>Events on {format(date, 'MMMM d, yyyy')}</h2>
          {todaysEvents.length > 0 ? (
            <ul className={styles.eventContainer}>
              {todaysEvents.map(event => (
                <li key={event.id}>
                  <EventListCard
                    id={event.id}
                    name={event.name}
                    time={event.date.time}
                    venue={event.address} />
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noEvents}>No events scheduled for this date</p>
          )}
        </div>
      </main >
    </div >
  );
}