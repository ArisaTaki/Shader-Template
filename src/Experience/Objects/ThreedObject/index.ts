import * as THREE from "three";
import * as kokomi from "kokomi.js";
import vertexShader from "./Shaders/vert.glsl";
import fragmentShader from "./Shaders/frag.glsl";
import Experience from "@/Experience/Experience";

export default class ThreedObject extends kokomi.Component {
  declare base: Experience;
  material: THREE.ShaderMaterial;
  mesh: THREE.Mesh<
    THREE.SphereGeometry,
    THREE.ShaderMaterial,
    THREE.Object3DEventMap
  >;
  uj: kokomi.UniformInjector;
  constructor(base: Experience) {
    super(base);

    const params = {
      uDistort: {
        value: 1,
      },
    };

    const RADIUS = 1.001;
    const SEGMENTS = 256.001;

    const geometry = new THREE.SphereGeometry(RADIUS, SEGMENTS, SEGMENTS);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      defines: {
        RADIUS,
        SEGMENTS,
      },
    });
    this.material = material;
    const mesh = new THREE.Mesh(geometry, material);
    this.mesh = mesh;

    const uj = new kokomi.UniformInjector(this.base);
    this.uj = uj;
    material.uniforms = {
      ...material.uniforms,
      ...uj.shadertoyUniforms,
      ...params,
    };
    const debug = this.base.debug;
    if (debug.active) {
      const debugFolder = debug.ui?.addFolder("threedObject");
      debugFolder
        ?.add(params.uDistort, "value")
        .min(0)
        .max(2)
        .step(0.01)
        .name("distort");
    }
  }
  addExisting() {
    this.container.add(this.mesh);
  }
  update() {
    this.uj.injectShadertoyUniforms(this.material.uniforms);
  }
}
