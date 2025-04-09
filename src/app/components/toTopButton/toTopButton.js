import styles from "./toTopButton.module.css";
import ArrowUp from "/public/arrow-up.svg";

export default function ToTopButton () {
  return(
    <a href="#top"
      className={`${styles.btnLink} button-link`}>
      <ArrowUp className={styles.icon} viewBox="0 0 384 512" />
    </a>
  );
}