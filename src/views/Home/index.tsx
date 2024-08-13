import React, { useEffect } from "react";
import styles from "./styles.module.css";
import Experience from "@/Experience/Experience";

const Home: React.FC = () => {
  useEffect(() => {
    new Experience("#home");
  }, []);
  return (
    <div id="home" className={styles["home"]}>
      Home
    </div>
  );
};

export default Home;
