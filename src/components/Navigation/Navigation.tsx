"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Status } from "@/components/StatusDot/StatusDot";
import styles from "./Navigation.module.css";

type NavLinkState = "default" | "hover" | "active";

type NavLinkProps = {
  label: string;
  state?: NavLinkState;
  href?: string;
  className?: string;
};

export function NavLink({ label, state = "default", href = "#", className }: NavLinkProps) {
  const stateClass =
    state === "active"
      ? styles.navLinkActive
      : state === "hover"
      ? styles.navLinkHover
      : "";

  return (
    <a
      href={href}
      className={[styles.navLink, stateClass, className ?? ""].filter(Boolean).join(" ")}
    >
      <span className={styles.navLinkLabel}>{label}</span>
    </a>
  );
}

const LANGUAGES = [
  { code: "FR", label: "Français" },
  { code: "EN", label: "English" },
  { code: "ES", label: "Español" },
];

type LanguageDropdownProps = {
  className?: string;
};

export function LanguageDropdown({ className }: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState("FR");
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function recompute() {
    if (!panelRef.current || !triggerRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const navEl = wrapperRef.current?.closest("nav");
    const anchorBottom = navEl
      ? navEl.getBoundingClientRect().bottom
      : triggerRect.bottom;
    const panelWidth = panelRef.current.offsetWidth;
    setPanelStyle({
      position: "fixed",
      top: anchorBottom + 8,
      left: triggerRect.left + triggerRect.width / 2 - panelWidth / 2,
    });
  }

  useLayoutEffect(() => {
    if (!isOpen) return;
    recompute();
    // Re-mesure après chargement des polices (JetBrains Mono peut ne pas être
    // disponible au premier rendu, ce qui fausse offsetWidth)
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) recompute();
    });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current && !wrapperRef.current.contains(e.target as Node) &&
        panelRef.current && !panelRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className={[styles.langWrapper, className ?? ""].filter(Boolean).join(" ")}>
      <button
        ref={triggerRef}
        className={[styles.langDropdown, isOpen ? styles.langDropdownActive : ""].filter(Boolean).join(" ")}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.langLabel}>{current}</span>
        <span className={styles.langIcon}>
          {isOpen ? (
            <ChevronUp size={16} strokeWidth={1.5} />
          ) : (
            <ChevronDown size={16} strokeWidth={1.5} />
          )}
        </span>
      </button>

      {isOpen && createPortal(
        <ul
          ref={panelRef}
          className={styles.langPanel}
          style={panelStyle}
          role="listbox"
          aria-label="Langue"
        >
          {LANGUAGES.map(({ code, label }) => (
            <li key={code} role="option" aria-selected={code === current}>
              <button
                className={[
                  styles.langOption,
                  code === current ? styles.langOptionActive : "",
                ].filter(Boolean).join(" ")}
                onClick={() => {
                  setCurrent(code);
                  setIsOpen(false);
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
}

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <a href="/" className={styles.logo}>Yohan Guyot</a>
        </div>
        <div className={styles.right}>
          <div className={styles.links}>
            <NavLink label="Projets" href="#projets" />
            <NavLink label="Process" href="#process" />
            <NavLink label="À propos" href="#a-propos" />
            <NavLink label="Contact" href="#contact" />
          </div>
          <LanguageDropdown />
          <Status />
        </div>
      </div>
    </nav>
  );
}