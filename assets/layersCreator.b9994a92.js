import{E as f,t as g,b as G,j as M}from"./index.4188ada5.js";import{a as L}from"./lazyLayerLoader.ab653172.js";import{selectLayerClassPath as m}from"./portalLayers.3cf55106.js";import"./layersLoader.1f6ed10f.js";import"./jsonContext.9b057872.js";function A(e){return I(e,"notes")}function v(e){return I(e,"route")}function I(e,r){return!(!e.layerType||e.layerType!=="ArcGISFeatureLayer")&&e.featureCollectionType===r}async function w(e,r,a){if(!r)return;const y=[];for(const t of r){const i=B(t,a);t.layerType==="GroupLayer"?y.push(x(i,t,a)):y.push(i)}const n=await f(y);for(const t of n)!t.value||a.filter&&!a.filter(t.value)||e.add(t.value)}const b={ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",PointCloudLayer:"PointCloudLayer",ArcGISSceneServiceLayer:"SceneLayer",IntegratedMeshLayer:"IntegratedMeshLayer",OGCFeatureLayer:"OGCFeatureLayer",BuildingSceneLayer:"BuildingSceneLayer",ArcGISTiledElevationServiceLayer:"ElevationLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",GroupLayer:"GroupLayer",GeoJSON:"GeoJSONLayer",WebTiledLayer:"WebTileLayer",CSV:"CSVLayer",VectorTileLayer:"VectorTileLayer",WFS:"WFSLayer",WMS:"WMSLayer",DefaultTileLayer:"TileLayer",KML:"KMLLayer",RasterDataLayer:"UnsupportedLayer",Voxel:"VoxelLayer",LineOfSightLayer:"LineOfSightLayer"},W={ArcGISTiledElevationServiceLayer:"ElevationLayer",DefaultTileLayer:"ElevationLayer",RasterDataElevationLayer:"UnsupportedLayer"},F={ArcGISTiledMapServiceLayer:"TileLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",OpenStreetMap:"OpenStreetMapLayer",WebTiledLayer:"WebTileLayer",VectorTileLayer:"VectorTileLayer",ArcGISImageServiceLayer:"UnsupportedLayer",WMS:"UnsupportedLayer",ArcGISMapServiceLayer:"UnsupportedLayer",DefaultTileLayer:"TileLayer"},C={ArcGISAnnotationLayer:"UnsupportedLayer",ArcGISDimensionLayer:"UnsupportedLayer",ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISStreamLayer:"StreamLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",BingMapsAerial:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",CSV:"CSVLayer",DefaultTileLayer:"TileLayer",GeoRSS:"GeoRSSLayer",GeoJSON:"GeoJSONLayer",GroupLayer:"GroupLayer",KML:"KMLLayer",OGCFeatureLayer:"OGCFeatureLayer",SubtypeGroupLayer:"UnsupportedLayer",VectorTileLayer:"VectorTileLayer",WFS:"WFSLayer",WMS:"WMSLayer",WebTiledLayer:"WebTileLayer"},V={ArcGISFeatureLayer:"FeatureLayer"},O={ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",OpenStreetMap:"OpenStreetMapLayer",VectorTileLayer:"VectorTileLayer",WebTiledLayer:"WebTileLayer",BingMapsAerial:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",WMS:"WMSLayer",DefaultTileLayer:"TileLayer"};async function B(e,r){return h(await U(e,r),e,r)}async function h(e,r,a){const y=new e;return y.read(r,a.context),y.type==="group"&&d(r)&&await E(y,r,a.context),await g(y,a.context),y}async function U(e,r){const a=r.context,y=D(a);let n=e.layerType||e.type;!n&&r&&r.defaultLayerType&&(n=r.defaultLayerType);const t=y[n];let i=t?L[t]:L.UnknownLayer;if(T(e)){const s=a==null?void 0:a.portal;if(e.itemId){const o=new G({id:e.itemId,portal:s});await o.load();const c=(await m(o)).className||"UnknownLayer";i=L[c]}}else n==="ArcGISFeatureLayer"?A(e)?i=L.MapNotesLayer:v(e)?i=L.RouteLayer:d(e)&&(i=L.GroupLayer):e.wmtsInfo&&e.wmtsInfo.url&&e.wmtsInfo.layerIdentifier?i=L.WMTSLayer:n==="WFS"&&e.wfsInfo.version!=="2.0.0"&&(i=L.UnsupportedLayer);return i()}function d(e){var r,a,y;return e.layerType!=="ArcGISFeatureLayer"||T(e)?!1:((y=(a=(r=e.featureCollection)==null?void 0:r.layers)==null?void 0:a.length)!=null?y:0)>1}function T(e){return e.type==="Feature Collection"}function D(e){let r;if(e.origin==="web-scene")switch(e.layerContainerType){case"basemap":r=F;break;case"ground":r=W;break;default:r=b}else switch(e.layerContainerType){case"basemap":r=O;break;case"tables":r=V;break;default:r=C}return r}async function x(e,r,a){const y=new M,n=w(y,Array.isArray(r.layers)?r.layers:[],a),t=await e;if(await n,t.type==="group")return t.layers.addMany(y),t}async function E(e,r,a){const y=L.FeatureLayer,n=await y(),t=r.featureCollection,i=t.showLegend,s=t.layers.map((o,c)=>{var u,S;const l=new n;l.read(o,a);const p={...a,ignoreDefaults:!0};return l.read({id:`${e.id}-sublayer-${c}`,visibility:(S=(u=r.visibleLayers)==null?void 0:u.includes(c))!=null?S:!0},p),i!=null&&l.read({showLegend:i},p),l});e.layers.addMany(s)}export{w as populateOperationalLayers};
