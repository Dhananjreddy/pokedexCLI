import { State } from "./state.js"

export async function commandExplore(state: State, ...args: string[]){
    if (args.length !== 1){
        throw new Error("you must provide a location name");
    }
    
    const name = args[0]
    const location = await state.pokeApi.fetchLocation(name)

    console.log(`Exploring ${name}...`)
    console.log("Found Pokemon:");
    for (const enc of location.pokemon_encounters){
        console.log(` - ${enc.pokemon.name}`)
    }
}