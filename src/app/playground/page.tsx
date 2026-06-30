import Button from "@/components/Button/Button";
import { StatusDot, Status } from "@/components/StatusDot/StatusDot";
import { NavLink, LanguageDropdown } from "@/components/Navigation/Navigation";
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

        {/* StatusDot */}
        <Section title="Status / Dot">
          <div className={styles.row}>
            <Cell label="state=default">
              <StatusDot state="default" />
            </Cell>
            <Cell label="state=expanded">
              <StatusDot state="expanded" />
            </Cell>
          </div>

          {/* Status (dot + label) as it appears in navigation */}
          <div className={styles.row}>
            <Cell label="status (dot + label)">
              <Status label="Disponible" />
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
            <Cell label="step=default">
              <LanguageDropdown step="default" />
            </Cell>
            <Cell label="step=hover">
              <LanguageDropdown step="hover" />
            </Cell>
            <Cell label="step=active">
              <LanguageDropdown step="active" />
            </Cell>
          </div>
        </Section>
      </div>
    </div>
  );
}
