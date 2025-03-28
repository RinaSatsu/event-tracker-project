'use client'
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className={styles.button}
      onClick={() => router.back()}>
      Go Back
    </button>
  );
}