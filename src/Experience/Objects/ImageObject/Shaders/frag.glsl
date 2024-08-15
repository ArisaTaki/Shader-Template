uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;

uniform sampler2D uTexture;

varying vec2 vUv;

void main(){
    vec2 uv=vUv;
    vec4 tex=texture(uTexture,uv);
    vec3 color=tex.rgb;
    gl_FragColor=vec4(color,1.);
}
