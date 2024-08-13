import * as kokomi from "kokomi.js";
import World from "./World/World";
import * as THREE from "three";
import ObjectEnum from "./ObjectEnum";

export interface ExperienceConfig {
  id: string;
  // 传递给 World 的配置
  objectEnum: ObjectEnum;
  // 先设定一个设置摄像机位置的参数
  cameraPosition?: THREE.Vector3;
}

export default class Experience extends kokomi.Base {
  world: World;

  constructor(config: ExperienceConfig) {
    super(config.id);

    // 动态设置摄像机位置
    const cameraPosition = config?.cameraPosition || new THREE.Vector3(0, 0, 5);
    this.camera.position.copy(cameraPosition);

    new kokomi.OrbitControls(this);

    window.experience = this;

    // 使用配置初始化 World
    this.world = new World(this, config?.objectEnum);
  }
}
