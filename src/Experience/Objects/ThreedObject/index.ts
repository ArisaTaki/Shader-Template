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
    // THREE.PlaneGeometry,
    THREE.ShaderMaterial,
    THREE.Object3DEventMap
  >;
  uj: kokomi.UniformInjector;
  constructor(base: Experience) {
    super(base);

    const params = {
      uFrequency: {
        value: 1,
      },
    };

    const RADIUS = 1.001;
    const SEGMENTS = 256.001;

    const geometry = new THREE.SphereGeometry(RADIUS, SEGMENTS, SEGMENTS);
    // const geometry = new THREE.PlaneGeometry(
    //   RADIUS * 2,
    //   RADIUS * 2,
    //   SEGMENTS,
    //   SEGMENTS
    // );
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
        ?.add(params.uFrequency, "value")
        .min(0)
        .max(5)
        .step(0.01)
        .name("frequency");
    }
  }
  addExisting() {
    this.container.add(this.mesh);
  }
  update() {
    this.uj.injectShadertoyUniforms(this.material.uniforms);
  }
}
