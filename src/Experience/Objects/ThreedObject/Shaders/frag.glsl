uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
varying vec2 vertexUv;
void main() {
    vec2 uv = vertexUv;
    vec3 col = vec3(1.);
    gl_FragColor = vec4(col, 1.);
}
