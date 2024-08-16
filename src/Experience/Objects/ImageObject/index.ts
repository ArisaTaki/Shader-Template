import Experience from "@/Experience/Experience";
import * as kokomi from "kokomi.js";
import ImageStyles from "@/views/ImageShader/styles.module.css";
import vertexShader from "./Shaders/vert.glsl";
import fragmentShader from "./Shaders/frag.glsl";
import { ShaderMaterial } from "three";
import Postprocessing from "./Postprocessing";

export default class ImageObject extends kokomi.Component {
  declare base: Experience;
  ig: kokomi.InfiniteGallery;
  ws: kokomi.WheelScroller;
  params: { uDistortX: { value: number }; uDistortZ: { value: number } };
  dd: kokomi.DragDetecter;
  postprocessing: Postprocessing;
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
        uOpacity: {
          value: 1,
        },
        uProgress: {
          value: 0,
        },
        ...params,
      },
      materialParams: {
        transparent: true,
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

    this.dd = new kokomi.DragDetecter(this.base);
    this.dd.detectDrag();
    this.dd.on("drag", (delta: { x: number; y: number }) => {
      this.ws.scroll.target -= delta[this.ig.dimensionType] * 2;
    });

    this.postprocessing = new Postprocessing(this.base);
    this.postprocessing.addExisting();
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

    this.postprocessing.ce.customPass.material.uniforms.uRGBShift.value =
      Math.abs(this.ws.scroll.delta) * 0.0004;
  }

  async addExisting() {
    this.ig.addExisting();
    await this.ig.checkImagesLoaded();
  }
}
