import styles from "./cardContainer.module.css";

export default function CardContainer({ children }) {
  return (
    <main className={styles.main} id="main">
      <div className={styles.cardContainer}>
        <ul>
          {children}
        </ul>
      </div>
      {/* <ActionButton 
      className={styles.moreBtn}
      >View All</ActionButton> */}
    </main>
  );
}