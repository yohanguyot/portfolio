"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import Button from "@/components/Button/Button";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import { trackEvent } from "@/lib/analytics";
import { useDict } from "@/lib/dict-context";
import { shouldReduceMotion, observe, EASE, DURATION } from "@/lib/animation";
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

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (shouldReduceMotion()) return;

    const section = sectionRef.current;
    const desc = descRef.current;
    const linksEl = linksRef.current;
    const form = formRef.current;
    if (!section) return;

    // ── Initial states ──
    section.style.transition = 'none';
    section.style.opacity = '0';
    section.style.transform = 'scale(0.97) translateY(24px)';

    if (desc) { desc.style.transition = 'none'; desc.style.opacity = '0'; desc.style.transform = 'scale(0.98) translateY(12px)'; }
    if (linksEl) {
      Array.from(linksEl.children as HTMLCollectionOf<HTMLElement>).forEach(l => {
        l.style.transition = 'none'; l.style.opacity = '0'; l.style.transform = 'scale(0.98) translateY(12px)';
      });
    }
    if (form) { form.style.transition = 'none'; form.style.opacity = '0'; form.style.transform = 'scale(0.98) translateY(12px)'; }

    void section.offsetHeight;

    const cleanups: (() => void)[] = [];
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;

    // ── Card + colonne gauche — même trigger quand le label est visible ──
    const triggerEl = headerRef.current?.element ?? section;
    cleanups.push(observe(triggerEl, 0.3, () => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        // Card
        section.style.transition = `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`;
        section.style.opacity = '1';
        section.style.transform = 'scale(1) translateY(0)';
        setTimeout(() => { section.style.transform = ''; section.style.transition = ''; }, DURATION);

        // Label + heading
        headerRef.current?.trigger(80);

        if (desc) {
          desc.style.transition = `opacity ${DURATION}ms ${EASE} 130ms, transform ${DURATION}ms ${EASE} 130ms`;
          desc.style.opacity = '1';
          desc.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { desc.style.transform = ''; desc.style.transition = ''; }, DURATION + 130);
        }

        // Liens — desktop uniquement (cascade depuis le trigger)
        if (linksEl && !isMobile) {
          Array.from(linksEl.children as HTMLCollectionOf<HTMLElement>).forEach((l, i) => {
            const delay = 230 + i * 120;
            l.style.transition = `opacity ${DURATION}ms ${EASE} ${delay}ms, transform ${DURATION}ms ${EASE} ${delay}ms`;
            l.style.opacity = '1';
            l.style.transform = 'scale(1) translateY(0)';
            setTimeout(() => { l.style.transform = ''; l.style.transition = ''; }, DURATION + delay);
          });
        }
      }));
    }));

    // ── Formulaire — observer indépendant ──
    if (form) {
      cleanups.push(observe(form, 0.2, () => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          form.style.transition = `opacity ${DURATION}ms ${EASE}, transform ${DURATION}ms ${EASE}`;
          form.style.opacity = '1';
          form.style.transform = 'scale(1) translateY(0)';
          setTimeout(() => { form.style.transform = ''; form.style.transition = ''; }, DURATION);
        }));
      }));
    }

    // ── Liens mobile — observer indépendant ──
    if (linksEl && isMobile) {
      const links = Array.from(linksEl.children as HTMLCollectionOf<HTMLElement>);
      cleanups.push(observe(linksEl, 0.3, () => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          links.forEach((l, i) => {
            const delay = i * 120;
            l.style.transition = `opacity ${DURATION}ms ${EASE} ${delay}ms, transform ${DURATION}ms ${EASE} ${delay}ms`;
            l.style.opacity = '1';
            l.style.transform = 'scale(1) translateY(0)';
            setTimeout(() => { l.style.transform = ''; l.style.transition = ''; }, DURATION + delay);
          });
        }));
      }));
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
    <section ref={sectionRef} className={`${styles.section}${noMarginTop ? ` ${styles.noMarginTop}` : ""}`} id="contact">
      <div className={styles.container}>
        {/* ── Left column wrapper ── */}
        <div className={styles.leftCol}>
          {/* title + description */}
          <div className={styles.infoContent}>
            <SectionHeader ref={headerRef} label={c.label} heading={c.heading} />
            <p ref={descRef} className={styles.description}>{c.description}</p>
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
                <Check size={16} strokeWidth={2.5} />
              </div>
              <p className={styles.successTitle}>{c.form.successTitle}</p>
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
