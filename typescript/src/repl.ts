import  { createInterface } from 'node:readline';
import { getCommands } from './command_registry.js';

export function cleanInput(input: string): string[] {
    const words = input.trim().toLowerCase().split(/\s+/)
    return words
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Pokedex > "
});

export function startREPL(): void {
    rl.prompt(); 

    rl.on("line", (line: string) => {
        const input = cleanInput(line);
        if (input.length === 0) {
            rl.prompt();
            return;
        }
        
        const commands = getCommands()
        const command = input[0]
        if (command in commands){
            try{
                commands[command].callback(commands)
            } catch (e) {
                console.log(e)
            }
        } else {
            console.log(`Unknown command: "${command}". Type "help" for a list of commands.`,);
        }

        rl.prompt();
    })
}