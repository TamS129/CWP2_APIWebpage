/**
 * Name:Tamara Slone
 * Date: October 30th 2024
 * This is the Javascript code for the "Whose that Pokemon?" page.
 */

"use strict";
//console.log("JavaScript file is loaded correctly!");

const pokeImage = document.getElementById("pokeimage");
const guessInput = document.getElementById("guess");
const submitGuessButton = document.getElementById("submit-guess");
const skipButton = document.getElementById("skip");
const displayResult = document.getElementById("result");
const scoreDisplay = document.getElementById("score");

let currentPoke = {};
let points = 0;

scoreDisplay.textContent = `Score: ${points}`

/**
 * Fetches a random Pokemon from PokeAPI and returns a silouette of a pokemon to guess.
 */
function fetchPokemon() {
    const randID = Math.floor(Math.random() * 1010) + 1;

    fetch(`https://pokeapi.co/api/v2/pokemon/${randID}`)
        .then(statusCheck)
        .then(res => res.json())
        .then(data => {

            currentPoke = data;

            
            pokeImage.src = data.sprites.other['official-artwork'].front_default;
            pokeImage.style.filter = "brightness(0)";
            
            
            guessInput.value = "";
            displayResult.textContent = "";
        })

        .catch(handleError);
}

/**
 * Checks if the fetch call to the API works correctly if not it returns an error.
 * @param {response} res Response from the API
 * @returns the response of the API if there are no errors.
 */

function statusCheck(res){
    if(!res.ok){
        throw new Error(`Error: ${res.status}`);
    }
    else{
        return res;
    }
}

/**
 * Returns an error message if the API encounters an error.
 * @param {Error message} error 
 */

function handleError(error){

    const errorMes = document.createElement('p');
    errorMes.textContent = `Uh oh there is an error! ${error.message} `;
    document.getElementById('pokemonoftheday').appendChild(errorElement);
}



function checkGuess() {

    const userGuess = guessInput.value.trim().toLowerCase();
    
    displayResult.classList.remove("highlight-correct", "highlight-incorrect");

    if (userGuess === currentPoke.name.toLowerCase()) {
        points++;

        scoreDisplay.textContent = `Score: ${points}`;
        displayResult.textContent = `Correct! It's ${currentPoke.name}!`;
        pokeImage.style.filter = "brightness(1)";
        
        displayResult.classList.add("highlight-correct");

        setTimeout(() => {

            fetchPokemon();

            displayResult.classList.remove("highlight-correct");

        }, 1000);
        
    } else {
        displayResult.textContent = "Incorrect! Try again!";
        
        displayResult.classList.add("highlight-incorrect");
        setTimeout(() => displayResult.classList.remove("highlight-incorrect"), 500);
    }
}


submitGuessButton.addEventListener("click", checkGuess);
skipButton.addEventListener("click", fetchPokemon)


fetchPokemon();