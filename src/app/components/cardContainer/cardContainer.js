import ActionButton from "@/app/components/actionButton/actionButton";
import styles from "./cardContainer.module.css";

export default function CardContainer({ visible, onClick, children }) {
  return (
    <main className={styles.main} id="main">
      <div className={styles.cardContainer}>
        <ul>
          {children}
        </ul>
      </div>
      {visible ?
        (<ActionButton
          className={styles.moreBtn}
          clickHandler={onClick}>
          View More
        </ActionButton>) :
        <div style={{ height: '52px' }}></div>
        }
    </main>
  );
}