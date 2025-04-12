'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BackButton from "@/app/components/backButton";
import HeroSection from "@/app/components/heroSection/heroSection";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [statusMessage, setStatusMessage] = useState('Loading events...');

  const params = useParams();
  const keyword = params.eventName;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiKey = 'BW7AXlRXKWgiAYSkY71zNBIAgFqUMuCn'; 
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${encodeURIComponent(keyword)}&countryCode=CA&locale=en-CA&apikey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data._embedded && data._embedded.events.length > 0) {
          setEvents(data._embedded.events);
          setStatusMessage('');
        } else {
          setStatusMessage('No events found.');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setStatusMessage('An error occurred while fetching events.');
      }
    };

    fetchEvents();
  }, [keyword]);

  return (
    <div>
      <HeroSection
        title={`This is ${decodeURIComponent(eventName)} event`}>
        <BackButton />
      </HeroSection>
      <h2>Upcoming Events</h2>
      {statusMessage && <p>{statusMessage}</p>}
      <ul>
        {events.map((event) => {
          const imageUrl =
            event.images && event.images.length > 0 ? event.images[0].url : null;
          return (
            <li key={event.id}>
              <h3>{event.name}</h3>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={`Banner for ${event.name}`}
                  style={{ maxWidth: '200px', height: 'auto' }}
                />
              )}
              <p>{new Date(event.dates.start.dateTime).toLocaleString()}</p>
              <p>{event._embedded?.venues?.[0]?.name}</p>
              <p>{event._embedded?.attractions?.[0]?.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EventPage;