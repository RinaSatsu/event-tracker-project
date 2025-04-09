import React from "react";
import styles from "@/app/styles/page.module.css";
import EventCard from "../components/eventCard/eventCard";
import Link from "next/link";
import SearchField from "../components/searchField";

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
      <main className={styles.main}>
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
        <div>
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        </div>
        <button>View More</button>
        <Link href="#top">Top</Link>
      </main>
    </div>
  );
}