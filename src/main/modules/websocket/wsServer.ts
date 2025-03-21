import { WebSocketServer, WebSocket } from 'ws';

const PORT = 6000; // Porta do WebSocket no Drive

export function startWebSocketServer() {
  const wss = new WebSocketServer({ port: PORT });

  console.log(`[WS] Jarvinho Drive ativo na porta ${PORT}`);

  wss.on('connection', (ws: WebSocket) => {
    console.log('[WS] Backend do Jarvinho conectado.');

    ws.on('message', (message) => {
      console.log(`[WS] Comando recebido: ${message}`);

      try {
        const data = JSON.parse(message.toString());

        if (data.type === 'executeCommand') {
          console.log(`[WS] Executando comando: ${data.command}`);
          ws.send(JSON.stringify({ type: 'ack', message: `Comando recebido! ${data.command}` }));
        }
      } catch (error) {
        console.error('[WS] Erro ao processar mensagem:', error);
      }
    });

    ws.on('close', () => {
      console.log('[WS] Backend desconectado.');
    });

    ws.on('error', (error) => {
      console.error('[WS] Erro na conexão WebSocket:', error.message);
    });
  });

  return wss;
}
