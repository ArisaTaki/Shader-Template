import Experience from "@/Experience/Experience";
import RaymarchingObject from "@/Experience/Objects/RaymarchingObject";
import * as kokomi from "kokomi.js";

export default class RaymarchingWorld extends kokomi.Component {
  // 将base定义为Experience类
  declare base: Experience;
  raymarchingObject?: RaymarchingObject;
  renderRaymarchingObject = async () => {
    this.raymarchingObject = new RaymarchingObject(this.base);
    await this.raymarchingObject.addExisting();
  };

  constructor(base: Experience) {
    super(base);
    this.renderRaymarchingObject();
  }
}
