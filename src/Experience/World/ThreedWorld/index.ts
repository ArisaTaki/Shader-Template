import Experience from "@/Experience/Experience";
import ThreedObject from "@/Experience/Objects/ThreedObject";
import * as kokomi from "kokomi.js";

export default class ThreedWorld extends kokomi.Component {
  // 将base定义为Experience类
  declare base: Experience;
  threedObject?: ThreedObject;
  renderThreedObject = async () => {
    this.threedObject = new ThreedObject(this.base);
    await this.threedObject.addExisting();
  };

  constructor(base: Experience) {
    super(base);
    this.renderThreedObject();
  }
}
