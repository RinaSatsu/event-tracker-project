import React from "react";
import styles from "./actionButton.module.css"
import "./actionButton.module.css";

export default function ActionButton({ width, children }) {
  return (
    <button className={styles.button} style={{width: `${width}px`}}>
      <span className={styles.buttonBg}>
        <span className={styles.buttonBgLayers}>
          <span className={`${styles.buttonBgLayer} ${styles.buttonBgLayer1}`}></span>
          <span className={`${styles.buttonBgLayer} ${styles.buttonBgLayer2}`}></span>
          <span className={`${styles.buttonBgLayer} ${styles.buttonBgLayer2}`}></span>
        </span>
      </span>
      <span className={styles.buttonInner}>
        <span className={styles.buttonInnerStatic}>{children}</span>
        <span className={styles.buttonInnerHover}>{children}</span>
      </span>
    </button>
  );
}