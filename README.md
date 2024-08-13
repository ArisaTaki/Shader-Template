# 前言

历经几个月，我已经学习了不少的`Shader`的知识要点，从现在开始后来整点实际上的项目。

我们需要组织我们的项目。

我挑选的是`Vite + React`的组合方式。这个组合对于我现在的技能熟练度是最高的。

项目的启动模板贴在这里：

> git clone -b base git@github.com:ArisaTaki/Shader-Template.git

之后：

> npm i
> npm run dev

就可以了。

# 项目搭建

在`src`目录下面新建`Experience`目录，并在该目录下面新建两个文件，一个叫做`Experience.ts`一个叫做`ObjectEnum.ts`
他们的作用分别是：

- Experience：导出一个`Experience`类，继承了`kokomi.js`的`Base`类，找到传入的`id`,并且挂载上去
- ObjectEnum：枚举，写了几个不同的`Object`，就加入几个项，用于区分给接下来的`World`类渲染什么内容设计的

```typescript
import * as kokomi from "kokomi.js";
import World from "./World/World";
import * as THREE from "three";
import ObjectEnum from "./ObjectEnum";
import Debug from "./Debug/Debug";
import { resources } from "./Resources/Resources";

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
```

```typescript
const enum ObjectEnum {
  // 测试Object
  TestObject = 0,
  // 基础Object
  BaseObject = 1,
}

export default ObjectEnum;
```

## World

`World`负责创建场景内的所有物体。

在`Experience`目录下面创建`World`目录，并且在里面创建`World.ts`文件

```ts
import * as kokomi from "kokomi.js";
import * as THREE from "three";
import TestObject from "../Objects/TestObject/TestObject";
import ObjectEnum from "../ObjectEnum";
import BaseObject from "../Objects/BaseObject/BaseObject";
import Experience from "../Experience";
import HomeStyles from "@/views/Home/styles.module.css";
export default class World extends kokomi.Component {
  // 将base定义为Experience类
  declare base: Experience;
  // 这两个是我们自定义的Object
  testObject?: TestObject;
  baseObject?: BaseObject;

  // 渲染Object的方法
  renderTestObject = () => {
    // 这里是定义材质的地方，后续会讲到
    const skyBox = this.base.am.items["skyBox"];
    skyBox.mapping = THREE.EquirectangularReflectionMapping;
    this.base.scene.background = skyBox;

    this.testObject = new TestObject(this.base);
    this.testObject.addExisting();
  };

  // 渲染Object的方法
  renderBaseObject = () => {
    this.baseObject = new BaseObject(this.base);
    this.baseObject.addExisting();
  };

  constructor(base: Experience, objectEnum?: ObjectEnum) {
    super(base);

    // 加载好材质之后进行的行为
    this.base.am.on("ready", () => {
      setTimeout(() => {
        document
          .querySelector(`.${HomeStyles["loader-screen"]}`)
          ?.classList.add(HomeStyles["hollow"]);
        // 根据objectEnum决定渲染哪一个shader Object
        switch (objectEnum) {
          case ObjectEnum.TestObject:
            this.renderTestObject();
            break;
          case ObjectEnum.BaseObject:
            this.renderBaseObject();
            break;
        }
      }, 3000);
    });
  }
}
```

## Objects

这是用于装填新建`Object`的地方，这里就是我们自定义的内容了。
![](https://cdn.jsdelivr.net/gh/ArisaTaki/MyBlogPic@image/img/c49c827b1142e87a7117715a237a10db.png)

这里面的配置就是专门的`Object`，其中有本体的`ts`文件，之后就是`Shaders`文件夹，用于存放顶点着色器和片元着色器。

我们拿`TestObject`举例：

```ts
import * as THREE from "three";
import * as kokomi from "kokomi.js";
import testObjectVertexShader from "./Shaders/vert.glsl";
import testObjectFragmentShader from "./Shaders/frag.glsl";
import Experience from "@/Experience/Experience";

export default class TestObject extends kokomi.Component {
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

    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.ShaderMaterial({
      vertexShader: testObjectVertexShader,
      fragmentShader: testObjectFragmentShader,
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
      const debugFolder = debug.ui?.addFolder("testObject");
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
```

其实也没有什么好说的，因为基本上都是很熟悉的内容，前面的文章一步步带大家走过来的，shader 的编程代码。

在这里，因为`vite`不能直接读取`.glsl`文件，所以我们要借助一个插件`vite-plugin-glsl`。

> npm i -D vite-plugin-glsl

之后在`vite.config.ts`里面声明引入：

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import glsl from "vite-plugin-glsl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

我们在`Shaders`文件夹里加入`.glsl`文件，内容比如说是这样的：

```glsl

#include "/node_modules/lygia/generative/cnoise.glsl"

uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
varying vec2 vertexUv;
uniform float uDistort;
vec3 distort(vec3 p){
    float noise=cnoise(p+iTime);
    p+=noise*normal*.3*uDistort;
    return p;
}

void main(){
    vec3 p=position;
    p=distort(p);
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);

    vertexUv=uv;
}

```

然后我们导入它的办法就是

```ts
import testObjectVertexShader from "./Shaders/vert.glsl";
...
const material = new THREE.ShaderMaterial({
    vertexShader: testObjectVertexShader,
    fragmentShader: testObjectFragmentShader,
});
```

## lygia

`lygia`是一个有着很多实用函数的`Shader`库，可以说是`Shader`界的 `lodash`。

前面在写`glsl`的时候你可能注意到了这一行代码：

```glsl
#include "/node_modules/lygia/generative/cnoise.glsl"
```

这是怎么来的？

> npm i lygia

这样来的。

插件`vite-plugin-glsl` 使我们能够用`#include`语法来引入`Shader`模块，这行代码的意思就是顶点着色器的顶部引入一个柏林噪声函数`cnoise`。

## 调试

之前我们在写单文件`Shader`的时候，总是会对一些值进行各种微调，而且这些微调是纯粹靠手输，稍微有点繁琐，那能不能做成拖拽式的`GUI`呢？

在拿`TestObject`举例的时候，你肯定也注意到了，有一个关键词`debug`，它就是我们的调试工具了。

你需要安装一个调试专用的库——`lil-gui`。

> npm i lil-gui

在`Experience`目录下，新建`Debug`目录。在其中建立新的文件`Debug.ts`

```ts
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
```

为什么会有个别名`dat`？

那是因为`three.js`在早期使用的调试库名叫`dat.gui`，而它的引入方式就是`import * as dat from "dat.gui"`;，现在的调试库则换成了 `lil-gui`，为了保留这一传统就这么写了。

要调试的值通常都会存在一个对象里，我们在初始化`material`前创建一个`param`s 的对象来存放调试的值，创建一个`uDistort`的值，表明扭曲的程度，把调试值合并至`material.uniforms`里。可以拉回上面仔细查看代码。

给`debugFolder`添加`uDistort`的值，并且设置好值的范围（这里是[0,2]），步长设为`0.01`，属性名设为`distort`。

```ts
if (debug.active) {
  const debugFolder = debug.ui?.addFolder("testObject");
  debugFolder
    ?.add(params.uDistort, "value")
    .min(0)
    .max(2)
    .step(0.01)
    .name("distort");
}
```

`Shader`里还需要声明这个 `uniform` 变量，在顶点着色器的上方声明 `uDistort`变量。

```glsl
uniform float uDistort;
```

要把这个变量给用上去，在`distort`函数中，给噪声值`noise`乘上`uDistort`。

```glsl
vec3 distort(vec3 p){
    float noise=cnoise(p+iTime);
    p+=noise*normal*.3*uDistort;
    return p;
}
```

## 资源管理

在`kokomi.js`中，有一个`AssetManager`的类，可以用于统一的资源管理。

我们还是和以前一样，创建一个`Resources`目录。并且在下面创建对应的`ts`文件。

静态资源基本都是放在 public 里面的，我们在下面创建一个`textures`文件夹用来存放纹理图片，这些图片在之前的文章里有提到如何获取，可以参考光照模型相关的文章。

```ts
import * as kokomi from "kokomi.js";

export const resources: kokomi.ResourceItem[] = [
  {
    name: "skyBox",
    type: "texture",
    path: "textures/skyBox.png",
  },
];
```

因为搭建模板的细节过多，本文章的重点其实是是贴出来这个项目的仓库地址。。。所以更多的搭建过程都被细化了，希望大家能够直接访问项目仓库代码进行查阅。

在这里特别感谢[alphardex](https://github.com/alphardex)桑的Kokomi仓库，真的给到了很多的帮助，帮助我完成了这个基于`react`+`vite`的基础模板的搭建。非常感谢！
