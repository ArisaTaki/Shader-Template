import React from "react";
import styles from "./styles.module.css";
import useApplyShader from "@/hooks/useApplyShader";
import ObjectEnum from "@/Experience/ObjectEnum";
import LoadingComp from "@/components/loadingComp";

const Home: React.FC = () => {
  useApplyShader({
    id: "#threed",
    objectEnum: ObjectEnum.ThreedObject,
    cameraPosition: {
      x: 0,
      y: 0,
      z: 2.5,
    },
  });

  return (
    <>
      <LoadingComp />
      <div id="threed" className={styles["threed"]} />
    </>
  );
};

export default Home;
