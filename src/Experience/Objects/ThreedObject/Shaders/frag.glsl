#include "/node_modules/lygia/color/palette.glsl"

uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
varying vec2 vertexUv;

varying float vNoise;
void main() {
    vec2 uv = vertexUv;
    vec3 col = vec3(1.);

    col = palette(vNoise, vec3(.5),vec3(.5),vec3(1.), vec3(0., .10, .20));
    gl_FragColor = vec4(col, 1.);
}
