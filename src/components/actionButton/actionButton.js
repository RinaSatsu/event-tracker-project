import "./actionButton.module.css";
import styles from "./actionButton.module.css";

export default function ActionButton({ className, style, clickHandler, children }) {
  return (
    <button
      className={`${className} ${styles.button} `}
      style={style}
      onClick={clickHandler}>
      <span className={styles.buttonBg}>
        <span className={styles.buttonBgLayers}>
          <span className={`${styles.buttonBgLayer} ${styles.buttonBgLayer1}`}></span>
          <span className={`${styles.buttonBgLayer} ${styles.buttonBgLayer2}`}></span>
          <span className={`${styles.buttonBgLayer} ${styles.buttonBgLayer2}`}></span>
        </span>
      </span>
      <span className={styles.buttonInner}>
        <span className={styles.buttonInnerDefault}>{children}</span>
        <span className={styles.buttonInnerHover}>{children}</span>
      </span>
    </button>
  );
}