export async function commandMapf(state) {
    const locations = await state.pokeApi.fetchLocations(state.nextLocationsUrl);
    state.prevLocationsUrl = state.nextLocationsUrl;
    state.nextLocationsUrl = locations.next;
    for (const item of locations.results) {
        console.log(item.name);
    }
}
export async function commandMapb(state) {
    if (!state.prevLocationsUrl) {
        throw new Error("you're on the first page");
    }
    const locations = await state.pokeApi.fetchLocations(state.prevLocationsUrl);
    state.nextLocationsUrl = state.prevLocationsUrl;
    state.prevLocationsUrl = locations.previous;
    for (const item of locations.results) {
        console.log(item.name);
    }
}
