export async function commandHelp(state) {
    console.log("\nWelcome to the Pokedex!");
    console.log("Usage:\n");
    for (const command in state.commands) {
        console.log(`${state.commands[command].name}: ${state.commands[command].description}`);
    }
}
