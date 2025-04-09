import Link from "next/link";
import styles from "@/app/styles/page.module.css";
import EventCard from "./components/eventCard/eventCard";
import ActionLink from "./components/actionButton/actionLink";
import ActionButton from "./components/actionButton/actionButton";
import ToTopButton from "./components/toTopButton/toTopButton";

export default function Home() {
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
      <main className={styles.main} id="main">
        <div>
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        </div>
        <ActionButton width={220}>View All</ActionButton>
        <a href="#top">Top</a>
        {/* <ToTopButton>Top</ToTopButton> */}
      </main>
    </div>
  );
}
