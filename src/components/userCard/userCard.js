import styles from "./userCard.module.css";

export default function UserCard({ id, username, email }) {
  return (
    <div className={styles.user}>
      <div className={styles.image}></div>
      <div className={styles.userContent}>
        <div className={styles.text}>
          <span className={styles.username}>{username}</span>
          <p className={styles.email}>{email}</p>
          <p className={styles.email}>ID: {id}</p>
        </div>
      </div>
    </div>
  );
}