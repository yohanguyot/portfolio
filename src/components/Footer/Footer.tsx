import type { Dictionary } from "@/lib/getDictionary";
import styles from "./Footer.module.css";

export default function Footer({ dict }: { dict: Dictionary["footer"] }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoWrap}>
          <p className={styles.logo}>Yohan Guyot</p>
        </div>
        <p className={styles.copyright}>© {new Date().getFullYear()} Yohan Guyot · {dict.copyright}</p>
      </div>
    </footer>
  );
}
