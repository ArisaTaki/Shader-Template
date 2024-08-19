#include "/node_modules/lygia/generative/cnoise.glsl"

uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
varying vec2 vertexUv;
uniform float uDistort;
varying float vNoise;
varying vec3 vNormal;
varying vec3 vWorldPosition;
vec3 distort(vec3 p){
    float noise=cnoise(p+iTime);
    vNoise=noise;
    p+=noise*normal*.3*uDistort;
    return p;
}

#include "../../../CommonShaders/fixNormal.glsl"

void main(){
    vec3 p=position;
    vec3 dp=distort(p);
    gl_Position=projectionMatrix*modelViewMatrix*vec4(dp,1.);

    vertexUv=uv;
    vec3 fNormal = fixNormal(p,dp,normal, RADIUS/SEGMENTS);
    // vNormal=(modelMatrix*vec4(normal,0.)).xyz;
    vNormal = (modelMatrix * vec4(fNormal, 0.)).xyz;
    vWorldPosition=vec3(modelMatrix*vec4(dp,1.));
}
