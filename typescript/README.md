# Pokedex CLI (TypeScript)

A TypeScript command-line Pokédex powered by the [PokeAPI](https://pokeapi.co).

This package provides a REPL-style interface to explore Pokémon data from the PokeAPI. It includes both TypeScript source (`src/`) and compiled distribution (`dist/`).

## Highlights

* Interactive REPL CLI
* Commands implemented as individual handlers in `src/command_*.ts`
* Simple in-memory cache (`pokecache.ts`)
* Basic tests included (`pokeCache.test.ts`, `repl.test.ts`)
* No API key required — uses the public PokeAPI

## Prerequisites

* Node.js (>= 18 recommended)
* npm, pnpm, or yarn
* Internet access to reach [https://pokeapi.co](https://pokeapi.co)

## Install

From the TypeScript folder:

```bash
cd typescript
npm ci
# or
npm install
```

## Run

### Development

Run the TypeScript source directly using ts-node:

```bash
npx ts-node src/main.ts
```

### Compiled JavaScript

Run from the compiled distribution:

```bash
node dist/main.js
```

### Build

Compile TypeScript to JavaScript:

```bash
npx tsc
node dist/main.js
```

> **Note:** `src/main.ts` is the entry point. The `dist/` folder contains precompiled JavaScript if you prefer running without TypeScript tooling.

## Commands

| Command   | Usage                     | Description                                     |
| --------- | ------------------------- | ----------------------------------------------- |
| `exit`    | `exit`                    | Exit the REPL                                   |
| `help`    | `help`                    | List available commands and their descriptions  |
| `map`     | `map`                     | Show the next page of map/location results      |
| `mapb`    | `mapb`                    | Show the previous page of map/location results  |
| `explore` | `explore <location_name>` | Explore a location and list encountered Pokémon |
| `catch`   | `catch <pokemon_name>`    | Attempt to catch a Pokémon                      |
| `inspect` | `inspect <pokemon_name>`  | Show details of a Pokémon in your Pokédex       |
| `pokedex` | `pokedex`                 | View Pokémon currently in your Pokédex          |

### Example Usage

```bash
pokedex > help
Commands:
  exit     - Exit the Pokédex
  help     - Show this message
  map      - Get the next page of locations
  mapb     - Get the previous page of locations
  explore  - Explore area and catch Pokémon
  catch    - Catch a Pokémon
  inspect  - Inspect Pokémon in your Pokédex
  pokedex  - View your Pokémon

pokedex > explore grassland
Exploring grassland...
[List of Pokémon encounters]

pokedex > catch oddish
Caught Oddish! Added to Pokédex.

pokedex > pokedex
Your Pokédex:
 - Oddish

pokedex > inspect oddish
Name: Oddish
Types: grass, poison
Abilities: chlorophyll, run-away
Height: 5 dm
Weight: 54 hg

pokedex > exit
Goodbye!
```

## Scripts

```json
{
  "scripts": {
    "test": "vitest --run",
    "build": "npx tsc",
    "start": "node dist/main.js",
    "dev": "npx tsc && node dist/main.js"
  }
}
```

## Testing

Run tests with:

```bash
npm test
# or
npx vitest
```

## Files & Project Layout

```
dist/
  command_*.js
  main.js
  pokeapi.js
  pokecache.js
  repl.js
  state.js
src/
  command_catch.ts
  command_exit.ts
  command_explore.ts
  command_help.ts
  command_inspect.ts
  command_map.ts
  command_pokedex.ts
  command_registry.ts
  main.ts
  pokeCache.test.ts
  pokeapi.ts
  pokecache.ts
  repl.log
  repl.test.ts
  repl.ts
  state.ts
package.json
package-lock.json
tsconfig.json
```

## Logging & Caching

* **Logging:** REPL activity is written to `repl.log`.
* **Caching:** `pokecache.ts` provides a simple in-memory cache to reduce redundant API calls. The cache resets each session.

## Related Projects

* [Go implementation](../golang)

## Credits

* PokeAPI — [https://pokeapi.co](https://pokeapi.co)


