import dns from "dns";
import { exec } from "child_process";
import { promisify } from "util";
import { Cache } from "./pokecache.js";

const execAsync = promisify(exec);
dns.setDefaultResultOrder('ipv4first');

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }
  closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchPokemon(name: string){
    const url = `${PokeAPI.baseURL}/pokemon/${name}/`

    const cached: Pokemon = this.cache.get(url)
    if (cached){
      return cached
    }

    try {
        // Use curl instead of fetch
        const { stdout } = await execAsync(`curl -sfS -4 "${url}"`);
        const pokemon = JSON.parse(stdout);
        if (!pokemon || typeof pokemon.base_experience !== "number") {
          throw new Error("Invalid Pokemon response");
        }

        this.cache.add(url, pokemon)
        return pokemon
    } catch (e) {
        throw new Error(`Error fetching pokemon: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`

    const cached: ShallowLocations = this.cache.get(url)
    if (cached) {
        return cached
    }
    
    try {
      // Use curl instead of fetch
      const { stdout } = await execAsync(`curl -s "${url}"`);
      const locations: ShallowLocations = JSON.parse(stdout);

      this.cache.add(url, locations)
      return locations
    } catch (e) {
        throw new Error(`Error fetching locations: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`

    const cached: Location = this.cache.get(url)
    if (cached) {
        return cached
    }

    try {
        // Use curl instead of fetch
        const { stdout } = await execAsync(`curl -s "${url}"`);
        const location: Location = JSON.parse(stdout);

        this.cache.add(url, location)
        return location
    } catch (e) {
        throw new Error(`Error fetching location: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
}

export type ShallowLocations = {
  count: number
  next: string
  previous: any
  results: {
    name: string
    url: string
  }[]
};

export type Location = {
  encounter_method_rates: Array<{
    encounter_method: {
      name: string
      url: string
    }
    version_details: Array<{
      rate: number
      version: {
        name: string
        url: string
      }
    }>
  }>
  game_index: number
  id: number
  location: {
    name: string
    url: string
  }
  name: string
  names: Array<{
    language: {
      name: string
      url: string
    }
    name: string
  }>
  pokemon_encounters: Array<{
    pokemon: {
      name: string
      url: string
    }
    version_details: Array<{
      encounter_details: Array<{
        chance: number
        condition_values: Array<{
          name: string
          url: string
        }>
        max_level: number
        method: {
          name: string
          url: string
        }
        min_level: number
      }>
      max_chance: number
      version: {
        name: string
        url: string
      }
    }>
  }>
}

export type Pokemon = {
  abilities: Array<{
    ability: {
      name: string
      url: string
    }
    is_hidden: boolean
    slot: number
  }>
  base_experience: number
  cries: {
    latest: string
    legacy: string
  }
  forms: Array<{
    name: string
    url: string
  }>
  game_indices: Array<{
    game_index: number
    version: {
      name: string
      url: string
    }
  }>
  height: number
  held_items: Array<any>
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Array<{
    move: {
      name: string
      url: string
    }
    version_group_details: Array<{
      level_learned_at: number
      move_learn_method: {
        name: string
        url: string
      }
      order?: number
      version_group: {
        name: string
        url: string
      }
    }>
  }>
  name: string
  order: number
  past_abilities: Array<any>
  past_types: Array<any>
  species: {
    name: string
    url: string
  }
  sprites: {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
    other: {
      dream_world: {
        front_default: string
        front_female: any
      }
      home: {
        front_default: string
        front_female: any
        front_shiny: string
        front_shiny_female: any
      }
      "official-artwork": {
        front_default: string
        front_shiny: string
      }
      showdown: {
        back_default: string
        back_female: any
        back_shiny: string
        back_shiny_female: any
        front_default: string
        front_female: any
        front_shiny: string
        front_shiny_female: any
      }
    }
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: any
          back_gray: any
          back_transparent: any
          front_default: any
          front_gray: any
          front_transparent: any
        }
        yellow: {
          back_default: any
          back_gray: any
          back_transparent: any
          front_default: any
          front_gray: any
          front_transparent: any
        }
      }
      "generation-ii": {
        crystal: {
          back_default: any
          back_shiny: any
          back_shiny_transparent: any
          back_transparent: any
          front_default: any
          front_shiny: any
          front_shiny_transparent: any
          front_transparent: any
        }
        gold: {
          back_default: any
          back_shiny: any
          front_default: any
          front_shiny: any
          front_transparent: any
        }
        silver: {
          back_default: any
          back_shiny: any
          front_default: any
          front_shiny: any
          front_transparent: any
        }
      }
      "generation-iii": {
        emerald: {
          front_default: any
          front_shiny: any
        }
        "firered-leafgreen": {
          back_default: any
          back_shiny: any
          front_default: any
          front_shiny: any
        }
        "ruby-sapphire": {
          back_default: any
          back_shiny: any
          front_default: any
          front_shiny: any
        }
      }
      "generation-iv": {
        "diamond-pearl": {
          back_default: string
          back_female: any
          back_shiny: string
          back_shiny_female: any
          front_default: string
          front_female: any
          front_shiny: string
          front_shiny_female: any
        }
        "heartgold-soulsilver": {
          back_default: string
          back_female: any
          back_shiny: string
          back_shiny_female: any
          front_default: string
          front_female: any
          front_shiny: string
          front_shiny_female: any
        }
        platinum: {
          back_default: string
          back_female: any
          back_shiny: string
          back_shiny_female: any
          front_default: string
          front_female: any
          front_shiny: string
          front_shiny_female: any
        }
      }
      "generation-v": {
        "black-white": {
          animated: {
            back_default: string
            back_female: any
            back_shiny: string
            back_shiny_female: any
            front_default: string
            front_female: any
            front_shiny: string
            front_shiny_female: any
          }
          back_default: string
          back_female: any
          back_shiny: string
          back_shiny_female: any
          front_default: string
          front_female: any
          front_shiny: string
          front_shiny_female: any
        }
      }
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string
          front_female: any
          front_shiny: string
          front_shiny_female: any
        }
        "x-y": {
          front_default: string
          front_female: any
          front_shiny: string
          front_shiny_female: any
        }
      }
      "generation-vii": {
        icons: {
          front_default: string
          front_female: any
        }
        "ultra-sun-ultra-moon": {
          front_default: string
          front_female: any
          front_shiny: string
          front_shiny_female: any
        }
      }
      "generation-viii": {
        icons: {
          front_default: string
          front_female: any
        }
      }
    }
  }
  stats: Array<{
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }>
  types: Array<{
    slot: number
    type: {
      name: string
      url: string
    }
  }>
  weight: number
}