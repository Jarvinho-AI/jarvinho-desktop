export interface Command {
    command: string;
    requestId: string;
    deviceId: string;
    type: string;
  }
  
  export class CommandModel {
    static parseJson(data: any): Command | null {
      if (
        typeof data === 'object' &&
        data !== null &&
        typeof data.command === 'string' &&
        typeof data.deviceId === 'string' &&
        typeof data.deviceId === 'string' &&
        typeof data.type === 'string'
      ) {
        return {
          command: data.command,
          deviceId: data.deviceId,
          requestId: data.requestId,
          type: data.type,
        };
      }
  
      return null;
    }
  }