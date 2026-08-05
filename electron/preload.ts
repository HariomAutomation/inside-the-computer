import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  platform: 'linux',
  isElectron: true,
});
