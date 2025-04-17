'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import BackButton from '@/app/components/backButton';
import HeroSection from '@/app/components/heroSection/heroSection';
import styles from "./page.module.css";
import CalendarIcon from "/public/calendar-clock.svg";
import ClockIcon from "/public/clock-regular.svg";
import MapIcon from "/public/map-marker.svg";
import ActionLink from '@/app/components/actionButton/actionLink';


function formatDate(date) {
  const datef = new Date(date);

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(datef);
};


function formatTime(date) {
  const datef = new Date(date);

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(datef);
};

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

      <main className={styles.eventPage}>
        {statusMessage && <p>{statusMessage}</p>}
        {eventData ? (
          <div className={styles.eventContainer}>
            {eventData.images && eventData.images.length > 0 && (
              <img
                src={eventImg.url}
                alt={`Banner for ${eventData.name}`}
              />
            )}
            <div className={styles.eventInfo}>
              <div className={styles.dataContainer}>
                <div className={styles.dataContent}>
                  <CalendarIcon />
                  <div>
                    <p className={styles.dataTitle}>Date:</p>
                    <p>{formatDate(eventData.dates.start.dateTime)}</p>
                  </div>
                </div>
                <div className={styles.dataContent}>
                  <ClockIcon />
                  <div>
                    <p className={styles.dataTitle}>Time:</p>
                    <p>{formatTime(eventData.dates.start.dateTime)}</p>
                  </div>
                </div>
                <div className={`${styles.dataContent} ${styles.location}`}>
                  <MapIcon />
                  <div>
                    <p className={styles.dataTitle}>Location:</p>
                    <p>{eventData._embedded?.venues?.[0]?.name || 'No venue information available'}</p>
                  </div>
                </div>
                <div>
                  <button>Favorite</button>
                </div>
              </div>
              {eventData.info && (
                <p><span className={styles.title}>Info:</span> {eventData.info}</p>
              )}
              {eventData.accessibility?.info && (
                <p><span className={styles.title}>Accessibility:</span> {eventData.accessibility.info}</p>
              )}
              <p>
                <ActionLink
                  toId={eventData.url}
                  target="_blank"
                  rel="noopener noreferrer">
                  Buy Tickets
                </ActionLink>
              </p>
            </div>
          </div>
        ) : (
          !statusMessage && <p>No event details found.</p>
        )}
        <BackButton style={{ width: "200px", alignSelf: "center"  }} />
      </main>
    </div>
  );
}