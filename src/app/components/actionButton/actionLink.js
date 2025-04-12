import React from "react";
import styles from "./actionButton.module.css";
import "./actionButton.module.css";

export default function ActionLink({ className, toId, children }) {
  return (
    <a href={toId}
      className={`${className} ${styles.button} button-link`}>
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
    </a>
  );
}