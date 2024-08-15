import Experience from "@/Experience/Experience";
import * as kokomi from "kokomi.js";
import ImageStyles from "@/views/ImageShader/styles.module.css";

export default class ImageObject extends kokomi.Component {
  declare base: Experience;
  ig: kokomi.InfiniteGallery;
  constructor(base: Experience) {
    super(base);

    this.ig = new kokomi.InfiniteGallery(this.base, {
      elList: [
        ...document.querySelectorAll(`.${ImageStyles["gallery-item"]}`),
      ] as HTMLImageElement[],
      direction: "horizontal",
      gap: 128,
    });
  }

  async addExisting() {
    this.ig.addExisting();
    await this.ig.checkImagesLoaded();
  }
}
