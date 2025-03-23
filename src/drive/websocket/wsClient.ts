import WebSocket from 'ws';
import { executeCommand } from '../modules/execModule';

const SERVER_URL = 'ws://localhost:3000'; // URL do servidor Ragon
const DEVICE_ID = '123456'; // Identificação do Drive

export function startWebSocketClient() {
  const socket = new WebSocket(SERVER_URL);

  socket.on('open', () => {
    console.log('[DRIVE] Conectado ao Ragon.');
    socket.send(JSON.stringify({ type: 'register', deviceID: DEVICE_ID }));
  });

  socket.on('message', async(message) => {
    console.log(`[DRIVE] Comando recebido: ${message}`);

    try {
      const data = JSON.parse(message.toString());

      if (data.type === 'command') {
        console.log(`[DRIVE] Comando recebido: ${data.command}`);

        try {
          const output = await executeCommand(data.command);

          socket.send(JSON.stringify({
            type: 'command_result',
            requestId: data.requestId,
            status: 'success',
            output,
          }));
        } catch (error: any) {
          socket.send(JSON.stringify({
            type: 'command_result',
            requestId: data.requestId,
            status: 'error',
            error: error.message,
          }));
        }
      }
    } catch (error) {
      console.error('[DRIVE] Erro ao processar mensagem:', error);
    }
  });

  socket.on('close', () => {
    console.log('[DRIVE] Desconectado do Ragon. Tentando reconectar...');
    setTimeout(startWebSocketClient, 5000);
  });

  socket.on('error', (error) => {
    console.error('[DRIVE] Erro na conexão:', error.message);
  });
}