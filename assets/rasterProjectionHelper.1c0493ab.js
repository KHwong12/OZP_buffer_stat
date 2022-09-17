import{km as H,kn as wt,M as Y,dB as O,h as N,e as S,cU as W,bo as Rt,b6 as k,e2 as Pt,s as bt,ko as v,kp as T,kq as et,kr as St,ks as kt,$ as Gt,kt as it}from"./index.4188ada5.js";var D;function xt(t,n,i){return!Pt(t,n,i)}function $(t,n,i){const s=xt(t,n,i);if(s&&!H())throw new bt("rasterprojectionhelper-project","projection engine is not loaded");return s}(function(t){t[t.None=0]="None",t[t.North=1]="North",t[t.South=2]="South",t[t.Both=3]="Both"})(D||(D={}));const ot=(t,n,i,s=0)=>{if(i[0]===1)return[0,0];let r=1,e=-1,o=1,u=-1;for(let c=0;c<t.length;c+=2)isNaN(t[c])||(r=r>t[c]?t[c]:r,e=e>t[c]?e:t[c],o=o>t[c+1]?t[c+1]:o,u=u>t[c+1]?u:t[c+1]);const{cols:l,rows:a}=n,x=(e-r)/l/i[0],M=(u-o)/a/i[1],g=2*s;let m=0,f=!1,h=[0,0];for(let c=0;c<l-3;c++){for(let R=0;R<a-3;R++){const y=c*a*2+2*R,p=(t[y]+t[y+4]+t[y+4*a]+t[y+4*a+4])/4,d=(t[y+1]+t[y+5]+t[y+4*a+1]+t[y+4*a+5])/4,w=Math.abs((p-t[y+2*a+2])/x),P=Math.abs((d-t[y+2*a+3])/M);if(w+P>m&&(m=w+P,h=[w,P]),g&&m>g){f=!0;break}}if(f)break}return h},Nt={3395:20037508342789244e-9,3410:17334193943686873e-9,3857:20037508342788905e-9,3975:17367530445161372e-9,4087:20037508342789244e-9,4088:20015108787169147e-9,6933:17367530445161372e-9,32662:20037508342789244e-9,53001:2001508679602057e-8,53002:1000754339801029e-8,53003:2001508679602057e-8,53004:2001508679602057e-8,53016:14152803599503474e-9,53017:17333573624304302e-9,53034:2001508679602057e-8,53079:20015114352186374e-9,53080:20015114352186374e-9,54001:20037508342789244e-9,54002:10018754171394624e-9,54003:20037508342789244e-9,54004:20037508342789244e-9,54016:14168658027268292e-9,54017:1736753044516137e-8,54034:20037508342789244e-9,54079:20037508342789244e-9,54080:20037508342789244e-9,54100:20037508342789244e-9,54101:20037508342789244e-9},A=32,B=4,J=B,X=new Map,K=new Map;async function $t(){if(H())return null;await wt()}function Lt(t,n,i){return $(t.spatialReference,n)?i?it(n,t.spatialReference,t):it(t.spatialReference,n,t):null}function st(t,n,i,s=null){const r=t.spatialReference;if(r.equals(n))return t;$(r,n,s);const e=i.center,o=new Y({xmin:e.x-t.x/2,xmax:e.x+t.x/2,ymin:e.y-t.y/2,ymax:e.y+t.y/2,spatialReference:r}),u=O(o,n,s),l=C(n);let a;if(N(u)||S(l)&&u.width>=l){const x=W(r)/W(n);a={x:t.x*x,y:t.y*x}}else a={x:u.width,y:u.height};return a}function G(t,n=.01){return W(t)?n/W(t):0}function rt(t,n,i=null,s=!0){const r=t.spatialReference;if(r.equals(n))return t;$(r,n,i);const e=O(t,n,i);if(!s||!e)return e;const o=I(r,!0),u=I(n,!0),l=G(r);return l&&S(o)&&S(u)&&(e.x>0&&Math.abs(t.x-o[0])<l?e.x-=u[1]-u[0]:e.x<0&&Math.abs(t.x-o[1])<l&&(e.x+=u[1]-u[0])),e}function Et(t){const{inSR:n,outSR:i,datumTransformation:s,preferPE:r}=t;if(n.equals(i)){const{points:e}=Q(t,null);return e}if(n.isWebMercator&&i.isWGS84||n.isWGS84&&i.isWebMercator)return vt(t);if($(n,i,s)&&r){if(n.isGeographic)return at(t);const e=z(n);if(S(e))return at(t)}return Tt(t)}function Tt(t){const{points:n}=Q(t,null),i=n.map(s=>new k(s[0],s[1],t.inSR));return O(i,t.outSR,t.datumTransformation).map(s=>s?[s.x,s.y]:[NaN,NaN])}function at(t){const{inSR:n,outSR:i,datumTransformation:s}=t,r=z(n),{points:e,mask:o}=Q(t,r);if(!n.isGeographic){const l=n.wkid?v.coordsys(n.wkid):v.fromString(n.isGeographic?T.PE_TYPE_GEOGCS:T.PE_TYPE_PROJCS,n.wkt);et.projToGeog(l,e.length,e)}if(S(s)&&s.steps.length&&s.steps.forEach(l=>{const a=l.wkid?v.geogtran(l.wkid):v.fromString(T.PE_TYPE_GEOGTRAN,l.wkt);St.geogToGeog(a,e.length,e,null,l.isInverse?T.PE_TRANSFORM_2_TO_1:T.PE_TRANSFORM_1_TO_2)}),!i.isGeographic){const l=z(i,!0),a=S(l)&&l.isEnvelope?[l.bbox[1],l.bbox[3]]:[-90,90];Ct(e,a);const x=i.wkid?v.coordsys(i.wkid):v.fromString(i.isGeographic?T.PE_TYPE_GEOGCS:T.PE_TYPE_PROJCS,i.wkt);et.geogToProj(x,e.length,e)}let u=e;if(o&&e.length!==o.length){u=[];for(let l=0,a=0;l<o.length;l++)o[l]?u.push(e[a++]):u.push([NaN,NaN])}return u}function vt(t){const{cols:n,rows:i,xres:s,yres:r,usePixelCenter:e,inSR:o,outSR:u}=t;let{xmin:l,ymax:a}=t;e&&(l+=s/2,a-=r/2);const x=[],M=[],g=Math.max(n,i);for(let f=0;f<g;f++){const h=l+s*Math.min(n,f),c=a-r*Math.min(i,f),R=O(new k({x:h,y:c,spatialReference:o}),u);f<=n&&x.push(R.x),f<=i&&M.push(R.y)}const m=[];for(let f=0;f<n;f++)for(let h=0;h<i;h++)m.push([x[f],M[h]]);return m}function z(t,n=!1){let i=t.wkid||t.wkt;if(!i||t.isGeographic)return null;if(i=String(i),X.has(i)){const o=X.get(i);return n?o==null?void 0:o.gcs:o==null?void 0:o.pcs}const s=t.wkid?v.coordsys(t.wkid):v.fromString(t.isGeographic?T.PE_TYPE_GEOGCS:T.PE_TYPE_PROJCS,t.wkt),r=lt(s,G(t,1e-4)),e=lt(s,0,!0);return X.set(i,{pcs:r,gcs:e}),n?e:r}function lt(t,n=0,i=!1){const s=kt.generate(t),r=i?t.horizonGcsGenerate():t.horizonPcsGenerate();if(!(r!=null&&r.length))return null;let e=!1,o=r.find(c=>c.getInclusive()===1&&c.getKind()===1);if(!o){if(o=r.find(c=>c.getInclusive()===1&&c.getKind()===0),!o)return null;e=!0}const u=i?0:(s.getNorthPoleLocation()===2?1:0)|(s.getSouthPoleLocation()===2?2:0),l=s.isPannableRectangle(),a=o.getCoord();if(e)return{isEnvelope:e,isPannable:l,vertices:a,coef:null,bbox:[a[0][0]-n,a[0][1]-n,a[1][0]+n,a[1][1]+n],poleLocation:u};let x=0;const M=[];let[g,m]=a[0],[f,h]=a[0];for(let c=0,R=a.length;c<R;c++){x++,x===R&&(x=0);const[y,p]=a[c],[d,w]=a[x];if(w===p)M.push([y,d,p,w,2]);else{const P=(d-y)/(w-p||1e-4),E=y-P*p;p<w?M.push([P,E,p,w,0]):M.push([P,E,w,p,1])}g=g<y?g:y,m=m<p?m:p,f=f>y?f:y,h=h>p?h:p}return{isEnvelope:!1,isPannable:l,vertices:a,coef:M,bbox:[g,m,f,h],poleLocation:u}}function Q(t,n){const i=[],{cols:s,rows:r,xres:e,yres:o,usePixelCenter:u}=t;let{xmin:l,ymax:a}=t;if(u&&(l+=e/2,a-=o/2),N(n)){for(let m=0;m<s;m++)for(let f=0;f<r;f++)i.push([l+e*m,a-o*f]);return{points:i}}const x=new Uint8Array(s*r);if(n.isEnvelope){const{bbox:[m,f,h,c]}=n;for(let R=0,y=0;R<s;R++){const p=l+e*R,d=n.isPannable||p>=m&&p<=h;for(let w=0;w<r;w++,y++){const P=a-o*w;d&&P>=f&&P<=c&&(i.push([p,P]),x[y]=1)}}return{points:i,mask:x}}const{coef:M}=n,g=[];for(let m=0;m<r;m++){const f=a-o*m,h=[],c=[];for(let y=0;y<M.length;y++){const[p,d,w,P,E]=M[y];if(f===w&&w===P)h.push(p),h.push(d),c.push(2),c.push(2);else if(f>=w&&f<=P){const j=p*f+d;h.push(j),c.push(E)}}let R=h;if(h.length>2){let y=c[0]===2?0:c[0],p=h[0];R=[];for(let d=1;d<c.length;d++)c[d]===2&&d!==c.length-1||(c[d]!==y&&(R.push(y===0?Math.min(p,h[d-1]):Math.max(p,h[d-1])),y=c[d],p=h[d]),d===c.length-1&&R.push(c[d]===0?Math.min(p,h[d]):Math.max(p,h[d])));R.sort((d,w)=>d-w)}else h[0]>h[1]&&(R=[h[1],h[0]]);g.push(R)}for(let m=0,f=0;m<s;m++){const h=l+e*m;for(let c=0;c<r;c++,f++){const R=a-o*c,y=g[c];if(y.length===2)h>=y[0]&&h<=y[1]&&(i.push([h,R]),x[f]=1);else if(y.length>2){let p=!1;for(let d=0;d<y.length;d+=2)if(h>=y[d]&&h<=y[d+1]){p=!0;break}p&&(i.push([h,R]),x[f]=1)}}}return{points:i,mask:x}}function Ct(t,n){const[i,s]=n;for(let r=0;r<t.length;r++){const e=t[r][1];(e<i||e>s)&&(t[r]=[NaN,NaN])}}function ht(t){const n=C(t[0].spatialReference);if(t.length<2||N(n))return t[0];let{xmin:i,xmax:s,ymin:r,ymax:e}=t[0];for(let o=1;o<t.length;o++){const u=t[o];s=u.xmax+n*o,r=Math.min(r,u.ymin),e=Math.max(e,u.ymax)}return new Y({xmin:i,xmax:s,ymin:r,ymax:e,spatialReference:t[0].spatialReference})}function mt(t,n,i=null,s=!0){const r=t.spatialReference;if(r.equals(n))return t;const e=zt(t),o=C(r,!0),u=C(n);if(e===0||N(o)||N(u)){const a=ct(t,n,i,s);if(N(o)&&S(u)&&Math.abs(a.width-u)<G(n)&&H()){const x=z(r);if(S(x)&&x.poleLocation===D.None&&t.width<(x.bbox[2]-x.bbox[0])/2)return _t(t,n)||a}return a}const l=t.clone().normalize();if(l.length===1&&t.xmax<o&&t.xmax-o/2>G(r)){const{xmin:a,xmax:x}=t;for(let M=0;M<=e;M++){const g=M===0?a:-o/2,m=M===e?x-o*M:o/2;l[M]=new Y({xmin:g,xmax:m,ymin:t.ymin,ymax:t.ymax,spatialReference:r})}}return ht(l.map(a=>ct(a,n,i,s)).filter(a=>!!a))}function _t(t,n){const i=C(n);if(N(i))return null;let{xmin:s,ymin:r,xmax:e,ymax:o}=t;const u=t.spatialReference,l=new Rt({spatialReference:u,rings:[[[s,r],[e,r],[e,o],[s,o],[s,r]]]}),a=O(l,n);if(a.rings.length!==2||!a.rings[0].length||!a.rings[1].length)return null;const{rings:x}=a,M=G(u),g=new Y({spatialReference:n});for(let m=0;m<2;m++){s=e=x[m][0][0],r=o=x[m][0][1];for(let f=0;f<x[m].length;f++)s=s>x[m][f][0]?x[m][f][0]:s,e=e<x[m][f][0]?x[m][f][0]:e,r=r>x[m][f][1]?x[m][f][1]:r,o=o<x[m][f][1]?x[m][f][1]:o;if(m===0)g.ymin=r,g.ymax=o,g.xmin=s,g.xmax=e;else if(g.ymin=Math.min(g.ymin,r),g.ymax=Math.max(g.ymax,o),Math.abs(e-i/2)<M)g.xmin=s,g.xmax=g.xmax+i;else{if(!(Math.abs(s+i/2)<M))return null;g.xmax=e+i}}return g}function ct(t,n,i=null,s=!0,r=!0){const e=t.spatialReference;if(e.equals(n))return t;$(e,n,i);const o=O(t,n,i);if(r&&n.isWebMercator&&o&&(o.ymax=Math.min(20037508342787e-6,o.ymax),o.ymin=Math.max(-20037508342787e-6,o.ymin),o.ymin>=o.ymax))return null;if(!s||!o)return o;const u=I(e,!0),l=I(n,!0);if(N(u)||N(l))return o;const a=G(e,.001),x=G(e,500),M=G(n,.001);if(Math.abs(o.xmin-l[0])<M&&Math.abs(o.xmax-l[1])<M){const g=Math.abs(t.xmin-u[0]),m=Math.abs(u[1]-t.xmax);if(g<a&&m>x){o.xmin=l[0];const f=[];f.push(new k(t.xmax,t.ymin,e)),f.push(new k(t.xmax,(t.ymin+t.ymax)/2,e)),f.push(new k(t.xmax,t.ymax,e));const h=f.map(c=>rt(c,n,i)).filter(c=>!isNaN(c==null?void 0:c.x)).map(c=>c.x);o.xmax=Math.max.apply(null,h)}if(m<a&&g>x){o.xmax=l[1];const f=[];f.push(new k(t.xmin,t.ymin,e)),f.push(new k(t.xmin,(t.ymin+t.ymax)/2,e)),f.push(new k(t.xmin,t.ymax,e));const h=f.map(c=>rt(c,n,i)).filter(c=>!isNaN(c==null?void 0:c.x)).map(c=>c.x);o.xmin=Math.min.apply(null,h)}}else{const g=G(n,.001);Math.abs(o.xmin-l[0])<g&&(o.xmin=l[0]),Math.abs(o.xmax-l[1])<g&&(o.xmax=l[1])}return o}function C(t,n=!1){const i=n?20037508342787e-6:20037508342788905e-9;return t.isWebMercator?2*i:t.wkid&&t.isGeographic?360:2*Nt[t.wkid]||null}function I(t,n=!1){if(t.isGeographic)return[-180,180];const i=C(t,n);return S(i)?[-i/2,i/2]:null}function ft(t,n,i,s){let r=(t-n)/i;return r-Math.floor(r)!=0?r=Math.floor(r):s&&(r-=1),r}function zt(t,n=!1){const i=C(t.spatialReference);if(N(i))return 0;const s=n?0:-(i/2),r=G(t.spatialReference),e=!n&&Math.abs(t.xmax-i/2)<r?i/2:t.xmax,o=!n&&Math.abs(t.xmin+i/2)<r?-i/2:t.xmin;return ft(e,s,i,!0)-ft(o,s,i,!1)}function jt(t){const n=t.storageInfo.origin.x,i=C(t.spatialReference,!0);if(N(i))return{originX:n,halfWorldWidth:null,pyramidsInfo:null};const s=i/2,{nativePixelSize:r,storageInfo:e,extent:o}=t,{maximumPyramidLevel:u,blockWidth:l,pyramidScalingFactor:a}=e;let x=r.x;const M=[],g=S(t.transform)&&t.transform.type==="gcs-shift",m=n+(g?0:s),f=g?i-n:s-n;for(let h=0;h<=u;h++){const c=(o.xmax-n)/x/l,R=c-Math.floor(c)==0?c:Math.ceil(c),y=f/x/l,p=y-Math.floor(y)==0?y:Math.ceil(y),d=Math.floor(m/x/l),w=Math.round(m/x)%l,P=(l-Math.round(f/x)%l)%l;M.push({resolutionX:x,blockWidth:l,datsetColumnCount:R,worldColumnCountFromOrigin:p,leftMargin:w,rightPadding:P,originColumnOffset:d}),x*=a}return{originX:n,halfWorldWidth:s,pyramidsInfo:M,hasGCSSShiftTransform:g}}function Wt(t){if(!t||t.isGeographic)return t;const n=String(t.wkid||t.wkt);let i;return K.has(n)?i=K.get(n):(i=(t.wkid?v.coordsys(t.wkid):v.fromString(T.PE_TYPE_PROJCS,t.wkt)).getGeogcs().getCode(),K.set(n,i)),new Gt({wkid:i})}function At(t){const n=t.isAdaptive&&t.spacing==null;let i=t.spacing||[A,A],s=U(t),r={cols:s.size[0]+1,rows:s.size[1]+1};const e=s.outofBoundPointCount>0&&s.outofBoundPointCount<s.offsets.length/2;let o=s.outofBoundPointCount===s.offsets.length/2||n&&e?[0,0]:ot(s.offsets,r,i,J);const u=(o[0]+o[1])/2,l=t.projectedExtent.spatialReference,a=t.srcBufferExtent.spatialReference;if(n&&(e||u>J)&&(xt(l,a,t.datumTransformation)&&(l.isGeographic||S(z(l))),i=[B,B],s=U({...t,spacing:i}),r={cols:s.size[0]+1,rows:s.size[1]+1},o=ot(s.offsets,r,i,J)),s.error=o,i[0]>1&&(s.coefficients=ut(s.offsets,r,e)),t.includeGCSGrid&&!l.isGeographic&&!l.isWebMercator)if(a.isGeographic)s.gcsGrid={offsets:s.offsets,coefficients:s.coefficients,spacing:i};else{const x=z(l);if(S(x)&&!x.isEnvelope){const M=Wt(l),g=mt(t.projectedExtent,M),{offsets:m}=U({...t,srcBufferExtent:g,spacing:i}),f=ut(m,r,e);s.gcsGrid={offsets:m,coefficients:f,spacing:i}}}return s}function U(t){const{projectedExtent:n,srcBufferExtent:i,pixelSize:s,datumTransformation:r,rasterTransform:e}=t,o=n.spatialReference,u=i.spatialReference,l=$(o,u),{xmin:a,ymin:x,xmax:M,ymax:g}=n,m=C(u),f=S(m)&&(t.hasWrapAround||(e==null?void 0:e.type)==="gcs-shift"),h=t.spacing||[A,A],c=h[0]*s.x,R=h[1]*s.y,y=h[0]===1,p=Math.ceil((M-a)/c-.1/h[0])+(y?0:1),d=Math.ceil((g-x)/R-.1/h[1])+(y?0:1),w=Et({cols:p,rows:d,xmin:a,ymax:g,xres:c,yres:R,inSR:o,outSR:u,datumTransformation:r,preferPE:h[0]<=B,usePixelCenter:y}),P=[];let E,j=0;const V=y?-1:NaN,{xmin:Z,xmax:F,ymax:pt,width:gt,height:yt}=i,dt=G(u,500),Mt=S(m)&&Z>0&&F>m/2;let tt=!1;if(l){const _=z(o);tt=S(_)&&_.poleLocation>0}for(let _=0;_<p;_++){const q=[];for(let L=0;L<d;L++){let b=w[_*d+L];if(f&&b[0]>F&&b[0]>m/2-dt?b[0]-=m:f&&_===0&&b[0]<0&&Mt&&!e&&(b[0]+=m),!b||isNaN(b[0])||isNaN(b[1]))P.push(V),P.push(V),q.push(null),j++;else{if(e){const nt=e.inverseTransform(new k({x:b[0],y:b[1],spatialReference:u}));b=[nt.x,nt.y]}q.push(b),_>0&&f&&E[L]&&b[0]<E[L][0]&&(b[0]+=m,tt&&b[0]>F&&b[0]>m&&(b[0]-=m)),P.push((b[0]-Z)/gt),P.push((pt-b[1])/yt)}}E=q}return{offsets:P,error:null,coefficients:null,outofBoundPointCount:j,spacing:h,size:y?[p,d]:[p-1,d-1]}}function ut(t,n,i){const{cols:s,rows:r}=n,e=new Float32Array((s-1)*(r-1)*2*6),o=new Float32Array([-0,-1,1,-1,1,-0,1,-0,-0]),u=new Float32Array([-1,1,0,0,-1,1,1,0,0]);for(let l=0;l<s-1;l++){for(let a=0;a<r-1;a++){let x=l*r*2+2*a;const M=t[x],g=t[x+1],m=t[x+2],f=t[x+3];x+=2*r;const h=t[x],c=t[x+1],R=t[x+2],y=t[x+3];let p=0,d=12*(a*(s-1)+l);for(let w=0;w<3;w++)e[d++]=o[p++]*M+o[p++]*m+o[p++]*R;p=0;for(let w=0;w<3;w++)e[d++]=o[p++]*g+o[p++]*f+o[p++]*y;p=0;for(let w=0;w<3;w++)e[d++]=u[p++]*M+u[p++]*h+u[p++]*R;p=0;for(let w=0;w<3;w++)e[d++]=u[p++]*g+u[p++]*c+u[p++]*y}if(i)for(let a=0;a<e.length;a++)isNaN(e[a])&&(e[a]=-1)}return e}function Bt(t){const n=t.clone().normalize();return n.length===1?n[0]:ht(n)}function It(t,n,i){const{storageInfo:s,pixelSize:r}=n;let e,o=!1;const{pyramidResolutions:u}=s;if(S(u)&&u.length){const g=(t.x+t.y)/2,m=u[u.length-1],f=(m.x+m.y)/2,h=(r.x+r.y)/2;if(g<=h)e=0;else if(g>=f)e=u.length,o=g/f>8;else{let R,y=h;for(let p=1;p<=u.length;p++){if(R=(u[p-1].x+u[p-1].y)/2,g<=R){g===R?e=p:i==="down"?(e=p-1,o=g/y>8):e=i==="up"||g-y>R-g||g/y>2?p:p-1;break}y=R}}const c=e===0?r:u[e-1];return o&&Math.min(c.x,c.y)*W(n.spatialReference)>19567&&(o=!1),{pyramidLevel:e,pyramidResolution:new k({x:c.x,y:c.y,spatialReference:n.spatialReference}),excessiveReading:o}}const l=Math.log(t.x/r.x)/Math.LN2,a=Math.log(t.y/r.y)/Math.LN2,x=n.storageInfo.maximumPyramidLevel||0;e=i==="down"?Math.floor(Math.min(l,a)):i==="up"?Math.ceil(Math.max(l,a)):Math.round((l+a)/2),e<0?e=0:e>x&&(o=e>x+3,e=x);const M=2**e;return{pyramidLevel:e,pyramidResolution:new k({x:M*n.nativePixelSize.x,y:M*n.nativePixelSize.y,spatialReference:n.spatialReference}),excessiveReading:o}}function Yt(t,n,i=512,s=!0){const{extent:r,spatialReference:e,pixelSize:o}=t,u=st(new k({x:o.x,y:o.y,spatialReference:e}),n,r);if(u==null)return{projectedPixelSize:null,scales:null,srcResolutions:null,isCustomTilingScheme:!1};const l=(u.x+u.y)/2,a=W(n),x=l*a*96*39.37,M=n.isGeographic?256/i*2958287637958547e-7:256/i*591657527591555e-6;let g=t.dataType==="vector-magdir"||t.dataType==="vector-uv";const m=mt(r,n);g||s&&(n.isGeographic||n.isWebMercator)&&(g=m.xmin*m.xmax<0);let f,h=x;const c=1.001;if(g){h=M;const w=n.isGeographic?1341104507446289e-21:.29858214164761665,P=w*(96*a*39.37),E=n.isGeographic?4326:3857;f=st(new k({x:w,y:w,spatialReference:{wkid:E}}),e,m),f.x*=h/P,f.y*=h/P}else{f={x:o.x,y:o.y};const w=Math.ceil(Math.log(Math.min(t.width,t.height)/32)/Math.LN2);let P=0;for(;h<M*(c/2)&&P<w;)P++,h*=2,f.x*=2,f.y*=2;Math.max(h,M)/Math.min(h,M)<=c&&(h=M)}const R=[h],y=[{x:f.x,y:f.y}],p=70.5310735,d=Math.min(p,x)/c;for(;h>=d;)h/=2,f.x/=2,f.y/=2,R.push(h),y.push({x:f.x,y:f.y});return{projectedPixelSize:u,scales:R,srcResolutions:y,isCustomTilingScheme:!g}}export{zt as D,mt as F,jt as H,xt as M,Lt as T,At as V,C as X,rt as _,Bt as e,$t as k,Yt as n,It as t,st as v};
