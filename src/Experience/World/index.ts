import * as kokomi from "kokomi.js";
import ObjectEnum from "../ObjectEnum";
import Experience from "../Experience";
import LoadingStyles from "@/components/loadingComp/styles.module.css";
import BaseWorld from "./BaseWorld";
import TestWorld from "./TestWorld";
export default class World extends kokomi.Component {
  // 将base定义为Experience类
  declare base: Experience;

  constructor(base: Experience, objectEnum?: ObjectEnum) {
    super(base);

    // 加载好材质之后进行的行为
    this.base.am.on("ready", () => {
      setTimeout(() => {
        document
          .querySelector(`.${LoadingStyles["loader-screen"]}`)
          ?.classList.add(LoadingStyles["hollow"]);
        // 根据objectEnum决定渲染哪一个shader Object
        switch (objectEnum) {
          case ObjectEnum.TestObject:
            new TestWorld(this.base);
            break;
          case ObjectEnum.BaseObject:
            new BaseWorld(this.base);
            break;
        }
      }, 2000);
    });
  }
}
