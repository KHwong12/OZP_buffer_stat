import{j as l,kH as m,e as o,aV as u,h as _,aU as g,I as n,J as d,K as w}from"./index.c449ba0d.js";import{b as f,h as y,O as k,g as v,a as M,c as V,D as I}from"./Stop.b6adc909.js";import{f as G}from"./LayerView2D.0417a1f6.js";import{i as F}from"./GraphicContainer.a24b225a.js";import{a as H}from"./BaseGraphicContainer.bf0f6a89.js";import{u as C}from"./LayerView.a76a0fbd.js";import"./utils.05a32d96.js";import"./Utils.5475507e.js";import"./number.08b65821.js";import"./enums.05a6ea95.js";import"./enums.de935fa5.js";import"./Texture.cda2030f.js";import"./VertexElementDescriptor.d386088d.js";import"./MaterialKey.515c94cd.js";import"./alignmentUtils.63b4d661.js";import"./definitions.6dca4f7b.js";import"./CIMSymbolHelper.fe907459.js";import"./BidiEngine.ec67919b.js";import"./floatRGBA.c454e1e9.js";import"./GeometryUtils.814cb798.js";import"./normalizeUtilsSync.c5d9a076.js";import"./VertexArrayObject.72bbbc3e.js";import"./FeatureContainer.b2ebcd66.js";import"./TileContainer.5002d096.js";import"./WGLContainer.2e87395d.js";import"./pixelUtils.9fcd645a.js";import"./vec4f32.8f10672a.js";import"./ProgramTemplate.6295ca16.js";import"./StyleDefinition.5774ff26.js";import"./config.40d47db8.js";import"./GeometryUtils.8166011b.js";import"./earcut.d30cbec0.js";import"./visualVariablesUtils.e27797e8.js";import"./visualVariablesUtils.ff4a15b5.js";import"./Matcher.c5364428.js";import"./tileUtils.87b2caf5.js";import"./TileClipper.ea6f174c.js";import"./Geometry.b68345ae.js";import"./cimAnalyzer.bd8099fb.js";import"./callExpressionWithFeature.b21a8d1f.js";import"./ExpandedCIM.bbb8cdff.js";import"./devEnvironmentUtils.8c6e6b72.js";import"./schemaUtils.7b6623c8.js";import"./createSymbolSchema.ce6ffce0.js";import"./MD5.97b39efc.js";import"./util.3c49eb19.js";import"./ComputedAttributeStorage.a819f387.js";import"./centroid.66df8b07.js";import"./vec3f32.0772c8d8.js";const U=Object.freeze({remove(){},pause(){},resume(){}}),b=["route-info","direction-line","direction-point","polygon-barrier","polyline-barrier","point-barrier","stop"],a={graphic:null,property:null,oldValue:null,newValue:null};function c(t){return t instanceof f||t instanceof y||t instanceof k||t instanceof v||t instanceof M||t instanceof V||t instanceof I}function A(t){return l.isCollection(t)&&t.length&&c(t.getItemAt(0))}function O(t){return Array.isArray(t)&&t.length&&c(t[0])}let h=class extends G(C){constructor(){super(...arguments),this._graphics=new l,this._highlightIds=new Map,this._networkFeatureMap=new Map,this._networkGraphicMap=new Map}get _routeItems(){return new m({getCollections:()=>[o(this.layer.routeInfo)?new l([this.layer.routeInfo]):null,this.layer.directionLines,this.layer.directionPoints,this.layer.polygonBarriers,this.layer.polylineBarriers,this.layer.pointBarriers,this.layer.stops]})}initialize(){this.updatingHandles.addOnCollectionChange(()=>this._routeItems,t=>this._routeItemsChanged(t),u)}destroy(){this.handles.removeAll(),this.updatingHandles.removeAll(),this._networkFeatureMap.clear(),this._networkGraphicMap.clear(),this._graphics.removeAll()}attach(){this._createGraphicsView()}detach(){this._destroyGraphicsView()}async fetchPopupFeatures(t){return this._graphicsView.hitTest(t).filter(i=>!!i.popupTemplate)}highlight(t){let i;i=c(t)?[this._getNetworkFeatureUid(t)]:O(t)?t.map(r=>this._getNetworkFeatureUid(r)):A(t)?t.map(r=>this._getNetworkFeatureUid(r)).toArray():[t.uid];const e=i.filter(o);return e.length?(this._addHighlight(e),{remove:()=>this._removeHighlight(e)}):U}async hitTest(t,i){if(this.suspended)return null;const e=this._graphicsView.hitTest(t).filter(o).map(s=>this._networkGraphicMap.get(s));if(!e.length)return null;const{layer:r}=this;return e.reverse().map(s=>({type:"route",layer:r,mapPoint:t,networkFeature:s}))}isUpdating(){return this._graphicsView.updating}moveStart(){}moveEnd(){}update(t){this._graphicsView.processUpdate(t)}viewChange(){this._graphicsView.viewChange()}_addHighlight(t){for(const i of t)if(this._highlightIds.has(i)){const e=this._highlightIds.get(i);this._highlightIds.set(i,e+1)}else this._highlightIds.set(i,1);this._updateHighlight()}_createGraphic(t){const i=t.toGraphic();return i.layer=this.layer,i.sourceLayer=this.layer,i}_createGraphicsView(){const t=this.view,i=()=>this.requestUpdate(),e=new F(t.featuresTilingScheme);this._graphicsView=new H({container:e,graphics:this._graphics,requestUpdateCallback:i,view:t}),this.container.addChild(e),this._updateHighlight()}_destroyGraphicsView(){this.container.removeChild(this._graphicsView.container),this._graphicsView.destroy()}_getDrawOrder(t){const i=this._networkGraphicMap.get(t);return b.indexOf(i.type)}_getNetworkFeatureUid(t){return this._networkFeatureMap.has(t)?this._networkFeatureMap.get(t).uid:null}_removeHighlight(t){for(const i of t)if(this._highlightIds.has(i)){const e=this._highlightIds.get(i)-1;e===0?this._highlightIds.delete(i):this._highlightIds.set(i,e)}this._updateHighlight()}_routeItemsChanged(t){if(t.removed.length){this._graphics.removeMany(t.removed.map(i=>{const e=this._networkFeatureMap.get(i);return this._networkFeatureMap.delete(i),this._networkGraphicMap.delete(e),e}));for(const i of t.removed)this.handles.remove(i)}if(t.added.length){this._graphics.addMany(t.added.map(i=>{const e=this._createGraphic(i);return _(e.symbol)?null:(this._networkFeatureMap.set(i,e),this._networkGraphicMap.set(e,i),e)}).filter(o));for(const i of t.added)this.handles.add([g(()=>i.geometry,(e,r)=>{this._updateGraphic(i,"geometry",e,r)}),g(()=>i.symbol,(e,r)=>{this._updateGraphic(i,"symbol",e,r)})],i);this._graphics.sort((i,e)=>this._getDrawOrder(i)-this._getDrawOrder(e))}}_updateGraphic(t,i,e,r){if(!this._networkFeatureMap.has(t)){const p=this._createGraphic(t);return this._networkFeatureMap.set(t,p),this._networkGraphicMap.set(p,t),void this._graphics.add(p)}const s=this._networkFeatureMap.get(t);s[i]=e,a.graphic=s,a.property=i,a.oldValue=r,a.newValue=e,this._graphicsView.graphicUpdateHandler(a)}_updateHighlight(){const t=Array.from(this._highlightIds.keys());this._graphicsView.setHighlight(t)}};n([d()],h.prototype,"_graphics",void 0),n([d()],h.prototype,"_routeItems",null),h=n([w("esri.views.2d.layers.RouteLayerView2D")],h);const Ct=h;export{Ct as default};