'use strict';
const fs=require('node:fs'),path=require('node:path'),https=require('node:https');
const MAX=10*1024*1024;
function download(url,redirects=0){return new Promise((resolve,reject)=>{
 const request=https.get(url,{headers:{'User-Agent':'Folkistan-build/0.1','Accept':'text/plain','Accept-Encoding':'identity'}},response=>{
  if([301,302,303,307,308].includes(response.statusCode)){
   response.resume();if(redirects>=5||!response.headers.location)return reject(new Error('Too many filter redirects.'));
   const target=new URL(response.headers.location,url);if(target.protocol!=='https:')return reject(new Error('Refusing non-HTTPS filter redirect.'));
   return resolve(download(target.href,redirects+1));
  }
  if(response.statusCode!==200){response.resume();return reject(new Error('Filter download failed: '+response.statusCode));}
  let length=0;const chunks=[];response.on('data',chunk=>{length+=chunk.length;if(length>MAX){response.destroy(new Error('Filter data exceeds size limit.'));return;}chunks.push(chunk);});
  response.on('end',()=>resolve(Buffer.concat(chunks).toString('utf8')));response.on('error',reject);response.on('aborted',()=>reject(new Error('Filter response was interrupted.')));
 });request.setTimeout(60000,()=>request.destroy(new Error('Filter download timed out.')));request.on('error',reject);
});}
async function withRetries(url){let error;for(let n=0;n<3;n++){try{return await download(url);}catch(e){error=e;if(n<2)await new Promise(r=>setTimeout(r,1500*(n+1)));}}throw error;}
(async()=>{for(const [name,url] of [['easylist.txt','https://easylist.to/easylist/easylist.txt'],['easyprivacy.txt','https://easylist.to/easylist/easyprivacy.txt']]){
 const file=path.join(__dirname,'..','filters',name);if(fs.existsSync(file)&&!process.argv.includes('--refresh'))continue;
 console.log('Downloading build-time filter snapshot:',name);const text=await withRetries(url);if(!text.startsWith('[Adblock Plus')||text.length<1000||Buffer.byteLength(text)>MAX)throw new Error('Unexpected filter data.');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file+'.tmp',text);fs.renameSync(file+'.tmp',file);
}})().catch(e=>{console.error(e.message);process.exit(1);});
