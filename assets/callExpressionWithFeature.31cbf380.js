import{a6 as i,s as m,cX as l,cY as p,cZ as y,c_ as d}from"./index.4188ada5.js";function h(n,r,e,a,t){const s=n.referencesGeometry()&&t?g(r,a,t):r,o=n.repurposeFeature(s);try{return n.evaluate({...e,$feature:o})}catch(u){return i.getLogger("esri.views.2d.support.arcadeOnDemand").warn("Feature arcade evaluation failed:",u),null}}const c=new Map;function g(n,r,e){const{transform:a,hasZ:t,hasM:s}=e;c.has(r)||c.set(r,f(r));const o=c.get(r)(n.geometry,a,t,s);return{...n,geometry:o}}function f(n){const r={};switch(n){case"esriGeometryPoint":return(e,a,t,s)=>d(a,r,e,t,s);case"esriGeometryPolygon":return(e,a,t,s)=>y(a,r,e,t,s);case"esriGeometryPolyline":return(e,a,t,s)=>p(a,r,e,t,s);case"esriGeometryMultipoint":return(e,a,t,s)=>l(a,r,e,t,s);default:return i.getLogger("esri.views.2d.support.arcadeOnDemand").error(new m("mapview-arcade",`Unable to handle geometryType: ${n}`)),e=>e}}export{h as s};
