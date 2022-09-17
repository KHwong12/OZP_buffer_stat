import{aE as a,bn as m}from"./index.4188ada5.js";import{v as p}from"./Bitmap.f65c61e9.js";import{r as h,o as b}from"./TileContainer.287a9b70.js";import{W as f}from"./WGLContainer.87eea6ac.js";import{I as n}from"./Utils.457c0fc5.js";class l extends h{constructor(e,t,r,s,i,d=null){super(e,t,r,s,i),this.bitmap=new p(d,"standard",!1),this.bitmap.coordScale=[s,i],this.bitmap.once("isReady",()=>this.ready())}destroy(){super.destroy(),this.bitmap.destroy()}beforeRender(e){super.beforeRender(e),this.bitmap.beforeRender(e)}afterRender(e){super.afterRender(e),this.bitmap.afterRender(e)}set stencilRef(e){this.bitmap.stencilRef=e}get stencilRef(){return this.bitmap.stencilRef}_createTransforms(){return{dvs:a(),tileMat3:a()}}setTransform(e,t){super.setTransform(e,t),this.bitmap.transforms.dvs=this.transforms.dvs}onAttach(){this.bitmap.stage=this.stage}onDetach(){this.bitmap&&(this.bitmap.stage=null)}}class v extends b{get requiresDedicatedFBO(){return this.children.some(e=>e.bitmap.blendFunction==="additive")}createTile(e){const t=this._tileInfoView.getTileBounds(m(),e),[r,s]=this._tileInfoView.tileInfo.size;return new l(e,t[0],t[3],r,s)}prepareRenderPasses(e){const t=e.registerRenderPass({name:"bitmap (tile)",brushes:[f.bitmap],target:()=>this.children.map(r=>r.bitmap),drawPhase:n.MAP});return[...super.prepareRenderPasses(e),t]}doRender(e){this.visible&&e.drawPhase===n.MAP&&super.doRender(e)}}export{v as n};
