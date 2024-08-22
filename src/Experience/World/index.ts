import * as kokomi from "kokomi.js";
import ObjectEnum from "../ObjectEnum";
import Experience from "../Experience";
import LoadingStyles from "@/components/loadingComp/styles.module.css";

export default class World extends kokomi.Component {
  // 将base定义为Experience类
  declare base: Experience;

  constructor(base: Experience, objectEnum?: ObjectEnum) {
    super(base);

    // 加载好材质之后进行的行为
    this.base.am.on("ready", async () => {
      // 根据objectEnum决定动态导入并渲染对应的shader Object
      switch (objectEnum) {
        case ObjectEnum.ThreedObject: {
          const { default: ThreedWorld } = await import("./ThreedWorld");
          new ThreedWorld(this.base);
          break;
        }
      }

      document
        .querySelector(`.${LoadingStyles["loader-screen"]}`)
        ?.classList.add(LoadingStyles["hollow"]);
    });
  }
}
