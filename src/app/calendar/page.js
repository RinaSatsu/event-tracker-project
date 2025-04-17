'use client';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import HeroSection from "@/app/components/heroSection/heroSection";
import StarIcon from "/public/star.svg";
import EventListCard from "../components/userCard/eventListCard";
import { getFavorites } from '../utils/favoritesService';
import styles from "./page.module.css";
import './calendar.css';

function isEventOnDate(event, targetDate) {
  if (!event?.date || !targetDate) return false;

  const eventDate = new Date(
    event.date.year,
    event.date.month - 1,
    event.date.day
  );

  return isSameDay(eventDate, targetDate);
};

const concerts = [
  { id: 1, name: "Green Day", date: new Date(2025, 5, 15), venue: "Rogers Centre" },
  { id: 2, name: "Blink-182", date: new Date(2025, 6, 22), venue: "Budweiser Stage" },
  { id: 3, name: "Foo Fighters", date: new Date(2025, 7, 5), venue: "Scotiabank Arena" },
  { id: 4, name: "The Rolling Stones", date: new Date(2025, 5, 30), venue: "Rogers Centre" },
  { id: 5, name: "Metallica", date: new Date(2025, 8, 12), venue: "Budweiser Stage" },
  { id: 6, name: "Pearl Jam", date: new Date(2025, 7, 18), venue: "Scotiabank Arena" },
  { id: 7, name: "Red Hot Chili Peppers", date: new Date(2025, 6, 8), venue: "Rogers Centre" },
  { id: 8, name: "Arctic Monkeys", date: new Date(2025, 8, 3), venue: "Budweiser Stage" },
  { id: 9, name: "Queens of the Stone Age", date: new Date(2025, 7, 25), venue: "History" },
  { id: 10, name: "The Smashing Pumpkins", date: new Date(2025, 6, 14), venue: "Budweiser Stage" },
  { id: 11, name: "Green Day 2", date: new Date(2025, 5, 15), venue: "Rogers Centre" }
]; //months in javascript are from 0-11, which is why it's showing the 5th month as June and not May.. weird! 

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