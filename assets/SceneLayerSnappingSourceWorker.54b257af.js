import{aD as p,ay as L,h as b,aP as S,gy as E,eM as g,eh as _,mb as y,fc as u,I as v,K as V}from"./index.c449ba0d.js";import{v as P,l as $,d as I}from"./lineSegment.32e011bb.js";import{E as f,Q as C,_ as j}from"./sphere.f8db6816.js";import{G as w}from"./Octree.c7288cc5.js";import{extractComponentsEdgeLocationsLayout as T}from"./EdgeProcessingWorker.93afbba6.js";import"./vectorStacks.fa4b7083.js";import"./quatf64.ddec7ef6.js";import"./mat4f64.84d5c445.js";import"./plane.bb677d0e.js";import"./deduplicate.ee17c5d5.js";import"./InterleavedLayout.85bcc65b.js";import"./BufferView.de19c9b7.js";import"./types.448c2d99.js";import"./VertexAttribute.5551e0d8.js";import"./glUtil.345a77b1.js";import"./enums.de935fa5.js";import"./VertexElementDescriptor.d386088d.js";let l=class{constructor(){this._idToComponent=new Map,this._components=new w(t=>t.bounds),this._edges=new w(t=>t.bounds),this._tmpLineSegment=P(),this._tmpP1=p(),this._tmpP2=p(),this._tmpP3=p(),this.remoteClient=null}async fetchCandidates(t,e){await Promise.resolve(),L(e),await this._ensureEdgeLocations(t,e);const o=[];return this._edges.forEachNeighbor(n=>this._addCandidates(t,n,o),t.bounds),{result:{candidates:o}}}async _ensureEdgeLocations(t,e){const o=[];if(this._components.forEachNeighbor(s=>{if(b(s.info)){const{id:r,uid:d}=s;o.push({id:r,uid:d})}},t.bounds),!o.length)return;const n={components:o},i=await this.remoteClient.invoke("fetchAllEdgeLocations",n,S(e,{}));for(const s of i.components)this._setFetchEdgeLocations(s)}async add(t){const e=new m(t.id,t.bounds);return this._idToComponent.set(e.id,e),this._components.add([e]),{result:{}}}async remove(t){const e=this._idToComponent.get(t.id);if(e){const o=[];this._edges.forEachNeighbor(n=>{n.component===e&&o.push(n)},e.bounds),this._edges.remove(o),this._components.remove([e]),this._idToComponent.delete(e.id)}return{result:{}}}_setFetchEdgeLocations(t){const e=this._idToComponent.get(t.id);if(b(e)||t.uid!==e.uid)return;const o=T.createView(t.locations),n=new Array(o.count),i=p(),s=p();for(let a=0;a<o.count;a++){const h=j(),c=f(h);o.position0.getVec(a,i),o.position1.getVec(a,s),E(c,c,i,.5),E(c,c,s,.5),g(c,c,t.origin),h[3]=_(c,i);const x=new k(e,a,h);n[a]=x}this._edges.add(n);const{objectIds:r,origin:d}=t;e.info={locations:o,objectIds:r,origin:d}}_addCandidates(t,e,o){const{locations:n,origin:i,objectIds:s}=e.component.info,r=n.position0.getVec(e.index,this._tmpP1),d=n.position1.getVec(e.index,this._tmpP2);g(r,r,i),g(d,d,i);const a=s[n.componentIndex.get(e.index)];this._addEdgeCandidate(t,a,r,d,o),this._addVertexCandidate(t,a,r,o),this._addVertexCandidate(t,a,d,o)}_addEdgeCandidate(t,e,o,n,i){if(!(t.types&y.EDGE))return;const s=f(t.bounds),r=$(o,n,this._tmpLineSegment),d=I(r,s,this._tmpP3);if(!C(t.bounds,d))return null;i.push({type:"edge",objectId:e,target:u(d),distance:_(s,d),start:u(o),end:u(n)})}_addVertexCandidate(t,e,o,n){if(!(t.types&y.VERTEX))return;const i=f(t.bounds);if(!C(t.bounds,o))return null;n.push({type:"vertex",objectId:e,target:u(o),distance:_(i,o)})}};function U(){return new l}l=v([V("esri.views.interactive.snapping.featureSources.sceneLayerSource.SceneLayerSnappingSourceWorker")],l);class m{constructor(e,o){this.id=e,this.bounds=o,this.info=null,this.uid=++m.uid}}m.uid=0;class k{constructor(e,o,n){this.component=e,this.index=o,this.bounds=n}}export{l as SceneLayerSnappingSourceWorker,U as default};