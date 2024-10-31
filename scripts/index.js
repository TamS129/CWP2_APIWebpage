/**
 * Name:Tamara Slone
 * Date: October 30th 2024
 * This is the Javascript code for my home page. 
 */

"use strict";

let correctAns;

/*Pokemon of the Day Code*/

/**
 * Retrieves a pokemon from the API to present to the front page. 
 */
function fetchPokemonOfTheDay() {

    fetch(`https://pokeapi.co/api/v2/pokemon/778`)
        .then(statusCheck)
        .then(response => response.json())
        .then(data => {

            const pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            const pokeImageUrl = data.sprites.other['official-artwork'].front_default;

            document.getElementById("pokeName").textContent = pokeName;
            document.getElementById("pokeImage").src = pokeImageUrl;
            document.getElementById("pokeImage").alt = `${pokeName} image`;
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

/* Quiz Game Code */

const questions = [
    {
        question: "What are the first Pokémon games to be released in the US?",
        options: ["Pokémon Red and Blue", "Pokémon Red and Green", "Pokémon Yellow", "Pokémon Black and White"],
        answer: "Pokémon Red and Blue"
    },
    {
        question: "Who printed the original TCG for Pokémon?",
        options: ["The Pokémon Company", "Konami", "Wizards of the Coast", "Topps"],
        answer: "Wizards of the Coast"
    },
    {
        question: "Which of these Pokémon games does NOT have traditional gyms featured in the game?",
        options: ["Pokémon Sapphire and Ruby", "Pokémon Platinum", "Let's GO Pikachu and Let's GO Eevee", "Pokémon Sun and Moon"],
        answer: "Pokémon Sun and Moon"
    },
    {
        question: "In Pokémon Black and White, what is the rival N's full name?",
        options: ["Naturia", "Nathan Harmonia", "Natural Harmonia Gropius", "Natural Harmony"],
        answer: "Natural Harmonia Gropius"
    },
    {
        question: "What dual type is Mimikyu?",
        options: ["ghost/dark", "fairy/dark", "fairy/normal", "fairy/ghost"],
        answer: "fairy/ghost"
    }
];

let currQuestIndex = 0;
let score = 0;

/**
 * Loads the questions above to be implemented into a pokemon quiz on the front page.
 */
function loadQuizQuest() {
    const currQuest = questions[currQuestIndex];
    const quest = document.getElementById("question");
    const optButton = document.querySelectorAll(".option-button");

    quest.textContent = currQuest.question;

    optButton.forEach((button, index) => {
        button.textContent = currQuest.options[index];
        button.onclick = () => checkAnswer(currQuest.options[index]);
    });
}

/**
 * Checks the answers the user selected and reveals how many questions they got right.
 * @param {Option Selected} optionSel The choice that the user makes while playing the PokeQuiz game
 */
function checkAnswer(optionSel) {
    const currentQuestion = questions[currQuestIndex];
    const result = document.getElementById("result");

    if (optionSel === currentQuestion.answer) {

        result.textContent = "Correct!";
        score++;
        
    } else {

        result.textContent = "Wrong! The correct answer was " + currentQuestion.answer;
    }

    currQuestIndex++;
    if (currQuestIndex < questions.length) {

        setTimeout(loadQuizQuest, 1000); 

    } else {

        result.textContent = `Quiz finished! You got ${score}/${questions.length} correct!`;
    }
}

fetchPokemonOfTheDay();
loadQuizQuest();