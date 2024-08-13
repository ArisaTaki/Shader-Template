import * as kokomi from "kokomi.js";
import * as THREE from "three";
import TestObject from "../Objects/TestObject/TestObject";
import ObjectEnum from "../ObjectEnum";
import BaseObject from "../Objects/BaseObject/BaseObject";
import Experience from "../Experience";
export default class World extends kokomi.Component {
  declare base: Experience;
  testObject?: TestObject;
  baseObject?: BaseObject;

  renderTestObject = () => {
    this.base.am.on("ready", () => {
      const skyBox = this.base.am.items["skyBox"];
      skyBox.mapping = THREE.EquirectangularReflectionMapping;
      this.base.scene.background = skyBox;

      this.testObject = new TestObject(this.base);
      this.testObject.addExisting();
    });
  };

  renderBaseObject = () => {
    this.baseObject = new BaseObject(this.base);
    this.baseObject.addExisting();
  };

  constructor(base: Experience, objectEnum?: ObjectEnum) {
    super(base);
    switch (objectEnum) {
      case ObjectEnum.TestObject:
        this.renderTestObject();
        break;
      case ObjectEnum.BaseObject:
        this.renderBaseObject();
        break;
    }
  }
}
