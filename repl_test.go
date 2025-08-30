package main

import "testing"

func TestCleanInput(t *testing.T) {
   cases := []struct {
	input    string
	expected []string
	}{
	{
		input:    "  hello  world  ",
		expected: []string{"hello", "world"},
	},
	{
		input: " Dhananjay     REddy",
		expected: []string{"dhananjay", "reddy"},
	},
	{
		input: "CharMander   BulbaSAUR",
		expected: []string{"charmander", "bulbasaur"},
	},
	}
	for _, c := range cases {
	actual := cleanInput(c.input)
		if len(actual) != len(c.expected){
			t.Errorf("No. of words incorrect")
		}
	for i := range actual {
		word := actual[i]
		expectedWord := c.expected[i]
		if len(word) != len(expectedWord){
			t.Errorf("length of %s and %s dont match", word, expectedWord)
		}
		for j, _ := range word{
			if word[j] != expectedWord[j]{
			t.Errorf("Characters %c and %c of %s and %s dont match", word[j], expectedWord[j] ,word, expectedWord)
		}
	}
}
}
}