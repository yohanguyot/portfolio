import { ReactNode } from "react";
import styles from "./FeatureCard.module.css";

type Props = {
  direction?: "vertical" | "horizontal";
  wrap?: boolean;
  className?: string;
  children: ReactNode;
};

export default function FeatureCard({
  direction = "vertical",
  wrap = false,
  className,
  children,
}: Props) {
  return (
    <div
      className={[
        styles.card,
        direction === "horizontal" ? styles.horizontal : "",
        wrap ? styles.wrap : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
