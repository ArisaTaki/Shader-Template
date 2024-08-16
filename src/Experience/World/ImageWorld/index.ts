import Experience from "@/Experience/Experience";
import ImageObject from "@/Experience/Objects/ImageObject";
import * as kokomi from "kokomi.js";
import * as THREE from "three";
import gsap from "gsap";

export default class ImageWorld extends kokomi.Component {
  // 将base定义为Experience类
  declare base: Experience;
  imageObject?: ImageObject;
  currentActiveMesh?: THREE.Mesh;
  renderImageObject = async () => {
    this.imageObject = new ImageObject(this.base);
    await this.imageObject.addExisting();

    this.currentActiveMesh = undefined;
    this.imageObject.ig.iterate((maku) => {
      const mesh = maku.mesh as THREE.Mesh;
      this.base.interactionManager.add(mesh);
      mesh.addEventListener("click", () => {
        if (
          Math.abs(
            (this.imageObject && this.imageObject.ws.scroll.delta) ?? 0
          ) > 5
        ) {
          return;
        }

        const otherMakus = this.imageObject?.ig?.makuGroup?.makus.filter(
          (item) => item !== maku
        );

        if (!this.currentActiveMesh) {
          this.imageObject?.ws.disable();
          this.imageObject?.dd.disable();

          otherMakus?.forEach((item) => {
            gsap.to(
              (item.mesh.material as THREE.ShaderMaterial).uniforms.uOpacity,
              {
                value: 0,
                ease: "power2.out",
              }
            );
          });
          const that = this;
          gsap.to(
            (maku.mesh.material as THREE.ShaderMaterial).uniforms.uProgress,
            {
              value: 1,
              duration: 1,
              ease: "power2.out",
              delay: 0.5,
              onUpdate() {
                if (this.progress() > 0.5) {
                  that.currentActiveMesh = maku.mesh as THREE.Mesh;
                }
              },
            }
          );
          // this.currentActiveMesh = maku.mesh as THREE.Mesh;
        }
      });
    });
    this.base.container.addEventListener("click", () => {
      if (this.currentActiveMesh) {
        const that = this;
        gsap.to(
          (that.currentActiveMesh?.material as THREE.ShaderMaterial).uniforms
            .uProgress,
          {
            value: 0,
            duration: 1,
            ease: "power2.inOut",
            onUpdate() {
              if (this.progress() >= 0.5) {
                that.imageObject?.ws.enable();
                that.imageObject?.dd.enable();

                that.currentActiveMesh = undefined;
              }
            },
          }
        );
        this.imageObject?.ig.iterate((maku) => {
          gsap.to(
            (maku.mesh.material as THREE.ShaderMaterial).uniforms.uOpacity,
            {
              value: 1,
              delay: 0.5,
              ease: "power2.out",
            }
          );
        });
      }
    });
  };

  constructor(base: Experience) {
    super(base);
    this.renderImageObject();
  }
}
