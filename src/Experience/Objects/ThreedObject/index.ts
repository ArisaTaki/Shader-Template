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
      uDistort: {
        value: 1,
      },
      uFrequency: {
        value: 1.7,
      },
      uFresnelIntensity: {
        value: 0.2,
      },
      uLightIntensity: {
        value: 0.9,
      },
      uLight2Intensity: {
        value: 0.9,
      },
    };

    const colorParams = {
      themeColor: "#070618",
      lightColor: "#4cc2e9",
      lightColor2: "#9743fe",
    };

    this.base.scene.background = new THREE.Color(colorParams.themeColor);

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
      uThemeColor: {
        value: new THREE.Color(colorParams.themeColor),
      },
      uLightColor: {
        value: new THREE.Color(colorParams.lightColor),
      },
      uLightColor2: {
        value: new THREE.Color(colorParams.lightColor2),
      },
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
      debugFolder
        ?.add(params.uDistort, "value")
        .min(0)
        .max(2)
        .step(0.01)
        .name("distort");
      debugFolder
        ?.addColor(colorParams, "themeColor")
        .onChange((val: THREE.ColorRepresentation) => {
          material.uniforms.uThemeColor.value = new THREE.Color(val);
          this.base.scene.background = new THREE.Color(val);
        });
      debugFolder
        ?.addColor(colorParams, "lightColor")
        .onChange((val: THREE.ColorRepresentation) => {
          material.uniforms.uLightColor.value = new THREE.Color(val);
        });
      debugFolder
        ?.addColor(colorParams, "lightColor2")
        .onChange((val: THREE.ColorRepresentation) => {
          material.uniforms.uLightColor2.value = new THREE.Color(val);
        });
      debugFolder
        ?.add(params.uFresnelIntensity, "value")
        .min(0)
        .max(1)
        .step(0.01)
        .name("fresnelIntensity");
      debugFolder
        ?.add(params.uLightIntensity, "value")
        .min(0)
        .max(1)
        .step(0.01)
        .name("lightIntensity");
      debugFolder
        ?.add(params.uLight2Intensity, "value")
        .min(0)
        .max(1)
        .step(0.01)
        .name("light2Intensity");
    }
  }
  addExisting() {
    this.container.add(this.mesh);
  }
  update() {
    this.uj.injectShadertoyUniforms(this.material.uniforms);
  }
}
