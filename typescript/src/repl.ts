import  { createInterface } from 'node:readline';

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
        console.log("Your command was:", input[0]);
        rl.prompt();
    })
}