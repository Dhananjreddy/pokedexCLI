package main

import (
	"fmt"
	"bufio"
	"os"
	"net/http"
	"github.com/Dhananjreddy/pokedexCLI/internal/pokecache"
	"time"
)

func main(){

	client:= Client{
		cache: pokecache.NewCache(5*time.Minute),
		httpClient: http.Client{},
	}

	cfg := &config{
		pokeapiClient: client,
		caughtPokemon: map[string]Pokemon{},
	}

	scanner := bufio.NewScanner(os.Stdin)
	for {
		fmt.Print("Pokedex > ")
			if ok := scanner.Scan(); ok == false {
				break
			}
			words := cleanInput(scanner.Text())
			if len(words) == 0{
				continue
			}
			
			command := words[0]
			args := []string{}
			if len(words) > 1 {
				args = words[1:]
			}
			if callback, ok := supportedCommands[command]; ok == true {
				if err := callback.callback(cfg, args...); err != nil {
        			fmt.Println("error:", err)
    			}
			} else {
				fmt.Println("Unknown command")
				continue
			}

	}
}
