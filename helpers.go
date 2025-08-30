package main

import (
	"os"
	"fmt"
	"strings"
)

func cleanInput(text string) []string{
	words := strings.Fields(text)
	for i, word := range words{
		words[i] = strings.ToLower(word)
	}
	return words
}

func commandExit() error {
	fmt.Println("Closing the Pokedex... Goodbye!")
	os.Exit(0)
	return nil
}

func commandHelp() error {
	fmt.Println("Welcome to the Pokedex!")
	fmt.Println("Usage:\n")

	for key, val := range supportedCommands{
		fmt.Printf("%s: %s\n", key, val.description)
	}
	return nil
}