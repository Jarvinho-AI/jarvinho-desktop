import { exec } from 'child_process';
import { promisify } from 'util';
import os from 'os';
import path from 'path';

const execAsync = promisify(exec);

export async function executeCommand(command: string): Promise<string> {
  const userHomeDir = os.homedir();

  console.log(`[EXEC] Executando: ${command}`);
  console.log(`[EXEC] Diretório base: ${userHomeDir}`);

  try {
    const { stdout, stderr } = await execAsync(command, {
      cwd: userHomeDir,
    });

    if (stderr) {
      console.warn(`[EXEC] STDERR: ${stderr}`);
    }

    return stdout.trim();
  } catch (error: any) {
    console.error(`[EXEC] ERRO: ${error.stderr || error.message}`);
    throw new Error(error.stderr || error.message);
  }
}