'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');const manifest=JSON.parse(fs.readFileSync(path.join(root,'assets-src','manifest.json'),'utf8'));
for(const item of manifest){
 const bytes=Buffer.from(fs.readFileSync(path.join(root,'assets-src',item.source),'utf8').trim(),'base64');
 if(crypto.createHash('sha256').update(bytes).digest('hex')!==item.sha256)throw new Error('Icon source checksum mismatch.');
 for(const destination of item.outputs){const out=path.join(root,destination);fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,bytes);}
}
console.log('Prepared verified local icon assets.');
