import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function promptForShaderName() {
  while (true) {
    const { shaderName } = await inquirer.prompt([
      {
        type: "input",
        name: "shaderName",
        message: "请输入 Shader 的名称:",
      },
    ]);

    const formattedName =
      shaderName.charAt(0).toUpperCase() + shaderName.slice(1).toLowerCase();
    const objectDir = path.join(
      __dirname,
      `src/Experience/Objects/${formattedName}Object`
    );
    const worldDir = path.join(
      __dirname,
      `src/Experience/World/${formattedName}World`
    );

    if (fs.existsSync(objectDir)) {
      console.log(
        `Error: ${formattedName}Object 已经存在，请选择一个不同的名称。`
      );
      continue;
    }

    if (fs.existsSync(worldDir)) {
      console.log(
        `Error: ${formattedName}World 已经存在，请选择一个不同的名称。`
      );
      continue;
    }

    const objectEnumPath = path.join(
      path.resolve(__dirname, "../"),
      "src/Experience/ObjectEnum.ts"
    );

    const objectEnumContent = fs.readFileSync(objectEnumPath, "utf8");

    if (objectEnumContent.includes(`${formattedName}Object`)) {
      console.log(
        `Error: ObjectEnum 中已存在 ${formattedName}Object，请选择一个不同的名称。`
      );
      continue;
    }

    return formattedName;
  }
}

async function createShader() {
  const formattedName = await promptForShaderName();

  const objectDir = path.join(
    path.resolve(__dirname, "../"),
    `src/Experience/Objects/${formattedName}Object`
  );
  const shadersDir = path.join(objectDir, "Shaders");
  const worldDir = path.join(
    path.resolve(__dirname, "../"),
    `src/Experience/World/${formattedName}World`
  );

  // 填充 Object/index.ts 的内容
  const objectIndexContent = `import * as THREE from "three";
import * as kokomi from "kokomi.js";
import vertexShader from "./Shaders/vert.glsl";
import fragmentShader from "./Shaders/frag.glsl";
import Experience from "@/Experience/Experience";

export default class ${formattedName}Object extends kokomi.Component {
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
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
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
      const debugFolder = debug.ui?.addFolder("${formattedName.toLowerCase()}Object");
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
`;

  // 填充 Shaders/frag.glsl 的内容
  const fragShaderContent = `uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
varying vec2 vertexUv;
void main() {
    vec2 uv = vertexUv;
    gl_FragColor = vec4(1,1., 0., 1.);
}
`;

  // 填充 Shaders/vert.glsl 的内容
  const vertShaderContent = `#include "/node_modules/lygia/generative/cnoise.glsl"

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
`;

  // 填充 World/index.ts 的内容
  const worldIndexContent = `import Experience from "@/Experience/Experience";
import ${formattedName}Object from "@/Experience/Objects/${formattedName}Object";
import * as kokomi from "kokomi.js";

export default class ${formattedName}World extends kokomi.Component {
  // 将base定义为Experience类
  declare base: Experience;
  ${formattedName.toLowerCase()}Object?: ${formattedName}Object;
  render${formattedName}Object = () => {
    this.${formattedName.toLowerCase()}Object = new ${formattedName}Object(this.base);
    this.${formattedName.toLowerCase()}Object.addExisting();
  };

  constructor(base: Experience) {
    super(base);
    this.render${formattedName}Object();
  }
}
`;

  // 填充 World/index.ts 的内容（为新 Object 添加到 switch case 中）
  const mainWorldIndexPath = path.join(
    path.resolve(__dirname, "../"),
    "src/Experience/World/index.ts"
  );
  let mainWorldIndexContent = fs.readFileSync(mainWorldIndexPath, "utf8");

  // 添加 switch case 语句
  const switchCaseStatement = `case ObjectEnum.${formattedName}Object:
            new ${formattedName}World(this.base);
            break;`;

  mainWorldIndexContent = mainWorldIndexContent.replace(
    /switch \(objectEnum\) {([\s\S]*?)}/,
    (match, p1) => {
      return `switch (objectEnum) {${p1}${switchCaseStatement}\n        }`;
    }
  );

  // 添加 import 语句到现有 import 语句的末尾
  const importStatement = `import ${formattedName}World from "./${formattedName}World";\n\n`;

  const importEndIndex = mainWorldIndexContent.lastIndexOf("import");
  const nextLineAfterImport =
    mainWorldIndexContent.indexOf("\n", importEndIndex) + 1;
  mainWorldIndexContent = [
    mainWorldIndexContent.slice(0, nextLineAfterImport),
    importStatement,
    mainWorldIndexContent.slice(nextLineAfterImport),
  ].join("");

  // 创建 Object 目录及其下的 Shaders 目录和 index.ts
  fs.ensureDirSync(shadersDir);
  fs.writeFileSync(path.join(objectDir, "index.ts"), objectIndexContent);
  fs.writeFileSync(path.join(shadersDir, "frag.glsl"), fragShaderContent);
  fs.writeFileSync(path.join(shadersDir, "vert.glsl"), vertShaderContent);

  // 创建 World 目录及其下的 index.ts
  fs.ensureDirSync(worldDir);
  fs.writeFileSync(path.join(worldDir, "index.ts"), worldIndexContent);

  // 更新 Main World/index.ts
  fs.writeFileSync(mainWorldIndexPath, mainWorldIndexContent);

  // 更新 ObjectEnum.ts

  const objectEnumPath = path.join(
    path.resolve(__dirname, "../"),
    "src/Experience/ObjectEnum.ts"
  );
  const objectEnumContent = fs.readFileSync(objectEnumPath, "utf8");

  const objectEnumMatch = objectEnumContent.match(/ObjectEnum\s*{([\s\S]*?)}/);
  const enumBody = objectEnumMatch ? objectEnumMatch[1] : "";
  const currentEnumCount = (enumBody.match(/,/g) || []).length;

  const newEnumValue = `${formattedName}Object = ${currentEnumCount},`;

  const updatedObjectEnumContent = objectEnumContent.replace(
    /ObjectEnum\s*{([\s\S]*?)}/,
    `ObjectEnum {${enumBody}${newEnumValue}\n}`
  );

  fs.writeFileSync(objectEnumPath, updatedObjectEnumContent);

  console.log(
    `Shader ${formattedName}Object 和 ${formattedName}World 已成功创建，并且 ObjectEnum.ts 和 World/index.ts 已更新！`
  );
}

createShader();
