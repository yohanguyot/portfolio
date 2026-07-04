import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoWrap}>
          <p className={styles.logo}>Yohan Guyot</p>
        </div>
        <p className={styles.copyright}>© 2026 Yohan Guyot · Product Builder // Paris</p>
      </div>
    </footer>
  );
}
