import React from "react";
import styles from "./styles.module.css";
import useApplyShader from "@/hooks/useApplyShader";
import ObjectEnum from "@/Experience/ObjectEnum";
import LoadingComp from "@/components/loadingComp";

const Home: React.FC = () => {
  useApplyShader({ id: "#home", objectEnum: ObjectEnum.RaymarchingObject });
  return (
    <>
      <LoadingComp />
      <div id="home" className={styles["home"]} />
    </>
  );
};

export default Home;
