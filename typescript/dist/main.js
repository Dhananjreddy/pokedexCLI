import dns from "dns";
import { startREPL } from "./repl.js";
import { initState } from "./state.js";
dns.setDefaultResultOrder('ipv4first');
async function main() {
    const state = initState(1000 * 60 * 5);
    await startREPL(state);
}
main();
