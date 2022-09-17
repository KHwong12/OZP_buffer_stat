import{F as j,ay as q,U as K,aB as M,oU as Q,c8 as Z,c$ as $,br as W,bv as ee}from"./index.4188ada5.js";import{Y as te,s as ae}from"./cimAnalyzer.b83ee753.js";import{k as re,l as ie,s as se,d as oe,e as h,u as H}from"./CIMSymbolHelper.3dad63ef.js";import{m as ne}from"./Rasterizer.a2ce017c.js";import"./enums.05a6ea95.js";import"./floatRGBA.82bef49f.js";import"./callExpressionWithFeature.31cbf380.js";import"./definitions.6dca4f7b.js";import"./BidiEngine.ec67919b.js";import"./alignmentUtils.63b4d661.js";import"./number.08b65821.js";import"./GeometryUtils.814cb798.js";function J(t,e,a,s){if(t.type!=="CIMTextSymbol"){if(a&&t.effects)for(const r of t.effects)le(r,e);if(t.symbolLayers)for(const r of t.symbolLayers)switch(r.type){case"CIMPictureMarker":case"CIMVectorMarker":N(r,e,s);break;case"CIMPictureStroke":case"CIMSolidStroke":!(s!=null&&s.preserveOutlineWidth)&&r.width&&(r.width*=e);break;case"CIMPictureFill":r.height&&(r.height*=e),r.offsetX&&(r.offsetX*=e),r.offsetY&&(r.offsetY*=e);break;case"CIMHatchFill":J(r.lineSymbol,e,!0,{...s,preserveOutlineWidth:!1}),r.offsetX&&(r.offsetX*=e),r.offsetY&&(r.offsetY*=e),r.separation&&(r.separation*=e)}}else t.height*=e}function N(t,e,a){if(t.markerPlacement&&ce(t.markerPlacement,e),t.offsetX&&(t.offsetX*=e),t.offsetY&&(t.offsetY*=e),t.anchorPoint&&t.anchorPointUnits==="Absolute"&&(t.anchorPoint={x:t.anchorPoint.x*e,y:t.anchorPoint.y*e}),t.size*=e,t.type==="CIMVectorMarker"&&t.markerGraphics)for(const s of t.markerGraphics)t.scaleSymbolsProportionally||J(s.symbol,e,!0,a)}function ce(t,e){switch(re(t)&&t.offset&&(t.offset*=e),t.type){case"CIMMarkerPlacementAlongLineRandomSize":case"CIMMarkerPlacementAlongLineSameSize":if(t.customEndingOffset&&(t.customEndingOffset*=e),t.offsetAlongLine&&(t.offsetAlongLine*=e),t.placementTemplate&&t.placementTemplate.length){const a=t.placementTemplate.map(s=>s*e);t.placementTemplate=a}break;case"CIMMarkerPlacementAlongLineVariableSize":if(t.maxRandomOffset&&(t.maxRandomOffset*=e),t.placementTemplate&&t.placementTemplate.length){const a=t.placementTemplate.map(s=>s*e);t.placementTemplate=a}break;case"CIMMarkerPlacementOnLine":t.startPointOffset&&(t.startPointOffset*=e);break;case"CIMMarkerPlacementAtExtremities":t.offsetAlongLine&&(t.offsetAlongLine*=e);break;case"CIMMarkerPlacementAtMeasuredUnits":case"CIMMarkerPlacementOnVertices":break;case"CIMMarkerPlacementAtRatioPositions":t.beginPosition&&(t.beginPosition*=e),t.endPosition&&(t.endPosition*=e);break;case"CIMMarkerPlacementPolygonCenter":t.offsetX&&(t.offsetX*=e),t.offsetY&&(t.offsetY*=e);break;case"CIMMarkerPlacementInsidePolygon":t.offsetX&&(t.offsetX*=e),t.offsetY&&(t.offsetY*=e),t.stepX&&(t.stepX*=e),t.stepY&&(t.stepY*=e)}}function le(t,e){switch(t.type){case"CIMGeometricEffectArrow":case"CIMGeometricEffectDonut":t.width&&(t.width*=e);break;case"CIMGeometricEffectBuffer":t.size&&(t.size*=e);break;case"CIMGeometricEffectCut":t.beginCut&&(t.beginCut*=e),t.endCut&&(t.endCut*=e),t.middleCut&&(t.middleCut*=e);break;case"CIMGeometricEffectDashes":if(t.customEndingOffset&&(t.customEndingOffset*=e),t.offsetAlongLine&&(t.offsetAlongLine*=e),t.dashTemplate&&t.dashTemplate.length){const a=t.dashTemplate.map(s=>s*e);t.dashTemplate=a}break;case"CIMGeometricEffectExtension":case"CIMGeometricEffectJog":case"CIMGeometricEffectRadial":t.length&&(t.length*=e);break;case"CIMGeometricEffectMove":t.offsetX&&(t.offsetX*=e),t.offsetY&&(t.offsetY*=e);break;case"CIMGeometricEffectOffset":case"CIMGeometricEffectOffsetTangent":t.offset&&(t.offset*=e);break;case"CIMGeometricEffectRegularPolygon":t.radius&&(t.radius*=e);break;case"CIMGeometricEffectTaperedPolygon":t.fromWidth&&(t.fromWidth*=e),t.length&&(t.length*=e),t.toWidth&&(t.toWidth*=e);break;case"CIMGeometricEffectWave":t.amplitude&&(t.amplitude*=e),t.period&&(t.period*=e)}}var Y;(function(t){t.Legend="legend",t.Preview="preview"})(Y||(Y={}));const T=(t,e,a)=>{if(t&&t.targetSize){let s;if(a){const r=Math.max(a.frame.xmax-a.frame.xmin,a.frame.ymax-a.frame.ymin);s=t.targetSize/M(r)}else s=t.targetSize/e.referenceSize;return s}return t&&t.scaleFactor?t.scaleFactor:1},U={fill:{legend:{frame:{xmax:15,xmin:0,ymax:15,ymin:0},geometry:{rings:[[[0,15],[15,7.5],[15,0],[0,0],[0,15]]]},canvasPaths:{rings:[[[0,15],[0,0],[15,7.5],[15,15],[0,15]]]}},preview:{frame:{xmax:100,xmin:0,ymax:100,ymin:0},geometry:{rings:[[[0,100],[100,100],[100,0],[0,0],[0,100]]]},canvasPaths:{rings:[[[0,100],[0,0],[100,0],[100,100],[0,100]]]}}},stroke:{legend:{frame:{xmax:24,xmin:0,ymax:2,ymin:-2},geometry:{paths:[[[0,0],[12,0],[24,0]]]},canvasPaths:{paths:[[[0,2],[12,2],[24,2]]]}},preview:{frame:{xmax:100,xmin:0,ymax:2,ymin:-2},geometry:{paths:[[[0,0],[50,0],[100,0]]]},canvasPaths:{paths:[[[0,2],[50,2],[100,2]]]}}}};class ze{constructor(e,a){this._spatialReference=e,this._avoidSDF=a,this._resourceCache=new Map,this._pictureMarkerCache=new Map,this._textRasterizer=new ie,this._cimResourceManager=new se,this._rasterizer=new ne(this._cimResourceManager)}async rasterizeCIMSymbolAsync(e,a,s,r,i,o,c,n){r=r||(a?a.centroid!=null?"esriGeometryPolygon":j(a.geometry):null)||fe(e);const l=await this.analyzeCIMSymbol(e,a?me(a.attributes):null,s,r,n);return this.rasterizeCIMSymbol(l,a,r,i,o,c)}async analyzeCIMSymbol(e,a,s,r,i){const o=[],c=a?{geometryType:r,spatialReference:this._spatialReference,fields:a}:null;let n;await te(e.data,c,this._cimResourceManager,o,this._avoidSDF),q(i);for(const l of o)l.cim.type!=="CIMPictureMarker"&&l.cim.type!=="CIMPictureFill"&&l.cim.type!=="CIMPictureStroke"||(n||(n=[]),n.push(this._fetchPictureMarkerResource(l,i))),s&&l.type==="text"&&typeof l.text=="string"&&l.text.includes("[")&&(l.text=oe(s,l.text,l.cim.textCase));return n&&await Promise.all(n),o}async _fetchPictureMarkerResource(e,a){const s=e.materialHash;if(!this._pictureMarkerCache.get(s)){const r=(await K(e.cim.url,{responseType:"image",signal:a&&a.signal})).data;this._pictureMarkerCache.set(s,r)}}rasterizeCIMSymbol(e,a,s,r,i,o){const c=[];for(const n of e){r&&typeof r.scaleFactor=="function"&&(r.scaleFactor=r.scaleFactor(a,i,o));const l=this._getRasterizedResource(n,a,s,r,i,o);if(!l)continue;let p=0,I=l.anchorX||0,y=l.anchorY||0,m=!1,g=0,f=0;if(s==="esriGeometryPoint"){const u=T(r,n,null);if(g=h(n.offsetX,a,i,o)*u||0,f=h(n.offsetY,a,i,o)*u||0,n.type==="marker")p=h(n.rotation,a,i,o)||0,m=!!n.rotateClockwise&&n.rotateClockwise;else if(n.type==="text"){if(p=h(n.angle,a,i,o)||0,n.horizontalAlignment!==void 0)switch(n.horizontalAlignment){case"left":I=-.5;break;case"right":I=.5;break;default:I=0}if(n.verticalAlignment!==void 0)switch(n.verticalAlignment){case"top":y=.5;break;case"bottom":y=-.5;break;case"baseline":y=-.25;break;default:y=0}}}l!=null&&c.push({angle:p,rotateClockWise:m,anchorX:I,anchorY:y,offsetX:g,offsetY:f,rasterizedResource:l})}return this.getSymbolImage(c)}getSymbolImage(e){const a=document.createElement("canvas"),s=a.getContext("2d");let r=0,i=0,o=0,c=0;const n=[];for(let y=0;y<e.length;y++){const m=e[y],g=m.rasterizedResource;if(!g)continue;const f=g.size,u=m.offsetX,d=m.offsetY,C=m.anchorX,k=m.anchorY,P=m.rotateClockWise||!1;let x=m.angle,b=M(u)-f[0]*(.5+C),z=M(d)-f[1]*(.5+k),S=b+f[0],v=z+f[1];if(x){P&&(x=-x);const w=Math.sin(x*Math.PI/180),_=Math.cos(x*Math.PI/180),X=b*_-z*w,G=b*w+z*_,D=b*_-v*w,E=b*w+v*_,O=S*_-v*w,L=S*w+v*_,F=S*_-z*w,V=S*w+z*_;b=Math.min(X,D,O,F),z=Math.min(G,E,L,V),S=Math.max(X,D,O,F),v=Math.max(G,E,L,V)}r=b<r?b:r,i=z<i?z:i,o=S>o?S:o,c=v>c?v:c;const A=s.createImageData(g.size[0],g.size[1]);A.data.set(new Uint8ClampedArray(g.image.buffer));const B={offsetX:u,offsetY:d,rotateClockwise:P,angle:x,rasterizedImage:A,anchorX:C,anchorY:k};n.push(B)}a.width=o-r,a.height=c-i;const l=-r,p=c;for(let y=0;y<n.length;y++){const m=n[y],g=this._imageDataToCanvas(m.rasterizedImage),f=m.rasterizedImage.width,u=m.rasterizedImage.height,d=l-f*(.5+m.anchorX),C=p-u*(.5-m.anchorY);if(m.angle){const k=(360-m.angle)*Math.PI/180;s.save(),s.translate(M(m.offsetX),-M(m.offsetY)),s.translate(l,p),s.rotate(k),s.translate(-l,-p),s.drawImage(g,d,C),s.restore()}else s.drawImage(g,d+M(m.offsetX),C-M(m.offsetY))}const I=new Q({x:l/a.width-.5,y:p/a.height-.5});return{imageData:a.width!==0&&a.height!==0?s.getImageData(0,0,a.width,a.height):s.createImageData(1,1),anchorPosition:I}}_imageDataToCanvas(e){this._imageDataCanvas||(this._imageDataCanvas=document.createElement("canvas"));const a=this._imageDataCanvas,s=a.getContext("2d");return a.width=e.width,a.height=e.height,s.putImageData(e,0,0),a}_imageTo32Array(e,a,s,r){this._imageDataCanvas||(this._imageDataCanvas=document.createElement("canvas"));const i=this._imageDataCanvas,o=i.getContext("2d");if(i.width=a,i.height=s,o.drawImage(e,0,0,a,s),r){o.save();const c=new Z(r);o.fillStyle=c.toHex(),o.globalCompositeOperation="multiply",o.fillRect(0,0,a,s),o.globalCompositeOperation="destination-atop",o.drawImage(e,0,0,a,s),o.restore()}return new Uint32Array(o.getImageData(0,0,a,s).data.buffer)}_getRasterizedResource(e,a,s,r,i,o){let c,n,l,p,I=null,y=null;if(s==="esriGeometryPolyline"||s==="esriGeometryPolygon"){const g=r&&r.style?r.style:Y.Legend,f=s==="esriGeometryPolyline"?U.stroke[g]:U.fill[g];if(e.type==="line"){if(e.cim.type!=="CIMSolidStroke"){if(e.cim.type==="CIMPictureStroke"){const u=h(e.width,a,i,o),d=h(e.color,a,i,o),{image:C,width:k,height:P}=this._getPictureResource(e,u,d);return this._rasterizePictureResource(e,C,k,P,f,u)}return null}({analyzedCIM:c,hash:l}=R(e,a,i,o)),n=this._embedCIMLayerInVectorMarker(c,f)}else if(e.type==="marker"){if(e.cim.type==="CIMPictureMarker"){const u=h(e.size,a,i,o),d=h(e.color,a,i,o),{image:C,width:k,height:P}=this._getPictureResource(e,u,d);return this._rasterizePictureResource(e,C,k,P,f,u)}if(e.cim.type!=="CIMVectorMarker")return null;e.cim.offsetX=h(e.offsetX,a,i,o),e.cim.offsetY=h(e.offsetY,a,i,o),e.cim.rotation=h(e.rotation,a,i,o),e.cim.markerPlacement=e.markerPlacement,{analyzedCIM:c}=R(e,a,i,o),l=$(JSON.stringify(c)).toString(),n=this._embedCIMLayerInVectorMarker(c,f),I=h(e.size,a,i,o),y=e.path}else{if(e.type==="text")return null;if(e.type==="fill"){if(e.cim.type==="CIMHatchFill"||e.cim.type==="CIMVectorMarker"||e.cim.type==="CIMPictureMarker"||e.cim.type==="CIMPictureFill"){const u=e.cim.size||e.cim.height;let d,C,k;if(e.cim.type==="CIMPictureMarker"||e.cim.type==="CIMPictureFill")({image:d,width:C,height:k}=this._getPictureResource(e,u,h(e.color,a,i,o)));else{({analyzedCIM:c,hash:l}=R(e,a,i,o));const P=this._rasterizer.rasterizeJSONResource({cim:c,type:e.type,url:e.url,mosaicHash:l,size:u,path:y},1,this._avoidSDF);d=P.image,C=P.size[0],k=P.size[1]}return this._rasterizePictureResource(e,d,C,k,f,null)}if(e.cim.type!=="CIMSolidFill")return null;({analyzedCIM:c,hash:l}=R(e,a,i,o)),n=this._embedCIMLayerInVectorMarker(c,f)}}}else{if(e.type==="text")return p=this._rasterizeTextResource(e,a,r,i,o),p;({analyzedCIM:c,hash:l}=R(e,a,i,o));const g=T(r,e,null);if(e.cim.type==="CIMPictureMarker"){const f=h(e.size,a,i,o)*g,{image:u,width:d,height:C}=this._getPictureResource(e,f,h(e.color,a,i,o));return p={image:u,size:[d,C],sdf:!1,simplePattern:!1,anchorX:e.anchorPoint?e.anchorPoint.x:0,anchorY:e.anchorPoint?e.anchorPoint.y:0},p}N(c,g,{preserveOutlineWidth:!1}),n=c}l+=s,r&&(l+=JSON.stringify(r));const m=this._resourceCache;return m.has(l)?m.get(l):(p=this._rasterizer.rasterizeJSONResource({cim:n,type:e.type,url:e.url,mosaicHash:l,size:I,path:y},window.devicePixelRatio||1,this._avoidSDF),m.set(l,p),p)}_rasterizeTextResource(e,a,s,r,i){const o=T(s,e,null),c=h(e.text,a,r,i);if(!c||c.length===0)return null;const n=h(e.fontName,a,r,i),l=h(e.style,a,r,i),p=h(e.weight,a,r,i),I=h(e.decoration,a,r,i),y=h(e.size,a,r,i)*o,m=h(e.horizontalAlignment,a,r,i),g=h(e.verticalAlignment,a,r,i),f=H(h(e.color,a,r,i)),u=H(h(e.outlineColor,a,r,i)),d={color:f,size:y,horizontalAlignment:m,verticalAlignment:g,font:{family:n,style:l,weight:p,decoration:I},halo:{size:h(e.outlineSize,a,r,i)||0,color:u,style:l},pixelRatio:1,premultiplyColors:!this._avoidSDF};return this._textRasterizer.rasterizeText(c,d)}_rasterizePictureResource(e,a,s,r,i,o){const c=document.createElement("canvas"),n=c.getContext("2d");c.height=M(Math.max(i.frame.ymax-i.frame.ymin,o)),c.width=M(i.frame.xmax-i.frame.xmin);const l=n.createImageData(s,r);l.data.set(new Uint8ClampedArray(a.buffer));const p=this._imageDataToCanvas(l),I=n.createPattern(p,"repeat"),y=Math.cos((-e.cim.rotation||0)*Math.PI/180),m=Math.sin((-e.cim.rotation||0)*Math.PI/180);I.setTransform({m11:y,m12:m,m21:-m,m22:y,m41:M(e.cim.offsetX)||0,m42:M(e.cim.offsetY)||0});const g=i.canvasPaths;let f,u,d;W(g)?(f=g.rings,n.fillStyle=I,u=n.fill,d=["evenodd"]):ee(g)&&(f=g.paths,n.strokeStyle=I,n.lineWidth=o,u=n.stroke,f[0][0][1]=c.height/2,f[0][1][1]=c.height/2),n.beginPath();for(const P of f){const x=P?P.length:0;if(x>1){let b=P[0];n.moveTo(M(b[0]),M(b[1]));for(let z=1;z<x;++z)b=P[z],n.lineTo(M(b[0]),M(b[1]));n.closePath()}}u.apply(n,d);const C=n.getImageData(0,0,c.width,c.height),k=new Uint8Array(C.data);return{size:[c.width,c.height],image:new Uint32Array(k.buffer),sdf:!1,simplePattern:!1,anchorX:0,anchorY:0}}_getPictureResource(e,a,s){const r=this._pictureMarkerCache.get(e.materialHash);if(!r)return null;const i=r.height/r.width,o=a?i>1?M(a):M(a)/i:r.width,c=a?i>1?M(a)*i:M(a):r.height;return{image:this._imageTo32Array(r,o,c,s),width:o,height:c}}_embedCIMLayerInVectorMarker(e,a){const s=W(a.geometry)?"CIMPolygonSymbol":"CIMLineSymbol",r=a.frame;return{type:"CIMVectorMarker",frame:r,size:r.ymax-r.ymin,markerGraphics:[{type:"CIMMarkerGraphic",geometry:a.geometry,symbol:{type:s,symbolLayers:[e]}}]}}}function me(t){return(t?Object.keys(t):[]).map(e=>({name:e,alias:e,type:typeof t[e]=="string"?"esriFieldTypeString":"esriFieldTypeDouble"}))}function fe(t){if(!(t&&t.data&&t.data.symbol))return null;switch(t.data.symbol.type){case"CIMPointSymbol":case"CIMTextSymbol":return"esriGeometryPoint";case"CIMLineSymbol":return"esriGeometryPolyline";case"CIMPolygonSymbol":return"esriGeometryPolygon";default:return null}}function R(t,e,a,s){let r,i;return typeof t.materialHash=="function"?(r=(0,t.materialHash)(e,a,s),i=ae(t.cim,t.materialOverrides)):(r=t.materialHash,i=t.cim),{analyzedCIM:i,hash:r}}export{ze as CIMSymbolRasterizer,Y as GeometryStyle};
