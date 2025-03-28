import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import EventCard from "./components/eventCard";

export default function Home() {
  const events = [{
    id: 1,
    date: {month: "Apr", day: "14", time: "14:45"},
    name: "Event Name 1",
    address: "Street Name, City, ON",
    link: "Event1"
  },
  {
    id: 2,
    date: {month: "Aug", day: "20", time: "14:45"},
    name: "Event Name 2",
    address: "Street Name, City, ON",
    link: "Event2"
  },
  {
    id: 3,
    date: {month: "Sep", day: "18", time: "14:45"},
    name: "Event Name 3",
    address: "Street Name, City, ON",
    link: "Event3"
  }
  ]

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section>
          <div>
            <h1>Discover new and exciting events</h1>
            <p>Stay up to date with the latest events near you and never miss out on the fun. Find concerts, festivals, and more — all in one place!</p>
            <button>Discover</button>
          </div>
        </section>
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
