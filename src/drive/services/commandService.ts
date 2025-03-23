import { exec } from 'child_process';
import { promisify } from 'util';
import os from 'os';

const execAsync = promisify(exec);

export async function executeCommand(command: string): Promise<string> {
  const userHomeDir = os.homedir();

  console.log(`[SERVICE] Executando: ${command} em ${userHomeDir}`);

  const { stdout, stderr } = await execAsync(command, { cwd: userHomeDir });

  if (stderr) {
    console.warn(`[SERVICE] STDERR: ${stderr}`);
  }

  return stdout.trim();
}