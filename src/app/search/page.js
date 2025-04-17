'use client'
import { useState, React } from "react";
import styles from "./page.module.css";
import EventCard from "../components/eventCard/eventCard";
import InputField from "../components/inputField/inputField";
import ToTopButton from "../components/toTopButton/toTopButton";
import CardContainer from "../components/cardContainer/cardContainer";
import SearchIcon from "/public/search.svg";
import MapIcon from "/public/map-marker.svg";
import CalendarIcon from "/public/calendar-clock.svg";
import ActionButton from "../components/actionButton/actionButton";
import HeroSection from "../components/heroSection/heroSection";
import DateInput from "../components/dateInput/dateInput";
import fetchEvents from "@/lib/fetchEvents";
import { getDmaIdFromCity } from "@/lib/locationService";

export default function SearchPage() {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');

  const [allevents, setAllevents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [message, setMessage] = useState("Start your search to uncover unforgettable experiences");

  const handleSearch = async () => {
    if (!eventName.trim() && !eventLocation.trim() && !eventDate) {
      return;
    }

    setMessage("Searching...");
    setVisibleCount(6);
    const dmaId = getDmaIdFromCity(eventLocation);

    if (eventLocation.trim() && !dmaId) {
      setAllevents([]);
      setMessage('No events match your search criteria');
      return;
    }

    try {
      const data = await fetchEvents({ keyword: eventName, dmaId: dmaId, date: eventDate });
      if (!data || data.length === 0) {
        setAllevents([]);
        setMessage("No events match your search criteria");
      } else {
        setAllevents(data);
        setMessage(null);
      }
    } catch (err) {
      console.error("Search error:", err);
      setMessage("An error occurred while fetching events");
      setAllevents([]);
    }
  };

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + 9);
  };

  return (
    <div className={styles.page}>
      <HeroSection
        title="Find Events">
        <div className={styles.searchContainer}>
          <InputField
            icon={<SearchIcon />}
            label="Search Event"
            type="text"
            placeholder=""
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <InputField
            icon={<MapIcon />}
            label="Place"
            type="text"
            placeholder=""
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
          <DateInput
            icon={<CalendarIcon />}
            label="Time"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <ActionButton
            clickHandler={handleSearch}
            style={{ border: "3px solid var(--secondary-text-color)" }}>
            Find
          </ActionButton>
        </div>
      </HeroSection>
      <div>
        {message && <p className={styles.message}>{message}</p>}
        <CardContainer
          visible={visibleCount < allevents.length}
          onClick={handleViewMore}>
          {allevents && allevents.slice(0, visibleCount).map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </CardContainer>
      </div>
      <ToTopButton />
    </div>
  );
}