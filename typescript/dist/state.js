import { createInterface } from "node:readline";
import { getCommands } from "./command_registry.js";
import { PokeAPI } from "./pokeapi.js";
export function initState(cacheInterval) {
    let pokedex = {};
    const element = {
        commands: getCommands(),
        readline: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > "
        }),
        pokeApi: new PokeAPI(cacheInterval),
        prevLocationsUrl: "",
        nextLocationsUrl: "",
        pokedex: pokedex
    };
    return element;
}
