import HeroSection from "../components/heroSection/heroSection";
import InputField from "../components/inputField/inputField";
import styles from "./page.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <HeroSection className={styles.small}></HeroSection>
      <main className={styles.main}>
        <form className={styles.form}>
          <h1 className={styles.title}>Register </h1>
          <p className={styles.message}>Signup now and get full access to our app.</p>
          <InputField
            className={styles.input}
            label="Username"
            placeholder=""
            type="text"
            autoComplete="username"
            required
          />
          <InputField
            className={styles.input}
            label="Email"
            placeholder=""
            type="email"
            autoComplete="email"
            required
          />
          <InputField
            className={styles.input}
            label="Password"
            placeholder=""
            type="password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$"
            autoComplete="new-password"
            required
          />
          <InputField
            className={styles.input}
            label="Confirm Password"
            placeholder=""
            type="password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$"
            autoComplete="off"
            required
          />
          <p className={styles.error}>Error</p>
          <button className={styles.submit}>Submit</button>
          <p className={styles.signin}>Already have an acount ? <a href="#">Signin</a> </p>
        </form>
      </main>
    </div>
  );
}