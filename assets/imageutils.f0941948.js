import{e as s,h as g,s as r,d1 as c,f}from"./index.4188ada5.js";function p(n){const t=i(n);return s(t)?t.toDataURL():""}async function h(n){const t=i(n);if(g(t))throw new r("imageToArrayBuffer","Unsupported image type");const e=await m(n),a=await new Promise(o=>t.toBlob(o,e));if(!a)throw new r("imageToArrayBuffer","Failed to encode image");return{data:await a.arrayBuffer(),type:e}}async function m(n){if(!(n instanceof HTMLImageElement))return"image/png";const t=n.src;if(c(t)){const{mediaType:e}=f(t);return e==="image/jpeg"?e:"image/png"}return/\.png$/i.test(t)?"image/png":/\.(jpg|jpeg)$/i.test(t)?"image/jpeg":"image/png"}function i(n){if(n instanceof HTMLCanvasElement)return n;if(n instanceof HTMLVideoElement)return null;const t=document.createElement("canvas");t.width=n.width,t.height=n.height;const e=t.getContext("2d");return n instanceof HTMLImageElement?e.drawImage(n,0,0,n.width,n.height):n instanceof ImageData&&e.putImageData(n,0,0),t}function d(n){const t=[],e=new Uint8Array(n);for(let a=0;a<e.length;a++)t.push(String.fromCharCode(e[a]));return"data:application/octet-stream;base64,"+btoa(t.join(""))}function w(n){if(n.byteLength<8)return!1;const t=new Uint8Array(n);return t[0]===137&&t[1]===80&&t[2]===78&&t[3]===71&&t[4]===13&&t[5]===10&&t[6]===26&&t[7]===10}export{w as g,p as i,i as m,h as o,d as s};
