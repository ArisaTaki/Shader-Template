#include "/node_modules/lygia/color/palette.glsl"
#include "/node_modules/lygia/lighting/fresnel.glsl"
#include "/node_modules/lygia/color/space.glsl"

uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
uniform vec3 uThemeColor;
uniform vec3 uLightColor;
uniform float uFresnelIntensity;
uniform float uLightIntensity;
uniform vec3 uLightColor2;
uniform float uLight2Intensity;
varying vec2 vertexUv;

varying float vNoise;
varying vec3 vNormal;
varying vec3 vWorldPosition;
void main() {
    vec2 uv = vertexUv;

    vec3 normal = normalize(vNormal);

    vec3 col = vec3(1.);

    // cos palette
    // col=palette(vNoise,vec3(.5),vec3(.5),vec3(1.),vec3(0.,.10,.20));

    // 基本主题颜色
    col = uThemeColor;

    // 菲涅尔反射
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 fres = fresnel(vec3(0.), normal, viewDir);
    col += fres*uFresnelIntensity;

    // 漫反射
    // vec3 lightColor=vec3(1.,0.,0.);
    vec3 lightPos = vec3(10., 5., 10.);
    float diff = max(dot(normal, normalize(lightPos - vWorldPosition)), 0.);
    // col += lightColor*diff;
    col = mix(col, uLightColor, diff*fres*uLightIntensity);

    // 第二道光
    vec3 light2Pos = vec3(-10., -5., 10.);
    float diff2 = max(dot(normal, normalize(light2Pos - vWorldPosition)), 0.);
    col = mix(col, uLightColor2, diff2*fres*uLight2Intensity);

    // gama校正
    // 把这里注释掉的原因是因为要使用UnrealBloomPass滤镜
    // 依赖于线性空间的颜色数据来判断哪些像素是高亮的，进而决定光晕的强度和扩散。
    // 如果在片元着色器中提前进行伽马校正，颜色会失去线性空间的特性，导致这些后处理效果无法正确工作。
    // col = linear2gamma(col);

    // debug noise
    // col=vec3(vNoise);

    gl_FragColor=vec4(col,1.);
}
