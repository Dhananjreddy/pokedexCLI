export async function commandCatch(state, ...args) {
    if (args.length !== 1) {
        throw new Error("you must provide a location name");
    }
    let name = args[0];
    name = name.trim().toLowerCase();
    console.log(`Throwing a Pokeball at ${name}...`);
    const pokemon = await state.pokeApi.fetchPokemon(name);
    const chance = (350 - pokemon.base_experience) / 350;
    const num = Math.random();
    if (num < chance) {
        state.pokedex[name] = pokemon;
        console.log(`${name} was caught!`);
    }
    else {
        console.log(`${name} escaped!`);
    }
}
