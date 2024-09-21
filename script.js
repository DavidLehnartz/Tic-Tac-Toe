'use strict;'

/* MAIN SCRIPT */


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
function showPlayersTurn() {
    document.getElementById('players_turn_status').innerHTML = `It\`s player $ currentplayer turn`;
}


