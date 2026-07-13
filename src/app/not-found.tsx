import Navigation from "@/components/Navigation/Navigation";
import Button from "@/components/Button/Button";
import styles from "./not-found.module.css";

export const metadata = {
  title: "404 · Yohan Guyot",
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.gradient} aria-hidden />

      <Navigation />

      <main className={styles.main}>
        <div className={styles.textContainer}>
          <div className={styles.titleContainer}>
            <p className={styles.code}>404</p>
            <p className={styles.title}>Page introuvable</p>
          </div>
          <p className={styles.description}>
            Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
        </div>

        <div className={styles.buttonWrap}>
          <Button label="Retour à l'accueil" type="primary" href="/fr" showArrowRight />
        </div>
      </main>
    </div>
  );
}
