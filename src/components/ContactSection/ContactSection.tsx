"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import Button from "@/components/Button/Button";
import SectionHeader, { type SectionHeaderHandle } from "@/components/SectionHeader/SectionHeader";
import { trackEvent } from "@/lib/analytics";
import { useDict } from "@/lib/dict-context";
import { shouldReduceMotion, observe, STAGGER, revealEl, afterLayout, isMobileViewport, hideEl } from "@/lib/animation";
import { useIsomorphicLayoutEffect } from "@/lib/hooks";
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
  const contact = dict.contact;
  const NEEDS = contact.needs;
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sendError, setSendError] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<SectionHeaderHandle>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return;
    const section = sectionRef.current;
    const desc = descRef.current;
    const linksEl = linksRef.current;
    const form = formRef.current;
    if (!section) return;
    section.style.opacity = '0';
    section.style.transform = 'scale(0.97) translateY(24px)';
    if (desc) hideEl(desc);
    if (linksEl) Array.from(linksEl.children as HTMLCollectionOf<HTMLElement>).forEach(l => {
      hideEl(l);
    });
    if (form) hideEl(form);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) return;
    const section = sectionRef.current;
    if (!section) return;
    const isMobile = isMobileViewport();
    const cleanups = [watchCard(), watchText(), watchForm(), watchLinksMobile()];
    return () => cleanups.forEach(fn => fn());

    function watchCard(): () => void {
      return observe(section!, 0.05, () => {
        afterLayout(() => revealEl(section!));
      }, '0px');
    }

    function watchText(): () => void {
      const desc = descRef.current;
      const linksEl = linksRef.current;
      const textTrigger = headerRef.current?.element ?? section!;
      return observe(textTrigger, 0.1, () => {
        afterLayout(() => {
          headerRef.current?.trigger(0);
          if (desc) revealEl(desc, 2 * STAGGER);
          if (linksEl && !isMobile) {
            Array.from(linksEl.children as HTMLCollectionOf<HTMLElement>).forEach((l, i) => {
              revealEl(l, 3 * STAGGER + i * STAGGER);
            });
          }
        });
      });
    }

    function watchForm(): () => void {
      const form = formRef.current;
      if (!form) return () => {};
      return observe(form, 0.1, () => {
        afterLayout(() => revealEl(form));
      }, isMobile ? '0px' : '0px 0px -5% 0px');
    }

    function watchLinksMobile(): () => void {
      if (!isMobile) return () => {};
      const linksEl = linksRef.current;
      if (!linksEl) return () => {};
      const links = Array.from(linksEl.children as HTMLCollectionOf<HTMLElement>);
      return observe(linksEl, 0.1, () => {
        afterLayout(() => {
          links.forEach((l, i) => revealEl(l, i * STAGGER));
        });
      });
    }
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
    if (!email.trim()) nextErrors.email = contact.form.errors.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = contact.form.errors.emailInvalid;
    if (!brief.trim()) nextErrors.brief = contact.form.errors.briefRequired;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setSending(true);
    setSendError(false);
    setRateLimited(false);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, email, besoin: selectedNeed ?? "", brief }),
    });
    setSending(false);
    if (res.ok) {
      setSubmitted(true);
      trackEvent("contact_form_submit");
    } else if (res.status === 429) {
      setRateLimited(true);
    } else {
      setSendError(true);
    }
  }

  return (
    <section ref={sectionRef} className={`${styles.section}${noMarginTop ? ` ${styles.noMarginTop}` : ""}`} id="contact">
      <div className={styles.container}>
        {/* ── Left column wrapper ── */}
        <div className={styles.leftCol}>
          {/* title + description */}
          <div className={styles.infoContent}>
            <SectionHeader ref={headerRef} label={contact.label} heading={contact.heading} skipObserver />
            <p ref={descRef} className={styles.description}>{contact.description}</p>
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
              <p className={styles.successTitle}>{contact.form.successTitle}</p>
            </div>
          ) : (
            <>
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="contact-nom">
                    {contact.form.nameLabel}
                  </label>
                  <input
                    id="contact-nom"
                    name="nom"
                    className={styles.input}
                    placeholder={contact.form.namePlaceholder}
                    autoComplete="name"
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="contact-email">
                    {contact.form.emailLabel}
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
                <span className={styles.fieldLabel}>{contact.form.needLabel}</span>
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
                  {contact.form.briefLabel}
                </label>
                <textarea
                  id="contact-brief"
                  name="brief"
                  className={`${styles.textarea} ${errors.brief ? styles.inputError : ""}`}
                  placeholder={contact.form.briefPlaceholder}
                  aria-invalid={!!errors.brief}
                  aria-describedby={errors.brief ? "error-brief" : undefined}
                />
                {errors.brief && <p id="error-brief" className={styles.fieldError}>{errors.brief}</p>}
              </div>

              {rateLimited && (
                <p className={styles.sendError}>{contact.form.rateLimited}</p>
              )}

              {sendError && (
                <p className={styles.sendError}>
                  {contact.form.sendError}{" "}
                  <a href="mailto:yohanguyot.contact@gmail.com">yohanguyot.contact@gmail.com</a>.
                </p>
              )}

              <Button
                label={sending ? contact.form.sending : contact.form.submit}
                showArrowRight={!sending}
                loading={sending}
                className={styles.submitBtn}
              />
            </>
          )}
        </form>
      </div>
    </section>
  );
}
