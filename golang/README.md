# pokedexCLI — Go

Pokedex CLI REPL using the PokeAPI (Go implementation).

## Overview

* Command-line REPL client that queries the PokeAPI and shows Pokémon and location data in the terminal.
* Focus: fast lookup, readable output, and an engaging interactive experience.

## Features

* REPL mode with multiple supported commands
* Lookup Pokémon data by name or ID
* Catch, inspect, and list your own Pokémon
* Explore and navigate through map locations
* Simple, idiomatic Go codebase suitable for learning and extension

## Prerequisites

* Go 1.20+ installed
* `git` to clone the repo
* Network access to [https://pokeapi.co](https://pokeapi.co)

## Install / Build

```bash
git clone https://github.com/Dhananjreddy/pokedexCLI/golang.git
cd pokedexCLI/golang
go build -o pokedex .
```

## Usage

### Start REPL

```bash
./pokedex 
```

Then type any of the supported commands:

| Command   | Usage                     | Description                         |
| --------- | ------------------------- | ----------------------------------- |
| `help`    | `help`                    | Displays a help message             |
| `exit`    | `exit`                    | Exit the Pokedex                    |
| `map`     | `map`                     | Get the next page of locations      |
| `mapb`    | `mapb`                    | Get the previous page of locations  |
| `explore` | `explore <location_name>` | Explore a location                  |
| `catch`   | `catch <pokemon_name>`    | Attempt to catch a Pokémon          |
| `inspect` | `inspect <pokemon_name>`  | View details about a caught Pokémon |
| `pokedex` | `pokedex`                 | View your caught Pokémon list       |

### Example

```bash
pokedex > map
-- Showing locations 1–20 --
pokedex > explore pallet-town
Found: Pidgey, Rattata, Pikachu!
pokedex > catch pikachu
You caught Pikachu!
pokedex > pokedex
Your Pokémon: Pikachu
pokedex > inspect pikachu
Name: Pikachu\nType: Electric\nBase XP: 112\nHeight: 4 decimetres
```

## Testing

```bash
go test ./...
```

For integration tests that hit the PokeAPI, ensure network access and respect rate limits.

## Troubleshooting

* If PokeAPI rate-limits occur, use caching or add a short delay between calls.

## Credits
* Credits:

  * PokeAPI — [https://pokeapi.co](https://pokeapi.co)


