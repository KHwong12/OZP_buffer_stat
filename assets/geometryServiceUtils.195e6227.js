import{r as c,s as l,B as s,d as g,n as u}from"./index.4188ada5.js";async function f(e=null,o){var i,r;if(c.geometryServiceUrl)return c.geometryServiceUrl;if(!e)throw new l("internal:geometry-service-url-not-configured");let t;t="portal"in e?e.portal||s.getDefault():e,await t.load({signal:o});const n=(r=(i=t.helperServices)==null?void 0:i.geometry)==null?void 0:r.url;if(!n)throw new l("internal:geometry-service-url-not-configured");return n}async function y(e,o,t=null,n){const i=await f(t,n),r=new g;r.geometries=[e],r.outSpatialReference=o;const a=await u(i,r,{signal:n});if(a&&Array.isArray(a)&&a.length===1)return a[0];throw new l("internal:geometry-service-projection-failed")}export{f as getGeometryServiceURL,y as projectGeometry};
