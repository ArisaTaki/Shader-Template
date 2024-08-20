#include "/node_modules/lygia/color/palette.glsl"
#include "/node_modules/lygia/lighting/fresnel.glsl"

uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
varying vec2 vertexUv;

varying float vNoise;
varying vec3 vNormal;
varying vec3 vWorldPosition;
void main() {
    vec2 uv = vertexUv;
    vec3 normal=normalize(vNormal);
    vec3 col = vec3(1.);

    // col = palette(vNoise, vec3(.5),vec3(.5),vec3(1.), vec3(0., .10, .20));

    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    col = fresnel(vec3(0.), normal, viewDir);
    // col = vec3(vNoise);
    gl_FragColor = vec4(col, 1.);
}
