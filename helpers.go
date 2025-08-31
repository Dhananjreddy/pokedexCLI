package main

import (
	"os"
	"fmt"
	"strings"
	"net/http"
	"encoding/json"
	"io"
	"errors"
	"math/rand"
	"time"
)

func cleanInput(text string) []string{
	words := strings.Fields(text)
	for i, word := range words{
		words[i] = strings.ToLower(word)
	}
	return words
}

func commandExit(cfg *config, args ...string) error {
	fmt.Println("Closing the Pokedex... Goodbye!")
	os.Exit(0)
	return nil
}

func commandHelp(cfg *config, args ...string) error {
	fmt.Println("Welcome to the Pokedex!")
	fmt.Println("Usage:")

	for key, val := range supportedCommands{
		fmt.Printf("%s: %s\n", key, val.description)
	}
	return nil
}

func commandMapf(cfg *config, args ...string) error {
	resp, err := cfg.pokeapiClient.listLocations(cfg.nextLocationURL)
	if err != nil {
		return err
	}

	cfg.nextLocationURL = resp.Next
	cfg.prevLocationURL = resp.Previous

	for _, loc := range resp.Results {
		fmt.Println(loc.Name)
	}
	return nil
}

func commandMapb(cfg *config, args ...string) error {
	if cfg.prevLocationURL == nil {
		fmt.Println("you're on the first page")
        return nil
	}

	resp, err := cfg.pokeapiClient.listLocations(cfg.prevLocationURL)
	if err != nil {
		return err
	}

	cfg.nextLocationURL = resp.Next
	cfg.prevLocationURL = resp.Previous

	for _, loc := range resp.Results {
		fmt.Println(loc.Name)
	}
	return nil
}

func commandExplore(cfg *config, args ...string) error {
	if len(args) != 1 {
		return errors.New("you must provide a location name")
	}

	name := args[0]
	location, err := cfg.pokeapiClient.GetLocation(name)
	if err != nil {
		return err
	}
	fmt.Printf("Exploring %s...\n", location.Name)
	fmt.Println("Found Pokemon: ")
	for _, enc := range location.PokemonEncounters {
		fmt.Printf(" - %s\n", enc.Pokemon.Name)
	}
	return nil
}

func commandCatch(cfg *config, args ...string) error {
	rand.Seed(time.Now().UnixNano()) 

	if len(args) != 1 {
		return errors.New("you must provide a pokemon name")
	}

	name := args[0]
	pokemon, err := cfg.pokeapiClient.GetPokemon(name)
	if err != nil {
		return err
	}

	fmt.Printf("Throwing a Pokeball at %s...\n", pokemon.Name)

	chance := rand.Intn(350)
	if pokemon.BaseExperience > chance {
		fmt.Printf("%s escaped!\n", pokemon.Name)
		return nil
	}

	fmt.Printf("%s was caught!\n", pokemon.Name)

	cfg.caughtPokemon[pokemon.Name] = pokemon
	return nil
}

func (c Client) GetLocation (name string) (Location, error){
	url := "https://pokeapi.co/api/v2/location-area/" + name

	if val, ok := c.cache.Get(url); ok {
		location := Location{}
		err := json.Unmarshal(val, &location)
		if err != nil {
			return Location{}, err
		}
		return location, nil
	}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
			return Location{}, err
		}
	
	res, err := c.httpClient.Do(req)
	if err != nil {
			return Location{}, err
		}
	defer res.Body.Close()

	data, err := io.ReadAll(res.Body)
	if err != nil {
		return Location{}, err
	}

	location := Location{}
	if err := json.Unmarshal(data, &location); err != nil {
			return Location{}, err
		}
	
	c.cache.Add(url, data)
	return location, nil
}

func (c Client) listLocations(page *string) (pokeLocations, error) {
	url := "https://pokeapi.co/api/v2/location-area"
	
	if page != nil && *page != "" {
		url = *page
	}

	if val, ok := c.cache.Get(url); ok {
		listLocations := pokeLocations{}
		err := json.Unmarshal(val, &listLocations)
		if err != nil {
			return pokeLocations{}, err
		}

		return listLocations, nil
	}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return pokeLocations{}, err
	}
	
	resp, err := c.httpClient.Do(req)
	if err != nil {
		return pokeLocations{}, err
	}
	if resp.StatusCode != http.StatusOK {
    	return pokeLocations{}, fmt.Errorf("unexpected status: %d", resp.StatusCode)
	}

	defer resp.Body.Close()
	
	listLocations := pokeLocations{}
	
	dat, err := io.ReadAll(resp.Body)
	if err != nil {
		return pokeLocations{}, err
	}
	
	if err := json.Unmarshal(dat, &listLocations); err != nil {
		return pokeLocations{}, err
	}

	c.cache.Add(url, dat)
	return listLocations, nil
}

func (c *Client) GetPokemon(name string) (Pokemon, error) {
	url := "https://pokeapi.co/api/v2/pokemon/" + name

	if val, ok := c.cache.Get(url); ok {
		pokemon := Pokemon{}
		err := json.Unmarshal(val, &pokemon)
		if err != nil {
			return Pokemon{}, err
		}
		return pokemon, nil
	}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
			return Pokemon{}, err
		}
	
	res, err := c.httpClient.Do(req)
	if err != nil {
			return Pokemon{}, err
		}
	defer res.Body.Close()

	data, err := io.ReadAll(res.Body)
	if err != nil {
			return Pokemon{}, err
		}
	
	pokemon := Pokemon{}
	err2 := json.Unmarshal(data, &pokemon)
	if err2 != nil {
			return Pokemon{}, err2
		}
	
	c.cache.Add(url, data)
	return pokemon, nil
}