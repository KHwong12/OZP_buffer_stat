import{I as t,J as o,K as p}from"./index.c449ba0d.js";import a from"./FeatureLayerView2D.806ffff3.js";import"./utils.05a32d96.js";import"./Utils.5475507e.js";import"./number.08b65821.js";import"./enums.05a6ea95.js";import"./enums.de935fa5.js";import"./Texture.cda2030f.js";import"./VertexElementDescriptor.d386088d.js";import"./MaterialKey.515c94cd.js";import"./alignmentUtils.63b4d661.js";import"./definitions.6dca4f7b.js";import"./LayerView2D.0417a1f6.js";import"./schemaUtils.7b6623c8.js";import"./visualVariablesUtils.ff4a15b5.js";import"./createSymbolSchema.ce6ffce0.js";import"./CIMSymbolHelper.fe907459.js";import"./BidiEngine.ec67919b.js";import"./floatRGBA.c454e1e9.js";import"./GeometryUtils.814cb798.js";import"./cimAnalyzer.bd8099fb.js";import"./callExpressionWithFeature.b21a8d1f.js";import"./ExpandedCIM.bbb8cdff.js";import"./MD5.97b39efc.js";import"./util.3c49eb19.js";import"./floorFilterUtils.69500d62.js";import"./popupUtils.4aa12fc0.js";import"./LayerView.a76a0fbd.js";import"./RefreshableLayerView.2c00d787.js";const s=e=>{let r=class extends e{get availableFields(){return this.layer.fieldsIndex.fields.map(m=>m.name)}};return t([o()],r.prototype,"layer",void 0),t([o({readOnly:!0})],r.prototype,"availableFields",null),r=t([p("esri.views.layers.OGCFeatureLayerView")],r),r};let i=class extends s(a){supportsSpatialReference(e){return this.layer.serviceSupportsSpatialReference(e)}};i=t([p("esri.views.2d.layers.OGCFeatureLayerView2D")],i);const z=i;export{z as default};
