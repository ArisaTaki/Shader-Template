import React from "react";
import styles from "./styles.module.css";
import useApplyShader from "@/hooks/useApplyShader";
import ObjectEnum from "@/Experience/ObjectEnum";
import LoadingComp from "@/components/loadingComp";

const Home: React.FC = () => {
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
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000001.webp"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000002.webp"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000003.webp"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000004.webp"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000005.webp"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000006.webp"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000007.webp"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000008.webp"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000009.webp"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000010.webp"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000011.webp"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000012.webp"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000014.webp"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000015.webp"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000016.webp"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000017.webp"
          crossOrigin="anonymous"
          alt=""
        />
      </div>
    </>
  );
};

export default Home;
