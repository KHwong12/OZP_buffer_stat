import{e as d,h as u,aE as _,bU as p,aJ as l,bW as n,aI as f,cP as m,bV as B}from"./index.4188ada5.js";import{a as R}from"./utils.e9e483a9.js";import{M as w,P as c,G as v,D as k}from"./enums.de935fa5.js";import{u as T}from"./Texture.568e5c45.js";class b{constructor(t,e,i){this.pixelBlock=t,this.extent=e,this.originalPixelBlock=i}get width(){return d(this.pixelBlock)?this.pixelBlock.width:0}get height(){return d(this.pixelBlock)?this.pixelBlock.height:0}render(t){const e=this.pixelBlock;if(u(e))return;const i=this.filter({pixelBlock:e});if(u(i.pixelBlock))return;const r=i.pixelBlock.getAsRGBA(),h=t.createImageData(i.pixelBlock.width,i.pixelBlock.height);h.data.set(r),t.putImageData(h,0,0)}getRenderedRasterPixels(){const t=this.filter({pixelBlock:this.pixelBlock});return u(t.pixelBlock)?null:{width:t.pixelBlock.width,height:t.pixelBlock.height,renderedRasterPixels:new Uint8Array(t.pixelBlock.getAsRGBA().buffer)}}}function M(s){return s&&"render"in s}function E(s){return s&&!("render"in s)}function I(s){const t=document.createElement("canvas");return t.width=s.width,t.height=s.height,s.render(t.getContext("2d")),t}function x(s,t,e){const i={target:w.TEXTURE_2D,pixelFormat:c.RGBA,internalFormat:c.RGBA,dataType:v.UNSIGNED_BYTE,wrapMode:k.CLAMP_TO_EDGE};return t&&e&&(i.width=t,i.height=e),new T(s,i)}class H extends R{constructor(t=null,e,i=!0){super(),this.requestRenderOnSourceChangedEnabled=i,this._textureInvalidated=!0,this.stencilRef=0,this.coordScale=[1,1],this._height=void 0,this.pixelRatio=1,this.resolution=0,this.rotation=0,this._source=null,this._width=void 0,this.x=0,this.y=0,this.blendFunction=e,this.source=t,this.requestRender=this.requestRender.bind(this)}destroy(){this._texture&&(this._texture.dispose(),this._texture=null)}get isSourceScaled(){return this.width!==this.sourceWidth||this.height!==this.sourceHeight}get height(){return this._height!==void 0?this._height:this.sourceHeight}set height(t){this._height=t}get source(){return this._source}set source(t){this._source=t,this.invalidateTexture()}get sourceHeight(){return this._source instanceof HTMLImageElement?this._source.naturalHeight:this._source.height}get sourceWidth(){return this._source instanceof HTMLImageElement?this._source.naturalWidth:this._source.width}get width(){return this._width!==void 0?this._width:this.sourceWidth}set width(t){this._width=t}beforeRender(t){super.beforeRender(t),this.updateTexture(t.context)}invalidateTexture(){this._textureInvalidated||(this._textureInvalidated=!0,this.requestRenderOnSourceChangedEnabled&&this.requestRender())}_createTransforms(){return{dvs:_()}}setTransform(t){const e=p(this.transforms.dvs),[i,r]=t.toScreenNoRotation([0,0],[this.x,this.y]),h=this.resolution/this.pixelRatio/t.resolution,o=h*this.width,a=h*this.height,g=Math.PI*this.rotation/180;l(e,e,n(i,r)),l(e,e,n(o/2,a/2)),f(e,e,-g),l(e,e,n(-o/2,-a/2)),m(e,e,n(o,a)),B(this.transforms.dvs,t.displayViewMat3,e)}setSamplingProfile(t){this._texture&&(t.mips&&!this._texture.descriptor.hasMipmap&&this._texture.generateMipmap(),this._texture.setSamplingMode(t.samplingMode))}bind(t,e){this._texture&&t.bindTexture(this._texture,e)}updateTexture(t){var i;if(!this.stage)return(i=this._texture)==null||i.dispose(),void(this._texture=null);if(!this._textureInvalidated)return;this._textureInvalidated=!1,this._texture||(this.source?this._texture=x(t,this.sourceWidth,this.sourceHeight):this._texture=x(t));const e=this.source;if(e){if(this._texture.resize(this.sourceWidth,this.sourceHeight),M(e))if(e instanceof b){const r=e.getRenderedRasterPixels();this._texture.setData(d(r)?r.renderedRasterPixels:null)}else this._texture.setData(I(e));else E(e)&&this._texture.setData(e);this.ready()}else this._texture.setData(null)}onAttach(){this.invalidateTexture()}onDetach(){this.invalidateTexture()}}export{b as i,H as v};
