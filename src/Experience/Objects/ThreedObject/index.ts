import * as THREE from "three";
import * as kokomi from "kokomi.js";
import vertexShader from "./Shaders/vert.glsl";
import fragmentShader from "./Shaders/frag.glsl";
import Experience from "@/Experience/Experience";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";

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
  composer: EffectComposer;
  bloomPass: UnrealBloomPass;
  raycaster: THREE.Raycaster;
  mouse: THREE.Vector2;
  onMouseOver: () => void;
  onMouseOut: () => void;
  constructor(base: Experience) {
    super(base);
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", (event) => {
      onMouseMove(event);
    });

    this.onMouseOver = () => {
      document.body.style.cursor = "pointer";
    };

    this.onMouseOut = () => {
      document.body.style.cursor = "default";
    };

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
      bloomPassObj: {
        value: {
          strength: 0.9,
          radius: 0.0,
          threshold: 0.0,
        },
      },
      iMouseManual: {
        value: new THREE.Vector2(0, 0),
      },
    };

    const colorParams = {
      themeColor: "#070618",
      lightColor: "#4cc2e9",
      lightColor2: "#9743fe",
    };

    const RADIUS = 1.001;
    const SEGMENTS = 256.001;

    // 初始化 EffectComposer
    this.composer = new EffectComposer(this.base.renderer);

    // 创建 RenderPass
    const renderPass = new RenderPass(this.base.scene, this.base.camera);

    // 添加 UnrealBloomPass
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      params.bloomPassObj.value.strength,
      params.bloomPassObj.value.radius,
      params.bloomPassObj.value.threshold
    );
    this.composer.addPass(renderPass);

    this.composer.addPass(this.bloomPass);

    // 添加 GammaCorrectionPass
    const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
    this.composer.addPass(gammaCorrectionPass);

    this.bloomPass.renderToScreen = true;

    this.base.scene.background = new THREE.Color(colorParams.themeColor);

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
      iMouseManual: {
        value: new THREE.Vector2(0, 0),
      },
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
      debugFolder
        ?.add(params.bloomPassObj.value, "strength")
        .min(0)
        .max(2)
        .step(0.01)
        .name("bloomStrength")
        .onChange((val: number) => {
          this.bloomPass.strength = val;
        });
      debugFolder
        ?.add(params.bloomPassObj.value, "radius")
        .min(0)
        .max(2)
        .step(0.01)
        .name("bloomRadius")
        .onChange((val: number) => {
          this.bloomPass.radius = val;
        });
      debugFolder
        ?.add(params.bloomPassObj.value, "threshold")
        .min(0)
        .max(1)
        .step(0.01)
        .name("bloomThreshold")
        .onChange((val: number) => {
          this.bloomPass.threshold = val;
        });
    }
  }
  addExisting() {
    this.container.add(this.mesh);
  }
  update() {
    // 更新鼠标和射线投射器
    this.raycaster.setFromCamera(this.mouse, this.base.camera);

    // 检测球体是否被选中
    const intersects = this.raycaster.intersectObject(this.mesh);

    if (intersects.length > 0 && intersects[0].uv) {
      // 如果鼠标悬停在球体上，触发事件
      this.onMouseOver();
      this.material.uniforms.iMouseManual.value.x = intersects[0].uv.x / 0.5;
      this.material.uniforms.iMouseManual.value.y = intersects[0].uv.y / 1.0;

      console.log(this.material.uniforms.iMouseManual.value);
    } else {
      // 鼠标不在球体上
      this.onMouseOut();
    }

    // 更新着色器参数并渲染
    this.uj.injectShadertoyUniforms(this.material.uniforms);
    this.composer.render();
  }
}
