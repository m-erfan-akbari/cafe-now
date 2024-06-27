import styles from "./Progress.module.css";
import { FaCircleDot } from "react-icons/fa6";
import ProgressStep from "./ProgressStep";

export default function Progress({ steps = [], currentStep = 1 }) {
  steps = steps.map((stp) =>
    !stp?.icon ? { ...stp, icon: <FaCircleDot /> } : stp
  );

  return (
    <div className={styles.container}>
      {steps.map((stp, index) => (
        <ProgressStep
          key={stp.title}
          step={stp}
          isLastProgress={steps.length === index + 1}
          isFitstProgress={index === 0}
          isDone={currentStep > index + 1}
          isProgressing={currentStep === index + 1}
        />
      ))}
    </div>
  );
}
