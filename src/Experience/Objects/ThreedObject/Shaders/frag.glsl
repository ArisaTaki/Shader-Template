#include "/node_modules/lygia/color/palette.glsl"
#include "/node_modules/lygia/lighting/fresnel.glsl"
#include "/node_modules/lygia/color/space.glsl"

uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
uniform vec3 uThemeColor;
uniform vec3 uLightColor;
uniform vec3 uLightColor2;
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
    vec3 fres = fresnel(uThemeColor, normal, viewDir);
    col = fres;
    col = linear2gamma(col);

    // vec3 lightColor=vec3(1.,0.,0.);
    vec3 lightPos=vec3(10.,10.,10.);
    float diff=max(dot(normal,normalize(lightPos-vWorldPosition)),0.);
    // col+=lightColor*diff;
    col=mix(col,uLightColor,diff*fres);
    // col = vec3(vNoise);
    gl_FragColor = vec4(col, 1.);
}
