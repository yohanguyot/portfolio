"use client";
import { useEffect, useRef } from "react";

const TILE = 512;

function buildTile(): HTMLCanvasElement {
  const tile = document.createElement("canvas");
  tile.width = tile.height = TILE;
  const ctx = tile.getContext("2d")!;
  const img = ctx.createImageData(TILE, TILE);
  const data = img.data;

  for (let i = 0; i < data.length; i += 4) {
    // Box-Muller — fait une seule fois, pas de compromis qualité
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    const luma = Math.max(0, Math.min(255, (z * 72 + 128) | 0));
    // Légère variation de teinte par canal
    data[i]     = Math.max(0, Math.min(255, luma + ((Math.random() * 12 - 6) | 0)));
    data[i + 1] = Math.max(0, Math.min(255, luma + ((Math.random() * 12 - 6) | 0)));
    data[i + 2] = Math.max(0, Math.min(255, luma + ((Math.random() * 12 - 6) | 0)));
    data[i + 3] = 255;
  }

  ctx.putImageData(img, 0, 0);
  return tile;
}

export default function Grain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tile = buildTile();
    const pattern = ctx.createPattern(tile, "repeat")!;

    let rafId: number;
    let frame = 0;

    function resize() {
      canvas!.width  = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function draw() {
      // Random offset → animation du grain, zéro calcul pixel
      const ox = (Math.random() * TILE) | 0;
      const oy = (Math.random() * TILE) | 0;
      pattern.setTransform(new DOMMatrix().translate(ox, oy).scale(1.5));
      ctx!.fillStyle = pattern;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
    }

    function tick() {
      frame++;
      if (frame % 3 === 0) draw();
      rafId = requestAnimationFrame(tick);
    }

    resize();
    draw();
    canvas.style.transition = 'opacity 800ms ease';
    canvas.style.opacity = '0.1';
    tick();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 99999,
        opacity: 0,
        mixBlendMode: "soft-light",
      }}
    />
  );
}
