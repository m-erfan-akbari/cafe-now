import styles from "./ProgressStep.module.css";

export default function ProgressStep({
  step,
  isLastProgress,
  isFitstProgress,
  isDone,
  isProgressing,
}) {
  const { title, icon } = step;

  return (
    <div key={title} className={styles.progress_container}>
      {isFitstProgress ? (
        <div></div>
      ) : (
        <div
          className={`${styles.line} ${
            isDone || isProgressing ? styles.done_line : ""
          }`}
        ></div>
      )}

      <div
        className={`${styles.step_icon} ${isDone ? styles.done : ""} ${
          isProgressing ? styles.progresing : ""
        }`}
      >
        {icon}
      </div>

      {isLastProgress ? (
        <div></div>
      ) : (
        <div
          className={`${styles.line} ${isDone ? styles.done_line : ""}`}
        ></div>
      )}

      <p className={`${styles.title}`}>{title}</p>
    </div>
  );
}
