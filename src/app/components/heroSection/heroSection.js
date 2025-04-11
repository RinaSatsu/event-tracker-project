import styles from "./heroSection.module.css";

export default function HeroSection({ title, className, children }) {
  return (
    <section className={`${className} ${styles.heroSection}`}>
      <div className={styles.heroWrapper}>
        <div className={styles.heroContainer}>
          <h1>{title}</h1>
        </div>
      </div>
      {children}
    </section>
  );
}