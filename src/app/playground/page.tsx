import Button from "@/components/Button/Button";
import { NavLink, LanguageDropdown } from "@/components/Navigation/Navigation";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import SquareIcon from "@/components/SquareIcon/SquareIcon";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import ProjectNav from "@/components/Project/Nav/Nav";
import { Layers, Shield, ArrowLeftRight, FileCheck, Variable, TriangleAlert, Hash, Tag, Component } from "lucide-react";
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

        <div className={styles.divider} />

        {/* FeatureItem */}
        <Section title="Project · FeatureItem">
          <div className={styles.row}>
            <Cell label="row (default)">
              <div style={{ width: 340 }}>
                <FeatureItem
                  icon={FileCheck}
                  title="Un livrable autonome"
                  description="Les annotations capturent l'intention réelle, éliminant les corrections après coup."
                />
              </div>
            </Cell>
            <Cell label="row · second item">
              <div style={{ width: 340 }}>
                <FeatureItem
                  icon={Variable}
                  title="Un nommage calqué sur le code"
                  description="Design system et code partagent les mêmes conventions de nommage."
                />
              </div>
            </Cell>
          </div>
          <div className={styles.row}>
            <Cell label="column (avec label)">
              <div style={{ width: 220 }}>
                <FeatureItem
                  icon={Hash}
                  title="Valeurs brutes"
                  description="La base technique est posée, mais elle reste déconnectée du produit."
                  label="//couche 1"
                />
              </div>
            </Cell>
            <Cell label="column · second">
              <div style={{ width: 220 }}>
                <FeatureItem
                  icon={Tag}
                  title="Rôles sémantiques"
                  description="Chaque primitive reçoit un rôle fonctionnel."
                  label="//couche 2"
                />
              </div>
            </Cell>
            <Cell label="column · third">
              <div style={{ width: 220 }}>
                <FeatureItem
                  icon={Component}
                  title="Composants finaux"
                  description="Chaque composant consomme uniquement ces tokens sémantiques."
                  label="//couche 3"
                />
              </div>
            </Cell>
          </div>
        </Section>

        {/* FeatureCard */}
        <Section title="Project · FeatureCard">
          <div className={styles.row}>
            <Cell label="vertical (2 items)">
              <div style={{ width: 380 }}>
                <FeatureCard>
                  <FeatureItem icon={FileCheck} title="Un livrable autonome" description="Les annotations capturent l'intention réelle." />
                  <FeatureItem icon={Variable} title="Un nommage calqué" description="Mêmes conventions entre design et code." />
                </FeatureCard>
              </div>
            </Cell>
            <Cell label="vertical (3 items)">
              <div style={{ width: 380 }}>
                <FeatureCard>
                  <FeatureItem icon={FileCheck} title="Item 1" description="Description du premier item." />
                  <FeatureItem icon={Variable} title="Item 2" description="Description du deuxième item." />
                  <FeatureItem icon={Layers} title="Item 3" description="Description du troisième item." />
                </FeatureCard>
              </div>
            </Cell>
          </div>
          <Cell label="horizontal (2 items)">
            <FeatureCard direction="horizontal">
              <FeatureItem icon={TriangleAlert} title="Limites du modèle brut" description="Accumule de la dette technique à chaque déclinaison client." />
              <FeatureItem icon={Layers} title="L'écosystème sémantique" description="Changer l'identité d'un client se résume à modifier quelques variables." />
            </FeatureCard>
          </Cell>
          <Cell label="horizontal · column items (avec label)">
            <FeatureCard direction="horizontal">
              <FeatureItem icon={Hash} title="Valeurs brutes" description="La base technique est posée." label="//couche 1" />
              <FeatureItem icon={Tag} title="Rôles sémantiques" description="Chaque primitive reçoit un rôle fonctionnel." label="//couche 2" />
              <FeatureItem icon={Component} title="Composants finaux" description="La cohérence reste totale." label="//couche 3" />
            </FeatureCard>
          </Cell>
        </Section>

        {/* ProjectNav */}
        <Section title="Project · Nav">
          <Cell label="prev + next">
            <div style={{ width: "100%", minWidth: 600 }}>
              <ProjectNav
                prev={{ href: "/wenimmo", label: "Wenimmo" }}
                next={{ href: "/keepro", label: "Keepro" }}
              />
            </div>
          </Cell>
          <div className={styles.row}>
            <Cell label="prev only">
              <div style={{ width: 300 }}>
                <ProjectNav prev={{ href: "/wenimmo", label: "Wenimmo" }} />
              </div>
            </Cell>
            <Cell label="next only">
              <div style={{ width: 300 }}>
                <ProjectNav next={{ href: "/keepro", label: "Keepro" }} />
              </div>
            </Cell>
          </div>
        </Section>
      </div>
    </div>
  );
}
