import * as dat from "lil-gui";

export default class Debug {
  active: boolean;
  ui?: dat.GUI;
  constructor() {
    // 通过哈希值来判断是否激活调试工具的GUI
    this.active = window.location.hash === "#debug";

    if (this.active) {
      this.ui = new dat.GUI();
    }
  }
}

