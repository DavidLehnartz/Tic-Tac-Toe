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


// Players Turn Status -> Run -> handleClick() -> Init()
function showPlayersTurn() {  // Diese Funktion zeigt an, wessen Zug es gerade ist
    document.getElementById('players_turn_status').innerHTML = `It\`s player ${currentPlayer} turn`;
}


// Game Field (ONCLICK) 
function handleClick(index) {
    if (isFieldBlocked(index)) return;  // Feld blockieren, wenn es belegt ist

    chooseAnimation(index);  // Animation einfügen und Feld als belegt markieren

    if (checkWin()) { // Überprüft, ob es Gewinner gibt **true**
        document.getElementById('overlay').classList.remove('d_none');
        document.getElementById('endgame_status').innerHTML = `Player ${currentPlayer} Win\`s !`;
        disableBoard();
    }

    if (checkDraw()) { // Überprüft, ob es Unentschieden ist **true**
        document.getElementById('overlay').classList.remove('d_none');
        document.getElementById('endgame_status').innerHTML = `It\`s a Draw !`;
    }

    switchPlayer();  // Spieler wechseln
    showPlayersTurn();  // Status aktualisieren
}


// Is Field Blocked -> Run -> handleClick Func.
function isFieldBlocked(index) { 
    if (fields[index] !== null) { // Überprüft, ob Feld schon besetzt
        alert("This field is already occupied! Choose another field.");
        return true;
    }
    return false;
}


// Choose Animation -> Run -> handleClick Func.
function chooseAnimation(index) {
    let animation;  // Wähle die richtige Animation basierend auf dem aktuellen Spieler
    if (currentPlayer === 'X') {
        animation = getAnimationX();  // Hole die Animation für X
    } else {
        animation = getAnimationO();  // Hole die Animation für O
    }
    document.getElementById(`cell_${index}`).innerHTML = animation;  // Füge die Animation in das Spielfeld ein
    fields[index] = currentPlayer; // Speichere das aktuelle Symbol (X oder O) im Feld
}


// Switch Player -> Run -> handleClick()
function switchPlayer() { // Aktualisiere den Status, um den aktuellen Spieler anzuzeigen
    if (currentPlayer === 'X') {
        currentPlayer = 'O' // Wenn es X war, wechsle zu O
    } else {
        currentPlayer = 'X' // Andernfalls wechsle zurück zu X
    }
}


// Check Win -> Run -> handleClick Func.
function checkWin() {
    // Wir gehen durch jede Gewinnkombination
    for (let indexWinConditions = 0; indexWinConditions < winConditions.length; indexWinConditions++) {
        let condition = winConditions[indexWinConditions];  // Hole eine Gewinnkombination (z.B. [0, 1, 2])

        let pos1 = condition[0]; // Das erste Feld in der Gewinnkombination
        let pos2 = condition[1]; // Das zweite Feld in der Gewinnkombination
        let pos3 = condition[2]; // Das dritte Feld in der Gewinnkombination

        // Überprüfe, ob alle drei Felder vom selben Spieler belegt sind
        if (fields[pos1] !== null && fields[pos1] === fields[pos2] && fields[pos1] === fields[pos3]) {
            // Wenn alle drei Felder gleich sind, gibt es einen Gewinner
            return true;
        }
    }
    // Wenn keine der Gewinnkombinationen erfüllt ist, gibt es keinen Gewinner
    return false;
}


// Check Draw -> Run -> handleClick Func.
function checkDraw() {
    return fields.every(field => field !== null); // Prüfe, ob alle Felder belegt sind
}


// Reset Game (ONCLICK)
function resetGame() {
    currentPlayer = 'X'; // Globale Variable
    fields = Array(9).fill(null); // Leere das Spielfeld

    showPlayersTurn();

    for (let indexFields = 0; indexFields < fields.length; indexFields++) {
        document.getElementById(`cell_${indexFields}`).innerHTML = '';
        document.getElementById(`cell_${indexFields}`).style.pointerEvents = 'auto'; // Enabled Boeard wieder
    }
}


// Disable Board -> Run handleClick Func.
function disableBoard() {
    for (let indexFields = 0; indexFields < fields.length; indexFields++) {
        document.getElementById(`cell_${indexFields}`).style.pointerEvents = 'none';
    }
}


// Close Dialog/Overlay (ONCLICK)
function closeOverlayDialog() {
    document.getElementById('overlay').classList.add('d_none');
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
                <circle cx="40" cy="40" r="35" stroke="blue" stroke-width="4" fill="none">
                    <animate attributeName="r" from="0" to="35" dur="400ms" fill="freeze" />
                </circle>
            </svg>
    `;
}