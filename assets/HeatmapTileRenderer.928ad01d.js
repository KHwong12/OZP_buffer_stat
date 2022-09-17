import{oV as a,I as m,K as l,cd as p}from"./index.4188ada5.js";import{n as h}from"./BitmapTileContainer.28e93b77.js";import{o as d}from"./BaseTileRenderer.498858ed.js";import"./Bitmap.f65c61e9.js";import"./utils.e9e483a9.js";import"./Utils.457c0fc5.js";import"./number.08b65821.js";import"./enums.05a6ea95.js";import"./enums.de935fa5.js";import"./Texture.568e5c45.js";import"./VertexElementDescriptor.d386088d.js";import"./MaterialKey.b421db94.js";import"./alignmentUtils.63b4d661.js";import"./definitions.6dca4f7b.js";import"./TileContainer.287a9b70.js";import"./WGLContainer.87eea6ac.js";import"./pixelUtils.58168171.js";import"./VertexArrayObject.5f698233.js";import"./vec4f32.8f10672a.js";import"./ProgramTemplate.0682cc87.js";import"./StyleDefinition.5774ff26.js";import"./config.40d47db8.js";import"./GeometryUtils.8166011b.js";import"./earcut.d30cbec0.js";class c{constructor(){this.gradient=null,this.height=512,this.width=512}render(i){a(i,512,this.intensities,this.gradient,this.minDensity,this.maxDensity)}}let o=class extends d{constructor(t){super(t),this._intensityInfo={minDensity:0,maxDensity:0},this.type="heatmap",this.featuresView={attributeView:{initialize:()=>{},requestUpdate:()=>{}},requestRender:()=>{}},this._container=new h(t.tileInfoView)}createTile(t){const i=this._container.createTile(t);return this.tileInfoView.getTileCoords(i.bitmap,t),i.bitmap.resolution=this.tileInfoView.getTileResolution(t),i}onConfigUpdate(){const t=this.layer.renderer;if(t.type==="heatmap"){const{minDensity:i,maxDensity:r,colorStops:n}=t;this._intensityInfo.minDensity=i,this._intensityInfo.maxDensity=r,this._gradient=p(n),this.tiles.forEach(s=>{const e=s.bitmap.source;e&&(e.minDensity=i,e.maxDensity=r,e.gradient=this._gradient,s.bitmap.invalidateTexture())})}}hitTest(){return Promise.resolve([])}install(t){t.addChild(this._container)}uninstall(t){this._container.removeAllChildren(),t.removeChild(this._container)}disposeTile(t){this._container.removeChild(t),t.destroy()}supportsRenderer(t){return t&&t.type==="heatmap"}onTileData(t){const i=this.tiles.get(t.tileKey);if(!i)return;const r=t.intensityInfo,{minDensity:n,maxDensity:s}=this._intensityInfo,e=i.bitmap.source||new c;e.intensities=r&&r.matrix||null,e.minDensity=n,e.maxDensity=s,e.gradient=this._gradient,i.bitmap.source=e,this._container.addChild(i),this._container.requestRender(),this.requestUpdate()}onTileError(t){console.error(t)}lockGPUUploads(){}unlockGPUUploads(){}fetchResource(t,i){return console.error(t),Promise.reject()}};o=m([l("esri.views.2d.layers.features.tileRenderers.HeatmapTileRenderer")],o);const z=o;export{z as default};
