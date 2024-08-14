import * as kokomi from "kokomi.js";
import * as THREE from "three";
import TestObject from "../Objects/TestObject/TestObject";
import ObjectEnum from "../ObjectEnum";
import BaseObject from "../Objects/BaseObject/BaseObject";
import Experience from "../Experience";
import HomeStyles from "@/views/Home/styles.module.css";
export default class World extends kokomi.Component {
  // 将base定义为Experience类
  declare base: Experience;
  // 这两个是我们自定义的Object
  testObject?: TestObject;
  baseObject?: BaseObject;

  // 渲染Object的方法
  renderTestObject = () => {
    // 这里是定义材质的地方，后续会讲到
    const skyBox = this.base.am.items["skyBox"];
    skyBox.mapping = THREE.EquirectangularReflectionMapping;
    this.base.scene.background = skyBox;

    this.testObject = new TestObject(this.base);
    this.testObject.addExisting();
  };
  
  // 渲染Object的方法
  renderBaseObject = () => {
    this.baseObject = new BaseObject(this.base);
    this.baseObject.addExisting();
  };

  constructor(base: Experience, objectEnum?: ObjectEnum) {
    super(base);

    // 加载好材质之后进行的行为
    this.base.am.on("ready", () => {
      setTimeout(() => {
        document
          .querySelector(`.${HomeStyles["loader-screen"]}`)
          ?.classList.add(HomeStyles["hollow"]);
        // 根据objectEnum决定渲染哪一个shader Object
        switch (objectEnum) {
          case ObjectEnum.TestObject:
            this.renderTestObject();
            break;
          case ObjectEnum.BaseObject:
            this.renderBaseObject();
            break;
        }
      }, 3000);
    });
  }
}
