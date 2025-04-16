'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import BackButton from '@/app/components/backButton';
import HeroSection from '@/app/components/heroSection/heroSection';

export default function EventDetailPage() {
  const [eventData, setEventData] = useState(null);
  const [statusMessage, setStatusMessage] = useState('Loading event details...');

  const params = useParams();
  const searchParams = useSearchParams();

  const eventId = params.eventId;
  const eventName = searchParams.get('name');
  const targetWidth = 1024;

  useEffect(() => {
    const fetchEventById = async () => {
      try {
        const apiKey = 'BW7AXlRXKWgiAYSkY71zNBIAgFqUMuCn';
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${apiKey}&countryCode=CA&locale=en-CA`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEventData(data);
        setStatusMessage('');
      } catch (error) {
        console.error('Error fetching event details:', error);
        setStatusMessage('An error occurred while fetching event details.');
      }
    };

    if (eventId) {
      fetchEventById();
    }
  }, [eventId]);

  const eventImg = eventData?.images.reduce((prev, curr) =>
    Math.abs(curr.width - targetWidth) < Math.abs(prev.width - targetWidth) ? curr : prev
  );

  return (
    <div>
      <HeroSection
        title={eventData?.name || (eventName ? decodeURIComponent(eventName) : '')}>
      </HeroSection>

      {statusMessage && <p>{statusMessage}</p>}

      {eventData ? (
        <div style={{ padding: '1rem' }}>
          <h2>{eventData.name}</h2>
          {eventData.images && eventData.images.length > 0 && (
            <img
              src={eventImg.url}
              alt={`Banner for ${eventData.name}`}
            />
          )}
          <p>{new Date(eventData.dates.start.dateTime).toLocaleString()}</p>
          <p>{eventData._embedded?.venues?.[0]?.name || 'No venue information available'}</p>
          {eventData._embedded?.attractions && eventData._embedded.attractions.length > 0 && (
            <p>Attraction: {eventData._embedded.attractions[0].name}</p>
          )}
          <p>
            <strong><a href={eventData.url} target="_blank" rel="noopener noreferrer"> Buy Tickets</a></strong>
          </p>
        </div>
      ) : (
        !statusMessage && <p>No event details found.</p>
      )}
      <BackButton />
    </div>
  );
}