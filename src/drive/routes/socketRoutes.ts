import WebSocket from 'ws';
import { handleIncomingMessage } from '../controllers/commandController';

export function registerSocketRoutes(socket: WebSocket) {
  socket.on('message', (msg) => {
    handleIncomingMessage(msg.toString(), socket);
  });
}