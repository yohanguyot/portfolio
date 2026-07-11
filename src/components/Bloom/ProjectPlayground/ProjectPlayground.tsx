"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import ProjectNav from "@/components/Project/Nav/Nav";
import type { Dictionary } from "@/lib/getDictionary";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
import styles from "./ProjectPlayground.module.css";

type ClientId = "bloom" | "erable" | "the-elements-nation" | "lqr-house" | "repetto" | "versity";

type CardVars = {
  "--card-bg": string;
  "--card-radius": string;
  "--card-border-width"?: string;
  "--card-border-color"?: string;
  "--card-shadow": string;
  "--card-text-primary": string;
  "--card-text-secondary": string;
  "--card-btn-bg": string;
  "--card-btn-bg-hover"?: string;
  "--card-btn-radius": string;
  "--card-btn-color": string;
  "--card-btn-border-width"?: string;
  "--card-btn-border-color"?: string;
  "--card-btn-shadow"?: string;
  "--card-btn-active-shadow"?: string;
  "--card-btn-active-transform"?: string;
  "--card-font": string;
};

type ClientData = {
  id: ClientId;
  tabLabel: string;
  name: string;
  category: string;
  imageSrc: string;
  collection: string;
  vars: CardVars;
  // Token panel
  accentSwatch: string;
  accentHex: string;
  bgSwatch: string;
  bgHex: string;
  borderHex: string;
  textHex: string;
  mutedHex: string;
  font: string;
};

type Props = { dict: Dictionary["bloom"]["playground"] };

const CATEGORY_KEYS: Record<ClientId, keyof Dictionary["bloom"]["playground"]["categories"]> = {
  "bloom": "bloom",
  "erable": "erable",
  "the-elements-nation": "elements",
  "lqr-house": "lqr",
  "repetto": "repetto",
  "versity": "versity",
};

const CLIENTS: ClientData[] = [
  {
    id: "bloom",
    tabLabel: "Bloom",
    name: "Bloom",
    category: "",
    imageSrc: "/images/projects/bloom/cards/bloom.png",
    collection: "Bloom Collection",
    vars: {
      "--card-bg": "#111827",
      "--card-radius": "16px",
      "--card-shadow": "0px 9px 18px 0px rgba(6,9,14,0.15)",
      "--card-text-primary": "#F9FAFB",
      "--card-text-secondary": "#9DA4AF",
      "--card-btn-bg": "#4B4EFC",
      "--card-btn-bg-hover": "#4539F2",
      "--card-btn-radius": "8px",
      "--card-btn-color": "#F9FAFB",
      "--card-btn-active-transform": "scale(0.98)",
      "--card-font": "var(--font-inter)",
    },
    accentSwatch: "#7883FF",
    accentHex: "#7883FF",
    bgSwatch: "#111827",
    bgHex: "#111827",
    borderHex: "NONE",
    textHex: "#F9FAFB",
    mutedHex: "#9DA4AF",
    font: "Inter",
  },
  {
    id: "erable",
    tabLabel: "Erableº",
    name: "Erableº",
    category: "",
    imageSrc: "/images/projects/bloom/cards/erable.png",
    collection: "Erableº Collection",
    vars: {
      "--card-bg": "#FAFAFA",
      "--card-radius": "2px",
      "--card-border-width": "1.5px",
      "--card-border-color": "#1F1F1F",
      "--card-shadow": "3px 3px 0px 0px #DCCCFF",
      "--card-text-primary": "#1F1F1F",
      "--card-text-secondary": "#737373",
      "--card-btn-bg": "#98F9CF",
      "--card-btn-bg-hover": "#64F1BD",
      "--card-btn-radius": "2px",
      "--card-btn-color": "#1F1F1F",
      "--card-btn-border-width": "1.5px",
      "--card-btn-border-color": "#1F1F1F",
      "--card-btn-shadow": "3px 3px 0px 0px #DCCCFF",
      "--card-btn-active-shadow": "none",
      "--card-font": "'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    accentSwatch: "#98F9CF",
    accentHex: "#98F9CF",
    bgSwatch: "#FAFAFA",
    bgHex: "#FAFAFA",
    borderHex: "#1F1F1F",
    textHex: "#1F1F1F",
    mutedHex: "#737373",
    font: "Helvetica Neue",
  },
  {
    id: "the-elements-nation",
    tabLabel: "The Elements Nation",
    name: "The Elements Nation",
    category: "",
    imageSrc: "/images/projects/bloom/cards/elements-nation.png",
    collection: "The Elements Nation Collection",
    vars: {
      "--card-bg": "#140B1D",
      "--card-radius": "32px",
      "--card-shadow": "0px 9px 18px 0px rgba(6,9,14,0.15)",
      "--card-text-primary": "#F9FAFB",
      "--card-text-secondary": "#9E8DA5",
      "--card-btn-bg": "#8B5CF6",
      "--card-btn-bg-hover": "#7C3AED",
      "--card-btn-radius": "24px",
      "--card-btn-color": "#F9FAFB",
      "--card-font": "var(--font-josefin-sans)",
    },
    accentSwatch: "#7883FF",
    accentHex: "#7883FF",
    bgSwatch: "#140B1D",
    bgHex: "#140B1D",
    borderHex: "NONE",
    textHex: "#F9FAFB",
    mutedHex: "#9E8DA5",
    font: "Josefin Sans",
  },
  {
    id: "lqr-house",
    tabLabel: "LQR House",
    name: "LQR House",
    category: "",
    imageSrc: "/images/projects/bloom/cards/lqr-house.png",
    collection: "LQR House Collection",
    vars: {
      "--card-bg": "#111113",
      "--card-radius": "4px",
      "--card-shadow": "0px 9px 18px 0px rgba(6,9,14,0.15)",
      "--card-text-primary": "#F9FAFB",
      "--card-text-secondary": "#79808D",
      "--card-btn-bg": "linear-gradient(to right, #AC8253, #73593B)",
      "--card-btn-bg-hover": "linear-gradient(to right, #C79C6B, #9F7341)",
      "--card-btn-radius": "4px",
      "--card-btn-color": "#F9FAFB",
      "--card-font": "var(--font-poppins)",
    },
    accentSwatch: "linear-gradient(to right, #AC8253, #73593B)",
    accentHex: "#AC8253 → #73593B",
    bgSwatch: "#111113",
    bgHex: "#111113",
    borderHex: "NONE",
    textHex: "#F9FAFB",
    mutedHex: "#79808D",
    font: "Poppins",
  },
  {
    id: "repetto",
    tabLabel: "Repetto",
    name: "Repetto",
    category: "",
    imageSrc: "/images/projects/bloom/cards/repetto.png",
    collection: "Repetto Collection",
    vars: {
      "--card-bg": "#FAFAF7",
      "--card-radius": "2px",
      "--card-shadow": "0px 9px 18px 0px rgba(6,9,14,0.15)",
      "--card-text-primary": "#1A1A1A",
      "--card-text-secondary": "#696969",
      "--card-btn-bg": "#000000",
      "--card-btn-bg-hover": "#1A1A1A",
      "--card-btn-radius": "2px",
      "--card-btn-color": "#FAFAF7",
      "--card-font": "var(--font-archivo)",
    },
    accentSwatch: "#000000",
    accentHex: "#000000",
    bgSwatch: "#FAFAF7",
    bgHex: "#FAFAF7",
    borderHex: "NONE",
    textHex: "#1A1A1A",
    mutedHex: "#696969",
    font: "Archivo",
  },
  {
    id: "versity",
    tabLabel: "Versity",
    name: "Versity",
    category: "",
    imageSrc: "/images/projects/bloom/cards/versity.png",
    collection: "Versity Collection",
    vars: {
      "--card-bg": "#0E0D1C",
      "--card-radius": "8px",
      "--card-shadow": "0px 9px 18px 0px rgba(6,9,14,0.15)",
      "--card-text-primary": "#F9FAFB",
      "--card-text-secondary": "#8598B9",
      "--card-btn-bg": "linear-gradient(to right, #5246F1, #A843E6)",
      "--card-btn-bg-hover": "linear-gradient(to right, #392ED4, #8A27C9)",
      "--card-btn-radius": "8px",
      "--card-btn-color": "#F9FAFB",
      "--card-font": "var(--font-inter)",
    },
    accentSwatch: "linear-gradient(to right, #5246F1, #A543E6)",
    accentHex: "#5246F1 → #A543E6",
    bgSwatch: "#0E0D1C",
    bgHex: "#0E0D1C",
    borderHex: "NONE",
    textHex: "#F9FAFB",
    mutedHex: "#8598B9",
    font: "Inter",
  },
];

const TOKEN_ROWS = [
  {
    label: "Accent",
    getValue: (c: ClientData) => c.accentHex,
    getSwatch: (c: ClientData) => c.accentSwatch,
  },
  {
    label: "Background",
    getValue: (c: ClientData) => c.bgHex,
    getSwatch: (c: ClientData) => c.bgSwatch,
  },
  {
    label: "Border",
    getValue: (c: ClientData) => c.borderHex,
    getSwatch: () => null,
  },
  {
    label: "Text",
    getValue: (c: ClientData) => c.textHex,
    getSwatch: (c: ClientData) => c.textHex,
  },
  {
    label: "Muted",
    getValue: (c: ClientData) => c.mutedHex,
    getSwatch: (c: ClientData) => c.mutedHex,
  },
];

function CardInner({ client, btnLabel }: { client: ClientData; btnLabel: string }) {
  return (
    <>
      <div className={styles.cardImage}>
        <Image src={client.imageSrc} alt={client.name} width={316} height={492} className={styles.cardImg} />
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.cardName}>
          <span className={styles.cardCollection}>{client.collection}</span>
          <span className={styles.cardTitle}>{client.name}</span>
        </div>
        <span className={styles.cardPrice}>$25</span>
        <div className={styles.cardBtn}>
          <span className={styles.cardBtnLabel}>{btnLabel}</span>
        </div>
      </div>
    </>
  );
}

export default function ProjectPlayground({ dict }: Props) {
  const [activeId, setActiveId] = useState<ClientId>("bloom");
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const tabsRowRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  function updateIndicator() {
    const index = CLIENTS.findIndex((c) => c.id === activeId);
    const btn = tabRefs.current[index];
    if (!btn) return;
    setIndicatorStyle({ transform: `translateX(${btn.offsetLeft}px)`, width: btn.offsetWidth });
  }

  useLayoutEffect(() => {
    updateIndicator();
    document.fonts.ready.then(updateIndicator);

    const index = CLIENTS.findIndex(c => c.id === activeId);
    const btn = tabRefs.current[index];
    const container = tabsRef.current;
    if (btn && container) {
      const target = btn.offsetLeft - container.clientWidth / 2 + btn.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  function checkFades() {
    const el = tabsRef.current;
    if (!el) return;
    setFadeLeft(el.scrollLeft > 0);
    setFadeRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }

  function scrollTabs(dir: "left" | "right") {
    const el = tabsRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 160 : -160, behavior: "smooth" });
  }

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const leadEl = leadRef.current;
    const tabsRowEl = tabsRowRef.current;
    const viewerEl = viewerRef.current;
    if (leadEl) { leadEl.style.opacity = '0'; leadEl.style.transform = 'scale(0.98) translateY(12px)'; }
    if (tabsRowEl) { tabsRowEl.style.opacity = '0'; tabsRowEl.style.transform = 'scale(0.98) translateY(12px)'; }
    if (viewerEl) { viewerEl.style.opacity = '0'; viewerEl.style.transform = 'scale(0.98) translateY(12px)'; }
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const section = sectionRef.current;
    const leadEl = leadRef.current;
    const tabsRowEl = tabsRowRef.current;
    const viewerEl = viewerRef.current;
    if (!section) return;

    return observe(section, 0.1, () => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (leadEl) {
          leadEl.style.transition = `opacity ${DURATION}ms ${EASE} 80ms, transform ${DURATION}ms ${EASE} 80ms`;
          leadEl.style.opacity = '1';
          leadEl.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { leadEl.style.transform = ''; leadEl.style.transition = ''; }, DURATION + 80);
        }
        if (tabsRowEl) {
          tabsRowEl.style.transition = `opacity ${DURATION}ms ${EASE} 160ms, transform ${DURATION}ms ${EASE} 160ms`;
          tabsRowEl.style.opacity = '1';
          tabsRowEl.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { tabsRowEl.style.transform = ''; tabsRowEl.style.transition = ''; }, DURATION + 160);
        }
        if (viewerEl) {
          viewerEl.style.transition = `opacity ${DURATION}ms ${EASE} 240ms, transform ${DURATION}ms ${EASE} 240ms`;
          viewerEl.style.opacity = '1';
          viewerEl.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { viewerEl.style.transform = ''; viewerEl.style.transition = ''; }, DURATION + 240);
        }
      }));
    });
  }, []);

  useEffect(() => {
    checkFades();
    const el = tabsRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkFades, { passive: true });
    window.addEventListener("resize", checkFades, { passive: true });
    return () => {
      el.removeEventListener("scroll", checkFades);
      window.removeEventListener("resize", checkFades);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const idx = CLIENTS.findIndex(c => c.id === activeId);
    if (dx < -60 && idx < CLIENTS.length - 1) setActiveId(CLIENTS[idx + 1].id);
    else if (dx > 60 && idx > 0) setActiveId(CLIENTS[idx - 1].id);
  }

  const clientBase = CLIENTS.find((c) => c.id === activeId)!;
  const client = { ...clientBase, category: dict.categories[CATEGORY_KEYS[activeId]] };

  return (
    <>
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.playground}>
          <div className={styles.header}>
            <SectionHeader label={dict.label} heading={dict.heading} />
            <p ref={leadRef} className={styles.lead}>{dict.lead}</p>
          </div>

          {/* Tab bar */}
          <div ref={tabsRowRef} className={styles.tabsRow}>
            <button className={`${styles.scrollBtn} ${styles.scrollBtnLeft} ${!fadeLeft ? styles.scrollBtnHidden : ""}`} onClick={() => scrollTabs("left")} aria-label={dict.scrollLeft} tabIndex={fadeLeft ? 0 : -1}>
              <ChevronLeft size={16} />
            </button>
            <div className={[styles.tabsWrapper, fadeLeft ? styles.fadeLeft : "", fadeRight ? styles.fadeRight : ""].filter(Boolean).join(" ")}>
              <div className={styles.tabs} role="tablist" ref={tabsRef}>
                <div className={styles.tabIndicator} style={indicatorStyle} aria-hidden="true" />
                {CLIENTS.map((c, i) => (
                  <button
                    key={c.id}
                    ref={(el) => { tabRefs.current[i] = el; }}
                    role="tab"
                    aria-selected={c.id === activeId}
                    className={`${styles.tab} ${c.id === activeId ? styles.tabActive : ""}`}
                    onClick={() => setActiveId(c.id)}
                  >
                    {c.tabLabel}
                  </button>
                ))}
              </div>
            </div>
            <button className={`${styles.scrollBtn} ${styles.scrollBtnRight} ${!fadeRight ? styles.scrollBtnHidden : ""}`} onClick={() => scrollTabs("right")} aria-label={dict.scrollRight} tabIndex={fadeRight ? 0 : -1}>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Viewer */}
          <div ref={viewerRef} className={styles.viewer} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            {/* Card */}
            <div className={styles.cardWrap}>
              <div
                className={styles.bloomCard}
                style={client.vars as React.CSSProperties}
              >
                <CardInner client={client} btnLabel={dict.cardBtn} />
              </div>
            </div>

            {/* Token panel */}
            <div className={styles.tokenPanel}>
              <div className={styles.tokenHeader}>
                <p className={styles.tokenName}>{client.name}</p>
                <p className={styles.tokenCategory}>{client.category}</p>
              </div>
              <div className={styles.tokenRows}>
                {TOKEN_ROWS.map((row, i) => {
                  const swatch = row.getSwatch(client);
                  return (
                    <div
                      key={row.label}
                      className={`${styles.tokenRow} ${i > 0 ? styles.tokenRowBorder : ""}`}
                    >
                      <div className={styles.tokenLeft}>
                        <div
                          className={styles.swatch}
                          style={swatch ? { background: swatch } : undefined}
                        />
                        <span className={styles.tokenLabel}>{row.label}</span>
                      </div>
                      <span className={styles.tokenValue}>{row.getValue(client)}</span>
                    </div>
                  );
                })}
              </div>
              <span className={styles.fontTag}>Font: {client.font}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
    <ProjectNav
      prev={{ href: "/wenimmo", label: "Wenimmo" }}
      next={{ href: "/keepro", label: "Keepro" }}
    />
    </>
  );
}
