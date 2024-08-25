import * as THREE from "three";
import * as kokomi from "kokomi.js";
import vertexShader from "./Shaders/vert.glsl";
import fragmentShader from "./Shaders/frag.glsl";
import Experience from "@/Experience/Experience";

export default class RaymarchingObject extends kokomi.Component {
  declare base: Experience;
  quad: kokomi.ScreenQuad;
  constructor(base: Experience) {
    super(base);

    this.quad = new kokomi.ScreenQuad(this.base, {
      fragmentShader: fragmentShader,
      shadertoyMode: true,
    });
  }
  addExisting() {
    this.quad.addExisting();
  }
}
