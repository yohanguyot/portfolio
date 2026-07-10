"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/Button/Button";
import { useDict } from "@/lib/dict-context";
import styles from "./HeroSection.module.css";

function HeroArcCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D;
    if (!ctx) return;

    let w = 0, h = 0;

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 60);
    }
    window.addEventListener("resize", onResize);

    let clientX = w / 2;
    let scrollProgress = 0;
    let mx = w / 2, vx = 0, smoothVx = 0;
    const t0 = performance.now();

    function onMouseMove(e: MouseEvent) {
      clientX = e.clientX;
    }
    document.addEventListener("mousemove", onMouseMove);

    function onScroll() {
      scrollProgress = Math.min(1, window.scrollY / (window.innerHeight * 0.9 || 1));
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    let animId: number;

    const isMobileDevice = window.innerWidth < 768;
    const INTRO_DELAY = isMobileDevice ? 0 : 100;
    const INTRO_DURATION = 650;

    function draw() {
      animId = requestAnimationFrame(draw);
      const now = performance.now();
      const t = (now - t0) * 0.001;
      ctx.fillStyle = "#09090B";
      ctx.fillRect(0, 0, w, h);

      const introRaw = Math.max(0, (now - t0 - INTRO_DELAY) / INTRO_DURATION);
      const introProgress = introRaw >= 1 ? 1 : 1 - Math.pow(1 - introRaw, 3);

      const isMobile = window.innerWidth < 768;

      // Mobile: arc centré ; desktop: suit la souris
      const targetMx = isMobile ? w * 0.5 : clientX - canvas!.getBoundingClientRect().left;
      const oldMx = mx;
      mx += (targetMx - mx) * (isMobile ? 0.09 : 0.015);
      vx = vx * 0.85 + (mx - oldMx) * 0.15;
      smoothVx = smoothVx * 0.92 + vx * 0.08;

      const horizonY = h * 0.72;
      const cpInfluenceX = (mx - w * 0.5) * 0.008;
      const breathe = Math.sin(t * 0.4) * 0.6;
      const cpx = w * 0.5 + cpInfluenceX;
      // Exposant 0.8 : courbure proportionnelle mais moins agressive sur mobile
      const cpy = horizonY - Math.max(40, h * 0.28 * Math.min(1, Math.pow(w / 1200, 0.8)));
      const x0 = -w * 0.05;
      const y0 = horizonY + 8 + breathe;
      const x2 = w * 1.05;
      const y2 = horizonY + 8 + breathe;

      const normalizedMx = mx / w;

      const peak = isMobile ? 0.5 : Math.max(0.05, Math.min(0.95, normalizedMx + smoothVx * 0.002));

      // sf : spread part de 0.15 (compact) et s'étend à ~2.5x au scroll
      // gi : intensité part de 0.35 et monte à 1.0 — contraste visible
      const sf = isMobile ? (0.3 + scrollProgress * 2.55) : 1.0;
      const gi = isMobile ? (0.22 + scrollProgress * 0.78) : 1.0;
      // Math.max évite l'artefact "point" quand sf est petit
      const dL = isMobile ? Math.max(0.12, sf * 0.38) : 0.15;
      const dR = isMobile ? Math.max(0.12, sf * 0.38) : 0.25;
      const bL = isMobile ? Math.max(0.09, sf * 0.28) : 0.10;
      const bR = isMobile ? Math.max(0.09, sf * 0.28) : 0.20;
      const iL = isMobile ? Math.max(0.06, sf * 0.18) : 0.06;
      const iR = isMobile ? Math.max(0.06, sf * 0.18) : 0.12;
      const eL = isMobile ? Math.max(0.04, sf * 0.10) : 0.04;
      const eR = isMobile ? Math.max(0.04, sf * 0.10) : 0.06;

      function drawArc(
        cpyOffset: number,
        lineWidth: number,
        style: string | CanvasGradient,
        shadowColor?: string | null,
        shadowBlur?: number
      ) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.quadraticCurveTo(cpx, cpy + cpyOffset, x2, y2);
        ctx.strokeStyle = style;
        ctx.lineWidth = lineWidth;
        if (shadowColor) {
          ctx.shadowColor = shadowColor;
          ctx.shadowBlur = shadowBlur ?? 0;
        }
        ctx.stroke();
        ctx.restore();
      }

      // Clip centre→bords pour l'intro
      ctx.save();
      ctx.beginPath();
      const halfReveal = w * introProgress;
      ctx.rect(w * 0.5 - halfReveal, 0, halfReveal * 2, h);
      ctx.clip();

      // 1. Halo profond
      const gDeep = ctx.createLinearGradient(0, 0, w, 0);
      gDeep.addColorStop(0, "rgba(80,18,4,0.0)");
      gDeep.addColorStop(Math.max(0, Math.min(1, peak - dL)), `rgba(100,24,6,${0.12 * gi})`);
      gDeep.addColorStop(peak, `rgba(126,34,7,${0.22 * gi})`);
      gDeep.addColorStop(Math.min(1, peak + dR), `rgba(80,18,4,${0.06 * gi})`);
      gDeep.addColorStop(1, "rgba(80,18,4,0.0)");
      drawArc(18, isMobile ? 90 : 130, gDeep);

      // 2. Corps du disque
      const gBody = ctx.createLinearGradient(0, 0, w, 0);
      gBody.addColorStop(0, "rgba(160,55,20,0.0)");
      gBody.addColorStop(Math.max(0, Math.min(1, peak - bL)), `rgba(180,65,25,${0.38 * gi})`);
      gBody.addColorStop(peak, `rgba(198,83,46,${0.85 * gi})`);
      gBody.addColorStop(Math.min(1, peak + bR), `rgba(160,55,20,${0.22 * gi})`);
      gBody.addColorStop(1, "rgba(160,55,20,0.0)");
      drawArc(6, isMobile ? 28 : 38, gBody, "#C6532E", 8);

      // 3. Tranche interne
      const gInner = ctx.createLinearGradient(0, 0, w, 0);
      gInner.addColorStop(0, "rgba(210,100,50,0.0)");
      gInner.addColorStop(Math.max(0, Math.min(1, peak - iL)), `rgba(220,110,55,${0.50 * gi})`);
      gInner.addColorStop(peak, `rgba(236,130,70,${0.85 * gi})`);
      gInner.addColorStop(Math.min(1, peak + iR), `rgba(210,100,50,${0.28 * gi})`);
      gInner.addColorStop(1, "rgba(210,100,50,0.0)");
      drawArc(-3, isMobile ? 9 : 12, gInner, "#EC8A43", 6);

      // 4. Bord chaud (photon edge)
      const gEdge = ctx.createLinearGradient(0, 0, w, 0);
      gEdge.addColorStop(0, "rgba(236,110,67,0.0)");
      gEdge.addColorStop(Math.max(0, Math.min(1, peak - eL)), `rgba(236,110,67,${0.10 * gi})`);
      gEdge.addColorStop(peak, `rgba(255,175,120,${0.35 * gi})`);
      gEdge.addColorStop(Math.min(1, peak + eR), `rgba(236,110,67,${0.08 * gi})`);
      gEdge.addColorStop(1, "rgba(236,110,67,0.0)");
      drawArc(-8, isMobile ? 2 : 2.5, gEdge, "#FFAA88", 6);

      ctx.restore(); // fin du clip intro

      // Occlusion — fondu d'absorption au-dessus de la courbe
      const fadeTop = horizonY - 55;
      const fadeBottom = horizonY + 6;
      const gFade = ctx.createLinearGradient(0, fadeTop, 0, fadeBottom);
      gFade.addColorStop(0, "rgba(9,9,11,0)");
      gFade.addColorStop(0.55, "rgba(9,9,11,0.10)");
      gFade.addColorStop(0.82, "rgba(9,9,11,0.75)");
      gFade.addColorStop(1, "rgba(9,9,11,1)");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(cpx, cpy, x2, y2);
      ctx.lineTo(x2, fadeTop);
      ctx.lineTo(x0, fadeTop);
      ctx.closePath();
      ctx.fillStyle = gFade;
      ctx.fill();
      ctx.restore();

      // Masse noire pleine sous la courbe
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(cpx, cpy + 2, x2, y2);
      ctx.lineTo(w + w * 0.1, h + 10);
      ctx.lineTo(-w * 0.1, h + 10);
      ctx.closePath();
      ctx.fillStyle = "#09090B";
      ctx.fill();
      ctx.restore();
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousemove", onMouseMove);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div className={styles.arcCanvas} aria-hidden>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}

export default function HeroSection() {
  const dict = useDict();
  const h = dict.hero;
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gradientRef.current;
    if (!el) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function onScroll() {
      if (!el) return;
      const scrollY = window.scrollY;
      if (scrollY > window.innerHeight * 1.2) return;
      el.style.transform = `translateX(-50%) translateY(${scrollY * 0.12}px)`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <section className={styles.section} id="hero">
        <div ref={gradientRef} className={styles.gradient} aria-hidden />

        <div className={styles.content}>
          <div className={styles.textContainer}>
            <div className={styles.titleContainer}>
              <p className={styles.eyebrow}>{h.eyebrow}</p>
              <h1 className={styles.displayTitle} style={{ whiteSpace: "nowrap" }}>
                {h.titleLine1}
                <br />
                {h.titleLine2}
              </h1>
            </div>

            <p className={styles.subtitle}>
              {h.subtitlePre1}
              <span className={styles.subtitleHighlight}>{h.subtitleHighlight1}</span>
              {h.subtitleMid.charAt(0)}
              <br className={styles.subtitleBreak} />
              {h.subtitleMid.slice(1)}
              <span className={styles.subtitleHighlight}>{h.subtitleHighlight2}</span>
              {h.subtitlePost}
            </p>
          </div>

          <div className={styles.buttons}>
            <Button label={h.ctaPrimary} type="primary" href="#projets" />
            <Button label={h.ctaSecondary} type="secondary" href="#contact" />
          </div>
        </div>

        <a href="#projets" className={styles.scrollIndicator} aria-label={h.ctaPrimary}>
          <span className={styles.scrollLabel}>{h.scroll}</span>
          <div className={styles.scrollLine} />
        </a>
      </section>
      <HeroArcCanvas />
    </>
  );
}
