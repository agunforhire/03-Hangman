// our variables
var dictionary = ['WARLOCK', 'PAIMON', 'SOLOMON', 'GOETIA', 'BAPHOMET', 'BELIAL', 'WITCHCRAFT', 'GRIMOIRE']
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var alertWrong = ["The signs grow dim", "You are befuddled by ancient magics", "The portents fade", "The shadows encroach"];
var alertWin = ["The ancient ones are pleased with your triumph", "You have divined the signs and portents", "Your vision fills with light!"]
var alertLose = ["Darkness swallows your vision", "OBLIVION!", "Pretty much the most grim parts of Revelations"]

//playSpace will include blanks spaces and correct guesses
var playSpace = [] ;


var space ;
var compWord ;
var compLetters ;

//Counters for wins, losses and guesses remaining

var wins = 0;
var losses = 0;
var guesses = 10;

//Arrays to hold guessed letters

guessed = [];
correct = [];
incorrect = [];

//Our game starting function

function powerButton (){
    //moved this up here to make sure it empties properly
    //Cludgey vanilla hack of the jQuery empty() method
    var emptyGuessed = document.getElementById('guessed');
    while(emptyGuessed.firstChild) emptyGuessed.removeChild(emptyGuessed.firstChild);


    //resetting variables
    guesses = 10;
    playSpace = [];
    compLetters = [];
    guessed = [];
    correctGuess = [];
    incorrectGuess = [];
    
    //choosing and new word and populating variables
    compWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    compLetters = compWord.split("");
    console.log(compWord);
    console.log(compLetters);
    space = compLetters.length;
    for (var i = 0; i < space; i++) {
        playSpace.push("_")
}
}

//Creating our Buttons!
function buttons() {
    //gets the buttons id from html

    var letterBtn = document.getElementById('buttons');
    document.getElementById('buttons').innerHTML = '';

    for (var i = 0; i < alphabet.length; i++) {
        // Using a list because I could not get the HTML button element to work correctly
        
        let listItem = document.createElement('li');
       
        listItem = document.createElement('BUTTON');
        listItem.classList.add('btn-primary');

        //gives each list item the id letter
        listItem.id = 'letter';
        listItem.innerHTML = alphabet[i];

        //appends listItem to buttons div
        document.getElementById('buttons').appendChild(listItem);
        listItem.dataset.alphabet = alphabet[i];

        listItem.onclick = function() {
            var userGuess = listItem.dataset.alphabet;
            guessed.push(userGuess);
            document.getElementById('guessed').innerHTML = "Letters already guessed: " + guessed.join(" ");
            
        // Checking the guess
        checkLetters(userGuess);
        //Updating the Game State
        gameUpdate();
        }
    }
}

function checkLetters(letter) {
    var isLetter = false;
    
    console.log(isLetter);
    for (var i = 0; i < space; i++) {
        if (compLetters[i] == letter) {
            isLetter = true;
            console.log(isLetter);
        }
    }
    if (isLetter) {
        for (var i = 0; i < space; i++) {

            if (compWord[i] == letter) {
                playSpace[i] = letter
            }
        }
        console.log(playSpace);

    } else {
        incorrect.push(letter);
        guesses--;
        var message = alertWrong[Math.floor(Math.random() * alertWrong.length)];
        alert(message+ " " + " " + guesses + " chances remain");
    }
}

function gameUpdate() {
    console.log("Wins: " + wins + " | Losses: " + losses + " | Guesses: " + guesses);

    // Updating guesses, letters and guessed
    document.getElementById("remaining").innerHTML = "Guesses Remaining: " + guesses;
    document.getElementById("playSpace").innerHTML = "Find the missing letters: " + playSpace.join(" ");
    document.getElementById("guessed").innerHTML = "Letters already guessed: " + incorrect.join(" ");

    // Checking to see if you've won 
    if (compLetters.toString() === playSpace.toString()) {
        wins++;
        document.getElementById("word").innerHTML = "The last word was " + compWord;
        
        var messageWin = alertWin[Math.floor(Math.random() * alertWin.length)];
        alert(messageWin);
        alert("The word was " + compWord);

        document.getElementById("wins").innerHTML = "You have won " + winCounter + " game(s)";

        powerButton();
    }

    // If you've lost
    else if (guesses == 0) {
        losses++;  
        document.getElementById("word").innerHTML = "The last word was " + compWord;
        
        var messageLose = alertWin[Math.floor(Math.random() * alertLose.length)];
        alert(messageLose);
        alert("The word was " + compWord);
        
        
        document.getElementById("losses").innerHTML = "You have lost " + losses + " game(s)";
        
        powerButton();
    }
}



//Calling PowerButton and Buttons on load

powerButton ();
buttons ();