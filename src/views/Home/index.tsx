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
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000001.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000002.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000003.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000004.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000005.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000006.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000007.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000008.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000009.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000010.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000011.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000012.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000013.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000014.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000015.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000016.jpg"
          crossOrigin="anonymous"
          alt=""
        />
        <img
          className={styles["gallery-item"]}
          src="https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/000017.jpg"
          crossOrigin="anonymous"
          alt=""
        />
      </div>
    </>
  );
};

export default Home;
