import { State } from './state.js'

export function cleanInput(input: string): string[] {
    const words = input.trim().toLowerCase().split(/\s+/)
    return words
}

export async function startREPL(state: State): Promise<void> {
    state.readline.prompt(); 

    state.readline.on("line", async (line: string) => {
        const input = cleanInput(line);
        if (input.length === 0) {
            state.readline.prompt();
            return;
        }
        
        const command = input[0]
        const args = input.slice(1)
        if (command in state.commands){
            try{
                await state.commands[command].callback(state, ...args)
            } catch (e) {
                console.log(e)
            }
        } else {
            console.log(`Unknown command: "${command}". Type "help" for a list of commands.`,);
        }

        state.readline.prompt();
    })
}