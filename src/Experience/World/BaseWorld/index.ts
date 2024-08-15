import Experience from "@/Experience/Experience";
import BaseObject from "@/Experience/Objects/BaseObject";
import * as kokomi from "kokomi.js";

export default class BaseWorld extends kokomi.Component {
  // 将base定义为Experience类
  declare base: Experience;
  baseObject?: BaseObject;
  renderBaseObject = async () => {
    this.baseObject = new BaseObject(this.base);
    await this.baseObject.addExisting();
  };

  constructor(base: Experience) {
    super(base);
    this.renderBaseObject();
  }
}
