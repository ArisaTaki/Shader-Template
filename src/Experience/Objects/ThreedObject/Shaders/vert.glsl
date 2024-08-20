#include "/node_modules/lygia/generative/cnoise.glsl"
#include "/node_modules/lygia/math/const.glsl"

uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
varying vec2 vertexUv;
uniform float uFrequency;
varying float vNoise;
varying vec3 vNormal;
varying vec3 vWorldPosition;
vec3 distort(vec3 p){
    float offset=cnoise(p / uFrequency + iTime * .5);
    float noise=sin((p.y + offset)*PI*12.);
    vNoise=noise;
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
