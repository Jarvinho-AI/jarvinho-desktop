import { CommandModel } from '../models/CommandModel';
import { executeCommand } from '../services/commandService';
import WebSocket from 'ws';

export async function handleIncomingMessage(message: string, socket: WebSocket) {
  try {
    const data = JSON.parse(message);
    const command = CommandModel.parseJson(data);

    if (!command) {
      console.error('[CONTROLLER] Comando inválido:', data);
      return;
    }

    console.log(`[CONTROLLER] Comando recebido: ${command.command}`);

    try {
      const output = await executeCommand(command.command);

      socket.send(JSON.stringify({
        type: 'command_result',
        requestId: command.requestId,
        status: 'success',
        output,
      }));
    } catch (error: any) {
      socket.send(JSON.stringify({
        type: 'command_result',
        requestId: command.requestId,
        status: 'error',
        error: error.message,
      }));
    }

  } catch (error) {
    console.error('[CONTROLLER] Erro ao processar mensagem:', error);
  }
}