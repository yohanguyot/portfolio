"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useDict } from "@/lib/dict-context";
import styles from "./Nav.module.css";

type NavItem = { href: string; label: string };

type Props = {
  prev?: NavItem;
  next?: NavItem;
};

export default function ProjectNav({ prev, next }: Props) {
  const pathname = usePathname();
  const lang = pathname.split("/")[1] ?? "fr";
  const dict = useDict();

  function localize(href: string) {
    return href.startsWith("/") ? `/${lang}${href}` : href;
  }

  return (
    <section className={styles.section}>
      <div className={styles.nav}>
        {prev ? (
          <Link href={localize(prev.href)} className={styles.link}>
            <ArrowLeft size={16} className={`${styles.icon} ${styles.iconPrev}`} />
            <div className={styles.content}>
              <span className={styles.direction}>{dict.projectNav.prev}</span>
              <span className={styles.title}>{prev.label}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link href={localize(next.href)} className={`${styles.link} ${styles.linkNext}`}>
            <div className={styles.content}>
              <span className={styles.direction}>{dict.projectNav.next}</span>
              <span className={styles.title}>{next.label}</span>
            </div>
            <ArrowRight size={16} className={`${styles.icon} ${styles.iconNext}`} />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  );
}
