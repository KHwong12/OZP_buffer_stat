import{b as y,s as L,a as m}from"./index.4188ada5.js";import{a as d}from"./lazyLayerLoader.ab653172.js";import{n as c,I as i,f as N,m as I}from"./layersLoader.1f6ed10f.js";import"./jsonContext.9b057872.js";function k(e){return!e.portalItem||e.portalItem instanceof y||(e={...e,portalItem:new y(e.portalItem)}),S(e.portalItem).then(r=>{const a={portalItem:e.portalItem,...r.properties};return new r.constructor(a)})}function S(e){return e.load().then(h).then(g)}function h(e){switch(e.type){case"Map Service":return w(e);case"Feature Service":return T(e);case"Feature Collection":return v(e);case"Scene Service":return M(e);case"Image Service":return P(e);case"Stream Service":return C();case"Vector Tile Service":return F();case"KML":return $();case"WFS":return j();case"WMTS":return G();case"WMS":return b();case"Feed":return K();default:return Promise.reject(new L("portal:unknown-item-type","Unknown item type '${type}'",{type:e.type}))}}function g(e){return(0,d[e.className])().then(r=>({constructor:r,properties:e.properties}))}function w(e){return W(e).then(r=>r?{className:"TileLayer"}:{className:"MapImageLayer"})}function T(e){return p(e).then(r=>{if(typeof r=="object"){const a={};return r.id!=null&&(a.layerId=r.id),{className:"FeatureLayer",properties:a}}return{className:"GroupLayer"}})}function M(e){return p(e).then(r=>{if(typeof r=="object"){const a={};let o;if(r.id!=null?(a.layerId=r.id,o=`${e.url}/layers/${r.id}`):o=e.url,Array.isArray(e.typeKeywords)&&e.typeKeywords.length>0){const t={IntegratedMesh:"IntegratedMeshLayer","3DObject":"SceneLayer",Point:"SceneLayer",PointCloud:"PointCloudLayer",Building:"BuildingSceneLayer"};for(const n of Object.keys(t))if(e.typeKeywords.includes(n))return{className:t[n]}}return c(o).then(t=>{let n="SceneLayer";const s={Point:"SceneLayer","3DObject":"SceneLayer",IntegratedMesh:"IntegratedMeshLayer",PointCloud:"PointCloudLayer",Building:"BuildingSceneLayer"};return t&&t.layerType&&s[t.layerType]&&(n=s[t.layerType]),{className:n,properties:a}})}return r===!1?c(e.url).then(a=>(a==null?void 0:a.layerType)==="Voxel"?{className:"VoxelLayer"}:{className:"GroupLayer"}):{className:"GroupLayer"}})}async function v(e){if(await e.load(),m(e,"Map Notes"))return{className:"MapNotesLayer"};if(m(e,"Route Layer"))return{className:"RouteLayer"};const r=await e.fetchData();return i(r)===1?{className:"FeatureLayer"}:{className:"GroupLayer"}}async function P(e){var t,n,s,l;await e.load();const r=(n=(t=e.typeKeywords)==null?void 0:t.map(f=>f.toLowerCase()))!=null?n:[];if(r.includes("elevation 3d layer"))return{className:"ElevationLayer"};if(r.includes("tiled imagery"))return{className:"ImageryTileLayer"};const a=(s=await e.fetchData())==null?void 0:s.layerType;return a==="ArcGISTiledImageServiceLayer"?{className:"ImageryTileLayer"}:a==="ArcGISImageServiceLayer"?{className:"ImageryLayer"}:((l=(await c(e.url)).cacheType)==null?void 0:l.toLowerCase())==="map"?{className:"ImageryTileLayer"}:{className:"ImageryLayer"}}function C(){return{className:"StreamLayer"}}function F(){return{className:"VectorTileLayer"}}function $(){return{className:"KMLLayer"}}function j(){return{className:"WFSLayer"}}function b(){return{className:"WMSLayer"}}function G(){return{className:"WMTSLayer"}}function K(){return{className:"StreamLayer"}}function W(e){return c(e.url).then(r=>r.tileInfo)}function p(e){return!e.url||e.url.match(/\/\d+$/)?Promise.resolve({}):e.load().then(()=>e.fetchData()).then(async r=>e.type==="Feature Service"?u(r=await N(r,e.url)):i(r)>0?u(r):c(e.url).then(u))}function u(e){return i(e)===1&&{id:I(e)}}export{k as fromItem,h as selectLayerClassPath};
