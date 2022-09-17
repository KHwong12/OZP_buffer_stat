import{o as d,h as c,$ as p,mI as f,k as y,l as m,i as g,gB as P,mJ as C}from"./index.4188ada5.js";import{N as _,j as b}from"./dehydratedFeatures.a502b708.js";function G(o,e){return e}function h(o,e,t,r){switch(t){case 0:return a(o,e+r,0);case 1:return o.originPosition==="lowerLeft"?a(o,e+r,1):k(o,e+r,1)}}function l(o,e,t,r){return t===2?a(o,e,2):h(o,e,t,r)}function v(o,e,t,r){return t===2?a(o,e,3):h(o,e,t,r)}function M(o,e,t,r){return t===3?a(o,e,3):l(o,e,t,r)}function a({translate:o,scale:e},t,r){return o[r]+t*e[r]}function k({translate:o,scale:e},t,r){return o[r]-t*e[r]}class R{constructor(e){this.options=e,this.geometryTypes=["point","multipoint","polyline","polygon"],this.previousCoordinate=[0,0],this.transform=null,this.applyTransform=G,this.lengths=[],this.currentLengthIndex=0,this.toAddInCurrentPath=0,this.vertexDimension=0,this.coordinateBuffer=null,this.coordinateBufferPtr=0,this._attributesConstructor=()=>{}}createFeatureResult(){return new _}finishFeatureResult(e){if(this.options.applyTransform&&(e.transform=null),this._attributesConstructor=()=>{},this.coordinateBuffer=null,this.lengths.length=0,!e.hasZ)return;const t=d(e.geometryType,this.options.sourceSpatialReference,e.spatialReference);if(!c(t))for(const r of e.features)t(r.geometry)}createSpatialReference(){return new p}addField(e,t){e.fields.push(f.fromJSON(t));const r=e.fields.map(s=>s.name);this._attributesConstructor=function(){for(const s of r)this[s]=null}}addFeature(e,t){const r=this.options.maxStringAttributeLength?this.options.maxStringAttributeLength:0;if(r>0)for(const s in t.attributes){const i=t.attributes[s];typeof i=="string"&&i.length>r&&(t.attributes[s]="")}e.features.push(t)}addQueryGeometry(e,t){const{queryGeometry:r,queryGeometryType:s}=t,i=y(r.clone(),r,!1,!1,this.transform),u=m(i,s,!1,!1);let n=null;switch(s){case"esriGeometryPoint":n="point";break;case"esriGeometryPolygon":n="polygon";break;case"esriGeometryPolyline":n="polyline";break;case"esriGeometryMultipoint":n="multipoint"}u.type=n,e.queryGeometryType=s,e.queryGeometry=u}prepareFeatures(e){switch(this.transform=e.transform,this.options.applyTransform&&e.transform&&(this.applyTransform=this._deriveApplyTransform(e)),this.vertexDimension=2,e.hasZ&&this.vertexDimension++,e.hasM&&this.vertexDimension++,e.geometryType){case"point":this.addCoordinate=(t,r,s)=>this.addCoordinatePoint(t,r,s),this.createGeometry=t=>this.createPointGeometry(t);break;case"polygon":this.addCoordinate=(t,r,s)=>this._addCoordinatePolygon(t,r,s),this.createGeometry=t=>this._createPolygonGeometry(t);break;case"polyline":this.addCoordinate=(t,r,s)=>this._addCoordinatePolyline(t,r,s),this.createGeometry=t=>this._createPolylineGeometry(t);break;case"multipoint":this.addCoordinate=(t,r,s)=>this._addCoordinateMultipoint(t,r,s),this.createGeometry=t=>this._createMultipointGeometry(t);break;case"mesh":case"extent":break;default:g(e.geometryType)}}createFeature(){return this.lengths.length=0,this.currentLengthIndex=0,this.previousCoordinate[0]=0,this.previousCoordinate[1]=0,new b(P(),null,new this._attributesConstructor)}allocateCoordinates(){const e=this.lengths.reduce((t,r)=>t+r,0);this.coordinateBuffer=new Float64Array(e*this.vertexDimension),this.coordinateBufferPtr=0}addLength(e,t,r){this.lengths.length===0&&(this.toAddInCurrentPath=t),this.lengths.push(t)}createPointGeometry(e){const t={type:"point",x:0,y:0,spatialReference:e.spatialReference,hasZ:!!e.hasZ,hasM:!!e.hasM};return t.hasZ&&(t.z=0),t.hasM&&(t.m=0),t}addCoordinatePoint(e,t,r){switch(t=this.applyTransform(this.transform,t,r,0),r){case 0:e.x=t;break;case 1:e.y=t;break;case 2:e.hasZ?e.z=t:e.m=t;break;case 3:e.m=t}}_transformPathLikeValue(e,t){let r=0;return t<=1&&(r=this.previousCoordinate[t],this.previousCoordinate[t]+=e),this.applyTransform(this.transform,e,t,r)}_addCoordinatePolyline(e,t,r){this._dehydratedAddPointsCoordinate(e.paths,t,r)}_addCoordinatePolygon(e,t,r){this._dehydratedAddPointsCoordinate(e.rings,t,r)}_addCoordinateMultipoint(e,t,r){r===0&&e.points.push([]);const s=this._transformPathLikeValue(t,r);e.points[e.points.length-1].push(s)}_createPolygonGeometry(e){return{type:"polygon",rings:[[]],spatialReference:e.spatialReference,hasZ:!!e.hasZ,hasM:!!e.hasM}}_createPolylineGeometry(e){return{type:"polyline",paths:[[]],spatialReference:e.spatialReference,hasZ:!!e.hasZ,hasM:!!e.hasM}}_createMultipointGeometry(e){return{type:"multipoint",points:[],spatialReference:e.spatialReference,hasZ:!!e.hasZ,hasM:!!e.hasM}}_dehydratedAddPointsCoordinate(e,t,r){r===0&&this.toAddInCurrentPath--==0&&(e.push([]),this.toAddInCurrentPath=this.lengths[++this.currentLengthIndex]-1,this.previousCoordinate[0]=0,this.previousCoordinate[1]=0);const s=this._transformPathLikeValue(t,r),i=e[e.length-1];r===0&&i.push(new Float64Array(this.coordinateBuffer.buffer,this.coordinateBufferPtr*Float64Array.BYTES_PER_ELEMENT,this.vertexDimension)),this.coordinateBuffer[this.coordinateBufferPtr++]=s}_deriveApplyTransform(e){const{hasZ:t,hasM:r}=e;return t&&r?M:t?l:r?v:h}}class T{_parseFeatureQuery(e){const t=C(e.buffer,new R(e.options)),r={...t,spatialReference:t.spatialReference.toJSON(),fields:t.fields?t.fields.map(s=>s.toJSON()):void 0};return Promise.resolve(r)}}function w(){return new T}export{w as default};
