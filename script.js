'use strict;'

/* MAIN SCRIPT */


let currentPlayer = 'X'; // Start Spieler


let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
]


let winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
];


// Init
function init() {
    showPlayersTurn();
}


// Players Turn Status
function showPlayersTurn() {  // Diese Funktion zeigt an, wessen Zug es gerade ist
    document.getElementById('players_turn_status').innerHTML = `It\`s player ${currentPlayer} turn`;
}


// Handle Click (ONCLICK)
function handleClick(index) {
    // Wähle die richtige Animation basierend auf dem aktuellen Spieler
    let animation;
    if (currentPlayer === 'X') {
        animation = getAnimationX();  // Hole die Animation für X
    } else {
        animation = getAnimationO();  // Hole die Animation für O
    }

    document.getElementById(`cell_${index}`).innerHTML = animation;  // Füge die Animation in das Spielfeld ein

    isFieldOccupied();
    switchPlayer();
    showPlayersTurn();
}


// Is Field Occupied -> Run -> handleClick()
function isFieldOccupied(index) {
    if (fields[index != null]) { // Wenn das Feld belegt ist, nichts tun
        return;
    }
    fields[index] = currentPlayer; // Speichere das aktuelle Symbol (X oder O) im Feld
}


// Switch Player
function switchPlayer() { // Aktualisiere den Status, um den aktuellen Spieler anzuzeigen
    if (currentPlayer === 'X') {
        currentPlayer = 'O' // Wenn es X war, wechsle zu O
    } else {
        currentPlayer = 'X' // Andernfalls wechsle zurück zu X
    }
}


// Get Animation X
function getAnimationX() {
    return `
            <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                <line x1="10" y1="10" x2="70" y2="70" stroke="red" stroke-width="4">
                    <animate attributeName="x2" from="10" to="70" dur="400ms" fill="freeze" />
                    <animate attributeName="y2" from="10" to="70" dur="400ms" fill="freeze" />
                </line>
                <line x1="10" y1="70" x2="70" y2="10" stroke="red" stroke-width="4">
                    <animate attributeName="x2" from="10" to="70" dur="400ms" fill="freeze" begin="400ms" />
                    <animate attributeName="y2" from="70" to="10" dur="400ms" fill="freeze" begin="400ms" />
                </line>
            </svg>
    `;
}


// Get Animation O
function getAnimationO() {
    return `
            <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="35" stroke="red" stroke-width="4" fill="none">
                    <animate attributeName="r" from="0" to="35" dur="400ms" fill="freeze" />
                </circle>
            </svg>
    `;
}


// Reset Game
function resetGame() {
    currentPlayer = 'X';

    showPlayersTurn();

    for (let indexFields = 0; indexFields < fields.length; indexFields++) {
        document.getElementById(`cell_${indexFields}`).innerHTML = '';

    }
}