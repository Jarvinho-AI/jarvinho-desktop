const { app, BrowserWindow, Tray } = require('electron');
import { spawn } from 'child_process';
const path = require('path');

let mainWindow;
let tray = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false // <--- garante que 'os' e 'electron' funcionem no preload
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));
}

function startDriveProcess() {
  const drivePath = path.join(__dirname, 'drive', 'index.js');

  const driveProcess = spawn(process.execPath, [drivePath], {
    stdio: 'inherit'
  });

  driveProcess.on('close', (code: number | null) => {
    console.log(`[MAIN] Drive finalizado com código ${code}`);
  });
}

app.whenReady().then(() => {
  createMainWindow();
  startDriveProcess();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});