import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ProjectParcours.module.css";

const PARCOURS = [
  {
    src: "/images/projects/bloom/create-asset.png",
    alt: "Interface de création d'un actif numérique sur Bloom",
    title: "Configurer l'émission d'un actif",
    description:
      "De la pièce unique à la collection complète, le créateur configure ses actifs digitaux en quelques clics. Il définit le volume, le prix et la rareté à travers un parcours fluide, qui masque toute la complexité technique de la blockchain.",
  },
  {
    src: "/images/projects/bloom/buy-asset.png",
    alt: "Interface d'achat d'un actif et transfert vers le wallet",
    title: "Fluidifier l'achat vers le wallet",
    description:
      "Un tunnel d'achat en trois étapes : fiche produit, paiement et transfert sécurisé. Chaque interaction est pensée pour rassurer et éliminer la friction liée aux transactions numériques.",
  },
];

export default function ProjectParcours() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeader label="Parcours utilisateurs" heading="Du créateur à l'acheteur." />

        <div className={styles.cols}>
          {PARCOURS.map((item) => (
            <div key={item.title} className={styles.col}>
              <div className={styles.imageWrap}>
                <img src={item.src} alt={item.alt} className={styles.image} />
              </div>
              <div className={styles.text}>
                <p className={styles.title}>{item.title}</p>
                <p className={styles.desc}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
