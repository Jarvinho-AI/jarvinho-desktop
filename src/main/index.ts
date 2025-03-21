import { app } from 'electron';
import { startWebSocketServer } from './modules/websocket/wsServer';

app.whenReady().then(() => {
  startWebSocketServer();
  console.log('Jarvinho Drive iniciado e escutando comandos!');
});
