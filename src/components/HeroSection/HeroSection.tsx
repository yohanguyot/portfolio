"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/Button/Button";
import { shouldReduceMotion, NAV_SCROLL_OFFSET } from "@/lib/animation";
import { useDict } from "@/lib/dict-context";
import styles from "./HeroSection.module.css";

function HeroArcCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D;
    if (!ctx) return;

    let w = 0, h = 0, canvasLeft = 0;

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvasLeft = canvas.getBoundingClientRect().left;
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
    let visible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) animId = requestAnimationFrame(draw);
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const isMobileDevice = window.innerWidth < 1024;
    const INTRO_DELAY = isMobileDevice ? 0 : 100;
    const INTRO_DURATION = 900;

    // Détection pixel-based : vérifie si ctx.filter blur étale réellement les pixels
    const useCtxFilter = (() => {
      const tc = document.createElement('canvas');
      tc.width = 20; tc.height = 20;
      const tx = tc.getContext('2d');
      if (!tx) return false;
      tx.fillStyle = 'white';
      tx.fillRect(10, 10, 1, 1);
      const before = tx.getImageData(7, 10, 1, 1).data[3];
      tx.clearRect(0, 0, 20, 20);
      tx.filter = 'blur(3px)';
      tx.fillStyle = 'white';
      tx.fillRect(10, 10, 1, 1);
      const after = tx.getImageData(7, 10, 1, 1).data[3];
      return after > before;
    })();

    function draw() {
      if (!visible) return;
      animId = requestAnimationFrame(draw);
      const now = performance.now();
      const t = (now - t0) * 0.001;
      ctx.fillStyle = "#09090B";
      ctx.fillRect(0, 0, w, h);

      const introRaw = Math.max(0, (now - t0 - INTRO_DELAY) / INTRO_DURATION);
      const introProgress = introRaw >= 1 ? 1 : 1 - Math.pow(1 - introRaw, 3);

      const isMobile = window.innerWidth < 1024;

      // Mobile: arc centré ; desktop: suit la souris
      const targetMx = isMobile ? w * 0.5 : clientX - canvasLeft;
      const oldMx = mx;
      mx += (targetMx - mx) * (isMobile ? 0.09 : 0.007);
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

      // sf : spread, gi : intensité — mobile part plus haut pour matcher le rendu desktop
      const sf = isMobile ? (0.85 + scrollProgress * 1.4) : 1.0;
      const gi = isMobile ? (0.95 + scrollProgress * 0.05) : 1.0;
      // Math.max évite l'artefact "point" quand sf est petit
      const dL = isMobile ? Math.max(0.12, sf * 0.38) : 0.15;
      const dR = isMobile ? Math.max(0.12, sf * 0.38) : 0.25;
      const bL = isMobile ? Math.max(0.09, sf * 0.28) : 0.10;
      const bR = isMobile ? Math.max(0.09, sf * 0.28) : 0.20;
      const iL = isMobile ? Math.max(0.06, sf * 0.18) : 0.06;
      const iR = isMobile ? Math.max(0.06, sf * 0.18) : 0.12;
      const eL = isMobile ? Math.max(0.04, sf * 0.10) : 0.04;
      const eR = isMobile ? Math.max(0.04, sf * 0.10) : 0.06;

      // blur via ctx.filter (Chrome/FF) ou multi-pass glow (Safari fallback)
      function drawArc(
        cpyOffset: number,
        lineWidth: number,
        style: string | CanvasGradient,
        blur = 0,
        glowColor = 'rgba(200,80,30,0.8)'
      ) {
        if (blur > 0 && !useCtxFilter) {
          // Multi-pass : étale le trait en plusieurs couches de plus en plus larges
          const passes = 5;
          for (let p = 0; p < passes; p++) {
            const ratio = p / (passes - 1);
            ctx.save();
            ctx.globalAlpha = (0.08 + 0.18 * ratio);
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.quadraticCurveTo(cpx, cpy + cpyOffset, x2, y2);
            ctx.strokeStyle = glowColor;
            ctx.lineWidth = lineWidth + blur * 2.5 * (1 - ratio);
            ctx.stroke();
            ctx.restore();
          }
        }
        ctx.save();
        if (blur > 0 && useCtxFilter) ctx.filter = `blur(${blur}px)`;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.quadraticCurveTo(cpx, cpy + cpyOffset, x2, y2);
        ctx.strokeStyle = style;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.restore();
      }

      // Position exacte sur la courbe au niveau du pic (paramètre t de Bézier)
      const tPeak = Math.max(0, Math.min(1, (peak * w - x0) / (x2 - x0)));
      const xPeak = peak * w;
      const yPeak = (1 - tPeak) * (1 - tPeak) * y0
                  + 2 * tPeak * (1 - tPeak) * cpy
                  + tPeak * tPeak * y2;

      // Clip centre→bords pour l'intro
      ctx.save();
      ctx.beginPath();
      const halfReveal = w * introProgress;
      ctx.rect(w * 0.5 - halfReveal, 0, halfReveal * 2, h);
      ctx.clip();

      // 1. Halo profond — floor visible sur tout l'arc (effet éclipse global)
      const gDeep = ctx.createLinearGradient(0, 0, w, 0);
      const dfL = 0.05 * gi; // floor bord gauche
      const dfR = 0.04 * gi; // floor bord droit (légère asymétrie naturelle)
      gDeep.addColorStop(0,                                              `rgba(88,20,5,${dfL})`);
      gDeep.addColorStop(Math.max(0,   Math.min(1, peak - dL)),         `rgba(118,34,8,${(0.20 + 0.16) * gi})`);
      gDeep.addColorStop(peak,                                           `rgba(148,46,10,${0.50 * gi})`);
      gDeep.addColorStop(Math.min(1,   peak + dR),                      `rgba(100,26,6,${(0.20 + 0.10) * gi})`);
      gDeep.addColorStop(1,                                              `rgba(82,18,4,${dfR})`);
      // lineWidth du halo réduit quand le pic est vers les bords
      const edgeDist = Math.abs(peak - 0.5) * 2; // 0 au centre, 1 au bord
      const edgeScale = Math.max(0.22, 1 - Math.pow(edgeDist, 2.5) * 0.78);
      drawArc(20, (isMobile ? 110 : 120) * edgeScale, gDeep, isMobile ? 22 : 26, `rgba(180,60,12,0.9)`);

      // 2. Corona principale — orange vif, floor ~0.28 partout
      const gBody = ctx.createLinearGradient(0, 0, w, 0);
      const bfL = 0.06 * gi;
      const bfR = 0.05 * gi;
      gBody.addColorStop(0,                                              `rgba(158,54,18,${bfL})`);
      gBody.addColorStop(Math.max(0,   Math.min(1, peak - bL)),         `rgba(188,72,30,${(0.28 + 0.30) * gi})`);
      gBody.addColorStop(peak,                                           `rgba(215,94,46,${0.98 * gi})`);
      gBody.addColorStop(Math.min(1,   peak + bR),                      `rgba(168,60,24,${(0.28 + 0.18) * gi})`);
      gBody.addColorStop(1,                                              `rgba(145,48,16,${bfR})`);
      drawArc(6, isMobile ? 56 : 62, gBody, isMobile ? 20 : 11, `rgba(220,95,45,0.9)`);

      // 3. Anneau interne — jaune-orange, floor ~0.12 partout
      const gInner = ctx.createLinearGradient(0, 0, w, 0);
      const ifL = 0.03 * gi;
      const ifR = 0.02 * gi;
      gInner.addColorStop(0,                                             `rgba(215,105,44,${ifL})`);
      gInner.addColorStop(Math.max(0,   Math.min(1, peak - iL)),        `rgba(238,136,64,${(0.12 + 0.52) * gi})`);
      gInner.addColorStop(peak,                                          `rgba(255,175,80,${0.96 * gi})`);
      gInner.addColorStop(Math.min(1,   peak + iR),                     `rgba(224,115,54,${(0.12 + 0.32) * gi})`);
      gInner.addColorStop(1,                                             `rgba(205,92,40,${ifR})`);
      drawArc(-2, isMobile ? 18 : 18, gInner, isMobile ? 9 : 3.5, `rgba(255,175,80,0.85)`);

      // 4. Bord photon — fil lumineux, floor ~0.07 partout
      const gEdge = ctx.createLinearGradient(0, 0, w, 0);
      const efL = 0.07 * gi;
      const efR = 0.05 * gi;
      gEdge.addColorStop(0,                                              `rgba(238,162,72,${efL})`);
      gEdge.addColorStop(Math.max(0,   Math.min(1, peak - eL)),         `rgba(252,204,118,${(0.07 + 0.16) * gi})`);
      gEdge.addColorStop(peak,                                           `rgba(255,242,198,${0.92 * gi})`);
      gEdge.addColorStop(Math.min(1,   peak + eR),                      `rgba(250,198,112,${(0.07 + 0.14) * gi})`);
      gEdge.addColorStop(1,                                              `rgba(230,155,68,${efR})`);
      drawArc(-7, isMobile ? 2.5 : 3, gEdge, isMobile ? 4 : 0, `rgba(255,242,198,${0.7 * gi})`);

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


      // Vignettes déplacées en CSS (.arcFades)

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
      observer.disconnect();
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
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const update = () => {
      const w = window.innerWidth;
      const isMob = w <= 600;
      const pad = isMob ? 32 : 64;
      const min = isMob ? 16 : 44;
      const size = Math.min(Math.max((w - pad) / 6.5, min), 112);
      el.style.fontSize = `${size}px`;
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const el = gradientRef.current;
    if (!el) return;
    if (shouldReduceMotion()) return;

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
              <h1 ref={titleRef} className={styles.displayTitle} style={{ whiteSpace: "nowrap" }}>
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

        <a href="#projets" className={styles.scrollIndicator} aria-label={h.ctaPrimary} onClick={(e) => { e.preventDefault(); const el = document.getElementById("projets"); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET, behavior: "smooth" }); }}>
          <span className={styles.scrollLabel}>{h.scroll}</span>
          <div className={styles.scrollLine} />
        </a>
      </section>
      <HeroArcCanvas />
    </>
  );
}
