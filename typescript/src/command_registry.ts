import { commandExit } from "./command_exit.js";
import { CLICommand } from "./state.js";
import { commandHelp } from "./command_help.js"
import { commandMapb, commandMapf } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
        name: "help",
        description: "Displays a help message",
        callback: commandHelp
    },
    map: {
      name: "map",
      description: "Get the next page of locations",
      callback: commandMapf
    },
    mapb: {
      name: "mapb",
      description: "Get the previous page of locations",
      callback: commandMapb
    },
    explore: {
      name: "explore",
      description: "Explore area and catch pokemon",
      callback: commandExplore
    },
    catch: {
      name: "catch",
      description: "Catch a pokemon",
      callback: commandCatch
    },
    inspect: {
      name: "inspect",
      description: "Inspect pokemon in your pokedex",
      callback: commandInspect
    }
    // can add more commands here
  };
}