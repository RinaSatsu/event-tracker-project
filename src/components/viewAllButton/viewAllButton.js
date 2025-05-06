'use client';

import styles from './viewAllButton.module.css';

export default function ViewAllButton({ onClick }) {
  return (
    <button
      className={styles.button}
      onClick={() => {
        console.log("View All Clicked");
        onClick();
      }}
    >
      <span className={styles.buttonInner}>
        <span className={styles.buttonInnerDefault}>View All</span>
        <span className={styles.buttonInnerHover}>View All</span>
      </span>
      <span className={styles.buttonBg}>
        <span className={styles.buttonBgLayers}>
          <span className={`${styles.buttonBgLayer} ${styles.buttonBgLayer1}`} />
          <span className={`${styles.buttonBgLayer} ${styles.buttonBgLayer2}`} />
          <span className={`${styles.buttonBgLayer} ${styles.buttonBgLayer3}`} />
        </span>
      </span>
    </button>
  );
}