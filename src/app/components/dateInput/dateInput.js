'use client'
import React from "react";
import { useState } from "react";
import styles from "./dateInput.module.css";
import ArrowDown from "/public/angle-small-down.svg"

function toCamelCaseId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)/g, (_, char) => char.toUpperCase());
}

export default function DateInput({ icon: Icon, label, ...props }) {
  const [hasValue, setHasValue] = useState(false);
  const id = toCamelCaseId(label);

  const handleChange = (e) => {
    setHasValue(!!e.target.value)
    props.onChange?.(e)
  }

  return (
    <div className={styles.fieldContainer}>
      {Icon}
      <div className={styles.inputContainer}>
        <input
          id={id}
          type="date"
          onChange={handleChange}
          data-filled={hasValue}
          {...props} />
        <ArrowDown className={styles.iconOverlay} />
        <label htmlFor={id} className={styles.label}>{label}</label>
        <div className={styles.underline}></div>
      </div>
    </div>
  );
}