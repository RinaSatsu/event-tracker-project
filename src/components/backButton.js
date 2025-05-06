'use client'
import styles from "@/app/styles/page.module.css";
import { useRouter } from "next/navigation";

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