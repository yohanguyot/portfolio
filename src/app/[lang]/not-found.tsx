"use client";

import { usePathname } from "next/navigation";
import { useDict } from "@/lib/dict-context";
import Navigation from "@/components/Navigation/Navigation";
import Button from "@/components/Button/Button";
import styles from "../not-found.module.css";

export default function LangNotFound() {
  const dict = useDict();
  const t = dict.notFound;
  const pathname = usePathname();
  const lang = pathname?.split("/")[1] ?? "fr";
  const homeHref = `/${lang}`;

  return (
    <div className={styles.page}>
      <div className={styles.gradient} aria-hidden />

      <Navigation />

      <main className={styles.main}>
        <div className={styles.textContainer}>
          <div className={styles.titleContainer}>
            <p className={styles.code}>404</p>
            <p className={styles.title}>{t.title}</p>
          </div>
          <p className={styles.description}>{t.description}</p>
        </div>

        <div className={styles.buttonWrap}>
          <Button label={t.cta} type="primary" href={homeHref} showArrowRight />
        </div>
      </main>
    </div>
  );
}
