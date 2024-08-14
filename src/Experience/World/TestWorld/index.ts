import Experience from "@/Experience/Experience";
import TestObject from "@/Experience/Objects/TestObject";
import * as kokomi from "kokomi.js";
import * as THREE from "three";

export default class TestWorld extends kokomi.Component {
  // 将base定义为Experience类
  declare base: Experience;
  testObject?: TestObject;
  renderBaseObject = () => {
    // 这里是定义材质的地方，后续会讲到
    const skyBox = this.base.am.items["skyBox"];
    skyBox.mapping = THREE.EquirectangularReflectionMapping;
    this.base.scene.background = skyBox;

    this.testObject = new TestObject(this.base);
    this.testObject.addExisting();
  };

  constructor(base: Experience) {
    super(base);
    this.renderBaseObject();
  }
}
