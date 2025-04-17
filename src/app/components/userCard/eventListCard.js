import styles from "./userCard.module.css";
import Link from "next/link";

export default function EventListCard({ id, name, time, venue }) {
  return (
    <div className={styles.user}>
      <div className={styles.image}></div>
      <div className={styles.userContent}>
        <div className={styles.text}>
          <span
            className={styles.username}
            style={{ fontSize: "1.4rem" }}>
            {name}
          </span>
          <p className={styles.email}>{time} - {venue}</p>
        </div>
        <Link
            className={`${styles.buttonLink} button-link`}
            href={`/event/${id}?name=${encodeURIComponent(name)}`}>
            See More
          </Link>
      </div>
    </div>
  );
}