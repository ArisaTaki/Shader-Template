import React from "react";
import styles from "./styles.module.css";
import useApplyShader from "@/hooks/useApplyShader";
import ObjectEnum from "@/Experience/ObjectEnum";
import LoadingComp from "@/components/loadingComp";

const ThreeDShader: React.FC = () => {
  useApplyShader({ id: "#threed", objectEnum: ObjectEnum.ThreedObject });

  return (
    <>
      <LoadingComp />
      <div id="threed" className={styles["threed"]} />
    </>
  );
};

export default ThreeDShader;
