import { app, Tray, Menu } from 'electron';
import path from 'path';
import { startWebSocketClient } from './websocket/wsClient';
let tray: Tray | null = null;
import os from 'os';

const home = os.homedir();

function createTrayIcon() {
  const iconPath = path.join(__dirname, '..', 'assets', 'icon_drive.png');
  tray = new Tray(iconPath); // Adicione esse ícone depois

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Status: Online',
      enabled: false
    },
    { type: 'separator' },
    {
      label: 'Sair do Drive',
      click: () => {
        app.quit();
      }
    },
    {
      label: 'Pasta base: ' + home,
    }
  ]);

  tray.setToolTip('Jarvinho Drive');
  tray.setContextMenu(contextMenu);
}


app.whenReady().then(() => {
  startWebSocketClient();
  console.log('Jarvinho Drive iniciado e escutando comandos!');

  createTrayIcon()
});
