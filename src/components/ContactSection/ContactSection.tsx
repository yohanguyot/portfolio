"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import Button from "@/components/Button/Button";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { trackEvent } from "@/lib/analytics";
import styles from "./ContactSection.module.css";

const NEEDS = ["Product Design", "Refonte UX/UI", "Design & Site", "Autre"] as const;
type Need = (typeof NEEDS)[number];

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
  const [selectedNeed, setSelectedNeed] = useState<Need | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sendError, setSendError] = useState(false);

  function selectNeed(need: Need) {
    setSelectedNeed((prev) => (prev === need ? null : need));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const nom = (form.elements.namedItem("nom") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const brief = (form.elements.namedItem("brief") as HTMLTextAreaElement).value;

    const nextErrors: Errors = {};
    if (!email.trim()) nextErrors.email = "L'email est requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Adresse email invalide.";
    if (!brief.trim()) nextErrors.brief = "Décrivez votre projet en quelques mots.";

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
        {/* ── Left column wrapper (desktop flex col, mobile display:contents) ── */}
        <div className={styles.leftCol}>
          {/* title + description */}
          <div className={styles.infoContent}>
            <SectionHeader label="Contact" heading="Concevons votre projet." />
            <p className={styles.description}>
              Fixons 15 minutes pour poser les prochaines étapes de production.
            </p>
          </div>

          {/* links */}
          <div className={styles.links}>
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
        </div>{/* /leftCol */}

        {/* ── Right — Form ── */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {submitted ? (
            <div className={styles.successMessage}>
              <div className={styles.successIconWrap} aria-hidden>
                <Check size={20} strokeWidth={2} />
              </div>
              <div className={styles.successTextGroup}>
                <p className={styles.successTitle}>Message envoyé</p>
                <p className={styles.successSubtitle}>Je réponds vite :)</p>
              </div>
            </div>
          ) : (
            <>
              {/* Nom + Email */}
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="contact-nom">
                    Nom complet
                  </label>
                  <input
                    id="contact-nom"
                    name="nom"
                    className={styles.input}
                    placeholder="Mark Scout"
                    autoComplete="name"
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="contact-email">
                    Email
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

              {/* Besoin */}
              <div className={styles.needsGroup}>
                <span className={styles.fieldLabel}>Votre besoin</span>
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

              {/* Brief */}
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="contact-brief">
                  Brief ou idée du projet
                </label>
                <textarea
                  id="contact-brief"
                  name="brief"
                  className={`${styles.textarea} ${errors.brief ? styles.inputError : ""}`}
                  placeholder="Quel est l'objectif principal de votre produit et vos contraintes actuelles (timing, technique, design system...) ?"
                  aria-invalid={!!errors.brief}
                  aria-describedby={errors.brief ? "error-brief" : undefined}
                />
                {errors.brief && <p id="error-brief" className={styles.fieldError}>{errors.brief}</p>}
              </div>

              {/* Send error */}
              {sendError && (
                <p className={styles.sendError}>
                  Une erreur est survenue. Réessayez ou écrivez-moi directement à{" "}
                  <a href="mailto:yohanguyot.contact@gmail.com">yohanguyot.contact@gmail.com</a>.
                </p>
              )}

              {/* Submit */}
              <Button
                label={sending ? "Envoi…" : "Envoyer le message"}
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
