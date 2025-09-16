import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./command_registry.js"
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
    commands: Record<string, CLICommand>,
    readline: Interface,
    pokeApi: PokeAPI,
    prevLocationsUrl: string,
    nextLocationsUrl: string,
}

export function initState(): State {
    const element : State = {
        commands: getCommands(),
        readline: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > "
            }),
        pokeApi: new PokeAPI(),
        prevLocationsUrl: "",
        nextLocationsUrl: "",
    }
    return element
}