"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "next-view-transitions";
import { NAV_SCROLL_OFFSET } from "@/lib/animation";
import styles from "./Button.module.css";

type ButtonType = "primary" | "secondary" | "text";

type ButtonProps = {
  label: string;
  type?: ButtonType;
  showArrowLeft?: boolean;
  showArrowRight?: boolean;
  forceHover?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  as?: "button" | "a";
  href?: string;
};

export default function Button({
  label,
  type = "primary",
  showArrowLeft = false,
  showArrowRight = false,
  forceHover = false,
  loading = false,
  onClick,
  className,
  as,
  href,
}: ButtonProps) {
  const isInternalLink = href?.startsWith("/");
  const isText = type === "text";
  const iconSize = isText ? 16 : 20;
  const iconClass = isText ? styles.iconText : styles.iconPrimary;

  const cls = [
    styles.button,
    styles[type],
    forceHover ? styles.forceHover : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  function handleClick(e: React.MouseEvent) {
    if (href?.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET, behavior: "smooth" });
    } else if (as === "a" && onClick) {
      e.preventDefault();
    }
    onClick?.();
  }

  const children = (
    <>
      {showArrowLeft && (
        <span className={iconClass}>
          <ArrowLeft size={iconSize} strokeWidth={1.5} />
        </span>
      )}
      {isText ? (
        <span className={styles.label}>{label}</span>
      ) : (
        <span className={styles.labelContainer}>
          <span className={styles.label}>{label}</span>
        </span>
      )}
      {loading ? (
        <span className={styles.dots} aria-hidden>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
      ) : showArrowRight && (
        <span className={iconClass}>
          <ArrowRight size={iconSize} strokeWidth={1.5} />
        </span>
      )}
    </>
  );

  if (as === "a") {
    return <a className={cls} onClick={handleClick} href={href ?? ""}>{children}</a>;
  }

  if (as !== "button" && href) {
    const Tag = isInternalLink ? Link : "a";
    return <Tag className={cls} onClick={handleClick} href={href}>{children}</Tag>;
  }

  return (
    <button className={cls} onClick={handleClick}>{children}</button>
  );
}
