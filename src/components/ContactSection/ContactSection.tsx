"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import Button from "@/components/Button/Button";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { trackEvent } from "@/lib/analytics";
import { useDict } from "@/lib/dict-context";
import { shouldReduceMotion, reveal, observe, wrapWords, revealWords, EASE, DURATION } from "@/lib/animation";
import styles from "./ContactSection.module.css";

function ContactLink({
  href,
  label,
  last = false,
}: {
  href: string;
  label: string;
  last?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`${styles.contactLink} ${last ? styles.contactLinkLast : ""}`}
      onClick={() => trackEvent("contact_link_click", { link: label })}
    >
      <span className={styles.contactLinkLabel}>{label}</span>
      <span className={styles.contactLinkIcon} aria-hidden>
        <ArrowUpRight size={24} strokeWidth={1.5} />
      </span>
    </a>
  );
}

type Errors = { email?: string; brief?: string };

export default function ContactSection({ noMarginTop = false }: { noMarginTop?: boolean }) {
  const dict = useDict();
  const c = dict.contact;
  const NEEDS = c.needs;
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sendError, setSendError] = useState(false);

  const infoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (shouldReduceMotion()) return;

    const cleanups: (() => void)[] = [];

    // ── Info: label + heading word reveal + description ──
    const infoEl = infoRef.current;
    const label = infoEl?.querySelector<HTMLElement>('[class*="label"]');
    const h2 = infoEl?.querySelector<HTMLElement>('h2');
    const desc = infoEl?.querySelector<HTMLElement>(`.${styles.description}`);

    if (label) {
      label.style.transition = 'none';
      label.style.opacity = '0';
      label.style.transform = 'translateY(8px)';
    }
    const words = h2 ? wrapWords(h2) : [];
    if (desc) {
      desc.style.transition = 'none';
      desc.style.opacity = '0';
      desc.style.transform = 'scale(0.98) translateY(12px)';
    }

    cleanups.push(observe(infoEl, 0.1, () => {
      if (label) {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          label.style.transition = `opacity 600ms ${EASE}, transform 600ms ${EASE}`;
          label.style.opacity = '1';
          label.style.transform = 'translateY(0)';
          setTimeout(() => { label.style.transform = ''; label.style.transition = ''; }, 600);
        }));
      }
      revealWords(words, 80, 50);
      if (desc) {
        const descDelay = words.length * 50 + 160;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          desc.style.transition = `opacity ${DURATION}ms ${EASE} ${descDelay}ms, transform ${DURATION}ms ${EASE} ${descDelay}ms`;
          desc.style.opacity = '1';
          desc.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { desc.style.transform = ''; desc.style.transition = ''; }, DURATION + descDelay);
        }));
      }
    }));

    // ── Links ──
    if (linksRef.current) {
      cleanups.push(observe(linksRef.current, 0.1, reveal(linksRef.current, 0)));
    }

    // ── Form ──
    if (formRef.current) {
      cleanups.push(observe(formRef.current, 0.05, reveal(formRef.current, 0)));
    }

    return () => cleanups.forEach(fn => fn());
  }, []);

  function selectNeed(need: string) {
    setSelectedNeed((prev) => (prev === need ? null : need));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const nom = (form.elements.namedItem("nom") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const brief = (form.elements.namedItem("brief") as HTMLTextAreaElement).value;

    const nextErrors: Errors = {};
    if (!email.trim()) nextErrors.email = c.form.errors.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = c.form.errors.emailInvalid;
    if (!brief.trim()) nextErrors.brief = c.form.errors.briefRequired;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setSending(true);
    setSendError(false);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, email, besoin: selectedNeed ?? "", brief }),
    });
    setSending(false);
    if (res.ok) {
      setSubmitted(true);
      trackEvent("contact_form_submit");
    } else setSendError(true);
  }

  return (
    <section className={`${styles.section}${noMarginTop ? ` ${styles.noMarginTop}` : ""}`} id="contact">
      <div className={styles.container}>
        {/* ── Left column wrapper ── */}
        <div className={styles.leftCol}>
          {/* title + description */}
          <div ref={infoRef} className={styles.infoContent}>
            <SectionHeader label={c.label} heading={c.heading} />
            <p className={styles.description}>{c.description}</p>
          </div>

          {/* links */}
          <div ref={linksRef} className={styles.links}>
            <ContactLink
              href="mailto:yohanguyot.contact@gmail.com"
              label="yohanguyot.contact@gmail.com"
            />
            <ContactLink
              href="https://www.linkedin.com/in/yohan-guyot/"
              label="LinkedIn"
              last
            />
          </div>
        </div>

        {/* ── Right — Form ── */}
        <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
          {submitted ? (
            <div className={styles.successMessage}>
              <div className={styles.successIconWrap} aria-hidden>
                <Check size={20} strokeWidth={2} />
              </div>
              <div className={styles.successTextGroup}>
                <p className={styles.successTitle}>{c.form.successTitle}</p>
                <p className={styles.successSubtitle}>{c.form.successSubtitle}</p>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="contact-nom">
                    {c.form.nameLabel}
                  </label>
                  <input
                    id="contact-nom"
                    name="nom"
                    className={styles.input}
                    placeholder={c.form.namePlaceholder}
                    autoComplete="name"
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="contact-email">
                    {c.form.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                    placeholder="mark.scout@lumon.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "error-email" : undefined}
                  />
                  {errors.email && <p id="error-email" className={styles.fieldError}>{errors.email}</p>}
                </div>
              </div>

              <div className={styles.needsGroup}>
                <span className={styles.fieldLabel}>{c.form.needLabel}</span>
                <div className={styles.chips}>
                  {NEEDS.map((need) => (
                    <button
                      key={need}
                      type="button"
                      className={`${styles.chip} ${selectedNeed === need ? styles.chipSelected : ""}`}
                      onClick={() => selectNeed(need)}
                      aria-pressed={selectedNeed === need}
                    >
                      {need}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="contact-brief">
                  {c.form.briefLabel}
                </label>
                <textarea
                  id="contact-brief"
                  name="brief"
                  className={`${styles.textarea} ${errors.brief ? styles.inputError : ""}`}
                  placeholder={c.form.briefPlaceholder}
                  aria-invalid={!!errors.brief}
                  aria-describedby={errors.brief ? "error-brief" : undefined}
                />
                {errors.brief && <p id="error-brief" className={styles.fieldError}>{errors.brief}</p>}
              </div>

              {sendError && (
                <p className={styles.sendError}>
                  {c.form.sendError}{" "}
                  <a href="mailto:yohanguyot.contact@gmail.com">yohanguyot.contact@gmail.com</a>.
                </p>
              )}

              <Button
                label={sending ? c.form.sending : c.form.submit}
                showArrowRight={!sending}
                className={styles.submitBtn}
              />
            </>
          )}
        </form>
      </div>
    </section>
  );
}
