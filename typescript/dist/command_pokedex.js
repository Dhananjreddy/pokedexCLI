export async function commandPokedex(state, ...args) {
    console.log("Your Pokedex: ");
    let pokemon;
    for (const name in state.pokedex) {
        const pokemon = state.pokedex[name];
        console.log(` -${pokemon.name}`);
    }
}
