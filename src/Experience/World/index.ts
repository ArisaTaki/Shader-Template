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
    const render = async () => {
      // 根据objectEnum决定动态导入并渲染对应的shader Object
      let imageWorldInstance;
      switch (objectEnum) {
        case ObjectEnum.ImageObject: {
          const { default: ImageWorld } = await import("./ImageWorld");
          imageWorldInstance = new ImageWorld(this.base);
          break;
        }
      }

      if (imageWorldInstance) {
        await imageWorldInstance.imageObject?.addExisting();
      }
      document
        .querySelector(`.${LoadingStyles["loader-screen"]}`)
        ?.classList.add(LoadingStyles["hollow"]);
    };
    render();
  }
}
