"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useDict } from "@/lib/dict-context";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
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
  const navRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const navEl = navRef.current;
    if (!navEl) return;
    Array.from(navEl.children as HTMLCollectionOf<HTMLElement>)
      .filter(el => el.tagName !== 'DIV' || el.children.length > 0)
      .forEach(l => { l.style.opacity = '0'; l.style.transform = 'scale(0.98) translateY(12px)'; });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const navEl = navRef.current;
    if (!navEl) return;

    const links = Array.from(navEl.children as HTMLCollectionOf<HTMLElement>).filter(
      el => el.tagName !== 'DIV' || el.children.length > 0
    );

    return observe(navEl, 0.1, () => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        links.forEach((l, i) => {
          const delay = i * 120;
          l.style.transition = `opacity ${DURATION}ms ${EASE} ${delay}ms, transform ${DURATION}ms ${EASE} ${delay}ms`;
          l.style.opacity = '1';
          l.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { l.style.transform = ''; l.style.transition = ''; }, DURATION + delay);
        });
      }));
    });
  }, []);

  function localize(href: string) {
    return href.startsWith("/") ? `/${lang}${href}` : href;
  }

  return (
    <section className={styles.section}>
      <div ref={navRef} className={styles.nav}>
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
