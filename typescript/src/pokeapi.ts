export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`
    
    try {
    const resp = await fetch(url)
    if (!resp.ok){
        throw new Error(`${resp.status} ${resp.statusText}`)
    }
    const locations: ShallowLocations = await resp.json()
    return locations
    } catch (e) {
        throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`

    try {
        const resp = await fetch(url);
        if (!resp.ok){
            throw new Error(`${resp.status} ${resp.statusText}`)
        }
        const location: Location = await resp.json()
        return location
    } catch (e) {
        throw new Error(`Error fetching locations: ${(e as Error).message}`)
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