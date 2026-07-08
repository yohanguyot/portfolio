import { ReactNode } from "react";
import styles from "./FeatureCard.module.css";

type Props = {
  direction?: "vertical" | "horizontal";
  className?: string;
  children: ReactNode;
};

export default function FeatureCard({
  direction = "vertical",
  className,
  children,
}: Props) {
  return (
    <div
      className={[
        styles.card,
        direction === "horizontal" ? styles.horizontal : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
