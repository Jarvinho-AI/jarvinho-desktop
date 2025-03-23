import WebSocket from 'ws';
import { registerSocketRoutes } from '../routes/socketRoutes';

const SERVER_URL = 'ws://localhost:3000';
const DEVICE_ID = '123456';

export function startWebSocketClient() {
  const socket = new WebSocket(SERVER_URL);

  socket.on('open', () => {
    console.log('[DRIVE] Conectado ao Ragon.');
    socket.send(JSON.stringify({ type: 'register', deviceId: DEVICE_ID }));
  });

  registerSocketRoutes(socket);

  socket.on('close', () => {
    console.log('[DRIVE] Desconectado. Tentando reconectar...');
    setTimeout(startWebSocketClient, 5000);
  });

  socket.on('error', (error) => {
    console.error('[DRIVE] Erro na conexão:', error.message);
  });
}