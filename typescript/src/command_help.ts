import { CLICommand } from "./command_type.js"

export function commandHelp(commands: Record<string, CLICommand>){
    console.log("\nWelcome to the Pokedex!")
    console.log("Usage:\n")
    for (const command in commands){
        console.log(`${commands[command].name}: ${commands[command].description}`);
    }
}