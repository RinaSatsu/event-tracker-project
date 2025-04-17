'use client';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import HeroSection from "../components/heroSection/heroSection";
import EventCard from "../components/eventCard/eventCard";
import './calendar.css';

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

export default function ConcertCalendarPage() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/events.json');
        if (!response.ok) throw new Error('Failed to load events');
        
        const eventsData = await response.json();
        const transformedEvents = eventsData.map(event => ({
          ...event,
          parsedDate: new Date(
            new Date().getFullYear(),
            getMonthNumber(event.date.month),
            parseInt(event.date.day),
            ...getTimeParts(event.date.time)
          )
        }));

        setEvents(transformedEvents);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const todaysEvents = events
    .filter(event => isSameDay(event.parsedDate, date))
    .map(event => ({
      ...event,
      date: {
        month: format(event.parsedDate, 'MMM'),
        day: event.parsedDate.getDate(),
        time: format(event.parsedDate, 'HH:mm')
      }
    }));

  if (isLoading) {
    return (
      <div>
        <HeroSection title="Event Calendar" />
        <p>Loading events...</p>
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
          />
        </div>

        <div className="events-section">
          <h2>Events on {format(date, 'MMMM d, yyyy')}</h2>
          {todaysEvents.length > 0 ? (
            <div className="events-grid">
              {todaysEvents.map(event => (
                <EventCard key={event.id} event={event} />
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