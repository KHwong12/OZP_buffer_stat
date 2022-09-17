import{mk as N,ml as $,br as S,cR as I,bq as v,bM as m,mm as E,mf as f,mn as T,_,s as y,dr as G,bN as q,F as w}from"./index.c449ba0d.js";function M(e){return e==="mesh"?N:$(e)}function b(e,t){return e?t?4:3:t?3:2}function C(e,t,i,r){return P(e,t,i,r.coords[0],r.coords[1])}function F(e,t,i,r,s,n){const l=b(s,n),{coords:a,lengths:u}=r;if(!u)return!1;for(let o=0,c=0;o<u.length;o++,c+=l)if(!P(e,t,i,a[c],a[c+1]))return!1;return!0}function P(e,t,i,r,s){if(!e)return!1;const n=b(t,i),{coords:l,lengths:a}=e;let u=!1,o=0;for(const c of a)u=x(u,l,n,o,c,r,s),o+=c*n;return u}function x(e,t,i,r,s,n,l){let a=e,u=r;for(let o=r,c=r+s*i;o<c;o+=i){u=o+i,u===c&&(u=r);const h=t[o],p=t[o+1],A=t[u],R=t[u+1];(p<l&&R>=l||R<l&&p>=l)&&h+(l-p)/(R-p)*(A-h)<n&&(a=!a)}return a}const d="feature-store:unsupported-query",j={esriSpatialRelIntersects:"intersects",esriSpatialRelContains:"contains",esriSpatialRelCrosses:"crosses",esriSpatialRelDisjoint:"disjoint",esriSpatialRelEnvelopeIntersects:"intersects",esriSpatialRelIndexIntersects:null,esriSpatialRelOverlaps:"overlaps",esriSpatialRelTouches:"touches",esriSpatialRelWithin:"within",esriSpatialRelRelation:null},g={spatialRelationship:{esriSpatialRelIntersects:!0,esriSpatialRelContains:!0,esriSpatialRelWithin:!0,esriSpatialRelCrosses:!0,esriSpatialRelDisjoint:!0,esriSpatialRelTouches:!0,esriSpatialRelOverlaps:!0,esriSpatialRelEnvelopeIntersects:!0,esriSpatialRelIndexIntersects:!1,esriSpatialRelRelation:!1},queryGeometry:{esriGeometryPoint:!0,esriGeometryMultipoint:!0,esriGeometryPolyline:!0,esriGeometryPolygon:!0,esriGeometryEnvelope:!0},layerGeometry:{esriGeometryPoint:!0,esriGeometryMultipoint:!0,esriGeometryPolyline:!0,esriGeometryPolygon:!0,esriGeometryEnvelope:!1}};function D(e){return g.spatialRelationship[e]===!0}function O(e){return g.queryGeometry[w(e)]===!0}function U(e){return g.layerGeometry[e]===!0}function V(){return _(()=>import("./geometryEngineJSON.764475ac.js"),["assets/geometryEngineJSON.764475ac.js","assets/index.c449ba0d.js","assets/index.313b6d72.css","assets/geometryEngineJSON.60d3f419.js"])}function L(e,t,i,r,s){if(S(t)&&i==="esriGeometryPoint"&&(e==="esriSpatialRelIntersects"||e==="esriSpatialRelContains")){const n=I(new v,t,!1,!1);return Promise.resolve(l=>C(n,!1,!1,l))}if(S(t)&&i==="esriGeometryMultipoint"){const n=I(new v,t,!1,!1);if(e==="esriSpatialRelContains")return Promise.resolve(l=>F(n,!1,!1,l,r,s))}if(m(t)&&i==="esriGeometryPoint"&&(e==="esriSpatialRelIntersects"||e==="esriSpatialRelContains"))return Promise.resolve(n=>E(t,f(i,r,s,n)));if(m(t)&&i==="esriGeometryMultipoint"&&e==="esriSpatialRelContains")return Promise.resolve(n=>T(t,f(i,r,s,n)));if(m(t)&&e==="esriSpatialRelIntersects"){const n=M(i);return Promise.resolve(l=>n(t,f(i,r,s,l)))}return V().then(n=>{const l=n[j[e]].bind(null,t.spatialReference,t);return a=>l(f(i,r,s,a))})}async function Z(e,t,i){const{spatialRel:r,geometry:s}=e;if(s){if(!D(r))throw new y(d,"Unsupported query spatial relationship",{query:e});if(G(s.spatialReference)&&G(i)){if(!O(s))throw new y(d,"Unsupported query geometry type",{query:e});if(!U(t))throw new y(d,"Unsupported layer geometry type",{query:e});if(e.outSR)return q(e.geometry&&e.geometry.spatialReference,e.outSR)}}}function z(e){if(m(e))return!0;if(S(e)){for(const t of e.rings)if(t.length!==5||t[0][0]!==t[1][0]||t[0][0]!==t[4][0]||t[2][0]!==t[3][0]||t[0][1]!==t[3][1]||t[0][1]!==t[4][1]||t[1][1]!==t[2][1])return!1;return!0}return!1}function B(e,t){if(!e)return null;const i=t.featureAdapter,{startTimeField:r,endTimeField:s}=e;let n=Number.POSITIVE_INFINITY,l=Number.NEGATIVE_INFINITY;if(r&&s)t.forEach(a=>{const u=i.getAttribute(a,r),o=i.getAttribute(a,s);u==null||isNaN(u)||(n=Math.min(n,u)),o==null||isNaN(o)||(l=Math.max(l,o))});else{const a=r||s;t.forEach(u=>{const o=i.getAttribute(u,a);o==null||isNaN(o)||(n=Math.min(n,o),l=Math.max(l,o))})}return{start:n,end:l}}function H(e,t,i){if(!t||!e)return null;const{startTimeField:r,endTimeField:s}=e;if(!r&&!s)return null;const{start:n,end:l}=t;return n===null&&l===null?null:n===void 0&&l===void 0?k():r&&s?W(i,r,s,n,l):Y(i,r||s,n,l)}function W(e,t,i,r,s){return r!=null&&s!=null?n=>{const l=e.getAttribute(n,t),a=e.getAttribute(n,i);return(l==null||l<=s)&&(a==null||a>=r)}:r!=null?n=>{const l=e.getAttribute(n,i);return l==null||l>=r}:s!=null?n=>{const l=e.getAttribute(n,t);return l==null||l<=s}:void 0}function Y(e,t,i,r){return i!=null&&r!=null&&i===r?s=>e.getAttribute(s,t)===i:i!=null&&r!=null?s=>{const n=e.getAttribute(s,t);return n>=i&&n<=r}:i!=null?s=>e.getAttribute(s,t)>=i:r!=null?s=>e.getAttribute(s,t)<=r:void 0}function k(){return()=>!1}export{z as I,Z as P,H as n,B as t,L as v};