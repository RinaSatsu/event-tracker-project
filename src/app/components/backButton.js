'use client'
import { useRouter } from "next/navigation";
import styles from "@/app/styles/page.module.css";

export default function BackButton({ ...props }) {
  const router = useRouter();

  return (
    <button
      {...props}
      className={styles.button}
      onClick={() => router.back()}>
      Go Back
    </button>
  );
}