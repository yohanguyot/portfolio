import { ChevronDown, ChevronUp } from "lucide-react";
import { Status } from "@/components/StatusDot/StatusDot";
import styles from "./Navigation.module.css";

type NavLinkState = "default" | "hover" | "active";
type LangDropdownStep = "default" | "hover" | "active";

type NavLinkProps = {
  label: string;
  state?: NavLinkState;
  href?: string;
  className?: string;
};

export function NavLink({ label, state = "default", href = "#", className }: NavLinkProps) {
  const stateClass =
    state === "active"
      ? styles.navLinkActive
      : state === "hover"
      ? styles.navLinkHover
      : "";

  return (
    <a
      href={href}
      className={[styles.navLink, stateClass, className ?? ""].filter(Boolean).join(" ")}
    >
      <span className={styles.navLinkLabel}>{label}</span>
    </a>
  );
}

type LanguageDropdownProps = {
  step?: LangDropdownStep;
  lang?: string;
  className?: string;
};

export function LanguageDropdown({ step = "default", lang = "FR", className }: LanguageDropdownProps) {
  const stepClass =
    step === "active"
      ? styles.langDropdownActive
      : step === "hover"
      ? styles.langDropdownHover
      : "";

  return (
    <div className={[styles.langDropdown, stepClass, className ?? ""].filter(Boolean).join(" ")}>
      <span className={styles.langLabel}>{lang}</span>
      <span className={styles.langIcon}>
        {step === "active" ? (
          <ChevronUp size={16} strokeWidth={1.5} />
        ) : (
          <ChevronDown size={16} strokeWidth={1.5} />
        )}
      </span>
    </div>
  );
}

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <span className={styles.logo}>Yohan Guyot</span>
        </div>
        <div className={styles.right}>
          <div className={styles.links}>
            <NavLink label="Projets" href="#projets" />
            <NavLink label="Process" href="#process" />
            <NavLink label="À propos" href="#a-propos" />
            <NavLink label="Contact" href="#contact" />
          </div>
          <LanguageDropdown />
          <Status />
        </div>
      </div>
    </nav>
  );
}
