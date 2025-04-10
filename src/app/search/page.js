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

export default function SearchPage() {
  const events = [{
    id: 1,
    date: { month: "Apr", day: "14", time: "14:45" },
    name: "Event Name 1",
    address: "Street Name, City, ON",
    link: "Event1"
  },
  {
    id: 2,
    date: { month: "Aug", day: "20", time: "14:45" },
    name: "Event Name 2",
    address: "Street Name, City, ON",
    link: "Event2"
  },
  {
    id: 3,
    date: { month: "Sep", day: "18", time: "14:45" },
    name: "Event Name 3",
    address: "Street Name, City, ON",
    link: "Event3"
  }
  ]

  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroWrapper}>
          <div className={styles.heroContainer}>
            <h1>Find Events</h1>
          </div>
        </div>
        <div className={styles.searchContainer}>
          <InputField
            icon={SearchIcon}
            label="Search Event"
            type="text"
          />
          <InputField
            icon={MapIcon}
            label="Place"
            type="text"
          />
          <InputField
            icon={CalendarIcon}
            label="Time"
            type="text"
          // type="date"
          />
          <ActionButton
            style={{ border: "3px solid var(--secondary-text-color)" }}>
            Find
          </ActionButton>
        </div>
      </section>
      <CardContainer>
        {events.map((event) => (
          <li key={event.id}>
            <EventCard event={event} />
          </li>
        ))}
      </CardContainer>
      <ToTopButton />
    </div>
  );
}