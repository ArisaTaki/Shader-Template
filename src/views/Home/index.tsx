import React from "react";
import styles from "./styles.module.css";
import useApplyShader from "@/hooks/useApplyShader";

const Home: React.FC = () => {
  useApplyShader("#home");
  return (
    <div id="home" className={styles["home"]}>
      Home
    </div>
  );
};

export default Home;
