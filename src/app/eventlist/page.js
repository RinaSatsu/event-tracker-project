'use client';
import { useState, useEffect } from 'react';
import HeroSection from "../components/heroSection/heroSection";
import EventCard from "../components/eventCard/eventCard";
import { getFavorites } from '../utils/favoritesService';
import './eventlist.css';

export default function EventListPage() {
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/events.json');
        if (!response.ok) throw new Error('Failed to load events');
        const data = await response.json();
        setEvents(data);
        setFavorites(getFavorites());
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    const handleStorageChange = () => {
      setFavorites(getFavorites());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (isLoading) {
    return (
      <div className="container">
        <HeroSection title="Upcoming Events" />
        <div className="loadingSpinner">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <HeroSection 
        title="Your Favorite Events">
      </HeroSection>
      <h2>All Events</h2>
      {events.length === 0 ? (
        <div className="emptyState">
          <p>No upcoming events found.</p>
        </div>
      ) : (
        <div className="eventsGrid">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
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
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}