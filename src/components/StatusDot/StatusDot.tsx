import styles from "./StatusDot.module.css";

type StatusDotState = "default" | "expanded";

type StatusDotProps = {
  state?: StatusDotState;
  className?: string;
};

export function StatusDot({ state = "default", className }: StatusDotProps) {
  return (
    <div
      className={[styles.root, state === "expanded" ? styles.expanded : "", className ?? ""].join(" ")}
    >
      <div className={styles.halo} />
      <div className={styles.dot} />
    </div>
  );
}

type StatusProps = {
  label?: string;
  className?: string;
};

export function Status({ label = "Disponible", className }: StatusProps) {
  return (
    <div className={[styles.status, className ?? ""].join(" ")}>
      <StatusDot state="expanded" />
      <span className={styles.statusLabel}>{label}</span>
    </div>
  );
}
