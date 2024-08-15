import * as kokomi from "kokomi.js";

import postprocessingFragmentShader from "./Shaders/frag.glsl";
import Experience from "@/Experience/Experience";

export default class Postprocessing extends kokomi.Component {
  declare base: Experience;
  ce: kokomi.CustomEffect;
  constructor(base: Experience) {
    super(base);

    this.ce = new kokomi.CustomEffect(this.base, {
      fragmentShader: postprocessingFragmentShader,
      uniforms: {
        uRGBShift: {
          value: 0,
        },
      },
    });
  }
  addExisting() {
    this.ce.addExisting();
  }
}
