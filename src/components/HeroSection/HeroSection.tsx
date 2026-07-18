"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/Button/Button";
import { shouldReduceMotion, NAV_SCROLL_OFFSET } from "@/lib/animation";
import { useDict } from "@/lib/dict-context";
import styles from "./HeroSection.module.css";

function HeroArcCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const deepRef  = useRef<HTMLCanvasElement>(null); // gDeep  — CSS blur 26px
  const bodyRef  = useRef<HTMLCanvasElement>(null); // gBody  — CSS blur 11px
  const innerRef = useRef<HTMLCanvasElement>(null); // gInner — CSS blur 3.5px
  const mainRef  = useRef<HTMLCanvasElement>(null); // gEdge + occlusion + masse noire

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const deepCanvas  = deepRef.current;
    const bodyCanvas  = bodyRef.current;
    const innerCanvas = innerRef.current;
    const mainCanvas  = mainRef.current;
    if (!wrapper || !deepCanvas || !bodyCanvas || !innerCanvas || !mainCanvas) return;

    const dCtx = deepCanvas.getContext("2d",  { alpha: true }) as CanvasRenderingContext2D;
    const bCtx = bodyCanvas.getContext("2d",  { alpha: true }) as CanvasRenderingContext2D;
    const nCtx = innerCanvas.getContext("2d", { alpha: true }) as CanvasRenderingContext2D;
    const mCtx = mainCanvas.getContext("2d",  { alpha: true }) as CanvasRenderingContext2D;
    if (!dCtx || !bCtx || !nCtx || !mCtx) return;

    let w = 0, h = 0, canvasLeft = 0;

    function resize() {
      if (!wrapper || !deepCanvas || !bodyCanvas || !innerCanvas || !mainCanvas) return;
      const dpr = window.devicePixelRatio || 1;
      w = wrapper.offsetWidth;
      h = wrapper.offsetHeight;
      for (const canvas of [deepCanvas, bodyCanvas, innerCanvas, mainCanvas]) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      for (const ctx of [dCtx, bCtx, nCtx, mCtx]) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      canvasLeft = wrapper.getBoundingClientRect().left;
      const isMob = window.innerWidth < 1024;
      deepCanvas.style.filter  = `blur(${isMob ? 16 : 26}px)`;
      bodyCanvas.style.filter  = `blur(${isMob ? 18 : 11}px)`;
      innerCanvas.style.filter = `blur(${isMob ? 9 : 3.5}px)`;
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

    function onMouseMove(e: MouseEvent) { clientX = e.clientX; }
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
    observer.observe(mainCanvas);

    const isMobileDevice = window.innerWidth < 1024;
    const INTRO_DELAY = isMobileDevice ? 0 : 100;
    const INTRO_DURATION = 900;

    function draw() {
      if (!visible) return;
      animId = requestAnimationFrame(draw);
      const now = performance.now();
      const t = (now - t0) * 0.001;

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
      const cpy = horizonY - Math.max(40, h * 0.28);
      const arcOverflow = isMobile ? 0.3 : 0.05;
      const x0 = -w * arcOverflow;
      const y0 = horizonY + 8 + breathe;
      const x2 = w * (1 + arcOverflow);
      const y2 = horizonY + 8 + breathe;

      const normalizedMx = mx / w;
      const peak = isMobile ? 0.5 : Math.max(0.05, Math.min(0.95, normalizedMx + smoothVx * 0.002));

      const gi = 1.0;
      const sf = isMobile ? (0.4 + scrollProgress * 1.8) : 1.0;
      const dL = isMobile ? Math.max(0.15, sf * 0.38) : 0.15;
      const dR = isMobile ? Math.max(0.25, sf * 0.38) : 0.25;
      const bL = isMobile ? Math.max(0.10, sf * 0.28) : 0.10;
      const bR = isMobile ? Math.max(0.20, sf * 0.28) : 0.20;
      const iL = isMobile ? Math.max(0.06, sf * 0.18) : 0.06;
      const iR = isMobile ? Math.max(0.12, sf * 0.18) : 0.12;
      const eL = isMobile ? Math.max(0.04, sf * 0.10) : 0.04;
      const eR = isMobile ? Math.max(0.06, sf * 0.10) : 0.06;

      const edgeDist = Math.abs(peak - 0.5) * 2;
      const cpyScale = Math.min(1, w / 1200);
      const edgeScale = Math.max(0.72, 1 - Math.pow(edgeDist, 2.5) * 0.28);
      const halfReveal = w * introProgress;

      function arc(ctx: CanvasRenderingContext2D, cpyOffset: number, lineWidth: number, style: string | CanvasGradient) {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.quadraticCurveTo(cpx, cpy + cpyOffset, x2, y2);
        ctx.strokeStyle = style;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      // Clip intro sur chaque couche glow
      for (const ctx of [dCtx, bCtx, nCtx]) {
        ctx.clearRect(0, 0, w, h);
        ctx.save();
        ctx.beginPath();
        ctx.rect(w * 0.5 - halfReveal, 0, halfReveal * 2, h);
        ctx.clip();
      }

      // 1. Halo profond — deepCanvas (CSS blur 26px desktop / 16px mobile)
      const gDeep = dCtx.createLinearGradient(0, 0, w, 0);
      const dfL = 0.05 * gi;
      const dfR = 0.04 * gi;
      gDeep.addColorStop(0,                                              `rgba(88,20,5,${dfL})`);
      gDeep.addColorStop(Math.max(0,   Math.min(1, peak - dL)),         `rgba(118,34,8,${(0.20 + 0.16) * gi})`);
      gDeep.addColorStop(peak,                                           `rgba(148,46,10,${0.50 * gi})`);
      gDeep.addColorStop(Math.min(1,   peak + dR),                      `rgba(100,26,6,${(0.20 + 0.10) * gi})`);
      gDeep.addColorStop(1,                                              `rgba(82,18,4,${dfR})`);
      arc(dCtx, 20 * cpyScale, (isMobile ? 72 : 120) * edgeScale, gDeep);

      // 2. Corona principale — bodyCanvas (CSS blur 11px desktop / 18px mobile)
      const gBody = bCtx.createLinearGradient(0, 0, w, 0);
      const bfL = 0.06 * gi;
      const bfR = 0.05 * gi;
      gBody.addColorStop(0,                                              `rgba(158,54,18,${bfL})`);
      gBody.addColorStop(Math.max(0,   Math.min(1, peak - bL)),         `rgba(188,72,30,${(0.28 + 0.30) * gi})`);
      gBody.addColorStop(peak,                                           `rgba(215,94,46,${0.98 * gi})`);
      gBody.addColorStop(Math.min(1,   peak + bR),                      `rgba(168,60,24,${(0.28 + 0.18) * gi})`);
      gBody.addColorStop(1,                                              `rgba(145,48,16,${bfR})`);
      arc(bCtx, 6 * cpyScale, (isMobile ? 42 : 62) * edgeScale, gBody);

      // 3. Anneau interne — innerCanvas (CSS blur 3.5px desktop / 9px mobile)
      const gInner = nCtx.createLinearGradient(0, 0, w, 0);
      const ifL = 0.03 * gi;
      const ifR = 0.02 * gi;
      gInner.addColorStop(0,                                             `rgba(215,105,44,${ifL})`);
      gInner.addColorStop(Math.max(0,   Math.min(1, peak - iL)),        `rgba(238,136,64,${(0.12 + 0.52) * gi})`);
      gInner.addColorStop(peak,                                          `rgba(255,175,80,${0.96 * gi})`);
      gInner.addColorStop(Math.min(1,   peak + iR),                     `rgba(224,115,54,${(0.12 + 0.32) * gi})`);
      gInner.addColorStop(1,                                             `rgba(205,92,40,${ifR})`);
      arc(nCtx, -2 * cpyScale, isMobile ? 18 : 18, gInner);

      // Fin du clip intro sur les couches glow
      for (const ctx of [dCtx, bCtx, nCtx]) ctx.restore();

      // 4. Main canvas : gEdge (sharp) + occlusion + masse noire
      mCtx.clearRect(0, 0, w, h);
      mCtx.save();
      mCtx.beginPath();
      mCtx.rect(w * 0.5 - halfReveal, 0, halfReveal * 2, h);
      mCtx.clip();

      const gEdge = mCtx.createLinearGradient(0, 0, w, 0);
      const efL = 0.07 * gi;
      const efR = 0.05 * gi;
      gEdge.addColorStop(0,                                              `rgba(238,162,72,${efL})`);
      gEdge.addColorStop(Math.max(0,   Math.min(1, peak - eL)),         `rgba(252,204,118,${(0.07 + 0.16) * gi})`);
      gEdge.addColorStop(peak,                                           `rgba(255,242,198,${0.92 * gi})`);
      gEdge.addColorStop(Math.min(1,   peak + eR),                      `rgba(250,198,112,${(0.07 + 0.14) * gi})`);
      gEdge.addColorStop(1,                                              `rgba(230,155,68,${efR})`);
      arc(mCtx, -7 * cpyScale, isMobile ? 2.5 : 3, gEdge);

      mCtx.restore();

      const fadeTop = horizonY - 55;
      const fadeBottom = horizonY + 6;
      const gFade = mCtx.createLinearGradient(0, fadeTop, 0, fadeBottom);
      gFade.addColorStop(0, "rgba(9,9,11,0)");
      gFade.addColorStop(0.55, "rgba(9,9,11,0.10)");
      gFade.addColorStop(0.82, "rgba(9,9,11,0.75)");
      gFade.addColorStop(1, "rgba(9,9,11,1)");

      mCtx.save();
      mCtx.beginPath();
      mCtx.moveTo(x0, y0);
      mCtx.quadraticCurveTo(cpx, cpy, x2, y2);
      mCtx.lineTo(x2, fadeTop);
      mCtx.lineTo(x0, fadeTop);
      mCtx.closePath();
      mCtx.fillStyle = gFade;
      mCtx.fill();
      mCtx.restore();

      mCtx.save();
      mCtx.beginPath();
      mCtx.moveTo(x0, y0);
      mCtx.quadraticCurveTo(cpx, cpy + 2, x2, y2);
      mCtx.lineTo(w + w * 0.1, h + 10);
      mCtx.lineTo(-w * 0.1, h + 10);
      mCtx.closePath();
      mCtx.fillStyle = "#09090B";
      mCtx.fill();
      mCtx.restore();
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
    <div ref={wrapperRef} className={styles.arcCanvas} aria-hidden>
      <canvas ref={deepRef}  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
      <canvas ref={bodyRef}  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
      <canvas ref={innerRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
      <canvas ref={mainRef}  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
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
            <Button label={h.ctaPrimary} type="primary" href="#contact" />
            <Button label={h.ctaSecondary} type="secondary" href="#projets" />
          </div>
        </div>

        <a href="#projets" className={styles.scrollIndicator} aria-label={h.ctaSecondary} onClick={(e) => { e.preventDefault(); const el = document.getElementById("projets"); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET, behavior: "smooth" }); }}>
          <span className={styles.scrollLabel}>{h.scroll}</span>
          <div className={styles.scrollLine} />
        </a>
      </section>
      <HeroArcCanvas />
    </>
  );
}
