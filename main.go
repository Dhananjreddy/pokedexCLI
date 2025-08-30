package main

import (
	"fmt"
	"bufio"
	"os"
)

func main(){
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
			if callback, ok := supportedCommands[command]; ok == true {
				callback.callback()
			} else {
				fmt.Println("Unknown command")
				continue
			}

	}
}
