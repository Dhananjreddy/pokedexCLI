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