import Experience from "@/Experience/Experience";
import ImageObject from "@/Experience/Objects/ImageObject";
import * as kokomi from "kokomi.js";

export default class ImageWorld extends kokomi.Component {
  // 将base定义为Experience类
  declare base: Experience;
  imageObject?: ImageObject;
  renderImageObject = () => {
    this.imageObject = new ImageObject(this.base);
    this.imageObject.addExisting();
  };

  constructor(base: Experience) {
    super(base);
    this.renderImageObject();
  }
}
