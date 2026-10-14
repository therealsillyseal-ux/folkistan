'use strict';
const fs=require('node:fs'),path=require('node:path');
(async()=>{for(const [name,url] of [['easylist.txt','https://easylist.to/easylist/easylist.txt'],['easyprivacy.txt','https://easylist.to/easylist/easyprivacy.txt']]){
 const file=path.join(__dirname,'..','filters',name);if(fs.existsSync(file)&&!process.argv.includes('--refresh'))continue;
 console.log('Downloading build-time filter snapshot:',name);const response=await fetch(url,{signal:AbortSignal.timeout(60000)});if(!response.ok)throw new Error('Filter download failed: '+response.status);const text=await response.text();if(!text.startsWith('[Adblock Plus')||text.length<1000||text.length>10*1024*1024)throw new Error('Unexpected filter data.');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,text);
}})().catch(e=>{console.error(e.message);process.exit(1);});
