import { contextBridge } from 'electron';
import os from 'os';

contextBridge.exposeInMainWorld('jarvinhoAPI', {
  getUserHome: () => os.homedir()
});