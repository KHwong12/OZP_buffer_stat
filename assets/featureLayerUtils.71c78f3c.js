import{a6 as L,W as m,a7 as w,a8 as F,s as n,a9 as f,aa as d,ab as R,ac as D,E as B,h as _,b as q,B as z,ad as M,e as $,ae as U,af as g,ag as Y}from"./index.4188ada5.js";import{fetchFeatureService as j}from"./arcgisLayers.822367ee.js";import{o as v}from"./jsonContext.9b057872.js";import"./lazyLayerLoader.ab653172.js";const C=L.getLogger("esri.layers.FeatureLayer"),y="Feature Service";function c(a,e){return`Layer (title: ${a.title}, id: ${a.id}) of type '${a.declaredClass}' ${e}`}function J(a,e){if(e.type!==y)throw new n("feature-layer:portal-item-wrong-type",c(a,`should have portal item of type "${y}"`))}async function N(a){if(await a.load(),F(a))throw new n("feature-layer:save",c(a,"using an in-memory source cannot be saved to a portal item"))}function G(a,e){let t=a.messages.filter(({type:r})=>r==="error").map(({name:r,message:o,details:s})=>new n(r,o,s));if(e!=null&&e.ignoreUnsupported&&(t=t.filter(({name:r})=>r!=="layer:unsupported"&&r!=="symbol:unsupported"&&r!=="symbol-layer:unsupported"&&r!=="property:unsupported"&&r!=="url:unsupported")),t.length>0)throw new n("feature-layer:save","Failed to save feature layer due to unsupported or invalid content. See 'details.errors' for more detailed information",{errors:t})}async function h(a,e,t){"beforeSave"in a&&typeof a.beforeSave=="function"&&await a.beforeSave();const r=a.write({},e);return G(e,t),r}function O(a){const{layer:e,layerJSON:t}=a;return e.isTable?{layers:[],tables:[t]}:{layers:[t],tables:[]}}function b(a){f(a,d.JSAPI),a.typeKeywords&&(a.typeKeywords=a.typeKeywords.filter((e,t,r)=>r.indexOf(e)===t))}function W(a){const e=a.portalItem;if(!e)throw C.error("save: requires the portalItem property to be set"),new n("feature-layer:portal-item-not-set",c(a,"requires the portalItem property to be set"));if(!e.loaded)throw new n("feature-layer:portal-item-not-loaded",c(a,"cannot be saved to a portal item that does not exist or is inaccessible"));J(a,e)}async function P(a,e){return/\/\d+\/?$/.test(a.url)?O(e[0]):k(a,e)}async function k(a,e){const{layer:{url:t,customParameters:r,apiKey:o}}=e[0];let s=await a.fetchData("json");s&&s.layers!=null&&s.tables!=null||(s=await H(s,{url:t,customParameters:r,apiKey:o},e.map(l=>l.layer.layerId)));for(const l of e)T(l.layer,l.layerJSON,s);return s}async function H(a,e,t){var r,o;a||(a={}),(r=a).layers||(r.layers=[]),(o=a).tables||(o.tables=[]);const{url:s,customParameters:l,apiKey:i}=e,{serviceJSON:u,layersJSON:p}=await j(s,{customParameters:l,apiKey:i}),S=A(a.layers,u.layers,t),I=A(a.tables,u.tables,t);a.layers=S.itemResources,a.tables=I.itemResources;const x=[...S.added,...I.added],K=p?[...p.layers,...p.tables]:[];return await Q(a,x,s,K),a}function A(a,e,t){const r=R(a,e,(s,l)=>s.id===l.id);a=a.filter(s=>!r.removed.some(l=>l.id===s.id));const o=r.added.map(({id:s})=>({id:s}));return o.forEach(({id:s})=>{a.push({id:s})}),{itemResources:a,added:o.filter(({id:s})=>!t.includes(s))}}async function Q(a,e,t,r){const o=e.map(({id:s})=>new D({url:t,layerId:s,sourceJSON:r.find(({id:l})=>l===s)}));await B(o.map(s=>s.load())),o.forEach(s=>{const{layerId:l,loaded:i,defaultPopupTemplate:u}=s;!i||_(u)||T(s,{id:l,popupInfo:u.toJSON()},a)})}function T(a,e,t){a.isTable?E(t.tables,e):E(t.layers,e)}function E(a,e){const t=a.findIndex(({id:r})=>r===e.id);t===-1?a.push(e):a[t]=e}function V(a){const{portalItem:e}=a;return Y(a)&&!a.dynamicDataSource&&!!(e!=null&&e.loaded)&&e.type===y}async function X(a){if(!(a!=null&&a.length))throw new n("feature-layer-utils-saveall:missing-parameters","'layers' array should contain at least one feature layer");await Promise.all(a.map(r=>r.load()));for(const r of a)if(!V(r))throw new n("feature-layer-utils-saveall:invalid-parameters",`'layers' array should only contain layers or tables in a feature service loaded from 'Feature Service' item. ${c(r,"does not conform")}`,{layer:r});const e=a.map(r=>r.portalItem.id);if(new Set(e).size>1)throw new n("feature-layer-utils-saveall:invalid-parameters","All layers in the 'layers' array should be loaded from the same portal item");const t=a.map(r=>r.layerId);if(new Set(t).size!==t.length)throw new n("feature-layer-utils-saveall:invalid-parameters","'layers' array should contain only one instance each of layer or table in a feature service")}function Z(a,e){var s,l;var t,r;let o=q.from(e);return o.id&&(o=o.clone(),o.id=null),(s=(t=o).type)!=null||(t.type=y),(l=(r=o).portal)!=null||(r.portal=z.getDefault()),J(a,o),o}async function aa(a,e){const{url:t,layerId:r,title:o,fullExtent:s,isTable:l}=a,i=M(t),u=$(i)&&i.serverType==="FeatureServer";e.url=u?t:`${t}/${r}`,e.title||(e.title=o),e.extent=null,!l&&$(s)&&(e.extent=await U(s)),g(e,d.METADATA),g(e,d.MULTI_LAYER),f(e,d.SINGLE_LAYER),l&&f(e,d.TABLE),b(e)}async function ea(a,e,t){const r=a.portal;await r._signIn(),await r.user.addItem({item:a,data:e,folder:t==null?void 0:t.folder})}const ia=m(ta);async function ta(a,e){await N(a),W(a);const t=a.portalItem,r=v(t),o=await h(a,r,e),s=await P(t,[{layer:a,layerJSON:o}]);return b(t),await t.update({data:s}),w(r),t}const ua=m(async(a,e)=>{await X(a);const t=a[0].portalItem,r=v(t),o=await Promise.all(a.map(l=>h(l,r,e))),s=await P(t,a.map((l,i)=>({layer:l,layerJSON:o[i]})));return b(t),await t.update({data:s}),await Promise.all(a.slice(1).map(l=>l.portalItem.reload())),w(r),t.clone()}),da=m(ra);async function ra(a,e,t){await N(a);const r=Z(a,e),o=v(r),s=O({layer:a,layerJSON:await h(a,o,t)});return await aa(a,r),await ea(r,s,t),a.portalItem=r,w(o),r}export{ia as save,ua as saveAll,da as saveAs};
