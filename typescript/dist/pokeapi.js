import dns from "dns";
import { exec } from "child_process";
import { promisify } from "util";
import { Cache } from "./pokecache.js";
const execAsync = promisify(exec);
dns.setDefaultResultOrder('ipv4first');
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    cache;
    constructor(cacheInterval) {
        this.cache = new Cache(cacheInterval);
    }
    closeCache() {
        this.cache.stopReapLoop();
    }
    async fetchLocations(pageURL) {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        const cached = this.cache.get(url);
        if (cached) {
            return cached;
        }
        try {
            // Use curl instead of fetch
            const { stdout } = await execAsync(`curl -s "${url}"`);
            const locations = JSON.parse(stdout);
            this.cache.add(url, locations);
            return locations;
        }
        catch (e) {
            throw new Error(`Error fetching locations: ${e instanceof Error ? e.message : String(e)}`);
        }
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const cached = this.cache.get(url);
        if (cached) {
            return cached;
        }
        try {
            // Use curl instead of fetch
            const { stdout } = await execAsync(`curl -s "${url}"`);
            const location = JSON.parse(stdout);
            this.cache.add(url, location);
            return location;
        }
        catch (e) {
            throw new Error(`Error fetching location: ${e instanceof Error ? e.message : String(e)}`);
        }
    }
}
