"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { useDict } from "@/lib/dict-context";
import styles from "./Navigation.module.css";

type NavLinkState = "default" | "hover" | "active";

type NavLinkProps = {
  label: string;
  state?: NavLinkState;
  href?: string;
  className?: string;
  onClickAction?: () => void;
};

export function NavLink({ label, state = "default", href = "#", className, onClickAction }: NavLinkProps) {
  const stateClass =
    state === "active"
      ? styles.navLinkActive
      : state === "hover"
      ? styles.navLinkHover
      : "";

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
    }
    onClickAction?.();
  }

  return (
    <a
      href={href}
      onClick={handleClick}
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
  inline?: boolean;
};

export function LanguageDropdown({ className, inline }: LanguageDropdownProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dict = useDict();
  const currentLang = pathname.split("/")[1]?.toUpperCase() ?? "FR";
  const [isOpen, setIsOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});
  const [stride, setStride] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function switchLocale(code: string) {
    const newLang = code.toLowerCase();
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/") || `/${newLang}`, { scroll: false });
  }

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
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) recompute();
    });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onResize() {
      const nav = wrapperRef.current?.closest("nav");
      if (nav && nav.classList.contains(styles.navMobile)) {
        setIsOpen(false);
      } else {
        recompute();
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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

  useLayoutEffect(() => {
    if (!inline || !wrapperRef.current) return;
    const btns = wrapperRef.current.querySelectorAll("button");
    if (btns.length >= 2) {
      setStride((btns[1] as HTMLElement).offsetLeft - (btns[0] as HTMLElement).offsetLeft);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inline]);

  if (inline) {
    const currentIndex = LANGUAGES.findIndex(({ code }) => code === currentLang);
    return (
      <div ref={wrapperRef} className={[styles.langInline, className ?? ""].filter(Boolean).join(" ")}>
        <span
          className={styles.langInlineIndicator}
          style={{ transform: `translateX(${currentIndex * stride}px)` }}
          aria-hidden="true"
        />
        {LANGUAGES.map(({ code }) => (
          <button
            key={code}
            className={[styles.langInlineOption, code === currentLang ? styles.langInlineOptionActive : ""].filter(Boolean).join(" ")}
            onClick={() => switchLocale(code)}
          >
            {code}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={[styles.langWrapper, className ?? ""].filter(Boolean).join(" ")}>
      <button
        ref={triggerRef}
        className={[styles.langDropdown, isOpen ? styles.langDropdownActive : ""].filter(Boolean).join(" ")}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.langLabel}>{currentLang}</span>
        <span className={`${styles.langIcon} ${isOpen ? styles.langIconOpen : ""}`}>
          <ChevronDown size={16} strokeWidth={1.5} />
        </span>
      </button>

      {isOpen && createPortal(
        <ul
          ref={panelRef}
          className={styles.langPanel}
          style={panelStyle}
          role="listbox"
          aria-label={dict.nav.langLabel}
        >
          {LANGUAGES.map(({ code, label }) => (
            <li key={code} role="option" aria-selected={code === currentLang}>
              <button
                className={[
                  styles.langOption,
                  code === currentLang ? styles.langOptionActive : "",
                ].filter(Boolean).join(" ")}
                onClick={() => {
                  switchLocale(code);
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
  const pathname = usePathname();
  const dict = useDict();
  const lang = pathname.split("/")[1] ?? "fr";
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const NAV_LINKS = [
    { label: dict.nav.links.projects, href: "#projets" },
    { label: dict.nav.links.about, href: "#a-propos" },
    { label: dict.nav.links.process, href: "#process" },
    { label: dict.nav.links.contact, href: "#contact", alwaysLocal: true },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const thresholdRef = useRef(0);
  const isMobileRef = useRef(false);

  const close = () => setMobileOpen(false);

  function recomputeDropdown() {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setDropdownStyle({
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
    });
  }

  // Dynamic mobile breakpoint: switch when nav touches viewport edges
  useLayoutEffect(() => {
    if (!navRef.current) return;

    function measureThreshold() {
      if (!navRef.current || isMobileRef.current) return;
      thresholdRef.current = navRef.current.scrollWidth + 48;
    }

    function check() {
      const mobile = window.innerWidth <= 600 || (thresholdRef.current > 0 && window.innerWidth < thresholdRef.current);
      if (mobile !== isMobileRef.current) {
        isMobileRef.current = mobile;
        setIsMobile(mobile);
        if (!mobile) setMobileOpen(false);
      }
    }

    measureThreshold();
    check();
    setMounted(true);
    document.fonts.ready.then(() => { measureThreshold(); check(); });
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useLayoutEffect(() => {
    if (!mobileOpen) return;
    recomputeDropdown();
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) recomputeDropdown();
    });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    function onResize() {
      if (window.innerWidth >= thresholdRef.current) {
        close();
      } else {
        recomputeDropdown();
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) firstLinkRef.current?.focus();
  }, [mobileOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (mobileOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        navRef.current && !navRef.current.contains(e.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }
    if (mobileOpen) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [mobileOpen]);

  // Scrollspy — only on homepage
  useEffect(() => {
    if (!isHome) { setActiveSection(null); return; }
    const SECTION_IDS = ["projets", "a-propos", "process", "contact"];
    const NAV_HEIGHT = 60;
    const OFFSET = NAV_HEIGHT + Math.round(window.innerHeight * 0.25);

    function getActive() {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 80;
      if (nearBottom) return "contact";
      const scrollY = window.scrollY + OFFSET;
      let active: string | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) active = id;
      }
      return active;
    }

    function onScroll() { setActiveSection(getActive()); }
    setActiveSection(getActive());
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <>
      <nav ref={navRef} className={`${styles.nav} ${isMobile ? styles.navMobile : ""} ${!mounted ? styles.navHidden : (!isMobile ? styles.navAnimated : "")}`}>
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <a
              href={isHome ? "#" : `/${lang}`}
              className={styles.logo}
              onClick={isHome ? (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } : undefined}
            >Yohan Guyot</a>
          </div>

          {/* Desktop */}
          <div className={styles.right}>
            <div className={styles.links}>
              {NAV_LINKS.map((l) => {
                const sectionId = l.href.replace("#", "");
                return (
                  <NavLink
                    key={l.href}
                    label={l.label}
                    href={isHome || l.alwaysLocal ? l.href : `/${lang}${l.href}`}
                    state={activeSection === sectionId ? "active" : "default"}
                  />
                );
              })}
            </div>
            <LanguageDropdown />
          </div>

          {/* Mobile */}
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? dict.nav.closeMenu : dict.nav.openMenu}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <line x1="3" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                className={`${styles.burgerLine} ${mobileOpen ? styles.burgerLine1Open : ""}`} />
              <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                className={`${styles.burgerLine} ${mobileOpen ? styles.burgerLine2Open : ""}`} />
              <line x1="3" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                className={`${styles.burgerLine} ${mobileOpen ? styles.burgerLine3Open : ""}`} />
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && createPortal(
        <>
          <div className={styles.mobileBackdrop} onClick={close} aria-hidden="true" />
          <div
            ref={dropdownRef}
            className={styles.mobileDropdown}
            style={dropdownStyle}
            role="dialog"
            aria-modal="true"
            aria-label={dict.nav.menuLabel}
          >
            {NAV_LINKS.map((l, i) => {
              const href = isHome || l.alwaysLocal ? l.href : `/${lang}${l.href}`;
              return (
                <a
                  key={l.href}
                  href={href}
                  className={styles.mobileLink}
                  onClick={(e) => {
                    if (href.startsWith("#")) {
                      e.preventDefault();
                      const id = href.slice(1);
                      const el = document.getElementById(id);
                      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
                    }
                    close();
                  }}
                  ref={i === 0 ? firstLinkRef : undefined}
                >
                  {l.label}
                </a>
              );
            })}
            <div className={styles.mobileDivider} />
            <div className={styles.mobileFooter}>
              <LanguageDropdown inline />
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}