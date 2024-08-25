#define RESOLUTION iResolution.xy// 分辨率
#define RAYMARCH_SAMPLES 128// 采样次数（即步进次数）
#define RAYMARCH_MULTISAMPLE 1// 多重采样次数（即抗锯齿次数）
#define RAYMARCH_BACKGROUND vec3(0.)// 背景色
#define RAYMARCH_CAMERA_FOV 2.// 相机视场角

#include "/node_modules/lygia/space/ratio.glsl"

#define RAYMARCH_MATERIAL_FNC raymarchCustomMaterial
vec3 raymarchCustomMaterial(vec3 ray,vec3 pos,vec3 nor,vec3 map);

#include "/node_modules/lygia/lighting/raymarch.glsl"
#include "/node_modules/lygia/sdf.glsl"

vec3 raymarchCustomMaterial(vec3 ray,vec3 pos,vec3 nor,vec3 map){
    vec3 col=vec3(0.);

    col+=map*.2;

    vec3 lightPos=vec3(10.);
    vec3 lightDir=normalize(lightPos-pos);
    float diff=max(dot(lightDir,nor),0.);
    col+=map*diff;

    vec3 reflectDir=reflect(-lightDir,nor);
    vec3 viewDir=normalize(-ray);
    vec3 halfVec=normalize(lightDir+viewDir);
    float spec=pow(max(dot(nor,halfVec),0.),32.);
    col+=map*spec;

    return col;
}

vec4 raymarchMap(vec3 p){
    vec4 res=vec4(1.);
    res=opUnion(res,vec4(vec3(.875,.286,.333),sphereSDF(p-vec3(0.,0.,-2.),1.)));
    return res;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fragCoord/iResolution.xy;
    uv=ratio(uv,iResolution.xy);
    vec3 col=vec3(0.);
    vec3 camera=vec3(0.,0.,30.);
    col=raymarch(camera,uv).rgb;
    fragColor=vec4(col,1.);
}
