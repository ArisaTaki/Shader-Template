import Experience from "@/Experience/Experience";
import * as kokomi from "kokomi.js";
import ImageStyles from "@/views/ImageShader/styles.module.css";
import vertexShader from "./Shaders/vert.glsl";
import fragmentShader from "./Shaders/frag.glsl";
import { ShaderMaterial } from "three";

export default class ImageObject extends kokomi.Component {
  declare base: Experience;
  ig: kokomi.InfiniteGallery;
  ws: kokomi.WheelScroller;
  params: { uDistortX: { value: number }; uDistortZ: { value: number } };
  constructor(base: Experience) {
    super(base);

    const params = {
      uDistortX: {
        value: 1.15,
      },
      uDistortZ: {
        value: 1.15,
      },
    };

    this.params = params;

    this.ig = new kokomi.InfiniteGallery(this.base, {
      elList: [
        ...document.querySelectorAll(`.${ImageStyles["gallery-item"]}`),
      ] as HTMLImageElement[],
      direction: "horizontal",
      gap: 128,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uVelocity: {
          value: 0,
        },
        ...params,
      },
    });

    const debug = this.base.debug;
    if (debug.active) {
      const debugFolder = debug.ui?.addFolder("gallery");
      debugFolder
        ?.add(params.uDistortX, "value")
        .min(0)
        .max(2)
        .step(0.01)
        .name("distortX");
      debugFolder
        ?.add(params.uDistortZ, "value")
        .min(0)
        .max(2)
        .step(0.01)
        .name("distortZ");
    }

    this.ws = new kokomi.WheelScroller();
    this.ws.listenForScroll();
  }

  update() {
    this.ws.syncScroll();
    const { current, delta } = this.ws.scroll;
    this.ig.sync(current);

    this.ig.iterate((maku) => {
      (maku.mesh.material as ShaderMaterial).uniforms.uVelocity.value = delta;
      (maku.mesh.material as ShaderMaterial).uniforms.uDistortX.value =
        this.params.uDistortX.value;
      (maku.mesh.material as ShaderMaterial).uniforms.uDistortZ.value =
        this.params.uDistortZ.value;
    });
  }

  async addExisting() {
    this.ig.addExisting();
    await this.ig.checkImagesLoaded();
  }
}
