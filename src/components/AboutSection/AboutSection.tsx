import { Component, Route, CodeXml } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import FeatureCard from "@/components/Project/FeatureCard/FeatureCard";
import FeatureItem from "@/components/Project/FeatureItem/FeatureItem";
import type { Dictionary } from "@/lib/getDictionary";
import styles from "./AboutSection.module.css";

const SKILL_ICONS = [Component, Route, CodeXml] as const;

export default function AboutSection({ dict }: { dict: Dictionary["about"] }) {
  return (
    <section className={styles.section} id="a-propos">
      <div className={styles.container}>
        {/* Left — text */}
        <div className={styles.info}>
          <SectionHeader
            label={dict.label}
            heading={
              <>
                {dict.headingPre}
                {dict.headingBreak && <br className={styles.headingBreak} />}
                <span className={styles.accent}>{dict.headingAccent}</span>
                {dict.headingPost}
              </>
            }
          />

          <div className={styles.body}>
            {dict.body.map((text, i) => (
              <p key={i} className={styles.bodyText}>{text}</p>
            ))}
          </div>
        </div>

        {/* Right — skill card */}
        <FeatureCard className={styles.card}>
          {dict.skills.map(({ title, description }, i) => (
            <FeatureItem key={title} icon={SKILL_ICONS[i]} title={title} description={description} />
          ))}
        </FeatureCard>
      </div>
    </section>
  );
}
