uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
varying vec2 vertexUv;
void main() {
    vec2 uv = vertexUv;
    gl_FragColor = vec4(uv, 0., 1.);

}