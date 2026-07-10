"use client";

import { useRef, useEffect } from "react";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
import styles from "./Footer.module.css";

export default function Footer({ dict }: { dict: Dictionary["footer"] }) {
  const logoRef = useRef<HTMLParagraphElement>(null);
  const copyrightRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (shouldReduceMotion()) return;

    const logo = logoRef.current;
    const copyright = copyrightRef.current;
    if (!logo || !copyright) return;

    [logo, copyright].forEach(el => {
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'scale(0.98) translateY(12px)';
    });
    void logo.offsetHeight;

    return observe(logo, 0.5, () => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        [logo, copyright].forEach((el, i) => {
          const delay = i * 100;
          el.style.transition = `opacity ${DURATION}ms ${EASE} ${delay}ms, transform ${DURATION}ms ${EASE} ${delay}ms`;
          el.style.opacity = '1';
          el.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { el.style.transform = ''; el.style.transition = ''; }, DURATION + delay);
        });
      }));
    });
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoWrap}>
          <p ref={logoRef} className={styles.logo}>Yohan Guyot</p>
        </div>
        <p ref={copyrightRef} className={styles.copyright}>© {new Date().getFullYear()} Yohan Guyot · {dict.copyright}</p>
      </div>
    </footer>
  );
}
