const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getConfig: () => ipcRenderer.invoke('get-config'),
  saveConfig: (config) => ipcRenderer.invoke('save-config', config),
  getCache: (key) => ipcRenderer.invoke('get-cache', key),
  saveCache: (key, data) => ipcRenderer.invoke('save-cache', key, data),
  toggleAutoLaunch: (enable) => ipcRenderer.invoke('toggle-autolaunch', enable),
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window')
});
