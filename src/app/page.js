'use client'
import styles from "@/app/styles/page.module.css";
import { useEffect, useState } from "react";
import fetchEvents from "@/lib/fetchEvents";
import ActionLink from "@/components/actionButton/actionLink";
import CardContainer from "@/components/cardContainer/cardContainer";
import EventCard from "@/components/eventCard/eventCard";
import ToTopButton from "@/components/toTopButton/toTopButton";

export default function Home() {
  const [allevents, setAllEvents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        if (!data || data.length === 0) {
          setMessage("No events found at the moment. Check back later");
        } else {
          setMessage(null);
        }
        setAllEvents(data);
      } catch (err) {
        console.error(err);
        setMessage("An error occurred while fetching events");
      }
    };

    getEvents();
  }, []);

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + 9);
  };


  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroWrapper}>
          <div className={styles.heroContainer}>
            <h1>Discover new and exciting events</h1>
            <p>Stay up to date with the latest events near you and never miss out on the fun. Find concerts, festivals, and more — all in one place!</p>
          </div>
        </div>
        <ActionLink
          toId="#main"
          className={styles.downBtn}>
          Discover
        </ActionLink>
      </section>
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
