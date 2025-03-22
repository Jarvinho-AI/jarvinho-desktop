import { app } from 'electron';
import { startWebSocketClient } from './modules/websocket/wsClient';

app.whenReady().then(() => {
  startWebSocketClient();
  console.log('Jarvinho Drive iniciado e escutando comandos!');
});
