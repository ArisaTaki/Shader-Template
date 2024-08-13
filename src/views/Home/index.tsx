import React from "react";
import styles from "./styles.module.css";
import useApplyShader from "@/hooks/useApplyShader";
import ObjectEnum from "@/Experience/ObjectEnum";

const Home: React.FC = () => {
  useApplyShader({ id: "#home", objectEnum: ObjectEnum.BaseObject });
  return (
    <div id="home" className={styles["home"]}>
      Home
    </div>
  );
};

export default Home;
