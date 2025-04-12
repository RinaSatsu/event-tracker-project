import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.divider}></div>
      <div>Pedro Alvarado, Jonathan Marsh, Maryna Snihurska © 2025</div>
    </footer>
  );
}