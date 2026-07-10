"use client";

import { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { observe } from "@/lib/animation";
import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  label: string;
  heading: React.ReactNode;
  className?: string;
  animationThreshold?: number;
  entranceDelay?: number;
};

export type SectionHeaderHandle = {
  trigger: (delay?: number) => void;
  element: HTMLDivElement | null;
};

const SectionHeader = forwardRef<SectionHeaderHandle, SectionHeaderProps>(function SectionHeader(
  { label, heading, className, animationThreshold = 0.2, entranceDelay = 0 },
  ref
) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);

  const triggerFn = (delay = entranceDelay) => {
    const labelEl = labelRef.current;
    const h2El = h2Ref.current;
    if (!labelEl || !h2El) return;
    labelEl.style.animationDelay = `${delay}ms`;
    h2El.style.animationDelay = `${delay + 80}ms`;
    labelEl.classList.add(styles.labelVisible);
    h2El.classList.add(styles.headingVisible);
  };

  useImperativeHandle(ref, () => ({ trigger: triggerFn, element: wrapperRef.current }));

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    return observe(wrapper, animationThreshold, () => triggerFn(entranceDelay));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationThreshold, entranceDelay]);

  return (
    <div ref={wrapperRef} className={[styles.titleBlock, className].filter(Boolean).join(" ")}>
      <p ref={labelRef} className={styles.label}>{label}</p>
      <h2 ref={h2Ref} className={styles.heading}>{heading}</h2>
    </div>
  );
});

export default SectionHeader;
