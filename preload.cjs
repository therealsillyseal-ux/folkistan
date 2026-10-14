const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('folk', Object.freeze({
  call: (action, data) => ipcRenderer.invoke('folk:command', action, data),
  onState: callback => { const listener = (_event, state) => callback(state); ipcRenderer.on('folk:state', listener); return () => ipcRenderer.removeListener('folk:state', listener); },
  onFocus: callback => { const listener = () => callback(); ipcRenderer.on('folk:focus-address', listener); return () => ipcRenderer.removeListener('folk:focus-address', listener); }
}));
