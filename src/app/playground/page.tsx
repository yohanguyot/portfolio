import Button from "@/components/Button/Button";
import { NavLink, LanguageDropdown } from "@/components/Navigation/Navigation";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import SquareIcon from "@/components/SquareIcon/SquareIcon";
import { Layers, Shield, ArrowLeftRight } from "lucide-react";
import styles from "./page.module.css";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.cell}>
      <span className={styles.cellLabel}>{label}</span>
      <div className={styles.cellContent}>{children}</div>
    </div>
  );
}

export default function Playground() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>Playground</h1>
          <p className={styles.pageSub}>
            Tous les composants créés — chaque état visible dans le Figma.
          </p>
        </header>

        <div className={styles.divider} />

        {/* Button */}
        <Section title="Button">
          {/* type=primary */}
          <div className={styles.row}>
            <Cell label="primary · default">
              <Button label="Voir les projets" type="primary" />
            </Cell>
            <Cell label="primary · hover">
              <Button label="Voir les projets" type="primary" forceHover />
            </Cell>
          </div>

          {/* type=secondary */}
          <div className={styles.row}>
            <Cell label="secondary · default">
              <Button label="Me contacter" type="secondary" />
            </Cell>
            <Cell label="secondary · hover">
              <Button label="Me contacter" type="secondary" forceHover />
            </Cell>
          </div>

          {/* type=text */}
          <div className={styles.row}>
            <Cell label="text · default">
              <Button label="Voir le projet" type="text" showArrowRight />
            </Cell>
            <Cell label="text · hover">
              <Button label="Voir le projet" type="text" showArrowRight forceHover />
            </Cell>
          </div>

          {/* with arrow-left */}
          <div className={styles.row}>
            <Cell label="primary · arrow-left">
              <Button label="Retour" type="primary" showArrowLeft />
            </Cell>
            <Cell label="secondary · arrow-right">
              <Button label="Envoyer" type="secondary" showArrowRight />
            </Cell>
            <Cell label="text · arrow-left">
              <Button label="Retour" type="text" showArrowLeft />
            </Cell>
          </div>
        </Section>

        {/* SectionHeader */}
        <Section title="SectionHeader">
          <div className={styles.row}>
            <Cell label="string heading">
              <SectionHeader label="Process" heading="Comment je travaille." />
            </Cell>
            <Cell label="ReactNode heading">
              <SectionHeader
                label="À propos"
                heading={<>Designer avec une <span style={{ color: "var(--color-text-accent)" }}>culture technique</span>.</>}
              />
            </Cell>
          </div>
        </Section>

        {/* SquareIcon */}
        <Section title="SquareIcon">
          <div className={styles.row}>
            <Cell label="Layers">
              <SquareIcon icon={Layers} />
            </Cell>
            <Cell label="Shield">
              <SquareIcon icon={Shield} />
            </Cell>
            <Cell label="ArrowLeftRight">
              <SquareIcon icon={ArrowLeftRight} />
            </Cell>
          </div>
        </Section>

        {/* NavLink */}
        <Section title="Navigation · Link">
          <div className={styles.row}>
            <Cell label="state=default">
              <div className={styles.navSurface}>
                <NavLink label="Projets" state="default" />
              </div>
            </Cell>
            <Cell label="state=hover">
              <div className={styles.navSurface}>
                <NavLink label="Projets" state="hover" />
              </div>
            </Cell>
            <Cell label="state=active">
              <div className={styles.navSurface}>
                <NavLink label="Projets" state="active" />
              </div>
            </Cell>
          </div>
        </Section>

        {/* LanguageDropdown */}
        <Section title="Navigation · Language Dropdown">
          <div className={styles.row}>
            <Cell label="default">
              <LanguageDropdown />
            </Cell>
            <Cell label="inline">
              <LanguageDropdown inline />
            </Cell>
          </div>
        </Section>
      </div>
    </div>
  );
}
