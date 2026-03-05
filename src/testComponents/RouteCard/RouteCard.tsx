import styles from "./routeCard.module.css";
type StepStatus = "done" | "current" | "future";

interface Step {
  id: number;
  time: string;
  date: string;
  title: string;
  status: StepStatus;
}

const steps: Step[] = [
  {
    id: 1,
    time: "08:00",
    date: "01.01.25",
    title: "Сформирован",
    status: "done",
  },
  {
    id: 2,
    time: "10:00",
    date: "01.01.25",
    title: "Готовится к выходу на район",
    status: "current",
  },
  {
    id: 3,
    time: "",
    date: "",
    title: "",
    status: "future",
  },
  {
    id: 4,
    time: "",
    date: "",
    title: "",
    status: "future",
  },
];
export default function RouteCard() {
  const currentIndex = steps.findIndex((s) => s.status === "current");

  const progress = (currentIndex / (steps.length - 1)) * 100;
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>Маршрут LED00002RL</h3>

        <button className={styles.statusBtn}>
          Готовится к выходу на район
        </button>
      </div>

      <div className={styles.progressWrapper}>
        <span className={styles.pointLabel}>Дом</span>

        <div className={styles.progress}>
          <div className={styles.line} />
          <div
            className={styles.lineProgress}
            style={{ width: `${progress}%` }}
          />

          <div className={`${styles.step}`}>
            <div className={styles.circle + " " + styles.active} />
            <div className={styles.meta}>
              <div>08:00</div>
              <div className={styles.date}>01.01.25</div>
              <div className={styles.title}>Сформирован</div>
            </div>
          </div>

          <div className={`${styles.step}`}>
            <div className={styles.circle + " " + styles.active} />
            <div className={styles.meta}>
              <div>10:00</div>
              <div className={styles.date}>01.01.25</div>
              <div className={styles.title}>Готовится к выходу на район</div>
            </div>
          </div>

          <div className={styles.step}>
            <div className={`${styles.circle} ${styles.grey}`} />
          </div>

          <div className={styles.step}>
            <div className={`${styles.circle} ${styles.grey}`} />
          </div>
        </div>

        <span className={styles.pointLabel}>Терминал</span>
      </div>
    </div>
  );
}
