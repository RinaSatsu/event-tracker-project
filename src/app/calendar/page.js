'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

const ConcertCalendar = ({ events = [] }) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState('month');

  const hasEvents = (date) => {
    return events.some(event => isSameDay(event.date, date));
  };

  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    return hasEvents(date) ? <div className="event-indicator">🎵</div> : null;
  };

  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return '';
    return hasEvents(date) ? 'has-events' : '';
  };

  return (
    <div className="concert-calendar">
      <h2>Upcoming Concerts</h2>
      
      <Calendar
        onChange={setDate}
        value={date}
        view={view}
        onViewChange={({ view }) => setView(view)}
        tileContent={tileContent}
        tileClassName={tileClassName}
      />
      
      <div className="event-list">
        <h3>Events on {format(date, 'MMMM d, yyyy')}</h3>
        {getEventsForDate(date).length > 0 ? (
          <ul>
            {getEventsForDate(date).map(event => (
              <li key={event.id}>
                <strong>{event.name}</strong>
                {event.venue && <span> at {event.venue}</span>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events scheduled</p>
        )}
      </div>
      
      <button 
        className="today-button" 
        onClick={() => setDate(new Date())}
      >
        Today
      </button>
    </div>
  );
};

export default ConcertCalendar;