'use client';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import HeroSection from "@/app/components/heroSection/heroSection";
import EventCard from "@/app/components/eventCard/eventCard";

export default function ConcertCalendarPage() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {

        const response = await fetch('/events.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const eventsData = await response.json();
        console.log('Loaded events:', eventsData);


        const currentYear = new Date().getFullYear();
        const transformedEvents = eventsData.map(event => ({
          ...event,
          parsedDate: new Date(
            currentYear,
            getMonthNumber(event.date.month),
            parseInt(event.date.day),
            ...getTimeParts(event.date.time)
          )
        }));


        const savedFavorites = JSON.parse(localStorage.getItem('favoriteEventIds')) || [];
        
        setEvents(transformedEvents);
        setFavoriteIds(savedFavorites);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load events. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();


    const handleStorageChange = () => {
      const updatedFavorites = JSON.parse(localStorage.getItem('favoriteEventIds')) || [];
      setFavoriteIds(updatedFavorites);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);


  const getMonthNumber = (monthAbbr) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.indexOf(monthAbbr);
  };


  const getTimeParts = (timeString) => {
    if (!timeString) return [0, 0];
    const [hours, minutes] = timeString.split(':').map(Number);
    return [hours, minutes];
  };


  const todaysEvents = events.filter(event => 
    isSameDay(event.parsedDate, date)
  );

  const handleToggleFavorite = (eventId) => {
    const updatedFavorites = favoriteIds.includes(eventId)
      ? favoriteIds.filter(id => id !== eventId)
      : [...favoriteIds, eventId];
    
    setFavoriteIds(updatedFavorites);
    localStorage.setItem('favoriteEventIds', JSON.stringify(updatedFavorites));
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <HeroSection title="Event Calendar" />
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <HeroSection title="Event Calendar" />
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <HeroSection title="Event Calendar" />
      <main className="calendar-page">
        <div className="calendar-container">
          <Calendar
            onChange={setDate}
            value={date}
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const hasEvent = events.some(event => 
                  isSameDay(event.parsedDate, date)
                );
                return hasEvent ? <div className="event-marker">•</div> : null;
              }
              return null;
            }}
            tileClassName={({ date, view }) => {
              if (view === 'month') {
                const hasEvent = events.some(event => 
                  isSameDay(event.parsedDate, date)
                );
                const isFavorite = events.some(event => 
                  isSameDay(event.parsedDate, date) && 
                  favoriteIds.includes(event.id)
                );
                
                if (isFavorite) return 'has-favorite-event';
                if (hasEvent) return 'has-event';
              }
              return '';
            }}
          />
        </div>

        <div className="events-section">
          <h2>Events on {format(date, 'MMMM d, yyyy')}</h2>
          
          {todaysEvents.length > 0 ? (
            <div className="events-grid">
              {todaysEvents.map(event => (
                <EventCard 
                  key={event.id}
                  event={{
                    ...event,
                    date: {
                      month: format(event.parsedDate, 'MMM'),
                      day: event.parsedDate.getDate(),
                      time: format(event.parsedDate, 'HH:mm')
                    }
                  }}
                  isFavorite={favoriteIds.includes(event.id)}
                  onToggleFavorite={() => handleToggleFavorite(event.id)}
                />
              ))}
            </div>
          ) : (
            <p className="no-events">No events scheduled for this date</p>
          )}
        </div>
      </main>
    </div>
  );
}