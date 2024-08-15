import React from "react";
import styles from "./styles.module.css";
import useApplyShader from "@/hooks/useApplyShader";
import ObjectEnum from "@/Experience/ObjectEnum";
import LoadingComp from "@/components/loadingComp";
const ImageShader: React.FC = () => {
  useApplyShader({
    id: "#image",
    objectEnum: ObjectEnum.ImageObject,
    useKokomiOrbitControls: true,
  });
  return (
    <>
      <LoadingComp />
      <div id="image" className={styles["image"]} />;
      <div className={styles["gallery"]}>
        <img
          className={styles["gallery-item"]}
          src="https://s2.loli.net/2023/09/12/ySLGYKhVqH3BtN4.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://s2.loli.net/2023/09/12/BhmSdM2XA9yYftK.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://s2.loli.net/2023/09/12/CqIlJd1XO9rh68e.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://s2.loli.net/2023/09/12/RzwqhImAV9H57xs.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://s2.loli.net/2023/09/12/p3FME9qcUAnJixm.jpg"
          crossOrigin="anonymous"
          alt=""
        />
      </div>
    </>
  );
};

export default ImageShader;
