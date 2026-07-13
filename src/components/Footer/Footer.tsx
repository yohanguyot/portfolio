"use client";

import { useRef, useEffect } from "react";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, observe, revealEl, STAGGER, afterLayout, hideEl } from "@/lib/animation";
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
            hideEl(el);
    });
    void logo.offsetHeight;

    return observe(logo, 0.5, () => {
      afterLayout(() => {
        [logo, copyright].forEach((el, i) => {
          const delay = i * STAGGER;
          revealEl(el, delay);
        });
      });
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
