import React from "react";
import styles from "./styles.module.css";

const LoadingComp: React.FC = () => {
  return (
    <div className={styles["loader-screen"]}>
      <div className={styles["loading-container"]}>
        <div className={styles["loading"]}>
          <span style={{ "--i": 0 } as React.CSSProperties}>L</span>
          <span style={{ "--i": 1 } as React.CSSProperties}>O</span>
          <span style={{ "--i": 2 } as React.CSSProperties}>A</span>
          <span style={{ "--i": 3 } as React.CSSProperties}>D</span>
          <span style={{ "--i": 4 } as React.CSSProperties}>I</span>
          <span style={{ "--i": 5 } as React.CSSProperties}>N</span>
          <span style={{ "--i": 6 } as React.CSSProperties}>G</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingComp;
