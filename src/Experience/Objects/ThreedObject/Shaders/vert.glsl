#include "/node_modules/lygia/generative/cnoise.glsl"
#include "/node_modules/lygia/generative/snoise.glsl"
#include "/node_modules/lygia/generative/pnoise.glsl"
#include "/node_modules/lygia/generative/fbm.glsl"
#include "/node_modules/lygia/generative/curl.glsl"
#include "/node_modules/lygia/math/const.glsl"

uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
varying vec2 vertexUv;
uniform float uFrequency;
uniform float uDistort;
varying float vNoise;
varying vec3 vNormal;
varying vec3 vWorldPosition;
vec3 distort(vec3 p){
    // simplex noise
    float offset=snoise(p / uFrequency + iTime * 0.3);
    
    // classic perlin noise
    // float offset=cnoise(p / uFrequency + iTime * 0.3);

    // periodic noise
    // vec3 repetition = vec3(10.0, 10.0, 10.0); // 设置pnoise噪声的重复周期
    // float offset=pnoise(p / uFrequency + iTime * 0.3,repetition);

    // fbm noise
    // float offset=fbm(p / uFrequency + iTime * 0.3);

    // curl noise
    // float offset=curl(p / uFrequency + iTime * 0.3).y;

    float t=(p.y+offset)*PI*12.;
    float noise=(sin(t)*p.x+cos(t)*p.z)*2.;
    noise*=uDistort;
    vNoise=noise;
    p+=noise*normal*.01;
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
