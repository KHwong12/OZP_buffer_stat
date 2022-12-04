import{ao as Nt,gC as si,h as z,e as O,aA as ai,cO as ni,bd as oi,a6 as li,s as ci,h7 as qi,hj as Xi,g0 as di,fA as mt,g5 as ui,gA as ft,eV as ji,fL as U,hr as Ki,hs as Yi,aF as de,dk as Zi,dj as Qi,aD as C,aY as Mt,ap as Ji,gB as er,aN as ne,fc as tr,eC as Ft,fi as ir,ar as Dt,fX as wt,ff as pt,eM as Pt,di as Ot,fx as gt,ht as rr,I as Ne,_ as sr,cW as ar,aq as et,aM as nr,hu as zt,d1 as or,hv as Fe,hw as De,ay as Ht,hx as lr,au as cr,av as dr,i as Rt,fB as Vt,dH as ur,f1 as K,eE as rt,fy as Te,hy as hr,hz as hi,eF as mi,e8 as tt,eL as mr,b4 as Bt,dl as Gt,hA as fr,P as pr}from"./index.9da382e4.js";import{E as fi,C as Y,F as gr,M as vt,P as ue,G as _t,L as he,I as Ie,O as X,u as le,D as qe,Y as vr,V as _r}from"./enums.de935fa5.js";import{a as xr,u as ae,n as Tr}from"./Texture.599541db.js";import{t as br,g as Qe,j as xt,m as fe,p as nt,a as Sr}from"./requestImageUtils.4ea1aefd.js";import{l as Ut,u as Ar,g as Mr}from"./geometryDataUtils.337d3a34.js";import{O as f}from"./VertexAttribute.5551e0d8.js";import{e as Me}from"./mat4f64.84d5c445.js";import{f as wr,c as Pr,_ as Or,D as Rr,n as Ir}from"./VertexArrayObject.4198c73f.js";import{t as Z}from"./VertexElementDescriptor.d386088d.js";import{c as Er,x as Wt,u as yr,i as kt}from"./BufferView.9de22bcf.js";import{a as Ee,e as $r}from"./quatf64.ddec7ef6.js";import{S as Lr}from"./quat.2f83a288.js";import{n as Tt,r as Cr}from"./vec3f32.0772c8d8.js";import{_ as pi}from"./sphere.f1597b20.js";class Ua{constructor(e,i){this._module=e,this._loadModule=i}get(){return this._module}async reload(){return this._module=await this._loadModule(),this._module}}class Wa{constructor(e,i,r){this.release=r,i&&(this.initializeConfiguration(e,i),this._configuration=i.snapshot()),this._program=this.initializeProgram(e),this._pipeline=this.initializePipeline(e.rctx.capabilities)}destroy(){this._program=Nt(this._program),this._pipeline=this._configuration=null}reload(e){Nt(this._program),this._program=this.initializeProgram(e),this._pipeline=this.initializePipeline(e.rctx.capabilities)}get program(){return this._program}get compiled(){return this.program.isCompiled}get key(){return this._configuration.key}get configuration(){return this._configuration}bindPass(e,i){this.program.bindPass(e,i)}bindDraw(e,i){this.program.bindDraw(e,i),this.program.rebindTextures()}bindPipelineState(e,i=null,r){e.setPipelineState(this.getPipelineState(i,r))}ensureAttributeLocations(e){this.program.assertCompatibleVertexAttributeLocations(e)}get primitiveType(){return fi.TRIANGLES}getPipelineState(e,i){return this._pipeline}initializeConfiguration(e,i){}}var R;(function(t){t[t.Pass=0]="Pass",t[t.Draw=1]="Draw"})(R||(R={}));class ka{constructor(e,i,r){this._context=e,this._locations=r,this._textures=new Map,this._freeTextureUnits=new si({deallocator:null}),this._glProgram=e.programCache.acquire(i.generate("vertex"),i.generate("fragment"),r),this._glProgram.stop=()=>{throw new Error("Wrapped _glProgram used directly")},this.bindPass=i.generateBind(R.Pass,this),this.bindDraw=i.generateBind(R.Draw,this),this._fragmentUniforms=xr()?i.fragmentUniforms:null}dispose(){this._glProgram.dispose()}get glName(){return this._glProgram.glName}get isCompiled(){return this._glProgram.isCompiled}setUniform1b(e,i){this._glProgram.setUniform1i(e,i?1:0)}setUniform1i(e,i){this._glProgram.setUniform1i(e,i)}setUniform1f(e,i){this._glProgram.setUniform1f(e,i)}setUniform2f(e,i,r){this._glProgram.setUniform2f(e,i,r)}setUniform2fv(e,i){this._glProgram.setUniform2fv(e,i)}setUniform3f(e,i,r,s){this._glProgram.setUniform3f(e,i,r,s)}setUniform3fv(e,i){this._glProgram.setUniform3fv(e,i)}setUniform4f(e,i,r,s,a){this._glProgram.setUniform4f(e,i,r,s,a)}setUniform4fv(e,i){this._glProgram.setUniform4fv(e,i)}setUniformMatrix3fv(e,i){this._glProgram.setUniformMatrix3fv(e,i)}setUniformMatrix4fv(e,i){this._glProgram.setUniformMatrix4fv(e,i)}setUniform1fv(e,i){this._glProgram.setUniform1fv(e,i)}setUniform1iv(e,i){this._glProgram.setUniform1iv(e,i)}setUniform2iv(e,i){this._glProgram.setUniform3iv(e,i)}setUniform3iv(e,i){this._glProgram.setUniform3iv(e,i)}setUniform4iv(e,i){this._glProgram.setUniform4iv(e,i)}assertCompatibleVertexAttributeLocations(e){e.locations!==this._locations&&console.error("VertexAttributeLocations are incompatible")}stop(){this._textures.clear(),this._freeTextureUnits.clear()}bindTexture(e,i){if(z(i)||i.glName==null){const s=this._textures.get(e);return s&&(this._context.bindTexture(null,s.unit),this._freeTextureUnit(s),this._textures.delete(e)),null}let r=this._textures.get(e);return r==null?(r=this._allocTextureUnit(i),this._textures.set(e,r)):r.texture=i,this._context.useProgram(this),this.setUniform1i(e,r.unit),this._context.bindTexture(i,r.unit),r.unit}rebindTextures(){this._context.useProgram(this),this._textures.forEach((e,i)=>{this._context.bindTexture(e.texture,e.unit),this.setUniform1i(i,e.unit)}),O(this._fragmentUniforms)&&this._fragmentUniforms.forEach(e=>{e.type!=="sampler2D"&&e.type!=="samplerCube"||this._textures.has(e.name)||console.error(`Texture sampler ${e.name} has no bound texture`)})}_allocTextureUnit(e){return{texture:e,unit:this._freeTextureUnits.length===0?this._textures.size:this._freeTextureUnits.pop()}}_freeTextureUnit(e){this._freeTextureUnits.push(e.unit)}}class st{}function d(t,...e){let i="";for(let r=0;r<e.length;r++)i+=t[r]+e[r];return i+=t[t.length-1],i}(function(t){function e(r){return Math.round(r).toString()}function i(r){return r.toPrecision(8)}t.int=e,t.float=i})(d||(d={}));function It(t){t.code.add(d`const float MAX_RGBA_FLOAT =
255.0 / 256.0 +
255.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 / 256.0;
const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
vec4 float2rgba(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);
vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);
const float toU8AsFloat = 1.0 / 255.0;
return fixedPointU8 * toU8AsFloat;
}
const vec4 RGBA_2_FLOAT_FACTORS = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgba2float(vec4 rgba) {
return dot(rgba, RGBA_2_FLOAT_FACTORS);
}`)}function Nr(t){t.include(It),t.code.add(d`float linearDepthFromFloat(float depth, vec2 nearFar) {
return -(depth * (nearFar[1] - nearFar[0]) + nearFar[0]);
}
float linearDepthFromTexture(sampler2D depthTex, vec2 uv, vec2 nearFar) {
return linearDepthFromFloat(rgba2float(texture2D(depthTex, uv)), nearFar);
}`)}class H{constructor(e,i,r,s,a=null){this.name=e,this.type=i,this.arraySize=a,this.bind={[R.Pass]:null,[R.Draw]:null},O(r)&&O(s)&&(this.bind[r]=s)}equals(e){return this.type===e.type&&this.name===e.name&&this.arraySize===e.arraySize}}class We extends H{constructor(e,i){super(e,"vec2",R.Pass,(r,s,a)=>r.setUniform2fv(e,i(s,a)))}}class G extends H{constructor(e,i){super(e,"vec4",R.Pass,(r,s,a)=>r.setUniform4fv(e,i(s,a)))}}class B extends H{constructor(e,i){super(e,"vec3",R.Pass,(r,s,a)=>r.setUniform3fv(e,i(s,a)))}}class gi extends H{constructor(e,i){super(e,"float",R.Pass,(r,s,a)=>r.setUniform1f(e,i(s,a)))}}class at extends H{constructor(e,i){super(e,"sampler2D",R.Pass,(r,s,a)=>r.bindTexture(e,i(s,a)))}}function ot(t,e,i){const r=[new at(t,e)];if(i){const s=t+"Size";r.push(new We(s,(a,n)=>{const o=e(a,n);return O(o)?ai(Fr,o.descriptor.width,o.descriptor.height):ni}))}return r}const Fr=oi();class bt extends H{constructor(e,i){super(e,"mat4",R.Pass,(r,s,a)=>r.setUniformMatrix4fv(e,i(s,a)))}}const Dr=li.getLogger("esri.views.3d.webgl-engine.core.shaderModules.shaderBuilder");class vi{constructor(){this.includedModules=new Map}include(e,i){if(this.includedModules.has(e)){const r=this.includedModules.get(e);if(r!==i){Dr.error("Trying to include shader module multiple times with different sets of options.");const s=new Set;for(const a of Object.keys(r))r[a]!==e[a]&&s.add(a);for(const a of Object.keys(e))r[a]!==e[a]&&s.add(a);s.forEach(a=>console.error(`  ${a}: current ${r[a]} new ${e[a]}`))}}else this.includedModules.set(e,i),e(this.builder,i)}}class qa extends vi{constructor(){super(...arguments),this.vertex=new qt,this.fragment=new qt,this.attributes=new Vr,this.varyings=new Br,this.extensions=new Re,this.constants=new N}get fragmentUniforms(){return this.fragment.uniforms.entries}get builder(){return this}generate(e){const i=this.extensions.generateSource(e),r=this.attributes.generateSource(e),s=this.varyings.generateSource(),a=e==="vertex"?this.vertex:this.fragment,n=a.uniforms.generateSource(),o=a.code.generateSource(),c=e==="vertex"?Ur:Gr,l=this.constants.generateSource().concat(a.constants.generateSource());return`
${i.join(`
`)}

${c}

${l.join(`
`)}

${n.join(`
`)}

${r.join(`
`)}

${s.join(`
`)}

${o.join(`
`)}`}generateBind(e,i){const r=new Map;this.vertex.uniforms.entries.forEach(n=>{const o=n.bind[e];O(o)&&r.set(n.name,o)}),this.fragment.uniforms.entries.forEach(n=>{const o=n.bind[e];O(o)&&r.set(n.name,o)});const s=Array.from(r.values()),a=s.length;return(n,o)=>{for(let c=0;c<a;++c)s[c](i,n,o)}}}class zr{constructor(){this._entries=new Map}add(e){if(!Array.isArray(e))return this._add(e);for(const i of e)this._add(i)}_add(e){if(this._entries.has(e.name)&&!this._entries.get(e.name).equals(e))throw new ci(`Duplicate uniform name ${e.name} for different uniform type`);this._entries.set(e.name,e)}generateSource(){return Array.from(this._entries.values()).map(e=>O(e.arraySize)?`uniform ${e.type} ${e.name}[${e.arraySize}];`:`uniform ${e.type} ${e.name};`)}get entries(){return Array.from(this._entries.values())}}class Hr{constructor(){this._entries=new Array}add(e){this._entries.push(e)}generateSource(){return this._entries}}class qt extends vi{constructor(){super(...arguments),this.uniforms=new zr,this.code=new Hr,this.constants=new N}get builder(){return this}}class Vr{constructor(){this._entries=new Array}add(e,i){this._entries.push([e,i])}generateSource(e){return e==="fragment"?[]:this._entries.map(i=>`attribute ${i[1]} ${i[0]};`)}}class Br{constructor(){this._entries=new Array}add(e,i){this._entries.push([e,i])}generateSource(){return this._entries.map(e=>`varying ${e[1]} ${e[0]};`)}}class Re{constructor(){this._entries=new Set}add(e){this._entries.add(e)}generateSource(e){const i=e==="vertex"?Re.ALLOWLIST_VERTEX:Re.ALLOWLIST_FRAGMENT;return Array.from(this._entries).filter(r=>i.includes(r)).map(r=>`#extension ${r} : enable`)}}Re.ALLOWLIST_FRAGMENT=["GL_EXT_shader_texture_lod","GL_OES_standard_derivatives"],Re.ALLOWLIST_VERTEX=[];class N{constructor(){this._entries=new Set}add(e,i,r){let s="ERROR_CONSTRUCTOR_STRING";switch(i){case"float":s=N._numberToFloatStr(r);break;case"int":s=N._numberToIntStr(r);break;case"bool":s=r.toString();break;case"vec2":s=`vec2(${N._numberToFloatStr(r[0])},                            ${N._numberToFloatStr(r[1])})`;break;case"vec3":s=`vec3(${N._numberToFloatStr(r[0])},                            ${N._numberToFloatStr(r[1])},                            ${N._numberToFloatStr(r[2])})`;break;case"vec4":s=`vec4(${N._numberToFloatStr(r[0])},                            ${N._numberToFloatStr(r[1])},                            ${N._numberToFloatStr(r[2])},                            ${N._numberToFloatStr(r[3])})`;break;case"ivec2":s=`ivec2(${N._numberToIntStr(r[0])},                             ${N._numberToIntStr(r[1])})`;break;case"ivec3":s=`ivec3(${N._numberToIntStr(r[0])},                             ${N._numberToIntStr(r[1])},                             ${N._numberToIntStr(r[2])})`;break;case"ivec4":s=`ivec4(${N._numberToIntStr(r[0])},                             ${N._numberToIntStr(r[1])},                             ${N._numberToIntStr(r[2])},                             ${N._numberToIntStr(r[3])})`;break;case"mat2":case"mat3":case"mat4":s=`${i}(${Array.prototype.map.call(r,a=>N._numberToFloatStr(a)).join(", ")})`}return this._entries.add(`const ${i} ${e} = ${s};`),this}static _numberToIntStr(e){return e.toFixed(0)}static _numberToFloatStr(e){return Number.isInteger(e)?e.toFixed(1):e.toString()}generateSource(){return Array.from(this._entries)}}const Gr=`#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  precision highp sampler2D;
#else
  precision mediump float;
  precision mediump sampler2D;
#endif`,Ur=`precision highp float;
precision highp sampler2D;`,_i=new Map([[f.POSITION,0],[f.NORMAL,1],[f.UV0,2],[f.COLOR,3],[f.SIZE,4],[f.TANGENT,4],[f.AUXPOS1,5],[f.SYMBOLCOLOR,5],[f.AUXPOS2,6],[f.FEATUREATTRIBUTE,6],[f.INSTANCEFEATUREATTRIBUTE,6],[f.INSTANCECOLOR,7],[f.MODEL,8],[f.MODELNORMAL,12],[f.MODELORIGINHI,11],[f.MODELORIGINLO,15]]);new Z(f.POSITION,3,Y.FLOAT,0,12);new Z(f.POSITION,3,Y.FLOAT,0,20),new Z(f.UV0,2,Y.FLOAT,12,20);new Z(f.POSITION,3,Y.FLOAT,0,32),new Z(f.NORMAL,3,Y.FLOAT,12,32),new Z(f.UV0,2,Y.FLOAT,24,32);new Z(f.POSITION,3,Y.FLOAT,0,16),new Z(f.COLOR,4,Y.UNSIGNED_BYTE,12,16);const Wr=[new Z(f.POSITION,2,Y.FLOAT,0,8)],kr=[new Z(f.POSITION,2,Y.FLOAT,0,16),new Z(f.UV0,2,Y.FLOAT,8,16)];function qr(t,e=Wr,i=_i,r=-1,s=1){let a=null;return e===kr?a=new Float32Array([r,r,0,0,s,r,1,0,r,s,0,1,s,s,1,1]):a=new Float32Array([r,r,s,r,r,s,s,s]),new wr(t,i,{geometry:e},{geometry:Pr.createVertex(t,gr.STATIC_DRAW,a)})}function Xa(t){return new ae(t,{target:vt.TEXTURE_2D,pixelFormat:ue.RGBA,dataType:_t.UNSIGNED_BYTE,samplingMode:he.NEAREST,width:1,height:1},new Uint8Array([255,255,255,255]))}var Xt;(function(t){t[t.INTEGRATED_MESH=0]="INTEGRATED_MESH",t[t.OPAQUE_TERRAIN=1]="OPAQUE_TERRAIN",t[t.OPAQUE_MATERIAL=2]="OPAQUE_MATERIAL",t[t.TRANSPARENT_MATERIAL=3]="TRANSPARENT_MATERIAL",t[t.TRANSPARENT_TERRAIN=4]="TRANSPARENT_TERRAIN",t[t.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL=5]="TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL",t[t.OCCLUDED_TERRAIN=6]="OCCLUDED_TERRAIN",t[t.OCCLUDER_MATERIAL=7]="OCCLUDER_MATERIAL",t[t.TRANSPARENT_OCCLUDER_MATERIAL=8]="TRANSPARENT_OCCLUDER_MATERIAL",t[t.OCCLUSION_PIXELS=9]="OCCLUSION_PIXELS",t[t.POSTPROCESSING_ENVIRONMENT_OPAQUE=10]="POSTPROCESSING_ENVIRONMENT_OPAQUE",t[t.POSTPROCESSING_ENVIRONMENT_TRANSPARENT=11]="POSTPROCESSING_ENVIRONMENT_TRANSPARENT",t[t.LASERLINES=12]="LASERLINES",t[t.LASERLINES_CONTRAST_CONTROL=13]="LASERLINES_CONTRAST_CONTROL",t[t.HUD_MATERIAL=14]="HUD_MATERIAL",t[t.LABEL_MATERIAL=15]="LABEL_MATERIAL",t[t.LINE_CALLOUTS=16]="LINE_CALLOUTS",t[t.LINE_CALLOUTS_HUD_DEPTH=17]="LINE_CALLOUTS_HUD_DEPTH",t[t.DRAPED_MATERIAL=18]="DRAPED_MATERIAL",t[t.DRAPED_WATER=19]="DRAPED_WATER",t[t.VOXEL=20]="VOXEL",t[t.MAX_SLOTS=21]="MAX_SLOTS"})(Xt||(Xt={}));function Xr(t){return Math.abs(t*t*t)}function xi(t,e,i){const r=i.parameters,s=i.paddingPixelsOverride;return ze.scale=Math.min(r.divisor/(e-r.offset),1),ze.factor=Xr(t),ze.minPixelSize=r.minPixelSize,ze.paddingPixels=s,ze}function Ti(t,e){return t===0?e.minPixelSize:e.minPixelSize*(1+2*e.paddingPixels/t)}function bi(t,e){return Math.max(qi(t*e.scale,t,e.factor),Ti(t,e))}function jr(t,e,i){const r=xi(t,e,i);return r.minPixelSize=0,r.paddingPixels=0,bi(1,r)}function ja(t,e,i,r){r.scale=jr(t,e,i),r.factor=0,r.minPixelSize=i.parameters.minPixelSize,r.paddingPixels=i.paddingPixelsOverride}function Ka(t,e,i=[0,0]){const r=Math.min(Math.max(e.scale,Ti(t[1],e)/Math.max(1e-5,t[1])),1);return i[0]=t[0]*r,i[1]=t[1]*r,i}function Kr(t,e,i,r){return bi(t,xi(e,i,r))}const ze={scale:0,factor:0,minPixelSize:0,paddingPixels:0};function Ya(t,e){return z(t)&&(t=[]),t.push(e),t}function Za(t,e){if(z(t))return null;const i=t.filter(r=>r!==e);return i.length===0?null:i}function Yr(t){return!!O(t)&&!t.visible}function Qa(t,e,i){const r=t.origin.vec3;Xi(lt,-r[0],-r[1],-r[2]),O(t.transformation)?di(e,lt,t.transformation):mt(e,lt),i&&(ui(i,e),ft(i,i))}function Ja(t,e,i,r,s){Xe[0]=t.get(e,0),Xe[1]=t.get(e,1),Xe[2]=t.get(e,2),br(Xe,be,3),i.set(s,0,be[0]),r.set(s,0,be[1]),i.set(s,1,be[2]),r.set(s,1,be[3]),i.set(s,2,be[4]),r.set(s,2,be[5])}const Xe=new Float64Array(3),be=new Float32Array(6),lt=Me(),je=ji();function en(t,e,i,r,s,a,n){if(!Yr(e))if(t.boundingInfo){U(t.primitiveType===Qe.Triangle);const o=i.tolerance;Si(t.boundingInfo,r,s,o,a,n)}else{const o=t.indices.get(f.POSITION),c=t.vertexAttributes.get(f.POSITION);Mi(r,s,0,o.length/3,o,c,void 0,a,n)}}const Zr=C();function Si(t,e,i,r,s,a){if(z(t))return;const n=Jr(e,i,Zr);if(Ki(je,t.getBBMin()),Yi(je,t.getBBMax()),O(s)&&s.applyToAabb(je),es(je,e,n,r)){const{primitiveIndices:o,indices:c,position:l}=t,u=o?o.length:c.length/3;if(u>ss){const m=t.getChildren();if(m!==void 0){for(let h=0;h<8;++h)m[h]!==void 0&&Si(m[h],e,i,r,s,a);return}}Mi(e,i,0,u,c,l,o,s,a)}}const Ai=C();function Mi(t,e,i,r,s,a,n,o,c){if(n)return Qr(t,e,i,r,s,a,n,o,c);const l=a.data,u=a.stride||a.size,m=t[0],h=t[1],p=t[2],v=e[0]-m,S=e[1]-h,T=e[2]-p;for(let g=i,D=3*i;g<r;++g){let M=u*s[D++],A=l[M++],y=l[M++],_=l[M];M=u*s[D++];let x=l[M++],b=l[M++],w=l[M];M=u*s[D++];let L=l[M++],F=l[M++],E=l[M];O(o)&&([A,y,_]=o.applyToVertex(A,y,_,g),[x,b,w]=o.applyToVertex(x,b,w,g),[L,F,E]=o.applyToVertex(L,F,E,g));const P=x-A,I=b-y,$=w-_,V=L-A,te=F-y,ie=E-_,pe=S*ie-te*T,ye=T*V-ie*v,$e=v*te-V*S,j=P*pe+I*ye+$*$e;if(Math.abs(j)<=Number.EPSILON)continue;const W=m-A,ge=h-y,ve=p-_,J=W*pe+ge*ye+ve*$e;if(j>0){if(J<0||J>j)continue}else if(J>0||J<j)continue;const re=ge*$-I*ve,Le=ve*P-$*W,Ce=W*I-P*ge,_e=v*re+S*Le+T*Ce;if(j>0){if(_e<0||J+_e>j)continue}else if(_e>0||J+_e<j)continue;const xe=(V*re+te*Le+ie*Ce)/j;xe>=0&&c(xe,wi(P,I,$,V,te,ie,Ai),g,!1)}}function Qr(t,e,i,r,s,a,n,o,c){const l=a.data,u=a.stride||a.size,m=t[0],h=t[1],p=t[2],v=e[0]-m,S=e[1]-h,T=e[2]-p;for(let g=i;g<r;++g){const D=n[g];let M=3*D,A=u*s[M++],y=l[A++],_=l[A++],x=l[A];A=u*s[M++];let b=l[A++],w=l[A++],L=l[A];A=u*s[M];let F=l[A++],E=l[A++],P=l[A];O(o)&&([y,_,x]=o.applyToVertex(y,_,x,g),[b,w,L]=o.applyToVertex(b,w,L,g),[F,E,P]=o.applyToVertex(F,E,P,g));const I=b-y,$=w-_,V=L-x,te=F-y,ie=E-_,pe=P-x,ye=S*pe-ie*T,$e=T*te-pe*v,j=v*ie-te*S,W=I*ye+$*$e+V*j;if(Math.abs(W)<=Number.EPSILON)continue;const ge=m-y,ve=h-_,J=p-x,re=ge*ye+ve*$e+J*j;if(W>0){if(re<0||re>W)continue}else if(re>0||re<W)continue;const Le=ve*V-$*J,Ce=J*I-V*ge,_e=ge*$-I*ve,xe=v*Le+S*Ce+T*_e;if(W>0){if(xe<0||re+xe>W)continue}else if(xe>0||re+xe<W)continue;const Ct=(te*Le+ie*Ce+pe*_e)/W;Ct>=0&&c(Ct,wi(I,$,V,te,ie,pe,Ai),D,!1)}}const jt=C(),Kt=C();function wi(t,e,i,r,s,a,n){return de(jt,t,e,i),de(Kt,r,s,a),Zi(n,jt,Kt),Qi(n,n),n}function Jr(t,e,i){return de(i,1/(e[0]-t[0]),1/(e[1]-t[1]),1/(e[2]-t[2]))}function es(t,e,i,r){return ts(t,e,i,r,1/0)}function ts(t,e,i,r,s){const a=(t[0]-r-e[0])*i[0],n=(t[3]+r-e[0])*i[0];let o=Math.min(a,n),c=Math.max(a,n);const l=(t[1]-r-e[1])*i[1],u=(t[4]+r-e[1])*i[1];if(c=Math.min(c,Math.max(l,u)),c<0||(o=Math.max(o,Math.min(l,u)),o>c))return!1;const m=(t[2]-r-e[2])*i[2],h=(t[5]+r-e[2])*i[2];return c=Math.min(c,Math.max(m,h)),!(c<0)&&(o=Math.max(o,Math.min(m,h)),!(o>c)&&o<s)}function tn(t,e,i,r,s){let a=(i.screenLength||0)*t.pixelRatio;O(s)&&(a=Kr(a,r,e,s));const n=a*Math.tan(.5*t.fovY)/(.5*t.fullHeight);return Mt(n*e,i.minWorldLength||0,i.maxWorldLength!=null?i.maxWorldLength:1/0)}function Pi(t,e){const i=e?Pi(e):{};for(const r in t){let s=t[r];s&&s.forEach&&(s=rs(s)),s==null&&r in i||(i[r]=s)}return i}function is(t,e){let i=!1;for(const r in e){const s=e[r];s!==void 0&&(Array.isArray(s)?t[r]===null?(t[r]=s.slice(),i=!0):Ji(t[r],s)&&(i=!0):t[r]!==s&&(i=!0,t[r]=s))}return i}function rn(t,e,i,r,s,a){if(!e.options.selectionMode)return;const n=t.vertexAttributes.get(f.POSITION).data,o=t.vertexAttributes.get(f.SIZE),c=o&&o.data[0],l=r[0],u=r[1],m=((c+s)/2+4)*t.screenToWorldRatio;let h=Number.MAX_VALUE,p=0;for(let v=0;v<n.length-5;v+=3){const S=n[v],T=n[v+1],g=l-S,D=u-T,M=n[v+3]-S,A=n[v+4]-T,y=Mt((M*g+A*D)/(M*M+A*A),0,1),_=M*y-g,x=A*y-D,b=_*_+x*x;b<h&&(h=b,p=v/3)}h<m*m&&a(i.dist,i.normal,p,!1)}function rs(t){const e=[];return t.forEach(i=>e.push(i)),e}const sn={multiply:1,ignore:2,replace:3,tint:4},ss=1e3;class as{constructor(){this._key="",this._keyDirty=!1,this._parameterBits=this._parameterBits?this._parameterBits.map(()=>0):[],this._parameterNames||(this._parameterNames=[])}get key(){return this._keyDirty&&(this._keyDirty=!1,this._key=String.fromCharCode.apply(String,this._parameterBits)),this._key}snapshot(){const e=this._parameterNames,i={key:this.key};for(const r of e)i[r]=this[r];return i}}function He(t={}){return(e,i)=>{var r,s;if(e._parameterNames=(r=e._parameterNames)!=null?r:[],e._parameterNames.push(i),t.constValue!=null)Object.defineProperty(e,i,{get:()=>t.constValue});else{const a=e._parameterNames.length-1,n=t.count||2,o=Math.ceil(Math.log2(n)),c=(s=e._parameterBits)!=null?s:[0];let l=0;for(;c[l]+o>16;)l++,l>=c.length&&c.push(0);e._parameterBits=c;const u=c[l],m=(1<<o)-1<<u;c[l]+=o,Object.defineProperty(e,i,{get(){return this[a]},set(h){if(this[a]!==h&&(this[a]=h,this._keyDirty=!0,this._parameterBits[l]=this._parameterBits[l]&~m|+h<<u&m,typeof h!="number"&&typeof h!="boolean"))throw"Configuration value for "+i+" must be boolean or number, got "+typeof h}})}}}class Et{constructor(){this.id=er()}unload(){}}var ke;(function(t){t[t.Layer=0]="Layer",t[t.Object=1]="Object",t[t.Geometry=2]="Geometry",t[t.Material=3]="Material",t[t.Texture=4]="Texture",t[t.COUNT=5]="COUNT"})(ke||(ke={}));class yt{constructor(e,i,r,s){this.primitiveIndices=e,this._numIndexPerPrimitive=i,this.indices=r,this.position=s,this.center=C(),U(e.length>=1),U(r.length%this._numIndexPerPrimitive==0),U(r.length>=e.length*this._numIndexPerPrimitive),U(s.size===3||s.size===4);const{data:a,size:n}=s,o=e.length;let c=n*r[this._numIndexPerPrimitive*e[0]];Se.clear(),Se.push(c),this.bbMin=ne(a[c],a[c+1],a[c+2]),this.bbMax=tr(this.bbMin);for(let u=0;u<o;++u){const m=this._numIndexPerPrimitive*e[u];for(let h=0;h<this._numIndexPerPrimitive;++h){c=n*r[m+h],Se.push(c);let p=a[c];this.bbMin[0]=Math.min(p,this.bbMin[0]),this.bbMax[0]=Math.max(p,this.bbMax[0]),p=a[c+1],this.bbMin[1]=Math.min(p,this.bbMin[1]),this.bbMax[1]=Math.max(p,this.bbMax[1]),p=a[c+2],this.bbMin[2]=Math.min(p,this.bbMin[2]),this.bbMax[2]=Math.max(p,this.bbMax[2])}}Ft(this.center,this.bbMin,this.bbMax,.5),this.radius=.5*Math.max(Math.max(this.bbMax[0]-this.bbMin[0],this.bbMax[1]-this.bbMin[1]),this.bbMax[2]-this.bbMin[2]);let l=this.radius*this.radius;for(let u=0;u<Se.length;++u){c=Se.getItemAt(u);const m=a[c]-this.center[0],h=a[c+1]-this.center[1],p=a[c+2]-this.center[2],v=m*m+h*h+p*p;if(v<=l)continue;const S=Math.sqrt(v),T=.5*(S-this.radius);this.radius=this.radius+T,l=this.radius*this.radius;const g=T/S;this.center[0]+=m*g,this.center[1]+=h*g,this.center[2]+=p*g}Se.clear()}getCenter(){return this.center}getBSRadius(){return this.radius}getBBMin(){return this.bbMin}getBBMax(){return this.bbMax}getChildren(){if(this._children)return this._children;if(ir(this.bbMin,this.bbMax)>1){const e=Ft(C(),this.bbMin,this.bbMax,.5),i=this.primitiveIndices.length,r=new Uint8Array(i),s=new Array(8);for(let l=0;l<8;++l)s[l]=0;const{data:a,size:n}=this.position;for(let l=0;l<i;++l){let u=0;const m=this._numIndexPerPrimitive*this.primitiveIndices[l];let h=n*this.indices[m],p=a[h],v=a[h+1],S=a[h+2];for(let T=1;T<this._numIndexPerPrimitive;++T){h=n*this.indices[m+T];const g=a[h],D=a[h+1],M=a[h+2];g<p&&(p=g),D<v&&(v=D),M<S&&(S=M)}p<e[0]&&(u|=1),v<e[1]&&(u|=2),S<e[2]&&(u|=4),r[l]=u,++s[u]}let o=0;for(let l=0;l<8;++l)s[l]>0&&++o;if(o<2)return;const c=new Array(8);for(let l=0;l<8;++l)c[l]=s[l]>0?new Uint32Array(s[l]):void 0;for(let l=0;l<8;++l)s[l]=0;for(let l=0;l<i;++l){const u=r[l];c[u][s[u]++]=this.primitiveIndices[l]}this._children=new Array(8);for(let l=0;l<8;++l)c[l]!==void 0&&(this._children[l]=new yt(c[l],this._numIndexPerPrimitive,this.indices,this.position))}return this._children}static prune(){Se.prune()}}const Se=new si({deallocator:null});class Oi extends Et{constructor(e,i=[],r=Qe.Triangle,s=-1){super(),this._primitiveType=r,this.edgeIndicesLength=s,this.type=ke.Geometry,this._vertexAttributes=new Map,this._indices=new Map,this._boundingInfo=null;for(const[a,n]of e)n&&this._vertexAttributes.set(a,{...n});if(i==null||i.length===0){const a=ns(this._vertexAttributes),n=Ut(a);this.edgeIndicesLength=this.edgeIndicesLength<0?a:this.edgeIndicesLength;for(const o of this._vertexAttributes.keys())this._indices.set(o,n)}else for(const[a,n]of i)n&&(this._indices.set(a,os(n)),a===f.POSITION&&(this.edgeIndicesLength=this.edgeIndicesLength<0?this._indices.get(a).length:this.edgeIndicesLength))}cloneShallow(){const e=new Oi([],void 0,this._primitiveType,void 0),{_vertexAttributes:i,_indices:r}=e;return this._vertexAttributes.forEach((s,a)=>{i.set(a,s)}),this._indices.forEach((s,a)=>{r.set(a,s)}),e.screenToWorldRatio=this.screenToWorldRatio,e._boundingInfo=this._boundingInfo,e}get vertexAttributes(){return this._vertexAttributes}getMutableAttribute(e){const i=this._vertexAttributes.get(e);return i&&!i.exclusive&&(i.data=Array.from(i.data),i.exclusive=!0),i}get indices(){return this._indices}get indexCount(){const e=this._indices.values().next().value;return e?e.length:0}get primitiveType(){return this._primitiveType}get faceCount(){return this.indexCount/3}get boundingInfo(){return z(this._boundingInfo)&&(this._boundingInfo=this._calculateBoundingInfo()),this._boundingInfo}computeAttachmentOrigin(e){return this.primitiveType===Qe.Triangle?this._computeAttachmentOriginTriangles(e):this._computeAttachmentOriginPoints(e)}_computeAttachmentOriginTriangles(e){const i=this.indices.get(f.POSITION),r=this.vertexAttributes.get(f.POSITION);return Ar(r,i,e)}_computeAttachmentOriginPoints(e){const i=this.indices.get(f.POSITION),r=this.vertexAttributes.get(f.POSITION);return Mr(r,i,e)}invalidateBoundingInfo(){this._boundingInfo=null}_calculateBoundingInfo(){const e=this.indices.get(f.POSITION);if(e.length===0)return null;const i=this.primitiveType===Qe.Triangle?3:1;U(e.length%i==0,"Indexing error: "+e.length+" not divisible by "+i);const r=Ut(e.length/i),s=this.vertexAttributes.get(f.POSITION);return new yt(r,i,e,s)}}function ns(t){const e=t.values().next().value;return e==null?0:e.data.length/e.size}function os(t){if(t.BYTES_PER_ELEMENT===Uint16Array.BYTES_PER_ELEMENT)return t;for(const e of t)if(e>=65536)return t;return new Uint16Array(t)}class an extends Et{constructor(e,i){super(),this.type=ke.Material,this.supportsEdges=!1,this._visible=!0,this._renderPriority=0,this._insertOrder=0,this._vertexAttributeLocations=_i,this._parameters=Pi(e,i),this.validateParameters(this._parameters)}dispose(){}get parameters(){return this._parameters}update(e){return!1}setParameters(e,i=!0){is(this._parameters,e)&&(this.validateParameters(this._parameters),i&&this.parametersChanged())}validateParameters(e){}get visible(){return this._visible}set visible(e){e!==this._visible&&(this._visible=e,this.parametersChanged())}shouldRender(e){return this.isVisible()&&this.isVisibleInPass(e.pass)&&(this.renderOccluded&e.renderOccludedMask)!=0}isVisibleInPass(e){return!0}get renderOccluded(){return this.parameters.renderOccluded}get renderPriority(){return this._renderPriority}set renderPriority(e){e!==this._renderPriority&&(this._renderPriority=e,this.parametersChanged())}get insertOrder(){return this._insertOrder}set insertOrder(e){e!==this._insertOrder&&(this._insertOrder=e,this.parametersChanged())}get vertexAttributeLocations(){return this._vertexAttributeLocations}isVisible(){return this._visible}parametersChanged(){O(this.repository)&&this.repository.materialChanged(this)}}var St;(function(t){t[t.Occlude=1]="Occlude",t[t.Transparent=2]="Transparent",t[t.OccludeAndTransparent=4]="OccludeAndTransparent",t[t.OccludeAndTransparentStencil=8]="OccludeAndTransparentStencil",t[t.Opaque=16]="Opaque"})(St||(St={}));class ls extends st{constructor(){super(...arguments),this.renderOccluded=St.Occlude}}var we;(function(t){t[t.Color=0]="Color",t[t.Depth=1]="Depth",t[t.Normal=2]="Normal",t[t.Shadow=3]="Shadow",t[t.Highlight=4]="Highlight",t[t.Draped=5]="Draped",t[t.Occlusion=6]="Occlusion",t[t.Alpha=7]="Alpha",t[t.COUNT=8]="COUNT"})(we||(we={}));class cs{constructor(e){this._material=e.material,this._techniqueRepository=e.techniqueRep,this._output=e.output}dispose(){this._techniqueRepository.release(this._technique)}get technique(){return this._technique}ensureTechnique(e,i,r=this._output){return this._technique=this._techniqueRepository.releaseAndAcquire(e,this._material.getConfiguration(r,i),this._technique),this._technique}ensureResources(e){return xt.LOADED}}var Yt;(function(t){t[t.MATERIAL=0]="MATERIAL",t[t.MATERIAL_ALPHA=1]="MATERIAL_ALPHA",t[t.MATERIAL_DEPTH=2]="MATERIAL_DEPTH",t[t.MATERIAL_NORMAL=3]="MATERIAL_NORMAL",t[t.MATERIAL_DEPTH_SHADOWMAP_ALL=4]="MATERIAL_DEPTH_SHADOWMAP_ALL",t[t.MATERIAL_HIGHLIGHT=5]="MATERIAL_HIGHLIGHT",t[t.MATERIAL_DEPTH_SHADOWMAP_DEFAULT=6]="MATERIAL_DEPTH_SHADOWMAP_DEFAULT",t[t.MATERIAL_DEPTH_SHADOWMAP_HIGHLIGHT=7]="MATERIAL_DEPTH_SHADOWMAP_HIGHLIGHT"})(Yt||(Yt={}));class nn extends ls{constructor(){super(...arguments),this.vvSizeEnabled=!1,this.vvSizeMinSize=ne(1,1,1),this.vvSizeMaxSize=ne(100,100,100),this.vvSizeOffset=ne(0,0,0),this.vvSizeFactor=ne(1,1,1),this.vvSizeValue=ne(1,1,1),this.vvColorEnabled=!1,this.vvColorValues=[0,0,0,0,0,0,0,0],this.vvColorColors=[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],this.vvOpacityEnabled=!1,this.vvOpacityValues=[0,0,0,0,0,0,0,0],this.vvOpacityOpacities=[1,1,1,1,1,1,1,1],this.vvSymbolAnchor=[0,0,0],this.vvSymbolRotationMatrix=Ee()}}const ct=8;class ce extends H{constructor(e,i){super(e,"vec3",R.Draw,(r,s,a)=>r.setUniform3fv(e,i(s,a)))}}function on(t,e){ds(t,e,[new ce("slicePlaneOrigin",(i,r)=>us(e,i,r)),new ce("slicePlaneBasis1",(i,r)=>{var s;return Zt(e,i,r,(s=Dt(r.slicePlane))==null?void 0:s.basis1)}),new ce("slicePlaneBasis2",(i,r)=>{var s;return Zt(e,i,r,(s=Dt(r.slicePlane))==null?void 0:s.basis2)})])}function ds(t,e,i){if(!e.hasSlicePlane){const n=d`#define rejectBySlice(_pos_) false
#define discardBySlice(_pos_) {}
#define highlightSlice(_color_, _pos_) (_color_)`;return e.hasSliceInVertexProgram&&t.vertex.code.add(n),void t.fragment.code.add(n)}t.extensions.add("GL_OES_standard_derivatives"),e.hasSliceInVertexProgram&&t.vertex.uniforms.add(i),t.fragment.uniforms.add(i);const r=d`struct SliceFactors {
float front;
float side0;
float side1;
float side2;
float side3;
};
SliceFactors calculateSliceFactors(vec3 pos) {
vec3 rel = pos - slicePlaneOrigin;
vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);
float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);
float basis1Dot = dot(slicePlaneBasis1, rel);
float basis2Dot = dot(slicePlaneBasis2, rel);
return SliceFactors(
dot(slicePlaneNormal, pos) + slicePlaneW,
-basis1Dot - basis1Len2,
basis1Dot - basis1Len2,
-basis2Dot - basis2Len2,
basis2Dot - basis2Len2
);
}
bool sliceByFactors(SliceFactors factors) {
return factors.front < 0.0
&& factors.side0 < 0.0
&& factors.side1 < 0.0
&& factors.side2 < 0.0
&& factors.side3 < 0.0;
}
bool sliceEnabled() {
return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
}
bool sliceByPlane(vec3 pos) {
return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
}
#define rejectBySlice(_pos_) sliceByPlane(_pos_)
#define discardBySlice(_pos_) { if (sliceByPlane(_pos_)) discard; }`,s=d`vec4 applySliceHighlight(vec4 color, vec3 pos) {
SliceFactors factors = calculateSliceFactors(pos);
const float HIGHLIGHT_WIDTH = 1.0;
const vec4 HIGHLIGHT_COLOR = vec4(0.0, 0.0, 0.0, 0.3);
factors.front /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.front);
factors.side0 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side0);
factors.side1 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side1);
factors.side2 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side2);
factors.side3 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side3);
if (sliceByFactors(factors)) {
return color;
}
float highlightFactor = (1.0 - step(0.5, factors.front))
* (1.0 - step(0.5, factors.side0))
* (1.0 - step(0.5, factors.side1))
* (1.0 - step(0.5, factors.side2))
* (1.0 - step(0.5, factors.side3));
return mix(color, vec4(HIGHLIGHT_COLOR.rgb, color.a), highlightFactor * HIGHLIGHT_COLOR.a);
}`,a=e.hasSliceHighlight?d`
        ${s}
        #define highlightSlice(_color_, _pos_) (sliceEnabled() ? applySliceHighlight(_color_, _pos_) : (_color_))
      `:d`#define highlightSlice(_color_, _pos_) (_color_)`;e.hasSliceInVertexProgram&&t.vertex.code.add(r),t.fragment.code.add(r),t.fragment.code.add(a)}function Ri(t,e,i){return t.instancedDoublePrecision?de(hs,i.camera.viewInverseTransposeMatrix[3],i.camera.viewInverseTransposeMatrix[7],i.camera.viewInverseTransposeMatrix[11]):e.slicePlaneLocalOrigin}function Ii(t,e){return O(t)?Ot(it,e.origin,t):e.origin}function Ei(t,e,i){return t.hasSliceTranslatedView?O(e)?gt(ms,i.camera.viewMatrix,e):i.camera.viewMatrix:null}function us(t,e,i){if(z(i.slicePlane))return wt;const r=Ri(t,e,i),s=Ii(r,i.slicePlane),a=Ei(t,r,i);return O(a)?pt(it,s,a):s}function Zt(t,e,i,r){if(z(r)||z(i.slicePlane))return wt;const s=Ri(t,e,i),a=Ii(s,i.slicePlane),n=Ei(t,s,i);return O(n)?(Pt(Ve,r,a),pt(it,a,n),pt(Ve,Ve,n),Ot(Ve,Ve,it)):r}const hs=C(),it=C(),Ve=C(),ms=Me();class fs extends H{constructor(e,i,r){super(e,"vec4",R.Pass,(s,a,n)=>s.setUniform4fv(e,i(a,n)),r)}}class ps extends H{constructor(e,i,r){super(e,"float",R.Pass,(s,a,n)=>s.setUniform1fv(e,i(a,n)),r)}}function ln(t,e){t.fragment.include(It),e.output===we.Shadow?(t.extensions.add("GL_OES_standard_derivatives"),t.fragment.code.add(d`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 2.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
float result = depth + SLOPE_SCALE * m + BIAS;
return clamp(result, .0, .999999);
}
void outputDepth(float _linearDepth) {
gl_FragColor = float2rgba(_calculateFragDepth(_linearDepth));
}`)):e.output===we.Depth&&t.fragment.code.add(d`void outputDepth(float _linearDepth) {
gl_FragColor = float2rgba(_linearDepth);
}`)}class gs extends H{constructor(e,i){super(e,"mat4",R.Draw,(r,s,a)=>r.setUniformMatrix4fv(e,i(s,a)))}}function vs(t,e){e.instancedDoublePrecision?t.constants.add("cameraPosition","vec3",wt):t.uniforms.add(new ce("cameraPosition",(i,r)=>de(yi,r.camera.viewInverseTransposeMatrix[3]-i.origin[0],r.camera.viewInverseTransposeMatrix[7]-i.origin[1],r.camera.viewInverseTransposeMatrix[11]-i.origin[2])))}function cn(t,e){if(t.vertex.uniforms.add(new bt("proj",(r,s)=>s.camera.projectionMatrix)),e.instancedDoublePrecision){const r=(a,n)=>de(yi,n.camera.viewInverseTransposeMatrix[3],n.camera.viewInverseTransposeMatrix[7],n.camera.viewInverseTransposeMatrix[11]);t.vertex.uniforms.add(new bt("view",(a,n)=>gt(Qt,n.camera.viewMatrix,r(a,n))));const s=new B("localOrigin",r);return t.vertex.uniforms.add(s),s}t.vertex.uniforms.add(new gs("view",(r,s)=>gt(Qt,s.camera.viewMatrix,r.origin)));const i=new ce("localOrigin",r=>r.origin);return t.vertex.uniforms.add(i),i}const Qt=rr(),yi=C();function dn(t,e){e.hasMultipassTerrain&&(t.fragment.include(Nr),t.fragment.uniforms.add(new at("terrainDepthTexture",(i,r)=>r.multipassTerrain.linearDepthTexture)),t.fragment.uniforms.add(new We("nearFar",(i,r)=>r.camera.nearFar)),t.fragment.uniforms.add(new We("inverseViewport",(i,r)=>r.inverseViewport)),t.fragment.code.add(d`
    void terrainDepthTest(vec4 fragCoord, float fragmentDepth){
      float terrainDepth = linearDepthFromTexture(terrainDepthTexture, fragCoord.xy * inverseViewport, nearFar);
      if(fragmentDepth ${e.cullAboveGround?">":"<="} terrainDepth){
        discard;
      }
    }
  `))}class un{constructor(){this.enabled=!1,this.cullAboveGround=!1}}function _s(t){t.vertex.code.add(d`const float PI = 3.141592653589793;`),t.fragment.code.add(d`const float PI = 3.141592653589793;
const float LIGHT_NORMALIZATION = 1.0 / PI;
const float INV_PI = 0.3183098861837907;
const float HALF_PI = 1.570796326794897;`)}const hn=.1,mn=.001;function fn(t){t.code.add(d`vec4 premultiplyAlpha(vec4 v) {
return vec4(v.rgb * v.a, v.a);
}
vec3 rgb2hsv(vec3 c) {
vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
float d = q.x - min(q.w, q.y);
float e = 1.0e-10;
return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), min(d / (q.x + e), 1.0), q.x);
}
vec3 hsv2rgb(vec3 c) {
vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float rgb2v(vec3 c) {
return max(c.x, max(c.y, c.z));
}`)}class Be extends as{}Ne([He({constValue:!0})],Be.prototype,"hasSliceHighlight",void 0),Ne([He({constValue:!1})],Be.prototype,"hasSliceInVertexProgram",void 0),Ne([He({constValue:!1})],Be.prototype,"instancedDoublePrecision",void 0),Ne([He({constValue:!1})],Be.prototype,"isGround",void 0),Ne([He({constValue:R.Pass})],Be.prototype,"pbrTextureBindType",void 0);const pn={func:Ie.LESS},gn={func:Ie.ALWAYS},vn={mask:255},_n={mask:0},xn={function:{func:Ie.ALWAYS,ref:fe.OutlineVisualElementMask,mask:fe.OutlineVisualElementMask},operation:{fail:X.KEEP,zFail:X.KEEP,zPass:X.ZERO}},Tn={function:{func:Ie.ALWAYS,ref:fe.OutlineVisualElementMask,mask:fe.OutlineVisualElementMask},operation:{fail:X.KEEP,zFail:X.KEEP,zPass:X.REPLACE}},bn={function:{func:Ie.EQUAL,ref:fe.OutlineVisualElementMask,mask:fe.OutlineVisualElementMask},operation:{fail:X.KEEP,zFail:X.KEEP,zPass:X.KEEP}},Sn={function:{func:Ie.NOTEQUAL,ref:fe.OutlineVisualElementMask,mask:fe.OutlineVisualElementMask},operation:{fail:X.KEEP,zFail:X.KEEP,zPass:X.KEEP}};function xs(){if(z(dt)){const t=e=>ar(`esri/libs/basisu/${e}`);dt=sr(()=>import("./basis_transcoder.c84a33ed.js"),["assets/basis_transcoder.c84a33ed.js","assets/_commonjsHelpers.01f5fe30.js"]).then(e=>e.b).then(({default:e})=>e({locateFile:t}).then(i=>(i.initializeBasis(),delete i.then,i)))}return dt}let dt;var Ae;(function(t){t[t.ETC1_RGB=0]="ETC1_RGB",t[t.ETC2_RGBA=1]="ETC2_RGBA",t[t.BC1_RGB=2]="BC1_RGB",t[t.BC3_RGBA=3]="BC3_RGBA",t[t.BC4_R=4]="BC4_R",t[t.BC5_RG=5]="BC5_RG",t[t.BC7_M6_RGB=6]="BC7_M6_RGB",t[t.BC7_M5_RGBA=7]="BC7_M5_RGBA",t[t.PVRTC1_4_RGB=8]="PVRTC1_4_RGB",t[t.PVRTC1_4_RGBA=9]="PVRTC1_4_RGBA",t[t.ASTC_4x4_RGBA=10]="ASTC_4x4_RGBA",t[t.ATC_RGB=11]="ATC_RGB",t[t.ATC_RGBA=12]="ATC_RGBA",t[t.FXT1_RGB=17]="FXT1_RGB",t[t.PVRTC2_4_RGB=18]="PVRTC2_4_RGB",t[t.PVRTC2_4_RGBA=19]="PVRTC2_4_RGBA",t[t.ETC2_EAC_R11=20]="ETC2_EAC_R11",t[t.ETC2_EAC_RG11=21]="ETC2_EAC_RG11",t[t.RGBA32=13]="RGBA32",t[t.RGB565=14]="RGB565",t[t.BGR565=15]="BGR565",t[t.RGBA4444=16]="RGBA4444"})(Ae||(Ae={}));let Q=null,Ke=null;async function $i(){return z(Ke)&&(Ke=xs(),Q=await Ke),Ke}function Ts(t,e){if(z(Q))return t.byteLength;const i=new Q.BasisFile(new Uint8Array(t)),r=Ci(i)?Li(i.getNumLevels(0),i.getHasAlpha(),i.getImageWidth(0,0),i.getImageHeight(0,0),e):0;return i.close(),i.delete(),r}function bs(t,e){if(z(Q))return t.byteLength;const i=new Q.KTX2File(new Uint8Array(t)),r=Ni(i)?Li(i.getLevels(),i.getHasAlpha(),i.getWidth(),i.getHeight(),e):0;return i.close(),i.delete(),r}function Li(t,e,i,r,s){const a=Or(e?le.COMPRESSED_RGBA8_ETC2_EAC:le.COMPRESSED_RGB8_ETC2),n=s&&t>1?(4**t-1)/(3*4**(t-1)):1;return Math.ceil(i*r*a*n)}function Ci(t){return t.getNumImages()>=1&&!t.isUASTC()}function Ni(t){return t.getFaces()>=1&&t.isETC1S()}async function Ss(t,e,i){z(Q)&&(Q=await $i());const r=new Q.BasisFile(new Uint8Array(i));if(!Ci(r))return null;r.startTranscoding();const s=Fi(t,e,r.getNumLevels(0),r.getHasAlpha(),r.getImageWidth(0,0),r.getImageHeight(0,0),(a,n)=>r.getImageTranscodedSizeInBytes(0,a,n),(a,n,o)=>r.transcodeImage(o,0,a,n,0,0));return r.close(),r.delete(),s}async function As(t,e,i){z(Q)&&(Q=await $i());const r=new Q.KTX2File(new Uint8Array(i));if(!Ni(r))return null;r.startTranscoding();const s=Fi(t,e,r.getLevels(),r.getHasAlpha(),r.getWidth(),r.getHeight(),(a,n)=>r.getImageTranscodedSizeInBytes(a,0,0,n),(a,n,o)=>r.transcodeImage(o,a,0,0,n,0,-1,-1));return r.close(),r.delete(),s}function Fi(t,e,i,r,s,a,n,o){const{compressedTextureETC:c,compressedTextureS3TC:l}=t.capabilities,[u,m]=c?r?[Ae.ETC2_RGBA,le.COMPRESSED_RGBA8_ETC2_EAC]:[Ae.ETC1_RGB,le.COMPRESSED_RGB8_ETC2]:l?r?[Ae.BC3_RGBA,le.COMPRESSED_RGBA_S3TC_DXT5_EXT]:[Ae.BC1_RGB,le.COMPRESSED_RGB_S3TC_DXT1_EXT]:[Ae.RGBA32,ue.RGBA],h=e.hasMipmap?i:Math.min(1,i),p=[];for(let g=0;g<h;g++)p.push(new Uint8Array(n(g,u))),o(g,u,p[g]);const v=p.length>1,S=v?he.LINEAR_MIPMAP_LINEAR:he.LINEAR,T={...e,samplingMode:S,hasMipmap:v,internalFormat:m,width:s,height:a};return new ae(t,T,{type:"compressed",levels:p})}const Ge=li.getLogger("esri.views.3d.webgl-engine.lib.DDSUtil"),Ms=542327876,ws=131072,Ps=4;function $t(t){return t.charCodeAt(0)+(t.charCodeAt(1)<<8)+(t.charCodeAt(2)<<16)+(t.charCodeAt(3)<<24)}function Os(t){return String.fromCharCode(255&t,t>>8&255,t>>16&255,t>>24&255)}const Rs=$t("DXT1"),Is=$t("DXT3"),Es=$t("DXT5"),ys=31,$s=0,Ls=1,Cs=2,Ns=3,Fs=4,Ds=7,zs=20,Hs=21;function Vs(t,e,i){const{textureData:r,internalFormat:s,width:a,height:n}=Bs(i,e.hasMipmap);return e.samplingMode=r.levels.length>1?he.LINEAR_MIPMAP_LINEAR:he.LINEAR,e.hasMipmap=r.levels.length>1,e.internalFormat=s,e.width=a,e.height=n,new ae(t,e,r)}function Bs(t,e){const i=new Int32Array(t,0,ys);if(i[$s]!==Ms)return Ge.error("Invalid magic number in DDS header"),null;if(!(i[zs]&Ps))return Ge.error("Unsupported format, must contain a FourCC code"),null;const r=i[Hs];let s,a;switch(r){case Rs:s=8,a=le.COMPRESSED_RGB_S3TC_DXT1_EXT;break;case Is:s=16,a=le.COMPRESSED_RGBA_S3TC_DXT3_EXT;break;case Es:s=16,a=le.COMPRESSED_RGBA_S3TC_DXT5_EXT;break;default:return Ge.error("Unsupported FourCC code:",Os(r)),null}let n=1,o=i[Fs],c=i[Ns];(3&o)==0&&(3&c)==0||(Ge.warn("Rounding up compressed texture size to nearest multiple of 4."),o=o+3&-4,c=c+3&-4);const l=o,u=c;let m,h;i[Cs]&ws&&e!==!1&&(n=Math.max(1,i[Ds])),n===1||et(o)&&et(c)||(Ge.warn("Ignoring mipmaps of non power of two sized compressed texture."),n=1);let p=i[Ls]+4;const v=[];for(let S=0;S<n;++S)h=(o+3>>2)*(c+3>>2)*s,m=new Uint8Array(t,p,h),v.push(m),p+=h,o=Math.max(1,o>>1),c=Math.max(1,c>>1);return{textureData:{type:"compressed",levels:v},internalFormat:a,width:l,height:u}}class k extends Et{constructor(e,i){super(),this.data=e,this.type=ke.Texture,this._glTexture=null,this._powerOfTwoStretchInfo=null,this._loadingPromise=null,this._loadingController=null,this.events=new nr,this.params=i||{},this.params.mipmap=this.params.mipmap!==!1,this.params.noUnpackFlip=this.params.noUnpackFlip||!1,this.params.preMultiplyAlpha=this.params.preMultiplyAlpha||!1,this.params.wrap=this.params.wrap||{s:qe.REPEAT,t:qe.REPEAT},this.params.powerOfTwoResizeMode=this.params.powerOfTwoResizeMode||nt.STRETCH,this.estimatedTexMemRequired=k._estimateTexMemRequired(this.data,this.params),this._startPreload()}_startPreload(){const e=this.data;z(e)||(e instanceof HTMLVideoElement?this._startPreloadVideoElement(e):e instanceof HTMLImageElement&&this._startPreloadImageElement(e))}_startPreloadVideoElement(e){if(!(zt(e.src)||e.preload==="auto"&&e.crossOrigin)){e.preload="auto",e.crossOrigin="anonymous";const i=!e.paused;if(e.src=e.src,i&&e.autoplay){const r=()=>{e.removeEventListener("canplay",r),e.play()};e.addEventListener("canplay",r)}}}_startPreloadImageElement(e){or(e.src)||zt(e.src)||e.crossOrigin||(e.crossOrigin="anonymous",e.src=e.src)}static _getDataDimensions(e){return e instanceof HTMLVideoElement?{width:e.videoWidth,height:e.videoHeight}:e}static _estimateTexMemRequired(e,i){if(z(e))return 0;if(Fe(e)||De(e))return i.encoding===k.KTX2_ENCODING?bs(e,i.mipmap):i.encoding===k.BASIS_ENCODING?Ts(e,i.mipmap):e.byteLength;const{width:r,height:s}=e instanceof Image||e instanceof ImageData||e instanceof HTMLCanvasElement||e instanceof HTMLVideoElement?k._getDataDimensions(e):i;return(i.mipmap?4/3:1)*r*s*(i.components||4)||0}dispose(){this.data=void 0}get width(){return this.params.width}get height(){return this.params.height}_createDescriptor(e){var i;return{target:vt.TEXTURE_2D,pixelFormat:ue.RGBA,dataType:_t.UNSIGNED_BYTE,wrapMode:this.params.wrap,flipped:!this.params.noUnpackFlip,samplingMode:this.params.mipmap?he.LINEAR_MIPMAP_LINEAR:he.LINEAR,hasMipmap:this.params.mipmap,preMultiplyAlpha:this.params.preMultiplyAlpha,maxAnisotropy:(i=this.params.maxAnisotropy)!=null?i:this.params.mipmap?e.parameters.maxMaxAnisotropy:1}}get glTexture(){return this._glTexture}load(e,i){if(O(this._glTexture))return this._glTexture;if(O(this._loadingPromise))return this._loadingPromise;const r=this.data;return z(r)?(this._glTexture=new ae(e,this._createDescriptor(e),null),this._glTexture):typeof r=="string"?this._loadFromURL(e,i,r):r instanceof Image?this._loadFromImageElement(e,i,r):r instanceof HTMLVideoElement?this._loadFromVideoElement(e,i,r):r instanceof ImageData||r instanceof HTMLCanvasElement?this._loadFromImage(e,r,i):(Fe(r)||De(r))&&this.params.encoding===k.DDS_ENCODING?(this.data=void 0,this._loadFromDDSData(e,r)):(Fe(r)||De(r))&&this.params.encoding===k.KTX2_ENCODING?(this.data=void 0,this._loadFromKTX2(e,r)):(Fe(r)||De(r))&&this.params.encoding===k.BASIS_ENCODING?(this.data=void 0,this._loadFromBasis(e,r)):De(r)?this._loadFromPixelData(e,r):Fe(r)?this._loadFromPixelData(e,new Uint8Array(r)):null}get requiresFrameUpdates(){return this.data instanceof HTMLVideoElement}frameUpdate(e,i,r){if(!(this.data instanceof HTMLVideoElement)||z(this._glTexture)||this.data.readyState<Ue.HAVE_CURRENT_DATA||r===this.data.currentTime)return r;if(O(this._powerOfTwoStretchInfo)){const{framebuffer:s,vao:a,sourceTexture:n}=this._powerOfTwoStretchInfo;n.setData(this.data),this._drawStretchedTexture(e,i,s,a,n,this._glTexture)}else{const{videoWidth:s,videoHeight:a}=this.data,{width:n,height:o}=this._glTexture.descriptor;s!==n||a!==o?this._glTexture.updateData(0,0,0,Math.min(s,n),Math.min(a,o),this.data):this._glTexture.setData(this.data)}return this._glTexture.descriptor.hasMipmap&&this._glTexture.generateMipmap(),this.params.updateCallback&&this.params.updateCallback(),this.data.currentTime}_loadFromDDSData(e,i){return this._glTexture=Vs(e,this._createDescriptor(e),i),this._glTexture}_loadFromKTX2(e,i){return this._loadAsync(()=>As(e,this._createDescriptor(e),i).then(r=>(this._glTexture=r,r)))}_loadFromBasis(e,i){return this._loadAsync(()=>Ss(e,this._createDescriptor(e),i).then(r=>(this._glTexture=r,r)))}_loadFromPixelData(e,i){U(this.params.width>0&&this.params.height>0);const r=this._createDescriptor(e);return r.pixelFormat=this.params.components===1?ue.LUMINANCE:this.params.components===3?ue.RGB:ue.RGBA,r.width=this.params.width,r.height=this.params.height,this._glTexture=new ae(e,r,i),this._glTexture}_loadFromURL(e,i,r){return this._loadAsync(async s=>{const a=await Sr(r,{signal:s});return Ht(s),this._loadFromImage(e,a,i)})}_loadFromImageElement(e,i,r){return r.complete?this._loadFromImage(e,r,i):this._loadAsync(async s=>{const a=await lr(r,r.src,!1,s);return Ht(s),this._loadFromImage(e,a,i)})}_loadFromVideoElement(e,i,r){return r.readyState>=Ue.HAVE_CURRENT_DATA?this._loadFromImage(e,r,i):this._loadFromVideoElementAsync(e,i,r)}_loadFromVideoElementAsync(e,i,r){return this._loadAsync(s=>new Promise((a,n)=>{const o=()=>{r.removeEventListener("loadeddata",c),r.removeEventListener("error",l),ur(u)},c=()=>{r.readyState>=Ue.HAVE_CURRENT_DATA&&(o(),a(this._loadFromImage(e,r,i)))},l=m=>{o(),n(m||new ci("Failed to load video"))};r.addEventListener("loadeddata",c),r.addEventListener("error",l);const u=cr(s,()=>l(dr()))}))}_loadFromImage(e,i,r){const s=k._getDataDimensions(i);this.params.width=s.width,this.params.height=s.height;const a=this._createDescriptor(e);return a.pixelFormat=this.params.components===3?ue.RGB:ue.RGBA,!this._requiresPowerOfTwo(e,a)||et(s.width)&&et(s.height)?(a.width=s.width,a.height=s.height,this._glTexture=new ae(e,a,i),this._glTexture):(this._glTexture=this._makePowerOfTwoTexture(e,i,s,a,r),this._glTexture)}_loadAsync(e){const i=new AbortController;this._loadingController=i;const r=e(i.signal);this._loadingPromise=r;const s=()=>{this._loadingController===i&&(this._loadingController=null),this._loadingPromise===r&&(this._loadingPromise=null)};return r.then(s,s),r}_requiresPowerOfTwo(e,i){const r=qe.CLAMP_TO_EDGE,s=typeof i.wrapMode=="number"?i.wrapMode===r:i.wrapMode.s===r&&i.wrapMode.t===r;return!Tr(e.gl)&&(i.hasMipmap||!s)}_makePowerOfTwoTexture(e,i,r,s,a){const{width:n,height:o}=r,c=Vt(n),l=Vt(o);let u;switch(s.width=c,s.height=l,this.params.powerOfTwoResizeMode){case nt.PAD:s.textureCoordinateScaleFactor=[n/c,o/l],u=new ae(e,s),u.updateData(0,0,0,n,o,i);break;case nt.STRETCH:case null:case void 0:u=this._stretchToPowerOfTwo(e,i,s,a());break;default:Rt(this.params.powerOfTwoResizeMode)}return s.hasMipmap&&u.generateMipmap(),u}_stretchToPowerOfTwo(e,i,r,s){const a=new ae(e,r),n=new Rr(e,{colorTarget:vr.TEXTURE,depthStencilTarget:_r.NONE},a),o=new ae(e,{target:vt.TEXTURE_2D,pixelFormat:r.pixelFormat,dataType:_t.UNSIGNED_BYTE,wrapMode:qe.CLAMP_TO_EDGE,samplingMode:he.LINEAR,flipped:!!r.flipped,maxAnisotropy:8,preMultiplyAlpha:r.preMultiplyAlpha},i),c=qr(e),l=e.getBoundFramebufferObject();return this._drawStretchedTexture(e,s,n,c,o,a),this.requiresFrameUpdates?this._powerOfTwoStretchInfo={vao:c,sourceTexture:o,framebuffer:n}:(c.dispose(!0),o.dispose(),n.detachColorTexture(),n.dispose()),e.bindFramebuffer(l),a}_drawStretchedTexture(e,i,r,s,a,n){e.bindFramebuffer(r);const o=e.getViewport();e.setViewport(0,0,n.descriptor.width,n.descriptor.height);const c=e.bindTechnique(i);c.setUniform4f("uColor",1,1,1,1),c.bindTexture("tex",a),e.bindVAO(s),e.drawArrays(fi.TRIANGLE_STRIP,0,Ir(s,"geometry")),e.bindFramebuffer(null),e.setViewport(o.x,o.y,o.width,o.height)}unload(){if(O(this._powerOfTwoStretchInfo)){const{framebuffer:e,vao:i,sourceTexture:r}=this._powerOfTwoStretchInfo;i.dispose(!0),r.dispose(),e.dispose(),this._glTexture=null,this._powerOfTwoStretchInfo=null}if(O(this._glTexture)&&(this._glTexture.dispose(),this._glTexture=null),O(this._loadingController)){const e=this._loadingController;this._loadingController=null,this._loadingPromise=null,e.abort()}this.events.emit("unloaded")}}var Ue;k.DDS_ENCODING="image/vnd-ms.dds",k.KTX2_ENCODING="image/ktx2",k.BASIS_ENCODING="image/x.basis",function(t){t[t.HAVE_NOTHING=0]="HAVE_NOTHING",t[t.HAVE_METADATA=1]="HAVE_METADATA",t[t.HAVE_CURRENT_DATA=2]="HAVE_CURRENT_DATA",t[t.HAVE_FUTURE_DATA=3]="HAVE_FUTURE_DATA",t[t.HAVE_ENOUGH_DATA=4]="HAVE_ENOUGH_DATA"}(Ue||(Ue={}));function Gs(t){t.vertex.code.add(d`float screenSizePerspectiveMinSize(float size, vec4 factor) {
float nonZeroSize = 1.0 - step(size, 0.0);
return (
factor.z * (
1.0 +
nonZeroSize *
2.0 * factor.w / (
size + (1.0 - nonZeroSize)
)
)
);
}`),t.vertex.code.add(d`float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {
return absCosAngle * absCosAngle * absCosAngle;
}`),t.vertex.code.add(d`vec4 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec4 params) {
return vec4(
min(params.x / (distanceToCamera - params.y), 1.0),
screenSizePerspectiveViewAngleDependentFactor(absCosAngle),
params.z,
params.w
);
}`),t.vertex.code.add(d`float applyScreenSizePerspectiveScaleFactorFloat(float size, vec4 factor) {
return max(mix(size * factor.x, size, factor.y), screenSizePerspectiveMinSize(size, factor));
}`),t.vertex.code.add(d`float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec4 params) {
return applyScreenSizePerspectiveScaleFactorFloat(
size,
screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)
);
}`),t.vertex.code.add(d`vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec4 factor) {
return mix(size * clamp(factor.x, screenSizePerspectiveMinSize(size.y, factor) / max(1e-5, size.y), 1.0), size, factor.y);
}`),t.vertex.code.add(d`vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec4 params) {
return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));
}`)}function An(t){t.uniforms.add(new G("screenSizePerspective",e=>Di(e.screenSizePerspective)))}function Us(t){t.uniforms.add(new G("screenSizePerspectiveAlignment",e=>Di(e.screenSizePerspectiveAlignment||e.screenSizePerspective)))}function Di(t){return K(Ws,t.parameters.divisor,t.parameters.offset,t.parameters.minPixelSize,t.paddingPixelsOverride)}const Ws=rt();function Mn(t,e){const i=t.vertex;e.hasVerticalOffset?(qs(i),e.hasScreenSizePerspective&&(t.include(Gs),Us(i),vs(t.vertex,e)),i.code.add(d`
      vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
        ${e.spherical?d`vec3 worldNormal = normalize(worldPos + localOrigin);`:d`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
        ${e.hasScreenSizePerspective?d`
            float cosAngle = dot(worldNormal, normalize(worldPos - cameraPosition));
            float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:d`
            float verticalOffsetScreenHeight = verticalOffset.x;`}
        // Screen sized offset in world space, used for example for line callouts
        float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
        return worldNormal * worldOffset;
      }

      vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        return worldPos + calculateVerticalOffset(worldPos, localOrigin);
      }
    `)):i.code.add(d`vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }`)}const ks=rt();function qs(t){t.uniforms.add(new G("verticalOffset",(e,i)=>{const{minWorldLength:r,maxWorldLength:s,screenLength:a}=e.verticalOffset,n=Math.tan(.5*i.camera.fovY)/(.5*i.camera.fullViewport[3]),o=i.camera.pixelRatio||1;return K(ks,a*o,n,r,s)}))}class wn extends cs{constructor(e){super(e),this._numLoading=0,this._disposed=!1,this._textureRepository=e.textureRep,this._textureId=e.textureId,this._acquire(e.textureId,i=>this._texture=i),this._acquire(e.normalTextureId,i=>this._textureNormal=i),this._acquire(e.emissiveTextureId,i=>this._textureEmissive=i),this._acquire(e.occlusionTextureId,i=>this._textureOcclusion=i),this._acquire(e.metallicRoughnessTextureId,i=>this._textureMetallicRoughness=i)}dispose(){this._texture=Te(this._texture),this._textureNormal=Te(this._textureNormal),this._textureEmissive=Te(this._textureEmissive),this._textureOcclusion=Te(this._textureOcclusion),this._textureMetallicRoughness=Te(this._textureMetallicRoughness),this._disposed=!0}ensureResources(e){return this._numLoading===0?xt.LOADED:xt.LOADING}get textureBindParameters(){return new Xs(O(this._texture)?this._texture.glTexture:null,O(this._textureNormal)?this._textureNormal.glTexture:null,O(this._textureEmissive)?this._textureEmissive.glTexture:null,O(this._textureOcclusion)?this._textureOcclusion.glTexture:null,O(this._textureMetallicRoughness)?this._textureMetallicRoughness.glTexture:null)}updateTexture(e){(z(this._texture)||e!==this._texture.id)&&(this._texture=Te(this._texture),this._textureId=e,this._acquire(this._textureId,i=>this._texture=i))}_acquire(e,i){if(z(e))return void i(null);const r=this._textureRepository.acquire(e);if(hr(r))return++this._numLoading,void r.then(s=>{if(this._disposed)return Te(s),void i(null);i(s)}).finally(()=>--this._numLoading);i(r)}}class Xs extends st{constructor(e=null,i=null,r=null,s=null,a=null){super(),this.texture=e,this.textureNormal=i,this.textureEmissive=r,this.textureOcclusion=s,this.textureMetallicRoughness=a}}function js(t,e,i,r){const s=i.typedBuffer,a=i.typedBufferStride,n=t.length;r*=a;for(let o=0;o<n;++o){const c=2*t[o];s[r]=e[c],s[r+1]=e[c+1],r+=a}}function zi(t,e,i,r,s){const a=i.typedBuffer,n=i.typedBufferStride,o=t.length;if(r*=n,s==null||s===1)for(let c=0;c<o;++c){const l=3*t[c];a[r]=e[l],a[r+1]=e[l+1],a[r+2]=e[l+2],r+=n}else for(let c=0;c<o;++c){const l=3*t[c];for(let u=0;u<s;++u)a[r]=e[l],a[r+1]=e[l+1],a[r+2]=e[l+2],r+=n}}function Ks(t,e,i,r,s=1){const a=i.typedBuffer,n=i.typedBufferStride,o=t.length;if(r*=n,s===1)for(let c=0;c<o;++c){const l=4*t[c];a[r]=e[l],a[r+1]=e[l+1],a[r+2]=e[l+2],a[r+3]=e[l+3],r+=n}else for(let c=0;c<o;++c){const l=4*t[c];for(let u=0;u<s;++u)a[r]=e[l],a[r+1]=e[l+1],a[r+2]=e[l+2],a[r+3]=e[l+3],r+=n}}function Ys(t,e,i,r,s,a=1){if(!i)return void zi(t,e,r,s,a);const n=r.typedBuffer,o=r.typedBufferStride,c=t.length,l=i[0],u=i[1],m=i[2],h=i[4],p=i[5],v=i[6],S=i[8],T=i[9],g=i[10],D=i[12],M=i[13],A=i[14];if(s*=o,a===1)for(let y=0;y<c;++y){const _=3*t[y],x=e[_],b=e[_+1],w=e[_+2];n[s]=l*x+h*b+S*w+D,n[s+1]=u*x+p*b+T*w+M,n[s+2]=m*x+v*b+g*w+A,s+=o}else for(let y=0;y<c;++y){const _=3*t[y],x=e[_],b=e[_+1],w=e[_+2],L=l*x+h*b+S*w+D,F=u*x+p*b+T*w+M,E=m*x+v*b+g*w+A;for(let P=0;P<a;++P)n[s]=L,n[s+1]=F,n[s+2]=E,s+=o}}function Zs(t,e,i,r,s,a=1){if(!i)return void zi(t,e,r,s,a);const n=i,o=r.typedBuffer,c=r.typedBufferStride,l=t.length,u=n[0],m=n[1],h=n[2],p=n[4],v=n[5],S=n[6],T=n[8],g=n[9],D=n[10],M=!hi(n),A=1e-6,y=1-A;if(s*=c,a===1)for(let _=0;_<l;++_){const x=3*t[_],b=e[x],w=e[x+1],L=e[x+2];let F=u*b+p*w+T*L,E=m*b+v*w+g*L,P=h*b+S*w+D*L;if(M){const I=F*F+E*E+P*P;if(I<y&&I>A){const $=1/Math.sqrt(I);F*=$,E*=$,P*=$}}o[s+0]=F,o[s+1]=E,o[s+2]=P,s+=c}else for(let _=0;_<l;++_){const x=3*t[_],b=e[x],w=e[x+1],L=e[x+2];let F=u*b+p*w+T*L,E=m*b+v*w+g*L,P=h*b+S*w+D*L;if(M){const I=F*F+E*E+P*P;if(I<y&&I>A){const $=1/Math.sqrt(I);F*=$,E*=$,P*=$}}for(let I=0;I<a;++I)o[s+0]=F,o[s+1]=E,o[s+2]=P,s+=c}}function Qs(t,e,i,r,s,a=1){if(!i)return void Ks(t,e,r,s,a);const n=i,o=r.typedBuffer,c=r.typedBufferStride,l=t.length,u=n[0],m=n[1],h=n[2],p=n[4],v=n[5],S=n[6],T=n[8],g=n[9],D=n[10],M=!hi(n),A=1e-6,y=1-A;if(s*=c,a===1)for(let _=0;_<l;++_){const x=4*t[_],b=e[x],w=e[x+1],L=e[x+2],F=e[x+3];let E=u*b+p*w+T*L,P=m*b+v*w+g*L,I=h*b+S*w+D*L;if(M){const $=E*E+P*P+I*I;if($<y&&$>A){const V=1/Math.sqrt($);E*=V,P*=V,I*=V}}o[s+0]=E,o[s+1]=P,o[s+2]=I,o[s+3]=F,s+=c}else for(let _=0;_<l;++_){const x=4*t[_],b=e[x],w=e[x+1],L=e[x+2],F=e[x+3];let E=u*b+p*w+T*L,P=m*b+v*w+g*L,I=h*b+S*w+D*L;if(M){const $=E*E+P*P+I*I;if($<y&&$>A){const V=1/Math.sqrt($);E*=V,P*=V,I*=V}}for(let $=0;$<a;++$)o[s+0]=E,o[s+1]=P,o[s+2]=I,o[s+3]=F,s+=c}}function Jt(t,e,i,r,s,a=1){const n=r.typedBuffer,o=r.typedBufferStride,c=t.length;if(s*=o,a===1){if(i===4)for(let l=0;l<c;++l){const u=4*t[l];n[s]=e[u],n[s+1]=e[u+1],n[s+2]=e[u+2],n[s+3]=e[u+3],s+=o}else if(i===3)for(let l=0;l<c;++l){const u=3*t[l];n[s]=e[u],n[s+1]=e[u+1],n[s+2]=e[u+2],n[s+3]=255,s+=o}}else if(i===4)for(let l=0;l<c;++l){const u=4*t[l];for(let m=0;m<a;++m)n[s]=e[u],n[s+1]=e[u+1],n[s+2]=e[u+2],n[s+3]=e[u+3],s+=o}else if(i===3)for(let l=0;l<c;++l){const u=3*t[l];for(let m=0;m<a;++m)n[s]=e[u],n[s+1]=e[u+1],n[s+2]=e[u+2],n[s+3]=255,s+=o}}function Pn(t,e,i,r,s,a){for(const n of e.fieldNames){const o=t.vertexAttributes.get(n),c=t.indices.get(n);if(o&&c)switch(n){case f.POSITION:{U(o.size===3);const l=s.getField(n,kt);l&&Ys(c,o.data,i,l,a);break}case f.NORMAL:{U(o.size===3);const l=s.getField(n,kt);l&&Zs(c,o.data,r,l,a);break}case f.UV0:{U(o.size===2);const l=s.getField(n,yr);l&&js(c,o.data,l,a);break}case f.COLOR:{U(o.size===3||o.size===4);const l=s.getField(n,Wt);l&&Jt(c,o.data,o.size,l,a);break}case f.SYMBOLCOLOR:{U(o.size===3||o.size===4);const l=s.getField(n,Wt);l&&Jt(c,o.data,o.size,l,a);break}case f.TANGENT:{U(o.size===4);const l=s.getField(n,Er);l&&Qs(c,o.data,r,l,a);break}}}}const Js=mi(1,1,0,1),ea=mi(1,0,1,1);function On(t){t.fragment.uniforms.add(new at("depthTex",(e,i)=>i.highlightDepthTexture)),t.fragment.uniforms.add(new We("highlightViewportPixelSz",(e,i)=>i.inverseViewport)),t.fragment.constants.add("occludedHighlightFlag","vec4",Js).add("unoccludedHighlightFlag","vec4",ea),t.fragment.code.add(d`void outputHighlight() {
vec4 fragCoord = gl_FragCoord;
float sceneDepth = texture2D(depthTex, fragCoord.xy * highlightViewportPixelSz.xy).r;
if (fragCoord.z > sceneDepth + 5e-7) {
gl_FragColor = occludedHighlightFlag;
}
else {
gl_FragColor = unoccludedHighlightFlag;
}
}`)}class Lt extends H{constructor(e,i){super(e,"mat3",R.Pass,(r,s,a)=>r.setUniformMatrix3fv(e,i(s,a)))}}function Rn(t,e){e.hasVvInstancing&&(e.vvSize||e.vvColor)&&t.attributes.add(f.INSTANCEFEATUREATTRIBUTE,"vec4");const i=t.vertex;e.vvSize?(i.uniforms.add(new B("vvSizeMinSize",r=>r.vvSizeMinSize)),i.uniforms.add(new B("vvSizeMaxSize",r=>r.vvSizeMaxSize)),i.uniforms.add(new B("vvSizeOffset",r=>r.vvSizeOffset)),i.uniforms.add(new B("vvSizeFactor",r=>r.vvSizeFactor)),i.uniforms.add(new Lt("vvSymbolRotationMatrix",r=>r.vvSymbolRotationMatrix)),i.uniforms.add(new B("vvSymbolAnchor",r=>r.vvSymbolAnchor)),i.code.add(d`vec3 vvScale(vec4 _featureAttribute) {
return clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);
}
vec4 vvTransformPosition(vec3 position, vec4 _featureAttribute) {
return vec4(vvSymbolRotationMatrix * ( vvScale(_featureAttribute) * (position + vvSymbolAnchor)), 1.0);
}`),i.code.add(d`
      const float eps = 1.192092896e-07;
      vec4 vvTransformNormal(vec3 _normal, vec4 _featureAttribute) {
        vec3 vvScale = clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize + eps, vvSizeMaxSize);
        return vec4(vvSymbolRotationMatrix * _normal / vvScale, 1.0);
      }

      ${e.hasVvInstancing?d`
      vec4 vvLocalNormal(vec3 _normal) {
        return vvTransformNormal(_normal, instanceFeatureAttribute);
      }

      vec4 localPosition() {
        return vvTransformPosition(position, instanceFeatureAttribute);
      }`:""}
    `)):i.code.add(d`vec4 localPosition() { return vec4(position, 1.0); }
vec4 vvLocalNormal(vec3 _normal) { return vec4(_normal, 1.0); }`),e.vvColor?(i.constants.add("vvColorNumber","int",ct),e.hasVvInstancing&&i.uniforms.add([new ps("vvColorValues",r=>r.vvColorValues,ct),new fs("vvColorColors",r=>r.vvColorColors,ct)]),i.code.add(d`
      vec4 vvGetColor(vec4 featureAttribute, float values[vvColorNumber], vec4 colors[vvColorNumber]) {
        float value = featureAttribute.y;
        if (value <= values[0]) {
          return colors[0];
        }

        for (int i = 1; i < vvColorNumber; ++i) {
          if (values[i] >= value) {
            float f = (value - values[i-1]) / (values[i] - values[i-1]);
            return mix(colors[i-1], colors[i], f);
          }
        }
        return colors[vvColorNumber - 1];
      }

      ${e.hasVvInstancing?d`
      vec4 vvColor() {
        return vvGetColor(instanceFeatureAttribute, vvColorValues, vvColorColors);
      }`:""}
    `)):i.code.add(d`vec4 vvColor() { return vec4(1.0); }`)}function In(t,e={hasModelTransformation:!1,linearDepth:!1}){if(e.hasModelTransformation)return e.linearDepth?void t.vertex.code.add(d`vec4 transformPositionWithDepth(mat4 proj, mat4 view, mat4 model, vec3 pos, vec2 nearFar, out float depth) {
vec4 eye = view * (model * vec4(pos, 1.0));
depth = (-eye.z - nearFar[0]) / (nearFar[1] - nearFar[0]) ;
return proj * eye;
}`):void t.vertex.code.add(d`vec4 transformPosition(mat4 proj, mat4 view, mat4 model, vec3 pos) {
return proj * (view * (model * vec4(pos, 1.0)));
}`);e.linearDepth?t.vertex.code.add(d`vec4 transformPositionWithDepth(mat4 proj, mat4 view, vec3 pos, vec2 nearFar, out float depth) {
vec4 eye = view * vec4(pos, 1.0);
depth = (-eye.z - nearFar[0]) / (nearFar[1] - nearFar[0]) ;
return proj * eye;
}`):t.vertex.code.add(d`vec4 transformPosition(mat4 proj, mat4 view, vec3 pos) {
return proj * (view * vec4(pos, 1.0));
}`)}function En(t,e){e.hasVertexColors?(t.attributes.add(f.COLOR,"vec4"),t.varyings.add("vColor","vec4"),t.vertex.code.add(d`void forwardVertexColor() { vColor = color; }`),t.vertex.code.add(d`void forwardNormalizedVertexColor() { vColor = color * 0.003921568627451; }`)):t.vertex.code.add(d`void forwardVertexColor() {}
void forwardNormalizedVertexColor() {}`)}class ta{constructor(e=C()){this.intensity=e}}class ia{constructor(e=C(),i=ne(.57735,.57735,.57735)){this.intensity=e,this.direction=i}}class ei{constructor(e=C(),i=ne(.57735,.57735,.57735),r=!0,s=1,a=1){this.intensity=e,this.direction=i,this.castShadows=r,this.specularStrength=s,this.environmentStrength=a}}class Hi{constructor(){this.r=[0],this.g=[0],this.b=[0]}}function ra(t,e,i){(i=i||t).length=t.length;for(let r=0;r<t.length;r++)i[r]=t[r]*e[r];return i}function ut(t,e,i){(i=i||t).length=t.length;for(let r=0;r<t.length;r++)i[r]=t[r]*e;return i}function Oe(t,e,i){(i=i||t).length=t.length;for(let r=0;r<t.length;r++)i[r]=t[r]+e[r];return i}function Vi(t){return(t+1)*(t+1)}function sa(t){return Mt(Math.floor(Math.sqrt(t)-1),0,2)}function Bi(t,e,i){const r=t[0],s=t[1],a=t[2],n=i||[];return n.length=Vi(e),e>=0&&(n[0]=.28209479177),e>=1&&(n[1]=.4886025119*r,n[2]=.4886025119*a,n[3]=.4886025119*s),e>=2&&(n[4]=1.09254843059*r*s,n[5]=1.09254843059*s*a,n[6]=.31539156525*(3*a*a-1),n[7]=1.09254843059*r*a,n[8]=.54627421529*(r*r-s*s)),n}function aa(t,e){const i=Vi(t),r=e||{r:[],g:[],b:[]};r.r.length=r.g.length=r.b.length=i;for(let s=0;s<i;s++)r.r[s]=r.g[s]=r.b[s]=0;return r}function na(t,e){const i=sa(e.r.length);for(const r of t)mr(At,r.direction),Bi(At,i,oe),ra(oe,Je),ut(oe,r.intensity[0],Pe),Oe(e.r,Pe),ut(oe,r.intensity[1],Pe),Oe(e.g,Pe),ut(oe,r.intensity[2],Pe),Oe(e.b,Pe);return e}function oa(t,e){Bi(At,0,oe);for(const i of t)e.r[0]+=oe[0]*Je[0]*i.intensity[0]*4*Math.PI,e.g[0]+=oe[0]*Je[0]*i.intensity[1]*4*Math.PI,e.b[0]+=oe[0]*Je[0]*i.intensity[2]*4*Math.PI;return e}function la(t,e,i,r){aa(e,r),de(i.intensity,0,0,0);let s=!1;const a=ca,n=da,o=ua;a.length=0,n.length=0,o.length=0;for(const c of t)c instanceof ei&&!s?(tt(i.direction,c.direction),tt(i.intensity,c.intensity),i.specularStrength=c.specularStrength,i.environmentStrength=c.environmentStrength,i.castShadows=c.castShadows,s=!0):c instanceof ei||c instanceof ia?a.push(c):c instanceof ta?n.push(c):c instanceof Hi&&o.push(c);na(a,r),oa(n,r);for(const c of o)Oe(r.r,c.r),Oe(r.g,c.g),Oe(r.b,c.b)}const ca=[],da=[],ua=[],oe=[0],Pe=[0],At=C(),Je=[3.141593,2.094395,2.094395,2.094395,.785398,.785398,.785398,.785398,.785398],ha=.4;class yn{constructor(){this._shOrder=2,this._oldSunlight={direction:C(),ambient:{color:C(),intensity:1},diffuse:{color:C(),intensity:1}},this.globalFactor=.5,this.groundLightingFactor=.5,this._sphericalHarmonics=new Hi,this._mainLight={intensity:C(),direction:ne(1,0,0),castShadows:!1,specularStrength:1,environmentStrength:1}}get sh(){return this._sphericalHarmonics}get mainLight(){return this._mainLight}get lightingMainDirection(){return this._mainLight.direction}set(e){la(e,this._shOrder,this._mainLight,this._sphericalHarmonics),tt(this._oldSunlight.direction,this._mainLight.direction);const i=1/Math.PI;this._oldSunlight.ambient.color[0]=.282095*this._sphericalHarmonics.r[0]*i,this._oldSunlight.ambient.color[1]=.282095*this._sphericalHarmonics.g[0]*i,this._oldSunlight.ambient.color[2]=.282095*this._sphericalHarmonics.b[0]*i,Bt(this._oldSunlight.diffuse.color,this._mainLight.intensity,i),tt(Ye,this._oldSunlight.diffuse.color),Bt(Ye,Ye,ha*this.globalFactor),Pt(this._oldSunlight.ambient.color,this._oldSunlight.ambient.color,Ye)}get old(){return this._oldSunlight}}const Ye=C();class $n{constructor(){this._transform=Me(),this._transformInverse=new Ze({value:this._transform},ui,Me),this._transformInverseTranspose=new Ze(this._transformInverse,ft,Me),this._transformTranspose=new Ze({value:this._transform},ft,Me),this._transformInverseRotation=new Ze({value:this._transform},fr,Ee)}_invalidateLazyTransforms(){this._transformInverse.invalidate(),this._transformInverseTranspose.invalidate(),this._transformTranspose.invalidate(),this._transformInverseRotation.invalidate()}get transform(){return this._transform}get inverse(){return this._transformInverse.value}get inverseTranspose(){return this._transformInverseTranspose.value}get inverseRotation(){return this._transformInverseRotation.value}get transpose(){return this._transformTranspose.value}setTransformMatrix(e){mt(this._transform,e)}multiplyTransform(e){di(this._transform,this._transform,e)}set(e){mt(this._transform,e),this._invalidateLazyTransforms()}setAndInvalidateLazyTransforms(e,i){this.setTransformMatrix(e),this.multiplyTransform(i),this._invalidateLazyTransforms()}}class Ze{constructor(e,i,r){this.original=e,this.update=i,this.dirty=!0,this.transform=r()}invalidate(){this.dirty=!0}get value(){return this.dirty&&(this.update(this.transform,this.original.value),this.dirty=!1),this.transform}}class ma{constructor(e=0){this.componentLocalOriginLength=0,this._tmpVertex=C(),this._mbs=pi(),this._obb={center:C(),halfSize:Tt(),quaternion:null},this._totalOffset=0,this._offset=0,this._resetOffset(e)}_resetOffset(e){this._offset=e,this._totalOffset=e}set offset(e){this._resetOffset(e)}get offset(){return this._offset}set componentOffset(e){this._totalOffset=this._offset+e}set localOrigin(e){this.componentLocalOriginLength=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2])}applyToVertex(e,i,r){const s=e,a=i,n=r+this.componentLocalOriginLength,o=this._totalOffset/Math.sqrt(s*s+a*a+n*n);return this._tmpVertex[0]=e+s*o,this._tmpVertex[1]=i+a*o,this._tmpVertex[2]=r+n*o,this._tmpVertex}applyToAabb(e){const i=e[0],r=e[1],s=e[2]+this.componentLocalOriginLength,a=e[3],n=e[4],o=e[5]+this.componentLocalOriginLength,c=i*a<0?0:Math.min(Math.abs(i),Math.abs(a)),l=r*n<0?0:Math.min(Math.abs(r),Math.abs(n)),u=s*o<0?0:Math.min(Math.abs(s),Math.abs(o)),m=Math.sqrt(c*c+l*l+u*u);if(m<this._totalOffset)return e[0]-=i<0?this._totalOffset:0,e[1]-=r<0?this._totalOffset:0,e[2]-=s<0?this._totalOffset:0,e[3]+=a>0?this._totalOffset:0,e[4]+=n>0?this._totalOffset:0,e[5]+=o>0?this._totalOffset:0,e;const h=Math.max(Math.abs(i),Math.abs(a)),p=Math.max(Math.abs(r),Math.abs(n)),v=Math.max(Math.abs(s),Math.abs(o)),S=Math.sqrt(h*h+p*p+v*v),T=this._totalOffset/S,g=this._totalOffset/m;return e[0]+=i*(i>0?T:g),e[1]+=r*(r>0?T:g),e[2]+=s*(s>0?T:g),e[3]+=a*(a<0?T:g),e[4]+=n*(n<0?T:g),e[5]+=o*(o<0?T:g),e}applyToMbs(e){const i=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]),r=this._totalOffset/i;return this._mbs[0]=e[0]+e[0]*r,this._mbs[1]=e[1]+e[1]*r,this._mbs[2]=e[2]+e[2]*r,this._mbs[3]=e[3]+e[3]*this._totalOffset/i,this._mbs}applyToObb(e){const i=e.center,r=this._totalOffset/Math.sqrt(i[0]*i[0]+i[1]*i[1]+i[2]*i[2]);this._obb.center[0]=i[0]+i[0]*r,this._obb.center[1]=i[1]+i[1]*r,this._obb.center[2]=i[2]+i[2]*r,Gt(this._obb.halfSize,e.halfSize,e.quaternion),Pt(this._obb.halfSize,this._obb.halfSize,e.center);const s=this._totalOffset/Math.sqrt(this._obb.halfSize[0]*this._obb.halfSize[0]+this._obb.halfSize[1]*this._obb.halfSize[1]+this._obb.halfSize[2]*this._obb.halfSize[2]);return this._obb.halfSize[0]+=this._obb.halfSize[0]*s,this._obb.halfSize[1]+=this._obb.halfSize[1]*s,this._obb.halfSize[2]+=this._obb.halfSize[2]*s,Ot(this._obb.halfSize,this._obb.halfSize,e.center),Lr(ii,e.quaternion),Gt(this._obb.halfSize,this._obb.halfSize,ii),this._obb.halfSize[0]*=this._obb.halfSize[0]<0?-1:1,this._obb.halfSize[1]*=this._obb.halfSize[1]<0?-1:1,this._obb.halfSize[2]*=this._obb.halfSize[2]<0?-1:1,this._obb.quaternion=e.quaternion,this._obb}}class fa{constructor(e=0){this.offset=e,this.sphere=pi(),this.tmpVertex=C()}applyToVertex(e,i,r){const s=this.objectTransform.transform;let a=s[0]*e+s[4]*i+s[8]*r+s[12],n=s[1]*e+s[5]*i+s[9]*r+s[13],o=s[2]*e+s[6]*i+s[10]*r+s[14];const c=this.offset/Math.sqrt(a*a+n*n+o*o);a+=a*c,n+=n*c,o+=o*c;const l=this.objectTransform.inverse;return this.tmpVertex[0]=l[0]*a+l[4]*n+l[8]*o+l[12],this.tmpVertex[1]=l[1]*a+l[5]*n+l[9]*o+l[13],this.tmpVertex[2]=l[2]*a+l[6]*n+l[10]*o+l[14],this.tmpVertex}applyToMinMax(e,i){const r=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*r,e[1]+=e[1]*r,e[2]+=e[2]*r;const s=this.offset/Math.sqrt(i[0]*i[0]+i[1]*i[1]+i[2]*i[2]);i[0]+=i[0]*s,i[1]+=i[1]*s,i[2]+=i[2]*s}applyToAabb(e){const i=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*i,e[1]+=e[1]*i,e[2]+=e[2]*i;const r=this.offset/Math.sqrt(e[3]*e[3]+e[4]*e[4]+e[5]*e[5]);return e[3]+=e[3]*r,e[4]+=e[4]*r,e[5]+=e[5]*r,e}applyToBoundingSphere(e){const i=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]),r=this.offset/i;return this.sphere[0]=e[0]+e[0]*r,this.sphere[1]=e[1]+e[1]*r,this.sphere[2]=e[2]+e[2]*r,this.sphere[3]=e[3]+e[3]*this.offset/i,this.sphere}}const ti=new fa;function Ln(t){return O(t)?(ti.offset=t,ti):null}new ma;const ii=$r();function pa(t){const e=d`vec3 decodeNormal(vec2 f) {
float z = 1.0 - abs(f.x) - abs(f.y);
return vec3(f + sign(f) * min(z, 0.0), z);
}`;t.fragment.code.add(e),t.vertex.code.add(e)}function ga(t,e){e.normalType===me.Attribute&&(t.attributes.add(f.NORMAL,"vec3"),t.vertex.code.add(d`vec3 normalModel() {
return normal;
}`)),e.normalType===me.CompressedAttribute&&(t.include(pa),t.attributes.add(f.NORMALCOMPRESSED,"vec2"),t.vertex.code.add(d`vec3 normalModel() {
return decodeNormal(normalCompressed);
}`)),e.normalType===me.ScreenDerivative&&(t.extensions.add("GL_OES_standard_derivatives"),t.fragment.code.add(d`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`))}var me;(function(t){t[t.Attribute=0]="Attribute",t[t.CompressedAttribute=1]="CompressedAttribute",t[t.Ground=2]="Ground",t[t.ScreenDerivative=3]="ScreenDerivative",t[t.COUNT=4]="COUNT"})(me||(me={}));function va(t){t.attributes.add(f.POSITION,"vec3"),t.vertex.code.add(d`vec3 positionModel() { return position; }`)}function _a({code:t},e){e.doublePrecisionRequiresObfuscation?t.add(d`vec3 dpPlusFrc(vec3 a, vec3 b) {
return mix(a, a + b, vec3(notEqual(b, vec3(0))));
}
vec3 dpMinusFrc(vec3 a, vec3 b) {
return mix(vec3(0), a - b, vec3(notEqual(a, b)));
}
vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = dpPlusFrc(hiA, hiB);
vec3 e = dpMinusFrc(t1, hiA);
vec3 t2 = dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;
return t1 + t2;
}`):t.add(d`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = hiA + hiB;
vec3 e = t1 - hiA;
vec3 t2 = ((hiB - e) + (hiA - (t1 - e))) + loA + loB;
return t1 + t2;
}`)}function Cn(t){return!!pr("force-double-precision-obfuscation")||t.driverTest.doublePrecisionRequiresObfuscation}class Gi extends H{constructor(e,i){super(e,"mat3",R.Draw,(r,s,a)=>r.setUniformMatrix3fv(e,i(s,a)))}}function Ui(t,e){t.include(va);const i=t.vertex;i.include(_a,e),t.varyings.add("vPositionWorldCameraRelative","vec3"),t.varyings.add("vPosition_view","vec3"),i.uniforms.add([new B("transformWorldFromViewTH",r=>r.transformWorldFromViewTH),new B("transformWorldFromViewTL",r=>r.transformWorldFromViewTL),new Lt("transformViewFromCameraRelativeRS",r=>r.transformViewFromCameraRelativeRS),new bt("transformProjFromView",r=>r.transformProjFromView),new Gi("transformWorldFromModelRS",r=>r.transformWorldFromModelRS),new ce("transformWorldFromModelTH",r=>r.transformWorldFromModelTH),new ce("transformWorldFromModelTL",r=>r.transformWorldFromModelTL)]),i.code.add(d`vec3 positionWorldCameraRelative() {
vec3 rotatedModelPosition = transformWorldFromModelRS * positionModel();
vec3 transform_CameraRelativeFromModel = dpAdd(
transformWorldFromModelTL,
transformWorldFromModelTH,
-transformWorldFromViewTL,
-transformWorldFromViewTH
);
return transform_CameraRelativeFromModel + rotatedModelPosition;
}`),i.code.add(d`
    void forwardPosition(float fOffset) {
      vPositionWorldCameraRelative = positionWorldCameraRelative();
      if (fOffset != 0.0) {
        vPositionWorldCameraRelative += fOffset * ${e.spherical?d`normalize(transformWorldFromViewTL + vPositionWorldCameraRelative)`:d`vec3(0.0, 0.0, 1.0)`};
      }

      vPosition_view = transformViewFromCameraRelativeRS * vPositionWorldCameraRelative;
      gl_Position = transformProjFromView * vec4(vPosition_view, 1.0);
    }
  `),t.fragment.uniforms.add(new B("transformWorldFromViewTL",r=>r.transformWorldFromViewTL)),i.code.add(d`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`),t.fragment.code.add(d`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`)}class xa extends st{constructor(){super(...arguments),this.transformWorldFromViewTH=C(),this.transformWorldFromViewTL=C(),this.transformViewFromCameraRelativeRS=Ee(),this.transformProjFromView=Me()}}class Ta extends st{constructor(){super(...arguments),this.transformWorldFromModelRS=Ee(),this.transformWorldFromModelTH=Tt(),this.transformWorldFromModelTL=Tt()}}function Nn(t,e){e.normalType===me.Attribute||e.normalType===me.CompressedAttribute?(t.include(ga,e),t.varyings.add("vNormalWorld","vec3"),t.varyings.add("vNormalView","vec3"),t.vertex.uniforms.add([new Gi("transformNormalGlobalFromModel",i=>i.transformNormalGlobalFromModel),new Lt("transformNormalViewFromGlobal",i=>i.transformNormalViewFromGlobal)]),t.vertex.code.add(d`void forwardNormal() {
vNormalWorld = transformNormalGlobalFromModel * normalModel();
vNormalView = transformNormalViewFromGlobal * vNormalWorld;
}`)):e.normalType===me.Ground?(t.include(Ui,e),t.varyings.add("vNormalWorld","vec3"),t.vertex.code.add(d`
    void forwardNormal() {
      vNormalWorld = ${e.spherical?d`normalize(vPositionWorldCameraRelative);`:d`vec3(0.0, 0.0, 1.0);`}
    }
    `)):t.vertex.code.add(d`void forwardNormal() {}`)}class Fn extends xa{constructor(){super(...arguments),this.transformNormalViewFromGlobal=Ee()}}class Dn extends Ta{constructor(){super(...arguments),this.transformNormalGlobalFromModel=Ee(),this.toMapSpace=rt()}}var ee;function ba(t,e){switch(e.textureCoordinateType){case ee.Default:return t.attributes.add(f.UV0,"vec2"),t.varyings.add("vuv0","vec2"),void t.vertex.code.add(d`void forwardTextureCoordinates() {
vuv0 = uv0;
}`);case ee.Atlas:return t.attributes.add(f.UV0,"vec2"),t.varyings.add("vuv0","vec2"),t.attributes.add(f.UVREGION,"vec4"),t.varyings.add("vuvRegion","vec4"),void t.vertex.code.add(d`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`);case ee.None:return void t.vertex.code.add(d`void forwardTextureCoordinates() {}`);default:Rt(e.textureCoordinateType);case ee.COUNT:return}}(function(t){t[t.None=0]="None",t[t.Default=1]="Default",t[t.Atlas=2]="Atlas",t[t.COUNT=3]="COUNT"})(ee||(ee={}));function Sa(t){t.extensions.add("GL_EXT_shader_texture_lod"),t.extensions.add("GL_OES_standard_derivatives"),t.fragment.code.add(d`#ifndef GL_EXT_shader_texture_lod
float calcMipMapLevel(const vec2 ddx, const vec2 ddy) {
float deltaMaxSqr = max(dot(ddx, ddx), dot(ddy, ddy));
return max(0.0, 0.5 * log2(deltaMaxSqr));
}
#endif
vec4 textureAtlasLookup(sampler2D texture, vec2 textureSize, vec2 textureCoordinates, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;
float maxdUV = 0.125;
vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
#ifdef GL_EXT_shader_texture_lod
return texture2DGradEXT(texture, uvAtlas, dUVdx, dUVdy);
#else
vec2 dUVdxAuto = dFdx(uvAtlas);
vec2 dUVdyAuto = dFdy(uvAtlas);
float mipMapLevel = calcMipMapLevel(dUVdx * textureSize, dUVdy * textureSize);
float autoMipMapLevel = calcMipMapLevel(dUVdxAuto * textureSize, dUVdyAuto * textureSize);
return texture2D(texture, uvAtlas, mipMapLevel - autoMipMapLevel);
#endif
}`)}function Aa(t,e){switch(t.include(ba,e),t.fragment.code.add(d`
  struct TextureLookupParameter {
    vec2 uv;
    ${e.supportsTextureAtlas?"vec2 size;":""}
  } vtc;
  `),e.textureCoordinateType){case ee.Default:return void t.fragment.code.add(d`vec4 textureLookup(sampler2D texture, TextureLookupParameter params) {
return texture2D(texture, params.uv);
}`);case ee.Atlas:return t.include(Sa),void t.fragment.code.add(d`vec4 textureLookup(sampler2D texture, TextureLookupParameter params) {
return textureAtlasLookup(texture, params.size, params.uv, vuvRegion);
}`);default:Rt(e.textureCoordinateType);case ee.None:case ee.COUNT:return}}class Ma extends H{constructor(e,i){super(e,"vec2",R.Draw,(r,s,a)=>r.setUniform2fv(e,i(s,a)))}}class wa extends H{constructor(e,i){super(e,"sampler2D",R.Draw,(r,s,a)=>r.bindTexture(e,i(s,a)))}}function ht(t,e,i){const r=[new wa(t,e)];if(i){const s=t+"Size";r.push(new Ma(s,(a,n)=>{const o=e(a,n);return O(o)?ai(Pa,o.descriptor.width,o.descriptor.height):ni}))}return r}const Pa=oi();Cr(0,.6,.2);var q;(function(t){t[t.Disabled=0]="Disabled",t[t.Normal=1]="Normal",t[t.Schematic=2]="Schematic",t[t.Water=3]="Water",t[t.WaterOnIntegratedMesh=4]="WaterOnIntegratedMesh",t[t.COUNT=5]="COUNT"})(q||(q={}));function zn(t,e){const i=t.fragment,r=e.hasMetalnessAndRoughnessTexture||e.hasEmissionTexture||e.hasOcclusionTexture;if(e.pbrMode===q.Normal&&r&&t.include(Aa,e),e.pbrMode!==q.Schematic)if(e.pbrMode!==q.Disabled){if(e.pbrMode===q.Normal){i.code.add(d`vec3 mrr;
vec3 emission;
float occlusion;`);const s=e.supportsTextureAtlas,a=e.pbrTextureBindType;e.hasMetalnessAndRoughnessTexture&&(i.uniforms.add(a===R.Pass?ot("texMetallicRoughness",n=>n.textureMetallicRoughness,s):ht("texMetallicRoughness",n=>n.textureMetallicRoughness,s)),i.code.add(d`void applyMetallnessAndRoughness(TextureLookupParameter params) {
vec3 metallicRoughness = textureLookup(texMetallicRoughness, params).rgb;
mrr[0] *= metallicRoughness.b;
mrr[1] *= metallicRoughness.g;
}`)),e.hasEmissionTexture&&(i.uniforms.add(a===R.Pass?ot("texEmission",n=>n.textureEmissive,s):ht("texEmission",n=>n.textureEmissive,s)),i.code.add(d`void applyEmission(TextureLookupParameter params) {
emission *= textureLookup(texEmission, params).rgb;
}`)),e.hasOcclusionTexture?(i.uniforms.add(a===R.Pass?ot("texOcclusion",n=>n.textureOcclusion,s):ht("texOcclusion",n=>n.textureOcclusion,s)),i.code.add(d`void applyOcclusion(TextureLookupParameter params) {
occlusion *= textureLookup(texOcclusion, params).r;
}
float getBakedOcclusion() {
return occlusion;
}`)):i.code.add(d`float getBakedOcclusion() { return 1.0; }`),i.uniforms.add(a===R.Pass?[new B("emissionFactor",n=>n.emissiveFactor),new B("mrrFactors",n=>n.mrrFactors)]:[new ce("emissionFactor",n=>n.emissiveFactor),new ce("mrrFactors",n=>n.mrrFactors)]),i.code.add(d`
    void applyPBRFactors() {
      mrr = mrrFactors;
      emission = emissionFactor;
      occlusion = 1.0;
      ${r?"vtc.uv = vuv0;":""}
      ${e.hasMetalnessAndRoughnessTexture?e.supportsTextureAtlas?"vtc.size = texMetallicRoughnessSize; applyMetallnessAndRoughness(vtc);":"applyMetallnessAndRoughness(vtc);":""}
      ${e.hasEmissionTexture?e.supportsTextureAtlas?"vtc.size = texEmissionSize; applyEmission(vtc);":"applyEmission(vtc);":""}
      ${e.hasOcclusionTexture?e.supportsTextureAtlas?"vtc.size = texOcclusionSize; applyOcclusion(vtc);":"applyOcclusion(vtc);":""}
    }
  `)}}else i.code.add(d`float getBakedOcclusion() { return 1.0; }`);else i.code.add(d`vec3 mrr = vec3(0.0, 0.6, 0.2);
vec3 emission = vec3(0.0);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`)}function Hn(t,e){e.output===we.Color&&e.receiveShadows?(t.varyings.add("linearDepth","float"),t.vertex.code.add(d`void forwardLinearDepth() { linearDepth = gl_Position.w; }`)):e.output===we.Depth||e.output===we.Shadow?(t.include(Ui,e),t.varyings.add("linearDepth","float"),t.vertex.uniforms.add(new We("nearFar",(i,r)=>r.camera.nearFar)),t.vertex.code.add(d`void forwardLinearDepth() {
linearDepth = (-vPosition_view.z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)):t.vertex.code.add(d`void forwardLinearDepth() {}`)}function Vn(t,e){const i=t.fragment,r=e.lightingSphericalHarmonicsOrder!==void 0?e.lightingSphericalHarmonicsOrder:2;r===0?(i.uniforms.add(new B("lightingAmbientSH0",(s,a)=>de(ri,a.lighting.sh.r[0],a.lighting.sh.g[0],a.lighting.sh.b[0]))),i.code.add(d`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):r===1?(i.uniforms.add([new G("lightingAmbientSH_R",(s,a)=>K(se,a.lighting.sh.r[0],a.lighting.sh.r[1],a.lighting.sh.r[2],a.lighting.sh.r[3])),new G("lightingAmbientSH_G",(s,a)=>K(se,a.lighting.sh.g[0],a.lighting.sh.g[1],a.lighting.sh.g[2],a.lighting.sh.g[3])),new G("lightingAmbientSH_B",(s,a)=>K(se,a.lighting.sh.b[0],a.lighting.sh.b[1],a.lighting.sh.b[2],a.lighting.sh.b[3]))]),i.code.add(d`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):r===2&&(i.uniforms.add([new B("lightingAmbientSH0",(s,a)=>de(ri,a.lighting.sh.r[0],a.lighting.sh.g[0],a.lighting.sh.b[0])),new G("lightingAmbientSH_R1",(s,a)=>K(se,a.lighting.sh.r[1],a.lighting.sh.r[2],a.lighting.sh.r[3],a.lighting.sh.r[4])),new G("lightingAmbientSH_G1",(s,a)=>K(se,a.lighting.sh.g[1],a.lighting.sh.g[2],a.lighting.sh.g[3],a.lighting.sh.g[4])),new G("lightingAmbientSH_B1",(s,a)=>K(se,a.lighting.sh.b[1],a.lighting.sh.b[2],a.lighting.sh.b[3],a.lighting.sh.b[4])),new G("lightingAmbientSH_R2",(s,a)=>K(se,a.lighting.sh.r[5],a.lighting.sh.r[6],a.lighting.sh.r[7],a.lighting.sh.r[8])),new G("lightingAmbientSH_G2",(s,a)=>K(se,a.lighting.sh.g[5],a.lighting.sh.g[6],a.lighting.sh.g[7],a.lighting.sh.g[8])),new G("lightingAmbientSH_B2",(s,a)=>K(se,a.lighting.sh.b[5],a.lighting.sh.b[6],a.lighting.sh.b[7],a.lighting.sh.b[8]))]),i.code.add(d`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),e.pbrMode!==q.Normal&&e.pbrMode!==q.Schematic||i.code.add(d`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}const ri=C(),se=rt();function Bn(t,e){const i=t.fragment;e.isGround?i.uniforms.add(new gi("lightingFixedFactor",(r,s)=>(1-s.lighting.groundLightingFactor)*(1-s.lighting.globalFactor))):i.constants.add("lightingFixedFactor","float",0),i.uniforms.add([new B("lightingMainDirection",(r,s)=>s.lighting.lightingMainDirection),new B("lightingMainIntensity",(r,s)=>s.lighting.mainLight.intensity)]),i.code.add(d`vec3 evaluateMainLighting(vec3 normal_global, float shadowing) {
float dotVal = clamp(dot(normal_global, lightingMainDirection), 0.0, 1.0);
dotVal = mix(dotVal, 1.0, lightingFixedFactor);
return lightingMainIntensity * ((1.0 - shadowing) * dotVal);
}`)}class Oa extends H{constructor(e,i){super(e,"int",R.Pass,(r,s,a)=>r.setUniform1i(e,i(s,a)))}}class Wi extends H{constructor(e,i,r,s){switch(i){case R.Pass:return void super(e,"mat4",i,(a,n,o)=>a.setUniformMatrix4fv(e,r(n,o)),s);case R.Draw:return void super(e,"mat4",i,(a,n,o)=>a.setUniformMatrix4fv(e,r(n,o)),s)}}}function Gn(t,e){e.receiveShadows&&(t.fragment.uniforms.add(new Wi("shadowMapMatrix",R.Pass,(i,r)=>r.shadowMap.getShadowMapMatrices(i.origin),4)),ki(t))}function Un(t,e){e.receiveShadows&&(t.fragment.uniforms.add(new Wi("shadowMapMatrix",R.Draw,(i,r)=>r.shadowMap.getShadowMapMatrices(i.origin),4)),ki(t))}function ki(t){const e=t.fragment;e.include(It),e.uniforms.add([new at("shadowMapTex",(i,r)=>r.shadowMap.depthTexture),new Oa("numCascades",(i,r)=>r.shadowMap.numCascades),new G("cascadeDistances",(i,r)=>r.shadowMap.cascadeDistances),new gi("depthHalfPixelSz",(i,r)=>.5/r.shadowMap.textureSize)]),e.code.add(d`int chooseCascade(float depth, out mat4 mat) {
vec4 distance = cascadeDistances;
int i = depth < distance[1] ? 0 : depth < distance[2] ? 1 : depth < distance[3] ? 2 : 3;
mat = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
return i;
}
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, vec3 lvpos) {
return vec2(float(i - 2 * (i / 2)) * 0.5, float(i / 2) * 0.5) + 0.5 * lvpos.xy;
}
float readShadowMapDepth(vec2 uv, sampler2D _depthTex) {
return rgba2float(texture2D(_depthTex, uv));
}
float posIsInShadow(vec2 uv, vec3 lvpos, sampler2D _depthTex) {
return readShadowMapDepth(uv, _depthTex) < lvpos.z ? 1.0 : 0.0;
}
float filterShadow(vec2 uv, vec3 lvpos, float halfPixelSize, sampler2D _depthTex) {
float texSize = 0.5 / halfPixelSize;
vec2 st = fract((vec2(halfPixelSize) + uv) * texSize);
float s00 = posIsInShadow(uv + vec2(-halfPixelSize, -halfPixelSize), lvpos, _depthTex);
float s10 = posIsInShadow(uv + vec2(halfPixelSize, -halfPixelSize), lvpos, _depthTex);
float s11 = posIsInShadow(uv + vec2(halfPixelSize, halfPixelSize), lvpos, _depthTex);
float s01 = posIsInShadow(uv + vec2(-halfPixelSize, halfPixelSize), lvpos, _depthTex);
return mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);
}
float readShadowMap(const in vec3 _vpos, float _linearDepth) {
mat4 mat;
int i = chooseCascade(_linearDepth, mat);
if (i >= numCascades) { return 0.0; }
vec3 lvpos = lightSpacePosition(_vpos, mat);
if (lvpos.z >= 1.0) { return 0.0; }
if (lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) { return 0.0; }
vec2 uv = cascadeCoordinates(i, lvpos);
return filterShadow(uv, lvpos, depthHalfPixelSz, shadowMapTex);
}`)}function Ra(t){const e=t.fragment.code;e.add(d`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG)
{
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),e.add(d`float integratedRadiance(float cosTheta2, float roughness)
{
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),e.add(d`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness)
{
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}function Wn(t,e){const i=t.fragment.code;t.include(_s),e.pbrMode===q.Water||e.pbrMode===q.WaterOnIntegratedMesh?(i.add(d`
    struct PBRShadingWater
    {
        float NdotL;   // cos angle between normal and light direction
        float NdotV;   // cos angle between normal and view direction
        float NdotH;   // cos angle between normal and half vector
        float VdotH;   // cos angle between view direction and half vector
        float LdotH;   // cos angle between light direction and half vector
        float VdotN;   // cos angle between view direction and normal vector
    };

    float dtrExponent = ${e.useCustomDTRExponentForWater?"2.2":"2.0"};
    `),i.add(d`vec3 fresnelReflection(float angle, vec3 f0, float f90) {
return f0 + (f90 - f0) * pow(1.0 - angle, 5.0);
}`),i.add(d`float normalDistributionWater(float NdotH, float roughness)
{
float r2 = roughness * roughness;
float NdotH2 = NdotH * NdotH;
float denom = pow((NdotH2 * (r2 - 1.0) + 1.0), dtrExponent) * PI;
return r2 / denom;
}`),i.add(d`float geometricOcclusionKelemen(float LoH)
{
return 0.25 / (LoH * LoH);
}`),i.add(d`vec3 brdfSpecularWater(in PBRShadingWater props, float roughness, vec3 F0, float F0Max)
{
vec3  F = fresnelReflection(props.VdotH, F0, F0Max);
float dSun = normalDistributionWater(props.NdotH, roughness);
float V = geometricOcclusionKelemen(props.LdotH);
float diffusionSunHaze = mix(roughness + 0.045, roughness + 0.385, 1.0 - props.VdotH);
float strengthSunHaze  = 1.2;
float dSunHaze = normalDistributionWater(props.NdotH, diffusionSunHaze)*strengthSunHaze;
return ((dSun + dSunHaze) * V) * F;
}
vec3 tonemapACES(const vec3 x) {
return (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
}`)):e.pbrMode!==q.Normal&&e.pbrMode!==q.Schematic||(t.include(Ra),i.add(d`struct PBRShadingInfo
{
float NdotL;
float NdotV;
float NdotH;
float VdotH;
float LdotH;
float NdotNG;
float RdotNG;
float NdotAmbDir;
float NdotH_Horizon;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
float averageAmbientRadiance;
float ssao;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`),i.add(d`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),i.add(d`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`),i.add(d`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`),i.add(d`float gamutMapChanel(float x, vec2 p){
return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
}`),i.add(d`vec3 blackLevelSoftCompression(vec3 inColor, PBRShadingInfo inputs){
vec3 outColor;
vec2 p = vec2(0.02 * (inputs.averageAmbientRadiance), 0.0075 * (inputs.averageAmbientRadiance));
outColor.x = gamutMapChanel(inColor.x, p) ;
outColor.y = gamutMapChanel(inColor.y, p) ;
outColor.z = gamutMapChanel(inColor.z, p) ;
return outColor;
}`))}class kn extends H{constructor(e,i){super(e,"bool",R.Pass,(r,s,a)=>r.setUniform1b(e,i(s,a)))}}class qn extends H{constructor(e){super(e,"mat4")}}export{ln as $,dn as A,is as B,mn as C,Be as D,_i as E,an as F,en as G,cs as H,ls as I,Pn as J,Ys as K,k as L,hn as M,vn as N,Tn as O,xn as P,wn as Q,Et as R,Pi as S,Ya as T,Za as U,Yt as V,ps as W,ct as X,fs as Y,It as Z,_s as _,Nr as a,gn as a0,Sn as a1,_n as a2,bn as a3,pn as a4,Yr as a5,nn as a6,Gs as a7,qs as a8,Us as a9,Cn as aA,Qa as aB,st as aC,Xa as aD,ta as aE,rn as aF,sn as aG,Ja as aH,Mi as aI,va as aJ,ha as aK,es as aL,_a as aM,ce as aN,Oa as aO,ba as aP,ga as aQ,Nn as aR,me as aS,ee as aT,Aa as aU,ot as aV,ht as aW,Mn as aX,Gn as aY,zn as aZ,Fn as a_,Rn as aa,An as ab,On as ac,bi as ad,Ka as ae,ja as af,tn as ag,Xs as ah,Zs as ai,Jt as aj,Ks as ak,En as al,yn as am,un as an,$n as ao,Ln as ap,Dn as aq,R as ar,kn as as,Wn as at,Hn as au,Bn as av,Vn as aw,q as ax,Un as ay,qn as az,We as b,at as c,bt as d,B as e,Wa as f,ka as g,He as h,qa as i,as as j,H as k,Xt as l,St as m,d as n,gi as o,ke as p,Oi as q,vs as r,we as s,Ua as t,qr as u,In as v,on as w,fn as x,cn as y,G as z};
