import * as THREE from "three";
import * as kokomi from "kokomi.js";

export default class BaseObject extends kokomi.Component {
  material: THREE.ShaderMaterial;
  mesh: THREE.Mesh<
    THREE.SphereGeometry,
    THREE.ShaderMaterial,
    THREE.Object3DEventMap
  >;
  uj: kokomi.UniformInjector;
  constructor(base: kokomi.Base) {
    super(base);

    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.ShaderMaterial({
      vertexShader: /* glsl */ `
        uniform float iTime;
        uniform vec3 iResolution;
        uniform vec4 iMouse;
        varying vec2 vertexUv;
        void main(){
          vertexUv = uv;
          vec3 p = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float iTime;
        uniform vec3 iResolution;
        uniform vec4 iMouse;
        varying vec2 vertexUv;
        void main() {
          vec2 uv = vertexUv;
          gl_FragColor = vec4(1., 1., 0., 1.);

        }
      `,
    });
    this.material = material;
    const mesh = new THREE.Mesh(geometry, material);
    this.mesh = mesh;

    const uj = new kokomi.UniformInjector(this.base);
    this.uj = uj;
    material.uniforms = {
      ...material.uniforms,
      ...uj.shadertoyUniforms,
    };
  }
  addExisting() {
    this.container.add(this.mesh);
  }
  update() {
    this.uj.injectShadertoyUniforms(this.material.uniforms);
  }
}
