import React from "react";
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
import eventData from "/public/events.json";

export default function SearchPage() {

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
          />
          <InputField
            icon={<MapIcon />}
            label="Place"
            type="text"
            placeholder=""
          />
          <DateInput
            icon={<CalendarIcon />}
            label="Time"
          />
          <ActionButton
            style={{ border: "3px solid var(--secondary-text-color)" }}>
            Find
          </ActionButton>
        </div>
      </HeroSection>
      <CardContainer>
        {eventData.map((event) => (
          <li key={event.id}>
            <EventCard event={event} />
          </li>
        ))}
      </CardContainer>
      <ToTopButton />
    </div>
  );
}