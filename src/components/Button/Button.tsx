"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./Button.module.css";

type ButtonType = "primary" | "secondary" | "text";

type ButtonProps = {
  label: string;
  type?: ButtonType;
  showArrowLeft?: boolean;
  showArrowRight?: boolean;
  forceHover?: boolean;
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
  onClick,
  className,
  as,
  href,
}: ButtonProps) {
  const Tag = as ?? (href ? "a" : "button");
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
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
    } else if (onClick) {
      e.preventDefault();
    }
    onClick?.();
  }

  return (
    <Tag className={cls} onClick={handleClick} href={href}>
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
      {showArrowRight && (
        <span className={iconClass}>
          <ArrowRight size={iconSize} strokeWidth={1.5} />
        </span>
      )}
    </Tag>
  );
}
