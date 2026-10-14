'use strict';
class UpdateManager {
  constructor({app,updater,supported,notify,confirmInstall,saveProfile,getAutomatic,timers=globalThis}) {
    Object.assign(this,{app,updater,supported,notify,confirmInstall,saveProfile,getAutomatic,timers});
    this.data={supported:!!supported,status:supported?'idle':'unavailable',version:app.getVersion(),availableVersion:null,progress:0,message:supported?'Ready to check for updates.':'Updates require the installed Windows version.'};
    this.startTimer=null;this.interval=null;this.busy=false;
    if(!supported)return;
    updater.autoDownload=true;updater.autoInstallOnAppQuit=false;updater.allowPrerelease=false;updater.allowDowngrade=false;
    updater.on('checking-for-update',()=>this.set({status:'checking',message:'Checking GitHub Releases…'}));
    updater.on('update-not-available',()=>this.set({status:'current',message:'You’re on the latest published version.',availableVersion:null,progress:0}));
    updater.on('update-available',info=>this.set({status:'downloading',availableVersion:String(info.version).slice(0,40),progress:0,message:'Downloading an update…'}));
    updater.on('download-progress',info=>this.set({status:'downloading',progress:Math.max(0,Math.min(100,Number(info.percent)||0)),message:'Downloading an update…'}));
    updater.on('update-downloaded',info=>this.set({status:'ready',availableVersion:String(info.version).slice(0,40),progress:100,message:'Update downloaded. Restart when you’re ready.'}));
    updater.on('error',error=>{console.warn('Update error:',error.message);this.set({status:'error',message:'Could not check or download an update. Check your connection and try again.'});});
  }
  set(patch){Object.assign(this.data,patch);this.notify();}
  state(){return{...this.data,automatic:!!this.getAutomatic()};}
  start(){this.configure();}
  configure(){
    if(this.startTimer)this.timers.clearTimeout(this.startTimer);if(this.interval)this.timers.clearInterval(this.interval);this.startTimer=this.interval=null;
    if(!this.supported||!this.getAutomatic())return;
    this.startTimer=this.timers.setTimeout(()=>{this.startTimer=null;void this.check().catch(()=>{});},30000);this.startTimer.unref?.();
    this.interval=this.timers.setInterval(()=>void this.check().catch(()=>{}),6*60*60*1000);this.interval.unref?.();
  }
  async check(){
    if(!this.supported)throw new Error('Install the Windows setup build to use automatic updates.');
    if(this.busy||['downloading','ready'].includes(this.data.status))return this.state();
    this.busy=true;this.set({status:'checking',message:'Checking GitHub Releases…'});
    try{await this.updater.checkForUpdates();return this.state();}catch(error){this.set({status:'error',message:'Could not check for updates. Check your connection and try again.'});throw new Error(this.data.message);}finally{this.busy=false;}
  }
  async install(){
    if(!this.supported||this.data.status!=='ready')throw new Error('No verified update is ready to install.');
    if(!(await this.confirmInstall(this.data.availableVersion)))return false;
    this.saveProfile();this.updater.quitAndInstall(false,true);return true;
  }
}
module.exports={UpdateManager};
