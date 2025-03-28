import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const events = ["ReactConf", "NextSummit", "JSWorld"];
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Event List</h1>
        <ul>
          {events.map((event) => (
            <li key={event}>
              <Link href={`/event/${encodeURIComponent(event)}`}>{event}</Link>
            </li>
          ))}
        </ul>
      </main>
      <footer className={styles.footer}>
        Footer
      </footer>
    </div>
  );
}
