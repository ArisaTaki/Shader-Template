import * as kokomi from "kokomi.js";
import World from "./World";
import * as THREE from "three";
import ObjectEnum from "./ObjectEnum";
import Debug from "./Debug";
import { resources } from "./Resources";

export interface ExperienceConfig {
  id: string;
  // 传递给 World 的配置
  objectEnum: ObjectEnum;
  // 先设定一个设置摄像机位置的参数
  cameraPosition?: THREE.Vector3;
}

export default class Experience extends kokomi.Base {
  world: World;
  debug: Debug;
  am: kokomi.AssetManager;

  constructor(config: ExperienceConfig) {
    super(config.id);

    // 动态设置摄像机位置
    const cameraPosition = config?.cameraPosition || new THREE.Vector3(0, 0, 5);
    // 把摄像机的位置设置给camera
    this.camera.position.copy(cameraPosition);
    // 添加轨道控制
    new kokomi.OrbitControls(this);

    // 挂载Experience类到全局
    window.experience = this;

    // 挂载Debug类
    this.debug = new Debug();

    // 挂载资源管理类
    this.am = new kokomi.AssetManager(this, resources);

    // 使用配置初始化 World
    this.world = new World(this, config?.objectEnum);
  }
}
