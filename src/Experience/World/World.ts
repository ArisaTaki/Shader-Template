import * as kokomi from "kokomi.js";
import * as THREE from "three";
import TestObject from "../Objects/TestObject/TestObject";
import ObjectEnum from "../ObjectEnum";
import BaseObject from "../Objects/BaseObject/BaseObject";
import Experience from "../Experience";
import HomeStyles from "@/views/Home/styles.module.css";
export default class World extends kokomi.Component {
  declare base: Experience;
  testObject?: TestObject;
  baseObject?: BaseObject;

  renderTestObject = () => {
    const skyBox = this.base.am.items["skyBox"];
    skyBox.mapping = THREE.EquirectangularReflectionMapping;
    this.base.scene.background = skyBox;

    this.testObject = new TestObject(this.base);
    this.testObject.addExisting();
  };

  renderBaseObject = () => {
    this.baseObject = new BaseObject(this.base);
    this.baseObject.addExisting();
  };

  constructor(base: Experience, objectEnum?: ObjectEnum) {
    super(base);

    this.base.am.on("ready", () => {
      setTimeout(() => {
        document
          .querySelector(`.${HomeStyles["loader-screen"]}`)
          ?.classList.add(HomeStyles["hollow"]);
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
