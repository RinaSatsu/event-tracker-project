'use client';
import { useState, useEffect } from 'react';
import EventCard from '../components/eventCard/eventCard';
import './eventlist.css';

export default function EventListPage() {
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {

        const response = await fetch('/events.json');
        const data = await response.json();
        setEvents(data);
        

        const savedFavorites = JSON.parse(localStorage.getItem('favoriteEvents')) || [];
        setFavorites(savedFavorites);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleFavorite = (event) => {
    const existingIndex = favorites.findIndex(fav => fav.id === event.id);
    let newFavorites;

    if (existingIndex >= 0) {

      newFavorites = favorites.filter(fav => fav.id !== event.id);
    } else {

      newFavorites = [...favorites, {
        ...event,

        date: event.date instanceof Date ? event.date : {
          day: event.date.day,
          month: event.date.month,
          year: event.date.year,
          time: event.date.time
        }
      }];
    }

    setFavorites(newFavorites);
    localStorage.setItem('favoriteEvents', JSON.stringify(newFavorites));
  };

  if (isLoading) {
    return (
      <div className="container">
        <h1 className="pageHeader">Upcoming Events</h1>
        <div className="loadingSpinner">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="pageHeader">Upcoming Events</h1>
      
      <h2>All Events</h2>
      {events.length === 0 ? (
        <div className="emptyState">
          <p>No upcoming events found.</p>
        </div>
      ) : (
        <div className="eventsGrid">
          {events.map(event => (
            <EventCard 
              key={event.id} 
              event={event}
              isFavorite={favorites.some(fav => fav.id === event.id)}
              onToggleFavorite={() => toggleFavorite(event)}
            />
          ))}
        </div>
      )}
      
      <h2>Your Saved Events</h2>
      {favorites.length === 0 ? (
        <div className="emptyState">
          <p>You haven't saved any events yet.</p>
        </div>
      ) : (
        <div className="eventsGrid">
          {favorites.map(event => (
            <EventCard 
              key={event.id} 
              event={event}
              isFavorite={true}
              onToggleFavorite={() => toggleFavorite(event)}
            />
          ))}
        </div>
      )}
    </div>
  );
}