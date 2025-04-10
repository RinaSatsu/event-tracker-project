import React from "react";
import styles from "@/app/styles/page.module.css";
import EventCard from "../components/eventCard/eventCard";
import SearchField from "../components/searchField";
import ToTopButton from "../components/toTopButton/toTopButton";
import CardContainer from "../components/cardContainer/cardContainer";

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
      <div className={styles.main}>
        <h1>SearchPage</h1>
        <div style={{ display: "flex" }}>
          <SearchField
            icon="search.svg"
            label="Search Event"
          />
          <SearchField
            icon="map-marker.svg"
            label="Place"
          />
          <SearchField
            icon="calendar-clock.svg"
            label="Time"
          />
          <button>Find</button>
        </div>
      </div>
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