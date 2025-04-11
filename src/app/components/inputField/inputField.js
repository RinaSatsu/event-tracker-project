'use client'
import React from "react";
import styles from "./inputField.module.css";

function toCamelCaseId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)/g, (_, char) => char.toUpperCase());
}

export default function InputField({ icon: Icon, className, label, ...props }) {
  const id = toCamelCaseId(label);

  return (
    <div className={`${className} ${styles.fieldContainer}`}>
      {Icon}
      <div className={styles.inputContainer}>
        <input id={id} {...props} />
        <label htmlFor={id} className={styles.label}>{label}</label>
        <div className={styles.underline}></div>
      </div>
    </div>
  );
}
