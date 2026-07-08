import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./Nav.module.css";

type NavItem = { href: string; label: string };

type Props = {
  prev?: NavItem;
  next?: NavItem;
};

export default function ProjectNav({ prev, next }: Props) {
  return (
    <div className={styles.nav}>
      {prev ? (
        <Link href={prev.href} className={styles.link}>
          <ArrowLeft size={16} className={`${styles.icon} ${styles.iconPrev}`} />
          <div className={styles.content}>
            <span className={styles.direction}>Projet précédent</span>
            <span className={styles.title}>{prev.label}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link href={next.href} className={`${styles.link} ${styles.linkNext}`}>
          <div className={styles.content}>
            <span className={styles.direction}>Projet suivant</span>
            <span className={styles.title}>{next.label}</span>
          </div>
          <ArrowRight size={16} className={`${styles.icon} ${styles.iconNext}`} />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
