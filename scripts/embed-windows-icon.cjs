'use strict';
// Cross-platform PE resource editing: no Wine, no native executable download.
// This applies ONLY to our unsigned build intermediate, never another installed app.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const PE = require('pe-library');
const RE = require('resedit');
const digest = bin => crypto.createHash('sha256').update(Buffer.from(bin)).digest('hex');
const stableEntries = entries => new Map(entries.filter(e=>![3,14,16].includes(e.type)).map(e=>[JSON.stringify([e.type,e.id,e.lang]),digest(e.bin)]));
module.exports = async function afterPack(context) {
  if (context.electronPlatformName !== 'win32') return;
  const file = path.join(context.appOutDir, context.packager.appInfo.productFilename + '.exe');
  const executable = PE.NtExecutable.from(fs.readFileSync(file));
  const resources = PE.NtExecutableResource.from(executable);
  const preserved = stableEntries(resources.entries);
  const iconFile = RE.Data.IconFile.from(fs.readFileSync(path.join(context.packager.projectDir,'build','icon.ico')));
  const groups = RE.Resource.IconGroupEntry.fromEntries(resources.entries);
  const targets = groups.length ? groups : [{id:1,lang:1033}];
  for (const group of targets) RE.Resource.IconGroupEntry.replaceIconsForResource(resources.entries,group.id,group.lang,iconFile.icons.map(item=>item.data));
  const version = context.packager.appInfo.version.split('.').map(Number);
  for (const info of RE.Resource.VersionInfo.fromEntries(resources.entries)) {
    info.setFileVersion(version[0],version[1],version[2],0,1033);
    info.setProductVersion(version[0],version[1],version[2],0,1033);
    info.setStringValues({lang:1033,codepage:1200},{FileDescription:'Folkistan browser',ProductName:'Folkistan',InternalName:'Folkistan',OriginalFilename:'Folkistan.exe'});
    info.outputToResourceEntries(resources.entries);
  }
  resources.outputResource(executable);
  const output=Buffer.from(executable.generate());
  const checked=PE.NtExecutableResource.from(PE.NtExecutable.from(output));
  const remaining=stableEntries(checked.entries);
  for(const [key,hash] of preserved) if(remaining.get(key)!==hash) throw new Error('Resource preservation failed: '+key);
  if(!RE.Resource.IconGroupEntry.fromEntries(checked.entries).length) throw new Error('No icon group after embedding.');
  fs.writeFileSync(file+'.icon.tmp',output);fs.renameSync(file+'.icon.tmp',file);
  console.log('Embedded approved Folkistan cat icon; non-icon resources preserved.');
};
