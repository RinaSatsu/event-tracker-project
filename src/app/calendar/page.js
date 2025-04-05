'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';

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
  { id: 10, name: "The Smashing Pumpkins", date: new Date(2025, 6, 14), venue: "Budweiser Stage" }
]; //months in javascript are from 0-11, which is why it's showing the 5th month as June and not May.. weird! 

export default function ConcertCalendarPage() {
  const [date, setDate] = useState(new Date());
  const todaysConcerts = concerts.filter(show => isSameDay(show.date, date));

  return (
    <div className="calendar-page">
      <h1>2025 Toronto Rock Concerts</h1>
      
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={({ date, view }) => 
            view === 'month' && concerts.some(show => isSameDay(show.date, date)) ? (
              <div className="concert-marker">!</div>
            ) : null
          }
          tileClassName={({ date, view }) => 
            view === 'month' && concerts.some(show => isSameDay(show.date, date)) 
              ? 'has-concert' 
              : ''
          }
        />
      </div>

      <div className="concerts-list">
        <h2>Shows on {format(date, 'MMMM d, yyyy')}</h2>
        {todaysConcerts.length > 0 ? (
          <ul>
            {todaysConcerts.map(show => (
              <li key={show.id}>
                <strong>{show.name}</strong>
                <span className="venue"> at {show.venue}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-shows">No shows scheduled for this date</p>
        )}
      </div>
    </div>
  );
}