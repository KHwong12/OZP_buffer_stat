import{aE as k,cS as rt,bV as at,c0 as nt,cn as ot,b_ as ht,aC as dt,e as p,h as _,a6 as ut,cL as L,aO as f,P as D,ar as c,s as j,cc as H,cM as lt,cT as x,aP as O,bI as ct,aB as m,cU as _t,a_ as pt,cV as Et}from"./index.4188ada5.js";import{o as A,c as X,P as N,B as I,C as U,D as $,E as B,F as z,G as C,H as q,M as xt,O as ft,N as Rt,R as mt}from"./definitions.6dca4f7b.js";import{r as vt,o as gt}from"./TileContainer.287a9b70.js";import{n as Tt,l as bt,f as Y}from"./visualVariablesUtils.06d64c49.js";import{m as T,l as yt,J as K,Q as G}from"./Utils.457c0fc5.js";import{D as Z,P as J,G as W,L as tt,M as St,Y as kt,V as zt}from"./enums.de935fa5.js";import{D as Ct}from"./VertexArrayObject.5f698233.js";import{u as et}from"./Texture.568e5c45.js";import{e as wt,c as Mt}from"./utils.e9e483a9.js";class Dt{acquire(t){return{refCount:1,version:-1,labelMat2d:k(),tileMat3:k(),dvs:k()}}release(t){}}class y extends vt{constructor(t,e,s){super(t,e,s,A,A)}destroy(){super.destroy(),this._transforms&&y.TransformCache.release(this.key.hash)}setTransform(t,e){const s=e/(t.resolution*t.pixelRatio),i=this.transforms.tileMat3,[r,n]=t.toScreenNoRotation([0,0],[this.x,this.y]),o=this.width/this.rangeX*s,a=this.height/this.rangeY*s;rt(i,o,0,0,0,a,0,r,n,1),at(this.transforms.dvs,t.displayViewMat3,i);const d=this.transforms.labelMat2d,u=t.getScreenTransform(d,e),l=dt();nt(l,[this.x,this.y],u),ot(d,l),ht(d,t.viewMat2d,d)}_createTransforms(){return y.TransformCache.acquire(this.key.hash)}}y.TransformCache=new Dt;const b=2147483647;class R{constructor(t){this._head=t,this._cursor=t}static from(t,e=0,s=t.byteLength/h.BYTES_PER_RECORD-e){const i=new h(new Int32Array(t,e*h.BYTES_PER_RECORD,s*h.ELEMENTS_PER_RECORD));return new R(i)}size(){let t=this._cursor,e=0;for(;t;)e+=t.size(),t=t._link;return e}get id(){return this._cursor.id}set id(t){this._cursor.id=t}get materialKey(){return this._cursor.materialKey}set materialKey(t){this._cursor.materialKey=t}get insertAfter(){return this._cursor.insertAfter}get indexFrom(){return this._cursor.indexFrom}set indexFrom(t){this._cursor.indexFrom=t}get indexCount(){return this._cursor.indexCount}set indexCount(t){this._cursor.indexCount=t}get vertexFrom(){return this._cursor.vertexFrom}set vertexFrom(t){this._cursor.vertexFrom=t}get vertexCount(){return this._cursor.vertexCount}set vertexCount(t){this._cursor.vertexCount=t}get sortKey(){return this._cursor.sortKey}set sortKey(t){this._cursor.sortKey=t}get index(){return this._cursor._indexStart+this._cursor._index}seekIndex(t){let e=t;for(this._cursor=this._head;this._cursor;){const s=this._cursor.size();if(e<s)return this._cursor._index=e,!0;e-=s,this._cursor=this._cursor._link}return!1}forEach(t){const e=this.getCursor();for(;e.next();)t(e)}link(t){if(!this._head)return void(this._head=t._head);let e=this._head;for(;e._link;)e=e._link;e._link=t._head,e._link._indexStart=e._indexStart+e.size()}getCursor(){return this.copy()}lookup(t){for(this._cursor=this._head;this._cursor&&!this._cursor.lookup(t);){if(!this._cursor._link)return!1;this._cursor=this._cursor._link}return!!this._cursor}copy(){var i;const t=new R((i=this._head)==null?void 0:i.copy());if(!t._head)return t;let e=t._head,s=t._head._link;for(;s;)e._link=s.copy(),e=s,s=e._link;return t}next(){return!!this._cursor&&(!!this._cursor.next()||!!this._cursor._link&&(this._cursor=this._cursor._link,this.next()))}peekId(){var t;return(t=this._cursor.peekId())!=null?t:this._cursor._link.peekId()}delete(t){let e=this._head,s=null;for(;e;){if(e.delete(t))return e.isEmpty()&&(p(s)&&(s._link=e._link),e===this._head&&(this._head=e._link),e===this._cursor&&(this._cursor=e._link)),!0;s=e,e=e._link}return!1}}R.ELEMENTS_PER_RECORD=X,R.BYTES_PER_RECORD=R.ELEMENTS_PER_RECORD*Int32Array.BYTES_PER_ELEMENT;class h{constructor(t){this._link=null,this._index=-1,this._indexStart=0,this._deletedCount=0,this._offsets={instance:null},this._packedRecords=t}static from(t,e=0,s=t.byteLength/this.BYTES_PER_RECORD-e){return new h(new Int32Array(t,e*this.BYTES_PER_RECORD,s*this.ELEMENTS_PER_RECORD))}delete(t){const e=this._index,s=this.lookup(t);if(s)for(this.id=b,++this._deletedCount;this.next()&&this.id===t;)this.id=b,++this._deletedCount;return this._index=e,s}isEmpty(){return this._deletedCount===this.size()}link(t){this._link?this._link.link(t):this._link=t}lookup(t){if(_(this._offsets.instance)){this._offsets.instance=new Map;const s=this.copy();s._index=-1;let i=0;for(;s.next();)s.id!==i&&(this._offsets.instance.set(s.id,s._index),i=s.id)}if(!this._offsets.instance.has(t))return!1;const e=this._index;return this._index=this._offsets.instance.get(t),this.id!==b||(this._index=e,!1)}get id(){return this._packedRecords[this._index*h.ELEMENTS_PER_RECORD]}set id(t){this._packedRecords[this._index*h.ELEMENTS_PER_RECORD]=t}get materialKey(){return this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+1]}set materialKey(t){this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+1]=t}get insertAfter(){return this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+2]}get indexFrom(){return this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+3]}set indexFrom(t){this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+3]=t}get indexCount(){return this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+4]}set indexCount(t){this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+4]=t}get vertexFrom(){return this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+5]}set vertexFrom(t){this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+5]=t}get vertexCount(){return this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+6]}set vertexCount(t){this._packedRecords[this._index*h.ELEMENTS_PER_RECORD+6]=t}get sortKey(){return this._packedRecordsF32||(this._packedRecordsF32=new Float32Array(this._packedRecords.buffer)),this._packedRecordsF32[this._index*h.ELEMENTS_PER_RECORD+7]}set sortKey(t){this._packedRecordsF32||(this._packedRecordsF32=new Float32Array(this._packedRecords.buffer)),this._packedRecordsF32[this._index*h.ELEMENTS_PER_RECORD+7]=t}get index(){return this._index}size(){return this._packedRecords.length/h.ELEMENTS_PER_RECORD}next(){for(;++this._index<this.size()&&this.id===b;);return this._index<this.size()}peekId(){const t=(this._index+1)*h.ELEMENTS_PER_RECORD;return t>=this._packedRecords.length?0:this._packedRecords[t]}getCursor(){return this.copy()}copy(){const t=new h(this._packedRecords);return t._indexStart=this._indexStart,t._link=this._link,t._index=this._index,t._offsets=this._offsets,t._deletedCount=this._deletedCount,t}}h.ELEMENTS_PER_RECORD=X,h.BYTES_PER_RECORD=h.ELEMENTS_PER_RECORD*Int32Array.BYTES_PER_ELEMENT;const P=ut.getLogger("esri.views.2d.engine.webgl.AttributeStoreView"),w=Tt(bt,P);class Q{constructor(t,e,s){this._texture=null,this._lastTexture=null,this._fbos={},this.texelSize=4;const{buffer:i,pixelType:r,textureOnly:n}=t,o=T(r);this.shared=s,this.pixelType=r,this.size=e,this.textureOnly=n,n||(this.data=new o(c(i))),this._resetRange()}destroy(){f(this._texture,t=>t.dispose());for(const t in this._fbos)f(this._fbos[t],e=>{t==="0"&&e.detachColorTexture(),e.dispose()}),this._fbos[t]=null;this._texture=null}get _textureDesc(){return{target:St.TEXTURE_2D,wrapMode:Z.CLAMP_TO_EDGE,pixelFormat:J.RGBA,dataType:this.pixelType,samplingMode:tt.NEAREST,width:this.size,height:this.size}}setData(t,e,s){const i=Y(t),r=c(this.data),n=i*this.texelSize+e;!r||n>=r.length||(r[n]=s,this.dirtyStart=Math.min(this.dirtyStart,i),this.dirtyEnd=Math.max(this.dirtyEnd,i))}getData(t,e){if(_(this.data))return null;const s=Y(t)*this.texelSize+e;return!this.data||s>=this.data.length?null:this.data[s]}getTexture(t){return O(this._texture,()=>this._initTexture(t))}getFBO(t,e=0){if(_(this._fbos[e])){const s={colorTarget:kt.TEXTURE,depthStencilTarget:zt.NONE},i=e===0?this.getTexture(t):this._textureDesc;this._fbos[e]=new Ct(t,s,i)}return this._fbos[e]}get locked(){return!(this.pixelType!==W.UNSIGNED_BYTE||!this.shared||this.textureOnly||!D("esri-atomics")||!this.data)&&Atomics.load(this.data,0)===1}get hasDirty(){const t=this.dirtyStart;return this.dirtyEnd>=t}updateTexture(t,e){if(!this.locked){try{const s=this.dirtyStart,i=this.dirtyEnd;if(!this.hasDirty)return;this._resetRange();const r=c(this.data).buffer,n=this.getTexture(t),o=4,a=(s-s%this.size)/this.size,d=(i-i%this.size)/this.size,u=a,l=this.size,v=d,g=a*this.size*o,S=(l+v*this.size)*o-g,V=T(this.pixelType),st=new V(r,g*V.BYTES_PER_ELEMENT,S),it=this.size,F=v-u+1;if(F>this.size)return void P.error(new j("mapview-webgl","Out-of-bounds index when updating AttributeData"));n.updateData(0,0,u,it,F,st)}catch{}e()}}update(t){const{data:e,start:s,end:i}=t;if(p(e)){const r=this.data,n=s*this.texelSize;for(let o=0;o<e.length;o++){const a=1<<o%this.texelSize;t.layout&a&&(r[n+o]=e[o])}}this.dirtyStart=Math.min(this.dirtyStart,s),this.dirtyEnd=Math.max(this.dirtyEnd,i)}resize(t,e){const s=this.size;if(this.size=e,this.textureOnly)return void(s!==this.size&&(this._lastTexture=this._texture,this._texture=null));const i=T(this.pixelType);this.destroy(),this.data=new i(c(t.buffer))}_resetRange(){this.dirtyStart=2147483647,this.dirtyEnd=0}_initTexture(t){const e=new et(t,this._textureDesc,O(this.data,void 0));if(p(this._lastTexture)&&this._fbos[0]){const s=this._lastTexture.descriptor.width,i=this._lastTexture.descriptor.height,r=this._lastTexture.descriptor.dataType,n=this._lastTexture.descriptor.pixelFormat,o=this.getFBO(t),a=yt(r),d=new(T(r))(new ArrayBuffer(s*i*a*this.texelSize)),u=t.getBoundFramebufferObject(),{x:l,y:v,width:g,height:S}=t.getViewport();t.bindFramebuffer(o),o.readPixels(0,0,s,i,n,r,d),e.updateData(0,0,0,2*s,i/2,d),t.setViewport(l,v,g,S),t.bindFramebuffer(u)}return this.destroy(),this._texture=e,this._texture}}class Ot{constructor(t){this._onUpdate=t,this._initialized=!1,this._forceNextUpload=!1,this._locked=!1}initialize(t){const{blocks:e,shared:s,size:i}=t;if(this.shared=s,this.size=i,w("Initializing AttributeStoreView",t),_(this._data))this._data=L(e,r=>new Q(r,i,s));else for(let r=0;r<this._data.length;r++){const n=this._data[r],o=e[r];p(o)&&(_(n)?this._data[r]=new Q(o,i,s):n.resize(o,i))}this._initialized=!0}destroy(){f(this._data,t=>L(t,e=>e.destroy())),f(this._defaultTexture,t=>t.dispose())}isEmpty(){const t=this._data;return _(t)}isUpdating(){const t=p(this._pendingAttributeUpdate),e=t;return D("esri-2d-log-updating")&&console.log(`Updating AttributeStoreView ${e}
  -> hasPendingUpdate ${t}`),e}getBlock(t){return _(this._data)?null:this._data[t]}setLabelMinZoom(t,e){this.setData(t,0,1,e)}getLabelMinZoom(t){return this.getData(t,0,1,255)}getFilterFlags(t){return this.getData(t,0,0,0)}getVVSize(t){return this.getData(t,N,0,0)}getData(t,e,s,i){if(!this._data)return 0;const r=c(this._data)[e];if(_(r))return 0;const n=r.getData(t,s);return p(n)?n:i}setData(t,e,s,i){const r=c(this._data)[e];c(r).setData(t,s,i)}lockTextureUpload(){this._locked=!0}unlockTextureUpload(){this._locked=!1}forceTextureUpload(){this._forceNextUpload=!0}async requestUpdate(t){if(this._pendingAttributeUpdate)return void P.error(new j("mapview-webgl","Tried to update attribute data with a pending update"));const e=H();return w("AttributeStoreView Update Requested",t),this._pendingAttributeUpdate={data:t,resolver:e},e.promise}update(){if(this._initialized&&p(this._pendingAttributeUpdate)){D("esri-2d-update-debug")&&console.debug("AttributeStoreView::update");const{data:t,resolver:e}=this._pendingAttributeUpdate,s=c(this._data);for(let i=0;i<t.blocks.length;i++){const r=t.blocks[i],n=s[i];f(n,o=>f(r,a=>{w(`Updating block ${i}`,a),o.update(a)}))}this._pendingAttributeUpdate=null,e(),this._onUpdate()}}bindTextures(t,e=!0){this.update();const s=this._getDefaultTexture(t);if(!this._initialized)return t.bindTexture(s,I),void(e&&(t.bindTexture(s,U),t.bindTexture(s,$),t.bindTexture(s,B),t.bindTexture(s,z),t.bindTexture(s,C),t.bindTexture(s,q)));const i=c(this._data);this._locked&&!this._forceNextUpload||(lt(i,r=>r.updateTexture(t,()=>this._onUpdate())),this._forceNextUpload=!1),t.bindTexture(x(i[xt],s,r=>r.getTexture(t)),I),e&&(t.bindTexture(x(i[ft],s,r=>r.getTexture(t)),q),t.bindTexture(x(i[Rt],s,r=>r.getTexture(t)),U),t.bindTexture(x(i[N],s,r=>r.getTexture(t)),$),t.bindTexture(x(i[mt],s,r=>r.getTexture(t)),B),t.bindTexture(x(i[z],s,r=>r.getTexture(t)),z),t.bindTexture(x(i[C],s,r=>r.getTexture(t)),C))}_getDefaultTexture(t){if(_(this._defaultTexture)){const e={wrapMode:Z.CLAMP_TO_EDGE,pixelFormat:J.RGBA,dataType:W.UNSIGNED_BYTE,samplingMode:tt.NEAREST,width:1,height:1};this._defaultTexture=new et(t,e,new Uint8Array(4))}return this._defaultTexture}}function M(E,t){const e=t.length;if(E<t[0].value||e===1)return t[0].size;for(let s=1;s<e;s++)if(E<t[s].value){const i=(E-t[s-1].value)/(t[s].value-t[s-1].value);return t[s-1].size+i*(t[s].size-t[s-1].size)}return t[e-1].size}class Pt{constructor(){this.symbolLevels=[],this.vvColorValues=new Float32Array(8),this.vvColors=new Float32Array(32),this.vvOpacityValues=new Float32Array(8),this.vvOpacities=new Float32Array(8),this.vvSizeMinMaxValue=new Float32Array(4),this._vvMaterialParameters={vvSizeEnabled:!1,vvColorEnabled:!1,vvRotationEnabled:!1,vvRotationType:"geographic",vvOpacityEnabled:!1},this._technique=wt}getSizeVVFieldStops(t){const e=this._vvSizeFieldStops;switch(e.type){case"static":return e;case"level-dependent":return O(e.levels[t],()=>{let s=1/0,i=0;for(const a in e.levels){const d=parseFloat(a),u=Math.abs(t-d);u<s&&(s=u,i=d)}if(s===1/0)return{sizes:new Float32Array([0,0,0,0,0,0]),values:new Float32Array([0,0,0,0,0,0])};const r=2**((t-i)/2),n=c(e.levels[i]),o=new Float32Array(n.values);return o[2]*=r,o[3]*=r,{sizes:c(n.sizes),values:o}})}}get vvMaterialParameters(){return this._vvMaterialParameters}update(t){p(this._vvInfo)&&this._updateVisualVariables(this._vvInfo.vvRanges,t)}setInfo(t,e,s){this._updateEffects(s),this._vvInfo=e,this._technique=Mt(t),this.rendererSchema=this._technique.createOrUpdateRendererSchema(this.rendererSchema,t)}getVariation(){return{...this._technique.getVariation(this.rendererSchema),outsideLabelsVisible:this.outsideLabelsVisible,supportsTextureFloat:ct("2d").supportsTextureFloat}}getVariationHash(){return this._technique.getVariationHash(this.rendererSchema)<<1|(this.outsideLabelsVisible?1:0)}_updateEffects(t){p(t)?this.outsideLabelsVisible=t.excludedLabelsVisible:this.outsideLabelsVisible=!1}_updateVisualVariables(t,e){const s=this._vvMaterialParameters;if(s.vvOpacityEnabled=!1,s.vvSizeEnabled=!1,s.vvColorEnabled=!1,s.vvRotationEnabled=!1,!t)return;const i=t.size;if(i){if(s.vvSizeEnabled=!0,i.minMaxValue){const a=i.minMaxValue;let d,u;if(K(a.minSize)&&K(a.maxSize))if(G(a.minSize)&&G(a.maxSize))d=m(a.minSize),u=m(a.maxSize);else{const l=e.scale;d=m(M(l,a.minSize.stops)),u=m(M(l,a.maxSize.stops))}this.vvSizeMinMaxValue.set([a.minDataValue,a.maxDataValue,d,u])}if(i.scaleStops&&(this.vvSizeScaleStopsValue=m(M(e.scale,i.scaleStops.stops))),i.unitValue){const a=_t(e.spatialReference)/pt[i.unitValue.unit];this.vvSizeUnitValueToPixelsRatio=a/e.resolution}i.fieldStops&&(this._vvSizeFieldStops=i.fieldStops)}const r=t.color;r&&(s.vvColorEnabled=!0,this.vvColorValues.set(r.values),this.vvColors.set(r.colors));const n=t.opacity;n&&(s.vvOpacityEnabled=!0,this.vvOpacityValues.set(n.values),this.vvOpacities.set(n.opacities));const o=t.rotation;o&&(s.vvRotationEnabled=!0,s.vvRotationType=o.type)}}class qt extends gt{constructor(t){super(t),this._rendererInfo=new Pt,this._materialItemsRequestQueue=new Et,this.attributeView=new Ot(()=>this.onAttributeStoreUpdate())}destroy(){this.removeAllChildren(),this.children.forEach(t=>t.destroy()),this.attributeView.destroy(),this._materialItemsRequestQueue.clear()}setRendererInfo(t,e,s){this._rendererInfo.setInfo(t,e,s),this.requestRender()}async getMaterialItems(t,e){if(!t||t.length===0)return null;const s=H();return this._materialItemsRequestQueue.push({items:t,abortOptions:e,resolver:s}),this.requestRender(),s.promise}doRender(t){if(t.context.capabilities.enable("textureFloat"),t.context.capabilities.enable("vao"),this._materialItemsRequestQueue.length>0){let e=this._materialItemsRequestQueue.pop();for(;e;)this._processMaterialItemRequest(t,e),e=this._materialItemsRequestQueue.pop()}super.doRender(t)}renderChildren(t){for(const e of this.children)e.commit(t);this._rendererInfo.update(t.state),super.renderChildren(t)}createRenderParams(t){const e=super.createRenderParams(t);return e.rendererInfo=this._rendererInfo,e.attributeView=this.attributeView,e}onAttributeStoreUpdate(){}_processMaterialItemRequest(t,{items:e,abortOptions:s,resolver:i}){const{painter:r,pixelRatio:n}=t,o=e.map(a=>r.textureManager.rasterizeItem(a.symbol,n,a.glyphIds,s));Promise.all(o).then(a=>{if(!this.stage)return void i.reject();const d=a.map((u,l)=>({id:e[l].id,mosaicItem:u}));i.resolve(d)},i.reject)}}export{y as c,R as i,qt as o};
