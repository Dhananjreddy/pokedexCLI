import { State } from './state.js'
import { Pokemon } from './pokeapi.js'

export async function commandPokedex(state: State, ...args: string[]) {
    console.log("Your Pokedex: ")
    let pokemon: Pokemon
    for(const name in state.pokedex){
        const pokemon = state.pokedex[name]
        console.log(` -${pokemon.name}`)
    }
}