import styles from "./inputField.module.css";

function toCamelCaseId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)/g, (_, char) => char.toUpperCase());
}

export default function InputField({ icon: Icon, label, type }) {
  const id = toCamelCaseId(label)
  return (
    <div className={styles.fieldContainer}>
      {Icon && <Icon className={styles.icon}/>}
      <div className={styles.inputContainer}>
        <input type={type} id={id} required />
        <label htmlFor={id} className={styles.label}>{label}</label>
        <div className={styles.underline}></div>
      </div>
    </div>
  );
}
