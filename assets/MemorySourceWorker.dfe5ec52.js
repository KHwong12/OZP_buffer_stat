import{s as I,mA as v,m1 as Q,cN as M,bN as _,h as Z,F as b,e as E,bO as j,cF as q,cH as $,mB as A,m4 as O,bQ as D}from"./index.4188ada5.js";import{t as P,n as k}from"./objectIdUtils.773397d7.js";import{u as C}from"./FeatureStore.59ebcee3.js";import{Y as G}from"./QueryEngine.b0ff222c.js";import{a as W,u as z,l as B}from"./clientSideDefaults.97c036ac.js";import{w as L,a as g,m as T,f as x,g as w}from"./sourceUtils.9c318833.js";import"./PooledRBush.875e27a8.js";import"./optimizedFeatureQueryEngineAdapter.0dc54626.js";import"./centroid.1bb4a8ba.js";import"./QueryEngineCapabilities.c2e9875c.js";import"./timeSupport.9149c456.js";const H=O,N={xmin:-180,ymin:-90,xmax:180,ymax:90,spatialReference:O},U={hasAttachments:!1,capabilities:"query, editing, create, delete, update",useStandardizedQueries:!0,supportsCoordinatesQuantization:!0,supportsReturningQueryGeometry:!0,advancedQueryCapabilities:{supportsQueryAttachments:!1,supportsStatistics:!0,supportsPercentileStatistics:!0,supportsReturningGeometryCentroid:!0,supportsQueryWithDistance:!0,supportsDistinct:!0,supportsReturningQueryExtent:!0,supportsReturningGeometryProperties:!1,supportsHavingClause:!0,supportsOrderBy:!0,supportsPagination:!0,supportsQueryWithResultType:!1,supportsSqlExpression:!0,supportsDisjointSpatialRel:!0}};function V(m){return D(m)?m.z!=null:!!m.hasZ}function Y(m){return D(m)?m.m!=null:!!m.hasM}class oe{constructor(){this._queryEngine=null,this._nextObjectId=null}destroy(){this._queryEngine&&this._queryEngine&&this._queryEngine.destroy(),this._queryEngine=this._fieldsIndex=this._createDefaultAttributes=null}async load(e){const t=[],{features:r}=e,i=this._inferLayerProperties(r,e.fields),o=e.fields||[],p=e.hasM!=null?e.hasM:i.hasM,y=e.hasZ!=null?e.hasZ:i.hasZ,f=!e.spatialReference&&!i.spatialReference,u=f?H:e.spatialReference||i.spatialReference,a=f?N:null,s=e.geometryType||i.geometryType,c=!s;let d=e.objectIdField||i.objectIdField,l=e.timeInfo;if(!c&&(f&&t.push({name:"feature-layer:spatial-reference-not-found",message:"Spatial reference not provided or found in features. Defaults to WGS84"}),!s))throw new I("feature-layer:missing-property","geometryType not set and couldn't be inferred from the provided features");if(!d)throw new I("feature-layer:missing-property","objectIdField not set and couldn't be found in the provided fields");if(i.objectIdField&&d!==i.objectIdField&&(t.push({name:"feature-layer:duplicated-oid-field",message:`Provided objectIdField "${d}" doesn't match the field name "${i.objectIdField}", found in the provided fields`}),d=i.objectIdField),d&&!i.objectIdField){let n=null;o.some(h=>h.name===d&&(n=h,!0))?(n.type="esriFieldTypeOID",n.editable=!1,n.nullable=!1):o.unshift({alias:d,name:d,type:"esriFieldTypeOID",editable:!1,nullable:!1})}for(const n of o){if(n.name==null&&(n.name=n.alias),n.alias==null&&(n.alias=n.name),!n.name)throw new I("feature-layer:invalid-field-name","field name is missing",{field:n});if(n.name===d&&(n.type="esriFieldTypeOID"),!v.jsonValues.includes(n.type))throw new I("feature-layer:invalid-field-type",`invalid type for field "${n.name}"`,{field:n})}const F={};for(const n of o)if(n.type!=="esriFieldTypeOID"&&n.type!=="esriFieldTypeGlobalID"){const h=Q(n);h!==void 0&&(F[n.name]=h)}if(this._fieldsIndex=new M(o),this._createDefaultAttributes=W(F,d),l){if(l.startTimeField){const n=this._fieldsIndex.get(l.startTimeField);n?(l.startTimeField=n.name,n.type="esriFieldTypeDate"):l.startTimeField=null}if(l.endTimeField){const n=this._fieldsIndex.get(l.endTimeField);n?(l.endTimeField=n.name,n.type="esriFieldTypeDate"):l.endTimeField=null}if(l.trackIdField){const n=this._fieldsIndex.get(l.trackIdField);n?l.trackIdField=n.name:(l.trackIdField=null,t.push({name:"feature-layer:invalid-timeInfo-trackIdField",message:"trackIdField is missing",details:{timeInfo:l}}))}l.startTimeField||l.endTimeField||(t.push({name:"feature-layer:invalid-timeInfo",message:"startTimeField and endTimeField are missing or invalid",details:{timeInfo:l}}),l=null)}const R={warnings:t,featureErrors:[],layerDefinition:{...U,drawingInfo:z(s),templates:B(F),extent:a,geometryType:s,objectIdField:d,fields:o,hasZ:!!y,hasM:!!p,timeInfo:l},assignedObjectIds:{}};if(this._queryEngine=new G({fields:o,geometryType:s,hasM:p,hasZ:y,objectIdField:d,spatialReference:u,featureStore:new C({geometryType:s,hasM:p,hasZ:y}),timeInfo:l,cacheSpatialQueries:!0}),!r||!r.length)return this._nextObjectId=P,R;const S=k(d,r);return this._nextObjectId=S+1,await _(r,u),this._loadInitialFeatures(R,r)}async applyEdits(e){const{spatialReference:t,geometryType:r}=this._queryEngine;return await Promise.all([L(t,r),_(e.adds,t),_(e.updates,t)]),this._applyEdits(e)}queryFeatures(e,t={}){return this._queryEngine.executeQuery(e,t.signal)}queryFeatureCount(e,t={}){return this._queryEngine.executeQueryForCount(e,t.signal)}queryObjectIds(e,t={}){return this._queryEngine.executeQueryForIds(e,t.signal)}queryExtent(e,t={}){return this._queryEngine.executeQueryForExtent(e,t.signal)}querySnapping(e,t={}){return this._queryEngine.executeQueryForSnapping(e,t.signal)}_inferLayerProperties(e,t){let r,i,o=null,p=null,y=null;for(const f of e){const u=f.geometry;if(!Z(u)&&(o||(o=b(u)),p||(p=u.spatialReference),r==null&&(r=V(u)),i==null&&(i=Y(u)),o&&p&&r!=null&&i!=null))break}if(t&&t.length){let f=null;t.some(u=>{const a=u.type==="esriFieldTypeOID",s=!u.type&&u.name&&u.name.toLowerCase()==="objectid";return f=u,a||s})&&(y=f.name)}return{geometryType:o,spatialReference:p,objectIdField:y,hasM:i,hasZ:r}}_loadInitialFeatures(e,t){const{geometryType:r,hasM:i,hasZ:o,objectIdField:p,spatialReference:y,featureStore:f}=this._queryEngine,u=[];for(const a of t){if(a.uid!=null&&(e.assignedObjectIds[a.uid]=-1),a.geometry&&r!==b(a.geometry)){e.featureErrors.push(g("Incorrect geometry type."));continue}const s=this._createDefaultAttributes(),c=T(this._fieldsIndex,s,a.attributes,!0,e.warnings);c?e.featureErrors.push(c):(this._assignObjectId(s,a.attributes,!0),a.attributes=s,a.uid!=null&&(e.assignedObjectIds[a.uid]=a.attributes[p]),E(a.geometry)&&(a.geometry=j(a.geometry,a.geometry.spatialReference,y)),u.push(a))}if(f.addMany(q([],u,r,o,i,p)),e.layerDefinition.extent=this._queryEngine.fullExtent,e.layerDefinition.timeInfo){const{start:a,end:s}=this._queryEngine.timeExtent;e.layerDefinition.timeInfo.timeExtent=[a,s]}return e}_applyEdits(e){const{adds:t,updates:r,deletes:i}=e,o={addResults:[],deleteResults:[],updateResults:[],uidToObjectId:{}};if(t&&t.length&&this._applyAddEdits(o,t),r&&r.length&&this._applyUpdateEdits(o,r),i&&i.length){for(const p of i)o.deleteResults.push(x(p));this._queryEngine.featureStore.removeManyById(i)}return{fullExtent:this._queryEngine.fullExtent,featureEditResults:o}}_applyAddEdits(e,t){const{addResults:r}=e,{geometryType:i,hasM:o,hasZ:p,objectIdField:y,spatialReference:f,featureStore:u}=this._queryEngine,a=[];for(const s of t){if(s.geometry&&i!==b(s.geometry)){r.push(g("Incorrect geometry type."));continue}const c=this._createDefaultAttributes(),d=T(this._fieldsIndex,c,s.attributes);if(d)r.push(d);else{if(this._assignObjectId(c,s.attributes),s.attributes=c,s.uid!=null){const l=s.attributes[y];e.uidToObjectId[s.uid]=l}E(s.geometry)&&(s.geometry=j(w(s.geometry,f),s.geometry.spatialReference,f)),a.push(s),r.push(x(s.attributes[y]))}}u.addMany(q([],a,i,p,o,y))}_applyUpdateEdits({updateResults:e},t){const{geometryType:r,hasM:i,hasZ:o,objectIdField:p,spatialReference:y,featureStore:f}=this._queryEngine;for(const u of t){const{attributes:a,geometry:s}=u,c=a&&a[p];if(c==null){e.push(g(`Identifier field ${p} missing`));continue}if(!f.has(c)){e.push(g(`Feature with object id ${c} missing`));continue}const d=$(f.getFeature(c),r,o,i);if(E(s)){if(r!==b(s)){e.push(g("Incorrect geometry type."));continue}d.geometry=j(w(s,y),s.spatialReference,y)}if(a){const l=T(this._fieldsIndex,d.attributes,a);if(l){e.push(l);continue}}f.add(A(d,r,o,i,p)),e.push(x(c))}}_assignObjectId(e,t,r=!1){const i=this._queryEngine.objectIdField;r&&t&&isFinite(t[i])?e[i]=t[i]:e[i]=this._nextObjectId++}}export{oe as default};
