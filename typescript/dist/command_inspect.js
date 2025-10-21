export async function commandInspect(state, ...args) {
    if (args.length !== 1) {
        throw new Error("you must provide a location name");
    }
    let name = args[0];
    name = name.trim().toLowerCase();
    const pokemon = state.pokedex[name];
    if (!pokemon) {
        console.log("you have not caught that pokemon");
        return;
    }
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(`Stats: `);
    const stats = pokemon.stats;
    for (const stat of stats) {
        console.log(` -${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log(`Types: `);
    const types = pokemon.types;
    for (const type of types) {
        console.log(` -${type.type.name}`);
    }
}
