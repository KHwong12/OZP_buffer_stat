import{a as Pt}from"./devEnvironmentUtils.8c6e6b72.js";import{i as Lt,aF as ge,aD as E,h as Xe,aY as de,f1 as Nt,eE as Rt,e as m,aN as ee,eF as Et,_ as Ke,dC as Se,I as d,e8 as Dt,dj as Ze,di as me,b3 as ke,b4 as Ie,dh as _t,fV as It,a6 as Ft,j4 as et,iq as tt,U as zt,ar as Vt,bL as at,s as Gt,eD as Fe,eW as ot,iu as fe,hP as qt,il as ze,g5 as Bt,ff as Ve,j5 as Ge,eC as Wt}from"./index.9da382e4.js";import{a as it}from"./quatf64.ddec7ef6.js";import{o as Ut,e as Ht}from"./mat4f64.84d5c445.js";import{i as he,c as qe,u as jt,x as Pe,L as Qt,O as Be,E as Yt}from"./BufferView.9de22bcf.js";import{t as Jt,r as Xt,f as We,e as Kt}from"./vec33.3d48e3ad.js";import{c as Zt,n as kt,o as J,r as j,a as ea,b as ta,d as Ue,e as aa,t as oa,i as ia,f as ra,g as na}from"./DefaultMaterial_COLOR_GAMMA.bcf83e8a.js";import{r as sa,v as la,C as w,O as Z,n as W,N as ne,W as ca,b as da,E as ua,h as pa,e as ma,d as ha,c as va,i as ga,_ as fa,a as xa}from"./requestImageUtils.4ea1aefd.js";import{n as o,aM as ba,aN as He,s as f,d as rt,aO as ya,aG as Ca,C as Le,o as P,y as te,v as ae,aP as oe,aa as ie,$ as Ta,w as Q,b as wa,c as q,aQ as Ne,aR as nt,aS as _,ac as Ma,aT as re,aU as Oa,ar as $a,aV as Aa,aW as Sa,z as Re,ax as T,at as Ee,aw as Pa,aK as De,_ as La,e as B,av as Na,as as Ra,x as Ea,i as st,aJ as lt,aX as ct,r as xe,au as dt,al as ut,A as be,aY as pt,ay as mt,aZ as ht,aq as Da,a_ as _a,M as Ia,m as Fa,t as vt,f as za,aA as Va,g as Ga,E as qa,N as Ba,O as Wa,P as Ua,h as u,D as Ha,az as je,F as ja,V as Me,ag as Qa,G as Ya,ap as Ja,l as ue,Q as Xa,J as Ka,L as K,q as gt}from"./Matrix4Uniform.b7dc351c.js";import{T as ft}from"./InterleavedLayout.e9290885.js";import{O as g}from"./VertexAttribute.5551e0d8.js";import{c as Za}from"./Texture.599541db.js";import{I as Qe,D as Ye,E as Oe}from"./enums.de935fa5.js";function ka(t,e){const a=t.fragment;switch(a.code.add(o`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),e.doubleSidedMode){case L.None:a.code.add(o`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case L.View:a.code.add(o`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case L.WindingOrder:a.code.add(o`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:Lt(e.doubleSidedMode);case L.COUNT:}}var L;(function(t){t[t.None=0]="None",t[t.View=1]="View",t[t.WindingOrder=2]="WindingOrder",t[t.COUNT=3]="COUNT"})(L||(L={}));function xt(t){t.vertex.code.add(o`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}function bt(t,e){e.instanced&&e.instancedDoublePrecision&&(t.attributes.add(g.MODELORIGINHI,"vec3"),t.attributes.add(g.MODELORIGINLO,"vec3"),t.attributes.add(g.MODEL,"mat3"),t.attributes.add(g.MODELNORMAL,"mat3"));const a=t.vertex;e.instancedDoublePrecision&&(a.include(ba,e),a.uniforms.add(new He("viewOriginHi",(i,r)=>sa(ge(pe,r.camera.viewInverseTransposeMatrix[3],r.camera.viewInverseTransposeMatrix[7],r.camera.viewInverseTransposeMatrix[11]),pe))),a.uniforms.add(new He("viewOriginLo",(i,r)=>la(ge(pe,r.camera.viewInverseTransposeMatrix[3],r.camera.viewInverseTransposeMatrix[7],r.camera.viewInverseTransposeMatrix[11]),pe)))),a.code.add(o`
    vec3 calculateVPos() {
      ${e.instancedDoublePrecision?"return model * localPosition().xyz;":"return localPosition().xyz;"}
    }
    `),a.code.add(o`
    vec3 subtractOrigin(vec3 _pos) {
      ${e.instancedDoublePrecision?o`
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -modelOriginHi, -modelOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),a.code.add(o`
    vec3 dpNormal(vec4 _normal) {
      ${e.instancedDoublePrecision?"return normalize(modelNormal * _normal.xyz);":"return normalize(_normal.xyz);"}
    }
    `),e.output===f.Normal&&(a.uniforms.add(new rt("viewNormal",(i,r)=>r.camera.viewInverseTransposeMatrix)),a.code.add(o`
    vec3 dpNormalView(vec4 _normal) {
      ${e.instancedDoublePrecision?"return normalize((viewNormal * vec4(modelNormal * _normal.xyz, 1.0)).xyz);":"return normalize((viewNormal * _normal).xyz);"}
    }
    `)),e.hasVertexTangents&&a.code.add(o`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${e.instancedDoublePrecision?"return vec4(modelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}

    }
    `)}const pe=E();var O;function Ko(t){switch(t){case"multiply":default:return O.Multiply;case"ignore":return O.Ignore;case"replace":return O.Replace;case"tint":return O.Tint}}function Zo(t,e,a){if(Xe(t)||e===O.Ignore)return a[0]=255,a[1]=255,a[2]=255,void(a[3]=255);const i=de(Math.round(t[3]*ye),0,ye),r=i===0||e===O.Tint?0:e===O.Replace?eo:to;a[0]=de(Math.round(t[0]*X),0,X),a[1]=de(Math.round(t[1]*X),0,X),a[2]=de(Math.round(t[2]*X),0,X),a[3]=i+r}(function(t){t[t.Multiply=1]="Multiply",t[t.Ignore=2]="Ignore",t[t.Replace=3]="Replace",t[t.Tint=4]="Tint"})(O||(O={}));const X=255,ye=85,eo=ye,to=2*ye;function ao(t){t.vertex.code.add(o`
    vec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {
      float symbolAlpha = 0.0;

      const float maxTint = 85.0;
      const float maxReplace = 170.0;
      const float scaleAlpha = 3.0;

      if (symbolColor.a > maxReplace) {
        colorMixMode = ${o.int(O.Multiply)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxReplace);
      } else if (symbolColor.a > maxTint) {
        colorMixMode = ${o.int(O.Replace)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxTint);
      } else if (symbolColor.a > 0.0) {
        colorMixMode = ${o.int(O.Tint)};
        symbolAlpha = scaleAlpha * symbolColor.a;
      } else {
        colorMixMode = ${o.int(O.Multiply)};
        symbolAlpha = 0.0;
      }

      return vec4(symbolColor.r, symbolColor.g, symbolColor.b, symbolAlpha);
    }
  `)}function yt(t,e){e.hasSymbolColors?(t.include(ao),t.attributes.add(g.SYMBOLCOLOR,"vec4"),t.varyings.add("colorMixMode","mediump float"),t.vertex.code.add(o`int symbolColorMixMode;
vec4 getSymbolColor() {
return decodeSymbolColor(symbolColor, symbolColorMixMode) * 0.003921568627451;
}
void forwardColorMixMode() {
colorMixMode = float(symbolColorMixMode) + 0.5;
}`)):(t.fragment.uniforms.add(new ya("colorMixMode",a=>Ca[a.colorMixMode])),t.vertex.code.add(o`vec4 getSymbolColor() { return vec4(1.0); }
void forwardColorMixMode() {}`))}function oo(t){t.fragment.code.add(o`
    #define discardOrAdjustAlpha(color) { if (color.a < ${o.float(Le)}) { discard; } }
  `)}function Y(t,e){io(t,e,new P("textureAlphaCutoff",a=>a.textureAlphaCutoff))}function io(t,e,a){const i=t.fragment;switch(e.alphaDiscardMode!==w.Mask&&e.alphaDiscardMode!==w.MaskBlend||i.uniforms.add(a),e.alphaDiscardMode){case w.Blend:return t.include(oo);case w.Opaque:i.code.add(o`void discardOrAdjustAlpha(inout vec4 color) {
color.a = 1.0;
}`);break;case w.Mask:i.code.add(o`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } else { color.a = 1.0; } }`);break;case w.MaskBlend:t.fragment.code.add(o`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } }`)}}function Ct(t,e){const a=t.vertex.code,i=t.fragment.code,r=e.hasModelTransformation;e.output!==f.Depth&&e.output!==f.Shadow||(te(t,e),t.include(ae,{linearDepth:!0,hasModelTransformation:r}),t.include(oe,e),t.include(ie,e),t.include(Ta,e),t.include(Q,e),t.vertex.uniforms.add(new wa("nearFar",(n,h)=>h.camera.nearFar)),t.varyings.add("depth","float"),e.hasColorTexture&&t.fragment.uniforms.add(new q("tex",n=>n.texture)),a.add(o`
      void main(void) {
        vpos = calculateVPos();
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPositionWithDepth(proj, view, ${r?"model,":""} vpos, nearFar, depth);
        forwardTextureCoordinates();
      }
    `),t.include(Y,e),i.add(o`
      void main(void) {
        discardBySlice(vpos);
        ${e.hasColorTexture?o`
        vec4 texColor = texture2D(tex, vuv0);
        discardOrAdjustAlpha(texColor);`:""}
        outputDepth(depth);
      }
    `)),e.output===f.Normal&&(te(t,e),t.include(ae,{linearDepth:!1,hasModelTransformation:r}),t.include(Ne,e),t.include(nt,e),t.include(oe,e),t.include(ie,e),e.hasColorTexture&&t.fragment.uniforms.add(new q("tex",n=>n.texture)),t.varyings.add("vPositionView","vec3"),a.add(o`
      void main(void) {
        vpos = calculateVPos();
        vpos = subtractOrigin(vpos);
        ${e.normalType===_.Attribute?o`
        vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:""}
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, ${r?"model,":""} vpos);
        forwardTextureCoordinates();
      }
    `),t.include(Q,e),t.include(Y,e),i.add(o`
      void main() {
        discardBySlice(vpos);
        ${e.hasColorTexture?o`
        vec4 texColor = texture2D(tex, vuv0);
        discardOrAdjustAlpha(texColor);`:""}

        ${e.normalType===_.ScreenDerivative?o`
            vec3 normal = screenDerivativeNormal(vPositionView);`:o`
            vec3 normal = normalize(vNormalWorld);
            if (gl_FrontFacing == false) normal = -normal;`}
        gl_FragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);
      }
    `)),e.output===f.Highlight&&(te(t,e),t.include(ae,{linearDepth:!1,hasModelTransformation:r}),t.include(oe,e),t.include(ie,e),e.hasColorTexture&&t.fragment.uniforms.add(new q("tex",n=>n.texture)),a.add(o`
      void main(void) {
        vpos = calculateVPos();
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, ${r?"model,":""} vpos);
        forwardTextureCoordinates();
      }
    `),t.include(Q,e),t.include(Y,e),t.include(Ma),i.add(o`
      void main() {
        discardBySlice(vpos);
        ${e.hasColorTexture?o`
        vec4 texColor = texture2D(tex, vuv0);
        discardOrAdjustAlpha(texColor);`:""}
        outputHighlight();
      }
    `))}function ro(t,e){const a=t.fragment;if(e.hasVertexTangents?(t.attributes.add(g.TANGENT,"vec4"),t.varyings.add("vTangent","vec4"),e.doubleSidedMode===L.WindingOrder?a.code.add(o`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):a.code.add(o`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):(t.extensions.add("GL_OES_standard_derivatives"),a.code.add(o`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`)),e.textureCoordinateType!==re.None){t.include(Oa,e);const i=e.supportsTextureAtlas;a.uniforms.add(e.pbrTextureBindType===$a.Pass?Aa("normalTexture",r=>r.textureNormal,i):Sa("normalTexture",r=>r.textureNormal,i)),a.code.add(o`
    vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
      vtc.uv = uv;
      ${e.supportsTextureAtlas?"vtc.size = normalTextureSize;":""}
      vec3 rawNormal = textureLookup(normalTexture, vtc).rgb * 2.0 - 1.0;
      return tangentSpace * rawNormal;
    }
  `)}}function _e(t,e){const a=t.fragment;e.receiveAmbientOcclusion?(a.uniforms.add([new q("ssaoTex",(i,r)=>r.ssaoHelper.colorTexture),new Re("viewportPixelSz",(i,r)=>Nt(no,r.camera.fullViewport[0],r.camera.fullViewport[1],1/r.ssaoHelper.width,1/r.ssaoHelper.height))]),a.code.add(o`float evaluateAmbientOcclusion() {
return 1.0 - texture2D(ssaoTex, (gl_FragCoord.xy - viewportPixelSz.xy) * viewportPixelSz.zw).a;
}
float evaluateAmbientOcclusionInverse() {
return texture2D(ssaoTex, (gl_FragCoord.xy - viewportPixelSz.xy) * viewportPixelSz.zw).a;
}`)):a.code.add(o`float evaluateAmbientOcclusion() { return 0.0; }
float evaluateAmbientOcclusionInverse() { return 1.0; }`)}const no=Rt();function Tt(t,e){const a=t.fragment;t.include(_e,e),e.pbrMode!==T.Disabled&&t.include(Ee,e),t.include(Pa,e),a.constants.add("ambientBoostFactor","float",De),t.include(La),a.code.add(o`
    const float GAMMA_SRGB = 2.1;
    const float INV_GAMMA_SRGB = 0.4761904;
    ${e.pbrMode===T.Disabled?"":"const vec3 GROUND_REFLECTANCE = vec3(0.2);"}
  `),a.uniforms.add(new B("lightingMainDirection",(i,r)=>r.lighting.lightingMainDirection)),a.code.add(o`
    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float vndl = dot(${e.spherical?o`normalize(vPosWorld)`:o`vec3(0.0, 0.0, 1.0)`}, lightingMainDirection);
      return smoothstep(0.0, 1.0, clamp(vndl * 2.5, 0.0, 1.0));
    }
  `),a.uniforms.add([new P("lightingGlobalFactor",(i,r)=>r.lighting.globalFactor),new B("lightingMainIntensity",(i,r)=>r.lighting.mainLight.intensity)]),a.code.add(o`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * lightingMainIntensity;
}`),e.pbrMode===T.Disabled||e.pbrMode===T.WaterOnIntegratedMesh?(t.include(Na,e),a.code.add(o`vec3 evaluateSceneLighting(vec3 normalWorld, vec3 albedo, float shadow, float ssao, vec3 additionalLight)
{
vec3 mainLighting = evaluateMainLighting(normalWorld, shadow);
vec3 ambientLighting = calculateAmbientIrradiance(normalWorld, ssao);
vec3 albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
vec3 totalLight = mainLighting + ambientLighting + additionalLight;
totalLight = min(totalLight, vec3(PI));
vec3 outColor = vec3((albedoLinear / PI) * totalLight);
return pow(outColor, vec3(INV_GAMMA_SRGB));
}`)):e.pbrMode!==T.Normal&&e.pbrMode!==T.Schematic||(a.code.add(o`const float fillLightIntensity = 0.25;
const float horizonLightDiffusion = 0.4;
const float additionalAmbientIrradianceFactor = 0.02;
vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight, vec3 viewDir, vec3 normalGround, vec3 mrr, vec3 _emission, float additionalAmbientIrradiance)
{
vec3 viewDirection = -viewDir;
vec3 mainLightDirection = lightingMainDirection;
vec3 h = normalize(viewDirection + mainLightDirection);
PBRShadingInfo inputs;
inputs.NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
inputs.NdotV = clamp(abs(dot(normal, viewDirection)), 0.001, 1.0);
inputs.NdotH = clamp(dot(normal, h), 0.0, 1.0);
inputs.VdotH = clamp(dot(viewDirection, h), 0.0, 1.0);
inputs.NdotNG = clamp(dot(normal, normalGround), -1.0, 1.0);
vec3 reflectedView = normalize(reflect(viewDirection, normal));
inputs.RdotNG = clamp(dot(reflectedView, normalGround), -1.0, 1.0);
inputs.albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
inputs.ssao = ssao;
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);`),a.code.add(o`inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);`),e.useFillLights?a.uniforms.add(new Ra("hasFillLights",(i,r)=>r.enableFillLights)):a.constants.add("hasFillLights","bool",!1),a.code.add(o`vec3 ambientDir = vec3(5.0 * normalGround[1] - normalGround[0] * normalGround[2], - 5.0 * normalGround[0] - normalGround[2] * normalGround[1], normalGround[1] * normalGround[1] + normalGround[0] * normalGround[0]);
ambientDir = ambientDir != vec3(0.0)? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));
inputs.NdotAmbDir = hasFillLights ? abs(dot(normal, ambientDir)) : 1.0;
vec3 mainLightIrradianceComponent = inputs.NdotL * (1.0 - shadow) * lightingMainIntensity;
vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * lightingMainIntensity * fillLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(normal, ssao) + additionalLight;
inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
inputs.groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;`),a.uniforms.add([new P("lightingSpecularStrength",(i,r)=>r.lighting.mainLight.specularStrength),new P("lightingEnvironmentStrength",(i,r)=>r.lighting.mainLight.environmentStrength)]),a.code.add(o`vec3 horizonRingDir = inputs.RdotNG * normalGround - reflectedView;
vec3 horizonRingH = normalize(viewDirection + horizonRingDir);
inputs.NdotH_Horizon = dot(normal, horizonRingH);
vec3 mainLightRadianceComponent = lightingSpecularStrength * normalDistribution(inputs.NdotH, inputs.roughness) * lightingMainIntensity * (1.0 - shadow);
vec3 horizonLightRadianceComponent = lightingEnvironmentStrength * normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * lightingMainIntensity * fillLightIntensity;
vec3 ambientLightRadianceComponent = lightingEnvironmentStrength * calculateAmbientRadiance(ssao) + additionalLight;
inputs.skyRadianceToSurface = ambientLightRadianceComponent + mainLightRadianceComponent + horizonLightRadianceComponent;
inputs.groundRadianceToSurface = GROUND_REFLECTANCE * (ambientLightRadianceComponent + horizonLightRadianceComponent) + mainLightRadianceComponent;
inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + GROUND_REFLECTANCE[1]);`),a.code.add(o`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 emissionComponent = pow(_emission, vec3(GAMMA_SRGB));
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent + emissionComponent;
        ${e.pbrMode===T.Schematic?o`vec3 outColor = pow(max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`:o`vec3 outColor = pow(blackLevelSoftCompression(outColorLinear, inputs), vec3(INV_GAMMA_SRGB));`}
        return outColor;
      }
    `))}function so(t,e){const a=o`
  /*
  *  ${e.name}
  *  ${e.output===f.Color?"RenderOutput: Color":e.output===f.Depth?"RenderOutput: Depth":e.output===f.Shadow?"RenderOutput: Shadow":e.output===f.Normal?"RenderOutput: Normal":e.output===f.Highlight?"RenderOutput: Highlight":""}
  */
  `;Za()&&(t.fragment.code.add(a),t.vertex.code.add(a))}function Ce(t){t.include(Ea),t.code.add(o`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${o.int(O.Multiply)}) {
        return allMixed;
      }
      if (mode == ${o.int(O.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${o.int(O.Replace)}) {
        return externalColor;
      }

      // tint (or something invalid)
      float vIn = rgb2v(internalMixed);
      vec3 hsvTint = rgb2hsv(externalColor);
      vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
      return hsv2rgb(hsvOut);
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${o.int(O.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${o.int(O.Replace)}) {
        return externalOpacity;
      }

      // multiply or tint (or something invalid)
      return allMixed;
    }
  `)}function lo(t){const e=new st,a=e.vertex.code,i=e.fragment.code;e.include(so,{name:"Default Material Shader",output:t.output});const r=te(e,t);return e.include(lt),e.varyings.add("vpos","vec3"),e.include(ie,t),e.include(bt,t),e.include(ct,t),t.output!==f.Color&&t.output!==f.Alpha||(xe(e.vertex,t),e.include(Ne,t),e.include(ae,{linearDepth:!1,hasModelTransformation:t.hasModelTransformation}),t.normalType===_.Attribute&&t.offsetBackfaces&&e.include(xt),e.include(ro,t),e.include(nt,t),t.instancedColor&&e.attributes.add(g.INSTANCECOLOR,"vec4"),e.varyings.add("localvpos","vec3"),e.include(oe,t),e.include(dt,t),e.include(yt,t),e.include(ut,t),e.vertex.uniforms.add(new Re("externalColor",n=>n.externalColor)),e.varyings.add("vcolorExt","vec4"),t.hasMultipassTerrain&&e.varyings.add("depth","float"),t.hasModelTransformation&&e.vertex.uniforms.add(new rt("model",n=>m(n.modelTransformation)?n.modelTransformation:Ut)),a.add(o`
      void main(void) {
        forwardNormalizedVertexColor();
        vcolorExt = externalColor;
        ${t.instancedColor?"vcolorExt *= instanceColor;":""}
        vcolorExt *= vvColor();
        vcolorExt *= getSymbolColor();
        forwardColorMixMode();

        if (vcolorExt.a < ${o.float(Le)}) {
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        } else {
          vpos = calculateVPos();
          localvpos = vpos - view[3].xyz;
          vpos = subtractOrigin(vpos);
          ${t.normalType===_.Attribute?o`vNormalWorld = dpNormal(vvLocalNormal(normalModel()));`:""}
          vpos = addVerticalOffset(vpos, localOrigin);
          ${t.hasVertexTangents?"vTangent = dpTransformVertexTangent(tangent);":""}
          gl_Position = transformPosition(proj, view, ${t.hasModelTransformation?"model,":""} vpos);
          ${t.normalType===_.Attribute&&t.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
        }

        ${t.hasMultipassTerrain?"depth = (view * vec4(vpos, 1.0)).z;":""}
        forwardLinearDepth();
        forwardTextureCoordinates();
      }
    `)),t.output===f.Alpha&&(e.include(Q,t),e.include(Y,t),e.include(be,t),e.fragment.uniforms.add([new P("opacity",n=>n.opacity),new P("layerOpacity",n=>n.layerOpacity)]),t.hasColorTexture&&e.fragment.uniforms.add(new q("tex",n=>n.texture)),e.fragment.include(Ce),i.add(o`
      void main() {
        discardBySlice(vpos);
        ${t.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}
        ${t.hasColorTexture?o`
                vec4 texColor = texture2D(tex, vuv0);
                ${t.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:o`vec4 texColor = vec4(1.0);`}
        ${t.hasVertexColors?o`float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:o`float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        gl_FragColor = vec4(opacity_);
      }
    `)),t.output===f.Color&&(e.include(Q,t),e.include(Tt,t),e.include(_e,t),e.include(Y,t),e.include(t.instancedDoublePrecision?pt:mt,t),e.include(be,t),xe(e.fragment,t),e.fragment.uniforms.add([r,new B("ambient",n=>n.ambient),new B("diffuse",n=>n.diffuse),new P("opacity",n=>n.opacity),new P("layerOpacity",n=>n.layerOpacity),new P("lightingGlobalFactor",(n,h)=>h.lighting.globalFactor),new B("lightingMainIntensity",(n,h)=>h.lighting.mainLight.intensity)]),e.fragment.constants.add("ambientBoostFactor","float",De),t.hasColorTexture&&e.fragment.uniforms.add(new q("tex",n=>n.texture)),e.include(ht,t),e.include(Ee,t),e.fragment.include(Ce),e.include(ka,t),i.add(o`
      void main() {
        discardBySlice(vpos);
        ${t.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}
        ${t.hasColorTexture?o`
                vec4 texColor = texture2D(tex, vuv0);
                ${t.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:o`vec4 texColor = vec4(1.0);`}
        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        ${t.normalType===_.ScreenDerivative?o`
                vec3 normal = screenDerivativeNormal(localvpos);`:o`
                shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
        ${t.pbrMode===T.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        ${t.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":t.spherical?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${t.hasVertexColors?o`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:o`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${t.hasNormalTexture?o`
                mat3 tangentSpace = ${t.hasVertexTangents?"computeTangentSpace(normal);":"computeTangentSpace(normal, vpos, vuv0);"}
                vec3 shadingNormal = computeTextureNormal(tangentSpace, vuv0);`:o`vec3 shadingNormal = normal;`}
        vec3 normalGround = ${t.spherical?o`normalize(vpos + localOrigin);`:o`vec3(0.0, 0.0, 1.0);`}

        ${t.snowCover?o`
                float snow = smoothstep(0.5, 0.55, dot(normal, normalGround));
                albedo = mix(albedo, vec3(1), snow);
                shadingNormal = mix(shadingNormal, normal, snow);
                ssao = mix(ssao, 1.0, snow);`:""}

        vec3 additionalLight = ssao * lightingMainIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

        ${t.pbrMode===T.Normal||t.pbrMode===T.Schematic?o`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * lightingMainIntensity[2];
                ${t.snowCover?o`
                        mrr = mix(mrr, vec3(0.0, 1.0, 0.04), snow);
                        emission = mix(emission, vec3(0.0), snow);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:o`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        gl_FragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${t.transparencyPassType===Z.Color?o`gl_FragColor = premultiplyAlpha(gl_FragColor);`:""}
      }
    `)),e.include(Ct,t),e}const co=Object.freeze(Object.defineProperty({__proto__:null,build:lo},Symbol.toStringTag,{value:"Module"}));class uo extends _a{constructor(){super(...arguments),this.isSchematic=!1,this.usePBR=!1,this.mrrFactors=ee(0,1,.5),this.hasVertexColors=!1,this.hasSymbolColors=!1,this.doubleSided=!1,this.doubleSidedType="normal",this.cullFace=W.Back,this.emissiveFactor=ee(0,0,0),this.instancedDoublePrecision=!1,this.normals="default",this.receiveSSAO=!0,this.receiveShadows=!0,this.castShadows=!0,this.shadowMappingEnabled=!1,this.ambient=ee(.2,.2,.2),this.diffuse=ee(.8,.8,.8),this.externalColor=Et(1,1,1,1),this.colorMixMode="multiply",this.opacity=1,this.layerOpacity=1,this.origin=E(),this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.offsetTransparentBackfaces=!1,this.vvSizeEnabled=!1,this.vvSizeMinSize=[1,1,1],this.vvSizeMaxSize=[100,100,100],this.vvSizeOffset=[0,0,0],this.vvSizeFactor=[1,1,1],this.vvSizeValue=[1,1,1],this.vvColorEnabled=!1,this.vvColorValues=[0,0,0,0,0,0,0,0],this.vvColorColors=[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],this.vvSymbolAnchor=[0,0,0],this.vvSymbolRotationMatrix=it(),this.vvOpacityEnabled=!1,this.vvOpacityValues=[],this.vvOpacityOpacities=[],this.transparent=!1,this.writeDepth=!0,this.customDepthTest=ne.Less,this.textureAlphaMode=w.Blend,this.textureAlphaCutoff=Ia,this.textureAlphaPremultiplied=!1,this.hasOccludees=!1,this.renderOccluded=Fa.Occlude}}class ko extends Da{constructor(){super(...arguments),this.origin=E(),this.slicePlaneLocalOrigin=this.origin}}class se extends za{initializeConfiguration(e,a){a.spherical=e.viewingMode===Se.Global,a.doublePrecisionRequiresObfuscation=Va(e.rctx),a.textureCoordinateType=a.hasColorTexture||a.hasMetalnessAndRoughnessTexture||a.hasEmissionTexture||a.hasOcclusionTexture||a.hasNormalTexture?re.Default:re.None}initializeProgram(e){return this._initializeProgram(e,se.shader)}_initializeProgram(e,a){const i=a.get().build(this.configuration);return new Ga(e.rctx,i,qa)}_convertDepthTestFunction(e){return e===ne.Lequal?Qe.LEQUAL:Qe.LESS}_setPipeline(e,a){const i=this.configuration,r=e===Z.NONE,n=e===Z.FrontFace;return ca({blending:i.output!==f.Color&&i.output!==f.Alpha||!i.transparent?null:r?da:ua(e),culling:po(i)&&pa(i.cullFace),depthTest:{func:ma(e,this._convertDepthTestFunction(i.customDepthTest))},depthWrite:r||n?i.writeDepth&&ha:null,colorWrite:va,stencilWrite:i.hasOccludees?Ba:null,stencilTest:i.hasOccludees?a?Wa:Ua:null,polygonOffset:r||n?null:ga(i.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this._setPipeline(this.configuration.transparencyPassType,!0),this._setPipeline(this.configuration.transparencyPassType,!1)}getPipelineState(e,a){return a?this._occludeePipelineState:super.getPipelineState(e,a)}}function po(t){return t.cullFace!==W.None||!t.hasSlicePlane&&!t.transparent&&!t.doubleSidedMode}se.shader=new vt(co,()=>Ke(()=>import("./DefaultMaterial.glsl.bcf938ab.js"),["assets/DefaultMaterial.glsl.bcf938ab.js","assets/mat4f64.84d5c445.js","assets/Matrix4Uniform.b7dc351c.js","assets/index.9da382e4.js","assets/index.313b6d72.css","assets/enums.de935fa5.js","assets/Texture.599541db.js","assets/requestImageUtils.4ea1aefd.js","assets/geometryDataUtils.337d3a34.js","assets/triangle.70405bec.js","assets/vectorStacks.f85d4a03.js","assets/quatf64.ddec7ef6.js","assets/lineSegment.901d4e43.js","assets/VertexAttribute.5551e0d8.js","assets/VertexArrayObject.4198c73f.js","assets/VertexElementDescriptor.d386088d.js","assets/BufferView.9de22bcf.js","assets/quat.2f83a288.js","assets/vec3f32.0772c8d8.js","assets/sphere.f1597b20.js","assets/devEnvironmentUtils.8c6e6b72.js","assets/vec33.3d48e3ad.js","assets/DefaultMaterial_COLOR_GAMMA.bcf83e8a.js","assets/types.28f12cac.js","assets/InterleavedLayout.e9290885.js"]));class c extends Ha{constructor(){super(...arguments),this.output=f.Color,this.alphaDiscardMode=w.Opaque,this.doubleSidedMode=L.None,this.pbrMode=T.Disabled,this.cullFace=W.None,this.transparencyPassType=Z.NONE,this.normalType=_.Attribute,this.textureCoordinateType=re.None,this.customDepthTest=ne.Less,this.spherical=!1,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.hasVerticalOffset=!1,this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.hasColorTexture=!1,this.hasMetalnessAndRoughnessTexture=!1,this.hasEmissionTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.hasScreenSizePerspective=!1,this.hasVertexTangents=!1,this.hasOccludees=!1,this.hasMultipassTerrain=!1,this.hasModelTransformation=!1,this.offsetBackfaces=!1,this.vvSize=!1,this.vvColor=!1,this.receiveShadows=!1,this.receiveAmbientOcclusion=!1,this.textureAlphaPremultiplied=!1,this.instanced=!1,this.instancedColor=!1,this.instancedDoublePrecision=!1,this.doublePrecisionRequiresObfuscation=!1,this.writeDepth=!0,this.transparent=!1,this.enableOffset=!0,this.cullAboveGround=!1,this.snowCover=!1}}d([u({count:f.COUNT})],c.prototype,"output",void 0),d([u({count:w.COUNT})],c.prototype,"alphaDiscardMode",void 0),d([u({count:L.COUNT})],c.prototype,"doubleSidedMode",void 0),d([u({count:T.COUNT})],c.prototype,"pbrMode",void 0),d([u({count:W.COUNT})],c.prototype,"cullFace",void 0),d([u({count:Z.COUNT})],c.prototype,"transparencyPassType",void 0),d([u({count:_.COUNT})],c.prototype,"normalType",void 0),d([u({count:re.COUNT})],c.prototype,"textureCoordinateType",void 0),d([u({count:ne.COUNT})],c.prototype,"customDepthTest",void 0),d([u()],c.prototype,"spherical",void 0),d([u()],c.prototype,"hasVertexColors",void 0),d([u()],c.prototype,"hasSymbolColors",void 0),d([u()],c.prototype,"hasVerticalOffset",void 0),d([u()],c.prototype,"hasSlicePlane",void 0),d([u()],c.prototype,"hasSliceHighlight",void 0),d([u()],c.prototype,"hasColorTexture",void 0),d([u()],c.prototype,"hasMetalnessAndRoughnessTexture",void 0),d([u()],c.prototype,"hasEmissionTexture",void 0),d([u()],c.prototype,"hasOcclusionTexture",void 0),d([u()],c.prototype,"hasNormalTexture",void 0),d([u()],c.prototype,"hasScreenSizePerspective",void 0),d([u()],c.prototype,"hasVertexTangents",void 0),d([u()],c.prototype,"hasOccludees",void 0),d([u()],c.prototype,"hasMultipassTerrain",void 0),d([u()],c.prototype,"hasModelTransformation",void 0),d([u()],c.prototype,"offsetBackfaces",void 0),d([u()],c.prototype,"vvSize",void 0),d([u()],c.prototype,"vvColor",void 0),d([u()],c.prototype,"receiveShadows",void 0),d([u()],c.prototype,"receiveAmbientOcclusion",void 0),d([u()],c.prototype,"textureAlphaPremultiplied",void 0),d([u()],c.prototype,"instanced",void 0),d([u()],c.prototype,"instancedColor",void 0),d([u()],c.prototype,"instancedDoublePrecision",void 0),d([u()],c.prototype,"doublePrecisionRequiresObfuscation",void 0),d([u()],c.prototype,"writeDepth",void 0),d([u()],c.prototype,"transparent",void 0),d([u()],c.prototype,"enableOffset",void 0),d([u()],c.prototype,"cullAboveGround",void 0),d([u()],c.prototype,"snowCover",void 0),d([u({constValue:!0})],c.prototype,"hasVvInstancing",void 0),d([u({constValue:!1})],c.prototype,"useCustomDTRExponentForWater",void 0),d([u({constValue:!1})],c.prototype,"supportsTextureAtlas",void 0),d([u({constValue:!0})],c.prototype,"useFillLights",void 0);function mo(t){const e=new st,a=e.vertex.code,i=e.fragment.code,r=te(e,t);return e.include(lt),e.varyings.add("vpos","vec3"),e.include(ie,t),e.include(bt,t),e.include(ct,t),t.output!==f.Color&&t.output!==f.Alpha||(xe(e.vertex,t),e.include(Ne,t),e.include(ae),t.offsetBackfaces&&e.include(xt),t.instancedColor&&e.attributes.add(g.INSTANCECOLOR,"vec4"),e.varyings.add("vNormalWorld","vec3"),e.varyings.add("localvpos","vec3"),t.hasMultipassTerrain&&e.varyings.add("depth","float"),e.include(oe,t),e.include(dt,t),e.include(yt,t),e.include(ut,t),e.vertex.uniforms.add(new Re("externalColor",n=>n.externalColor)),e.varyings.add("vcolorExt","vec4"),a.add(o`
        void main(void) {
          forwardNormalizedVertexColor();
          vcolorExt = externalColor;
          ${t.instancedColor?"vcolorExt *= instanceColor;":""}
          vcolorExt *= vvColor();
          vcolorExt *= getSymbolColor();
          forwardColorMixMode();

          if (vcolorExt.a < ${o.float(Le)}) {
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          } else {
            vpos = calculateVPos();
            localvpos = vpos - view[3].xyz;
            vpos = subtractOrigin(vpos);
            vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            ${t.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
          }
          ${t.hasMultipassTerrain?o`depth = (view * vec4(vpos, 1.0)).z;`:""}
          forwardLinearDepth();
          forwardTextureCoordinates();
        }
      `)),t.output===f.Alpha&&(e.include(Q,t),e.include(Y,t),e.include(be,t),e.fragment.uniforms.add([new P("opacity",n=>n.opacity),new P("layerOpacity",n=>n.layerOpacity),new je("view")]),t.hasColorTexture&&e.fragment.uniforms.add(new q("tex",n=>n.texture)),e.fragment.include(Ce),i.add(o`
      void main() {
        discardBySlice(vpos);
        ${t.hasMultipassTerrain?o`terrainDepthTest(gl_FragCoord, depth);`:""}
        ${t.hasColorTexture?o`
                vec4 texColor = texture2D(tex, vuv0);
                ${t.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:o`vec4 texColor = vec4(1.0);`}
        ${t.hasVertexColors?o`float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:o`float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}

        gl_FragColor = vec4(opacity_);
      }
    `)),t.output===f.Color&&(e.include(Q,t),e.include(Tt,t),e.include(_e,t),e.include(Y,t),e.include(t.instancedDoublePrecision?pt:mt,t),e.include(be,t),xe(e.fragment,t),e.fragment.uniforms.add([r,new B("ambient",n=>n.ambient),new B("diffuse",n=>n.diffuse),new P("opacity",n=>n.opacity),new P("layerOpacity",n=>n.layerOpacity),new je("view"),new P("lightingGlobalFactor",(n,h)=>h.lighting.globalFactor),new B("lightingMainIntensity",(n,h)=>h.lighting.mainLight.intensity)]),e.fragment.constants.add("ambientBoostFactor","float",De),t.hasColorTexture&&e.fragment.uniforms.add(new q("tex",n=>n.texture)),e.include(ht,t),e.include(Ee,t),e.fragment.include(Ce),e.extensions.add("GL_OES_standard_derivatives"),i.add(o`
      void main() {
        discardBySlice(vpos);
        ${t.hasMultipassTerrain?o`terrainDepthTest(gl_FragCoord, depth);`:""}
        ${t.hasColorTexture?o`
                vec4 texColor = texture2D(tex, vuv0);
                ${t.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:o`vec4 texColor = vec4(1.0);`}
        vec3 viewDirection = normalize(vpos - cameraPosition);
        ${t.pbrMode===T.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        vec3 additionalLight = ssao * lightingMainIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${t.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":t.spherical?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${t.hasVertexColors?o`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:o`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${t.snowCover?o`albedo = mix(albedo, vec3(1), 0.9);`:o``}
        ${o`
            vec3 shadingNormal = normalize(vNormalWorld);
            albedo *= 1.2;
            vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
            float alignmentLightView = clamp(dot(viewForward, -lightingMainDirection), 0.0, 1.0);
            float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
            float treeRadialFalloff = vColor.r;
            float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
            additionalLight += backLightFactor * lightingMainIntensity;`}
        ${t.pbrMode===T.Normal||t.pbrMode===T.Schematic?t.spherical?o`vec3 normalGround = normalize(vpos + localOrigin);`:o`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:o``}
        ${t.pbrMode===T.Normal||t.pbrMode===T.Schematic?o`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * lightingMainIntensity[2];
                ${t.snowCover?o`
                        mrr = vec3(0.0, 1.0, 0.04);
                        emission = vec3(0.0);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:o`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        gl_FragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${t.transparencyPassType===Z.Color?o`gl_FragColor = premultiplyAlpha(gl_FragColor);`:o``}
      }
    `)),e.include(Ct,t),e}const ho=Object.freeze(Object.defineProperty({__proto__:null,build:mo},Symbol.toStringTag,{value:"Module"}));class Te extends se{initializeConfiguration(e,a){super.initializeConfiguration(e,a),a.hasMetalnessAndRoughnessTexture=!1,a.hasEmissionTexture=!1,a.hasOcclusionTexture=!1,a.hasNormalTexture=!1,a.hasModelTransformation=!1,a.normalType=_.Attribute,a.doubleSidedMode=L.WindingOrder,a.hasVertexTangents=!1}initializeProgram(e){return this._initializeProgram(e,Te.shader)}}Te.shader=new vt(ho,()=>Ke(()=>import("./RealisticTree.glsl.e3638cdd.js"),["assets/RealisticTree.glsl.e3638cdd.js","assets/Matrix4Uniform.b7dc351c.js","assets/index.9da382e4.js","assets/index.313b6d72.css","assets/enums.de935fa5.js","assets/Texture.599541db.js","assets/requestImageUtils.4ea1aefd.js","assets/geometryDataUtils.337d3a34.js","assets/triangle.70405bec.js","assets/vectorStacks.f85d4a03.js","assets/quatf64.ddec7ef6.js","assets/mat4f64.84d5c445.js","assets/lineSegment.901d4e43.js","assets/VertexAttribute.5551e0d8.js","assets/VertexArrayObject.4198c73f.js","assets/VertexElementDescriptor.d386088d.js","assets/BufferView.9de22bcf.js","assets/quat.2f83a288.js","assets/vec3f32.0772c8d8.js","assets/sphere.f1597b20.js","assets/devEnvironmentUtils.8c6e6b72.js","assets/vec33.3d48e3ad.js","assets/DefaultMaterial_COLOR_GAMMA.bcf83e8a.js","assets/types.28f12cac.js","assets/InterleavedLayout.e9290885.js"]));class wt extends ja{constructor(e){super(e,fo),this.supportsEdges=!0,this.techniqueConfig=new c,this.vertexBufferLayout=bo(this.parameters),this.instanceBufferLayout=e.instanced?yo(this.parameters):null}isVisibleInPass(e){return e!==Me.MATERIAL_DEPTH_SHADOWMAP_ALL&&e!==Me.MATERIAL_DEPTH_SHADOWMAP_DEFAULT&&e!==Me.MATERIAL_DEPTH_SHADOWMAP_HIGHLIGHT||this.parameters.castShadows}isVisible(){const e=this.parameters;if(!super.isVisible()||e.layerOpacity===0)return!1;const{instanced:a,hasVertexColors:i,hasSymbolColors:r,vvColorEnabled:n}=e,h=m(a)&&a.includes("color"),x=e.colorMixMode==="replace",p=e.opacity>0,b=e.externalColor&&e.externalColor[3]>0;return i&&(h||n||r)?!!x||p:i?x?b:p:h||n||r?!!x||p:x?b:p}getConfiguration(e,a){return this.techniqueConfig.output=e,this.techniqueConfig.hasNormalTexture=!!this.parameters.normalTextureId,this.techniqueConfig.hasColorTexture=!!this.parameters.textureId,this.techniqueConfig.hasVertexTangents=this.parameters.hasVertexTangents,this.techniqueConfig.instanced=!!this.parameters.instanced,this.techniqueConfig.instancedDoublePrecision=this.parameters.instancedDoublePrecision,this.techniqueConfig.vvSize=this.parameters.vvSizeEnabled,this.techniqueConfig.hasVerticalOffset=m(this.parameters.verticalOffset),this.techniqueConfig.hasScreenSizePerspective=m(this.parameters.screenSizePerspective),this.techniqueConfig.hasSlicePlane=this.parameters.hasSlicePlane,this.techniqueConfig.hasSliceHighlight=this.parameters.hasSliceHighlight,this.techniqueConfig.alphaDiscardMode=this.parameters.textureAlphaMode,this.techniqueConfig.normalType=this.parameters.normals==="screenDerivative"?_.ScreenDerivative:_.Attribute,this.techniqueConfig.transparent=this.parameters.transparent,this.techniqueConfig.writeDepth=this.parameters.writeDepth,m(this.parameters.customDepthTest)&&(this.techniqueConfig.customDepthTest=this.parameters.customDepthTest),this.techniqueConfig.hasOccludees=this.parameters.hasOccludees,this.techniqueConfig.cullFace=this.parameters.hasSlicePlane?W.None:this.parameters.cullFace,this.techniqueConfig.hasMultipassTerrain=a.multipassTerrain.enabled,this.techniqueConfig.cullAboveGround=a.multipassTerrain.cullAboveGround,this.techniqueConfig.hasModelTransformation=m(this.parameters.modelTransformation),e!==f.Color&&e!==f.Alpha||(this.techniqueConfig.hasVertexColors=this.parameters.hasVertexColors,this.techniqueConfig.hasSymbolColors=this.parameters.hasSymbolColors,this.parameters.treeRendering?this.techniqueConfig.doubleSidedMode=L.WindingOrder:this.techniqueConfig.doubleSidedMode=this.parameters.doubleSided&&this.parameters.doubleSidedType==="normal"?L.View:this.parameters.doubleSided&&this.parameters.doubleSidedType==="winding-order"?L.WindingOrder:L.None,this.techniqueConfig.instancedColor=m(this.parameters.instanced)&&this.parameters.instanced.includes("color"),this.techniqueConfig.receiveShadows=this.parameters.receiveShadows&&this.parameters.shadowMappingEnabled,this.techniqueConfig.receiveAmbientOcclusion=!!a.ssaoHelper.ready&&this.parameters.receiveSSAO,this.techniqueConfig.vvColor=this.parameters.vvColorEnabled,this.techniqueConfig.textureAlphaPremultiplied=!!this.parameters.textureAlphaPremultiplied,this.techniqueConfig.pbrMode=this.parameters.usePBR?this.parameters.isSchematic?T.Schematic:T.Normal:T.Disabled,this.techniqueConfig.hasMetalnessAndRoughnessTexture=!!this.parameters.metallicRoughnessTextureId,this.techniqueConfig.hasEmissionTexture=!!this.parameters.emissiveTextureId,this.techniqueConfig.hasOcclusionTexture=!!this.parameters.occlusionTextureId,this.techniqueConfig.offsetBackfaces=!(!this.parameters.transparent||!this.parameters.offsetTransparentBackfaces),this.techniqueConfig.transparencyPassType=a.transparencyPassType,this.techniqueConfig.enableOffset=a.camera.relativeElevation<fa,this.techniqueConfig.snowCover=this.hasSnowCover(a)),this.techniqueConfig}hasSnowCover(e){return m(e.weather)&&e.weatherVisible&&e.weather.type==="snowy"&&e.weather.snowCover==="enabled"}intersect(e,a,i,r,n,h,x){if(m(this.parameters.verticalOffset)){const p=r.camera;ge(Ae,i[12],i[13],i[14]);let b=null;switch(r.viewingMode){case Se.Global:b=Ze(Je,Ae);break;case Se.Local:b=Dt(Je,wo)}let C=0;const y=me(Mo,Ae,p.eye),l=ke(y),N=Ie(y,y,1/l);let s=null;this.parameters.screenSizePerspective&&(s=_t(b,N)),C+=Qa(p,l,this.parameters.verticalOffset,s,this.parameters.screenSizePerspective),Ie(b,b,C),It($e,b,r.transform.inverseRotation),n=me(Co,n,$e),h=me(To,h,$e)}Ya(e,a,r,n,h,Ja(r.verticalOffset),x)}requiresSlot(e){return e===(this.parameters.transparent?this.parameters.writeDepth?ue.TRANSPARENT_MATERIAL:ue.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL:ue.OPAQUE_MATERIAL)||e===ue.DRAPED_MATERIAL}createGLMaterial(e){return e.output===f.Color||e.output===f.Alpha||e.output===f.Depth||e.output===f.Normal||e.output===f.Shadow||e.output===f.Highlight?new vo(e):null}createBufferWriter(){return new xo(this.vertexBufferLayout,this.instanceBufferLayout)}}class vo extends Xa{constructor(e){super({...e,...e.material.parameters})}_updateParameters(e){const a=this._material.parameters;this.updateTexture(a.textureId);const i=e.camera.viewInverseTransposeMatrix;return ge(a.origin,i[3],i[7],i[11]),this._material.setParameters(this.textureBindParameters),this.ensureTechnique(a.treeRendering?Te:se,e)}_updateShadowState(e){e.shadowMap.enabled!==this._material.parameters.shadowMappingEnabled&&this._material.setParameters({shadowMappingEnabled:e.shadowMap.enabled})}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.hasOccludees&&this._material.setParameters({hasOccludees:e.hasOccludees})}beginSlot(e){return this._output!==f.Color&&this._output!==f.Alpha||(this._updateShadowState(e),this._updateOccludeeState(e)),this._updateParameters(e)}}class go extends uo{constructor(){super(...arguments),this.initTextureTransparent=!1,this.treeRendering=!1,this.hasVertexTangents=!1}}const fo=new go;class xo{constructor(e,a){this.vertexBufferLayout=e,this.instanceBufferLayout=a}allocate(e){return this.vertexBufferLayout.createBuffer(e)}elementCount(e){return e.indices.get(g.POSITION).length}write(e,a,i,r){Ka(a,this.vertexBufferLayout,e.transformation,e.invTranspTransformation,i,r)}}function bo(t){const e=t.textureId||t.normalTextureId||t.metallicRoughnessTextureId||t.emissiveTextureId||t.occlusionTextureId,a=ft().vec3f(g.POSITION).vec3f(g.NORMAL);return t.hasVertexTangents&&a.vec4f(g.TANGENT),e&&a.vec2f(g.UV0),t.hasVertexColors&&a.vec4u8(g.COLOR),t.hasSymbolColors&&a.vec4u8(g.SYMBOLCOLOR),a}function yo(t){let e=ft();return e=t.instancedDoublePrecision?e.vec3f(g.MODELORIGINHI).vec3f(g.MODELORIGINLO).mat3f(g.MODEL).mat3f(g.MODELNORMAL):e.mat4f(g.MODEL).mat4f(g.MODELNORMAL),m(t.instanced)&&t.instanced.includes("color")&&(e=e.vec4f(g.INSTANCECOLOR)),m(t.instanced)&&t.instanced.includes("featureAttribute")&&(e=e.vec4f(g.INSTANCEFEATUREATTRIBUTE)),e}const Co=E(),To=E(),wo=ee(0,0,1),Je=E(),$e=E(),Ae=E(),Mo=E(),z=Ft.getLogger("esri.views.3d.layers.graphics.objectResourceUtils");async function Oo(t,e){const a=await $o(t,e);return{resource:a,textures:await No(a.textureDefinitions,e)}}async function $o(t,e){const a=m(e)&&e.streamDataRequester;if(a)return Ao(t,a,e);const i=await tt(zt(t,Vt(e)));if(i.ok===!0)return i.value.data;at(i.error),Mt(i.error)}async function Ao(t,e,a){const i=await tt(e.request(t,"json",a));if(i.ok===!0)return i.value;at(i.error),Mt(i.error.details.url)}function Mt(t){throw new Gt("",`Request for object resource failed: ${t}`)}function So(t){const e=t.params,a=e.topology;let i=!0;switch(e.vertexAttributes||(z.warn("Geometry must specify vertex attributes"),i=!1),e.topology){case"PerAttributeArray":break;case"Indexed":case null:case void 0:{const n=e.faces;if(n){if(e.vertexAttributes)for(const h in e.vertexAttributes){const x=n[h];x&&x.values?(x.valueType!=null&&x.valueType!=="UInt32"&&(z.warn(`Unsupported indexed geometry indices type '${x.valueType}', only UInt32 is currently supported`),i=!1),x.valuesPerElement!=null&&x.valuesPerElement!==1&&(z.warn(`Unsupported indexed geometry values per element '${x.valuesPerElement}', only 1 is currently supported`),i=!1)):(z.warn(`Indexed geometry does not specify face indices for '${h}' attribute`),i=!1)}}else z.warn("Indexed geometries must specify faces"),i=!1;break}default:z.warn(`Unsupported topology '${a}'`),i=!1}t.params.material||(z.warn("Geometry requires material"),i=!1);const r=t.params.vertexAttributes;for(const n in r)r[n].values||(z.warn("Geometries with externally defined attributes are not yet supported"),i=!1);return i}function Po(t,e){const a=[],i=[],r=[],n=[],h=t.resource,x=et.parse(h.version||"1.0","wosr");Eo.validate(x);const p=h.model.name,b=h.model.geometries,C=h.materialDefinitions,y=t.textures;let l=0;const N=new Map;for(let s=0;s<b.length;s++){const A=b[s];if(!So(A))continue;const M=Ro(A),I=A.params.vertexAttributes,V=[];for(const v in I){const $=I[v],F=$.values;V.push([v,{data:F,size:$.valuesPerElement,exclusive:!0}])}const D=[];if(A.params.topology!=="PerAttributeArray"){const v=A.params.faces;for(const $ in v)D.push([$,new Uint32Array(v[$].values)])}const R=y&&y[M.texture];if(R&&!N.has(M.texture)){const{image:v,params:$}=R,F=new K(v,$);n.push(F),N.set(M.texture,F)}const G=N.get(M.texture),U=G?G.id:void 0;let H=r[M.material]?r[M.material][M.texture]:null;if(!H){const v=C[M.material.substring(M.material.lastIndexOf("/")+1)].params;v.transparency===1&&(v.transparency=0);const $=R&&R.alphaChannelUsage,F=v.transparency>0||$==="transparency"||$==="maskAndTransparency",we=R?Ot(R.alphaChannelUsage):void 0,le={ambient:Fe(v.diffuse),diffuse:Fe(v.diffuse),opacity:1-(v.transparency||0),transparent:F,textureAlphaMode:we,textureAlphaCutoff:.33,textureId:U,initTextureTransparent:!0,doubleSided:!0,cullFace:W.None,colorMixMode:v.externalColorMixMode||"tint",textureAlphaPremultiplied:!!R&&!!R.params.preMultiplyAlpha};m(e)&&e.materialParamsMixin&&Object.assign(le,e.materialParamsMixin),H=new wt(le),r[M.material]||(r[M.material]={}),r[M.material][M.texture]=H}i.push(H);const k=new gt(V,D);l+=D.position?D.position.length:0,a.push(k)}return{name:p,stageResources:{textures:n,materials:i,geometries:a},pivotOffset:h.model.pivotOffset,boundingBox:Lo(a),numberOfVertices:l,lodThreshold:null}}function Lo(t){const e=ot();return t.forEach(a=>{const i=a.boundingInfo;m(i)&&(fe(e,i.getBBMin()),fe(e,i.getBBMax()))}),e}async function No(t,e){const a=[];for(const n in t){const h=t[n],x=h.images[0].data;if(!x){z.warn("Externally referenced texture data is not yet supported");continue}const p=h.encoding+";base64,"+x,b="/textureDefinitions/"+n,C=h.channels==="rgba"?h.alphaChannelUsage||"transparency":"none",y={noUnpackFlip:!0,wrap:{s:Ye.REPEAT,t:Ye.REPEAT},preMultiplyAlpha:Ot(C)!==w.Opaque},l=m(e)&&e.disableTextures?Promise.resolve(null):xa(p,e);a.push(l.then(N=>({refId:b,image:N,params:y,alphaChannelUsage:C})))}const i=await Promise.all(a),r={};for(const n of i)r[n.refId]=n;return r}function Ot(t){switch(t){case"mask":return w.Mask;case"maskAndTransparency":return w.MaskBlend;case"none":return w.Opaque;default:return w.Blend}}function Ro(t){const e=t.params;return{id:1,material:e.material,texture:e.texture,region:e.texture}}const Eo=new et(1,2,"wosr");async function Do(t,e){const a=$t(Pt(t));if(a.fileType==="wosr"){const p=await(e.cache?e.cache.loadWOSR(a.url,e):Oo(a.url,e)),b=Po(p,e);return{lods:[b],referenceBoundingBox:b.boundingBox,isEsriSymbolResource:!1,isWosr:!0,remove:p.remove}}const i=await(e.cache?e.cache.loadGLTF(a.url,e,e.usePBR):Zt(new kt(e.streamDataRequester),a.url,e,e.usePBR)),r=qt(i.model.meta,"ESRI_proxyEllipsoid");i.meta.isEsriSymbolResource&&m(r)&&i.meta.uri.includes("/RealisticTrees/")&&Fo(i,r);const n=i.meta.isEsriSymbolResource?{usePBR:e.usePBR,isSchematic:!1,treeRendering:!!i.customMeta.esriTreeRendering,mrrFactors:[0,1,.2]}:{usePBR:e.usePBR,isSchematic:!1,treeRendering:!1,mrrFactors:[0,1,.5]},h={...e.materialParamsMixin,treeRendering:!!i.customMeta.esriTreeRendering};if(a.specifiedLodIndex!=null){const p=ve(i,n,h,a.specifiedLodIndex);let b=p[0].boundingBox;return a.specifiedLodIndex!==0&&(b=ve(i,n,h,0)[0].boundingBox),{lods:p,referenceBoundingBox:b,isEsriSymbolResource:i.meta.isEsriSymbolResource,isWosr:!1,remove:i.remove}}const x=ve(i,n,h);return{lods:x,referenceBoundingBox:x[0].boundingBox,isEsriSymbolResource:i.meta.isEsriSymbolResource,isWosr:!1,remove:i.remove}}function $t(t){const e=t.match(/(.*\.(gltf|glb))(\?lod=([0-9]+))?$/);return e?{fileType:"gltf",url:e[1],specifiedLodIndex:e[4]!=null?Number(e[4]):null}:t.match(/(.*\.(json|json\.gz))$/)?{fileType:"wosr",url:t,specifiedLodIndex:null}:{fileType:"unknown",url:t,specifiedLodIndex:null}}function ve(t,e,a,i){const r=t.model,n=it(),h=new Array,x=new Map,p=new Map;return r.lods.forEach((b,C)=>{if(i!==void 0&&C!==i)return;const y={name:b.name,stageResources:{textures:new Array,materials:new Array,geometries:new Array},lodThreshold:m(b.lodThreshold)?b.lodThreshold:null,pivotOffset:[0,0,0],numberOfVertices:0,boundingBox:ot()};h.push(y),b.parts.forEach(l=>{const N=l.material+(l.attributes.normal?"_normal":"")+(l.attributes.color?"_color":"")+(l.attributes.texCoord0?"_texCoord0":"")+(l.attributes.tangent?"_tangent":""),s=r.materials.get(l.material),A=m(l.attributes.texCoord0),M=m(l.attributes.normal),I=_o(s.alphaMode);if(!x.has(N)){if(A){if(m(s.textureColor)&&!p.has(s.textureColor)){const S=r.textures.get(s.textureColor),St={...S.parameters,preMultiplyAlpha:I!==w.Opaque};p.set(s.textureColor,new K(S.data,St))}if(m(s.textureNormal)&&!p.has(s.textureNormal)){const S=r.textures.get(s.textureNormal);p.set(s.textureNormal,new K(S.data,S.parameters))}if(m(s.textureOcclusion)&&!p.has(s.textureOcclusion)){const S=r.textures.get(s.textureOcclusion);p.set(s.textureOcclusion,new K(S.data,S.parameters))}if(m(s.textureEmissive)&&!p.has(s.textureEmissive)){const S=r.textures.get(s.textureEmissive);p.set(s.textureEmissive,new K(S.data,S.parameters))}if(m(s.textureMetallicRoughness)&&!p.has(s.textureMetallicRoughness)){const S=r.textures.get(s.textureMetallicRoughness);p.set(s.textureMetallicRoughness,new K(S.data,S.parameters))}}const v=s.color[0]**(1/J),$=s.color[1]**(1/J),F=s.color[2]**(1/J),we=s.emissiveFactor[0]**(1/J),le=s.emissiveFactor[1]**(1/J),At=s.emissiveFactor[2]**(1/J),ce=m(s.textureColor)&&A?p.get(s.textureColor):null;x.set(N,new wt({...e,transparent:I===w.Blend,customDepthTest:ne.Lequal,textureAlphaMode:I,textureAlphaCutoff:s.alphaCutoff,diffuse:[v,$,F],ambient:[v,$,F],opacity:s.opacity,doubleSided:s.doubleSided,doubleSidedType:"winding-order",cullFace:s.doubleSided?W.None:W.Back,hasVertexColors:!!l.attributes.color,hasVertexTangents:!!l.attributes.tangent,normals:M?"default":"screenDerivative",castShadows:!0,receiveSSAO:!0,textureId:m(ce)?ce.id:void 0,colorMixMode:s.colorMixMode,normalTextureId:m(s.textureNormal)&&A?p.get(s.textureNormal).id:void 0,textureAlphaPremultiplied:m(ce)&&!!ce.params.preMultiplyAlpha,occlusionTextureId:m(s.textureOcclusion)&&A?p.get(s.textureOcclusion).id:void 0,emissiveTextureId:m(s.textureEmissive)&&A?p.get(s.textureEmissive).id:void 0,metallicRoughnessTextureId:m(s.textureMetallicRoughness)&&A?p.get(s.textureMetallicRoughness).id:void 0,emissiveFactor:[we,le,At],mrrFactors:[s.metallicFactor,s.roughnessFactor,e.mrrFactors[2]],isSchematic:!1,...a}))}const V=Io(l.indices||l.attributes.position.count,l.primitiveType),D=l.attributes.position.count,R=j(he,D);Jt(R,l.attributes.position,l.transform);const G=[[g.POSITION,{data:R.typedBuffer,size:R.elementCount,exclusive:!0}]],U=[[g.POSITION,V]];if(m(l.attributes.normal)){const v=j(he,D);ze(n,l.transform),Xt(v,l.attributes.normal,n),G.push([g.NORMAL,{data:v.typedBuffer,size:v.elementCount,exclusive:!0}]),U.push([g.NORMAL,V])}if(m(l.attributes.tangent)){const v=j(qe,D);ze(n,l.transform),ea(v,l.attributes.tangent,n),G.push([g.TANGENT,{data:v.typedBuffer,size:v.elementCount,exclusive:!0}]),U.push([g.TANGENT,V])}if(m(l.attributes.texCoord0)){const v=j(jt,D);ta(v,l.attributes.texCoord0),G.push([g.UV0,{data:v.typedBuffer,size:v.elementCount,exclusive:!0}]),U.push([g.UV0,V])}if(m(l.attributes.color)){const v=j(Pe,D);if(l.attributes.color.elementCount===4)l.attributes.color instanceof qe?Ue(v,l.attributes.color,255):l.attributes.color instanceof Pe?aa(v,l.attributes.color):l.attributes.color instanceof Qt&&Ue(v,l.attributes.color,1/256);else{oa(v,255,255,255,255);const $=new Be(v.buffer,0,4);l.attributes.color instanceof he?We($,l.attributes.color,255):l.attributes.color instanceof Be?Kt($,l.attributes.color):l.attributes.color instanceof Yt&&We($,l.attributes.color,1/256)}G.push([g.COLOR,{data:v.typedBuffer,size:v.elementCount,exclusive:!0}]),U.push([g.COLOR,V])}const H=new gt(G,U);y.stageResources.geometries.push(H),y.stageResources.materials.push(x.get(N)),A&&(m(s.textureColor)&&y.stageResources.textures.push(p.get(s.textureColor)),m(s.textureNormal)&&y.stageResources.textures.push(p.get(s.textureNormal)),m(s.textureOcclusion)&&y.stageResources.textures.push(p.get(s.textureOcclusion)),m(s.textureEmissive)&&y.stageResources.textures.push(p.get(s.textureEmissive)),m(s.textureMetallicRoughness)&&y.stageResources.textures.push(p.get(s.textureMetallicRoughness))),y.numberOfVertices+=D;const k=H.boundingInfo;m(k)&&(fe(y.boundingBox,k.getBBMin()),fe(y.boundingBox,k.getBBMax()))})}),h}function _o(t){switch(t){case"BLEND":return w.Blend;case"MASK":return w.Mask;case"OPAQUE":case null:case void 0:return w.Opaque}}function Io(t,e){switch(e){case Oe.TRIANGLES:return na(t);case Oe.TRIANGLE_STRIP:return ra(t);case Oe.TRIANGLE_FAN:return ia(t)}}function Fo(t,e){for(let a=0;a<t.model.lods.length;++a){const i=t.model.lods[a];t.customMeta.esriTreeRendering=!0;for(const r of i.parts){const n=r.attributes.normal;if(Xe(n))return;const h=r.attributes.position,x=h.count,p=E(),b=E(),C=E(),y=j(Pe,x),l=j(he,x),N=Bt(Ht(),r.transform);for(let s=0;s<x;s++){h.getVec(s,b),n.getVec(s,p),Ve(b,b,r.transform),me(C,b,e.center),Ge(C,C,e.radius);const A=C[2],M=ke(C),I=Math.min(.45+.55*M*M,1);Ge(C,C,e.radius),Ve(C,C,N),Ze(C,C),a+1!==t.model.lods.length&&t.model.lods.length>1&&Wt(C,C,p,A>-1?.2:Math.min(-4*A-3.8,1)),l.setVec(s,C),y.set(s,0,255*I),y.set(s,1,255*I),y.set(s,2,255*I),y.set(s,3,255)}r.attributes.normal=l,r.attributes.color=y}}}const ei=Object.freeze(Object.defineProperty({__proto__:null,fetch:Do,gltfToEngineResources:ve,parseUrl:$t},Symbol.toStringTag,{value:"Module"}));export{yo as B,Do as J,wt as R,ko as _,_e as a,mo as b,ei as c,ka as e,L as i,lo as k,Tt as m,Ko as n,Zo as o};
