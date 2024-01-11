//initial state
document.querySelector('.js-active-player').innerHTML = null;
let players = { 1 : 0, 2 : 0, 3 : 0, 4:0 };
let score = { 1 : 0, 2 : 0, 3 : 0, 4:0 };
let playerCounter = 0;
let playersInGame = 0;
let lastScore = 0;
let undoable = false;

function addPlayer () {
    if (playerCounter < 4) {
    players[playerCounter] = document.querySelector('#player').value;
    score[playerCounter] = 0;
    playersInGame = playerCounter;
    playerCounter++;
    document.querySelector('#player').value = null;
    renderScore();}
    else {
       alert('Maximum 4 játékos játszhatja a játékot'); 
    }
}

function renderScore () {
    switch (playersInGame) {
        
        case 0:
            document.querySelector('.js-score').innerHTML = `
                <div class="player player1 js-player1">
                    <h3>${players[0]}</h3>
                    <p>${score[0]}</p>
                </div>`
                break;
            
        case 1:
            document.querySelector('.js-score').innerHTML = `
        <div class="player player1 js-player1">
            <h3>${players[0]}</h3>
            <p>${score[0]}</p>
        </div>
        <div class="player player2 js-player2">
        <h3>${players[1]}</h3>
        <p>${score[1]}</p>
        </div>`
        break;

        case 2:
            document.querySelector('.js-score').innerHTML = `
        <div class="player player1 js-player1">
            <h3>${players[0]}</h3>
            <p>${score[0]}</p>
        </div>
        <div class="player player2 js-player2">
        <h3>${players[1]}</h3>
        <p>${score[1]}</p>
        </div>
        <div class="player player3 js-player3">
        <h3>${players[2]}</h3>
        <p>${score[2]}</p>
        </div>`
        break;

        case 3:
document.querySelector('.js-score').innerHTML = `
<div class="player player1 js-player1">
            <h3>${players[0]}</h3>
            <p>${score[0]}</p>
        </div>
        <div class="player player2 js-player2">
        <h3>${players[1]}</h3>
        <p>${score[1]}</p>
        </div>
        <div class="player player3 js-player3">
        <h3>${players[2]}</h3>
        <p>${score[2]}</p>
        </div>
        <div class="player player4 js-player4">
        <h3>${players[3]}</h3>
        <p>${score[3]}</p>
        </div>   
`;
        break;
}}

function start() {
    document.querySelector('.js-setup').style.visibility = "hidden";
    playerCounter = 0;
    renderActivePlayer();
    document.querySelector('.add-score-container').style.visibility= "visible";
    document.querySelector('#player').value = null;
}

function renderActivePlayer() {
    document.querySelector('.js-active-player').innerHTML = `
    <div class="active-container player${playerCounter+1}">
    <h2>${players[playerCounter]} köre</h2>
    </div>
    `;
}

function addScore() {
    lastScore = Number(document.querySelector('.js-new-score').value);
    score[playerCounter] += lastScore;
    renderScore();
    document.querySelector('.js-new-score').value = 0;
    playerCounter < playersInGame ? playerCounter++ : playerCounter=0;
    renderActivePlayer();
    return lastScore, undoable = true;;
    }

function gameOver() {
    let winner = '';
    let maxScore = 0;
    for (let i = 0; i<= playersInGame; i++) {
        if ( score[i] > maxScore) {
            maxScore = score[i];
            winner = players[i];
        }
    }
    //check for multiple winners
    let multipleWinners = [];
    for (let i = 0; i <= playersInGame; i++) {
        if (score[i] == maxScore && players[i] != winner) {  
            multipleWinners.push(players[i]); 
    }}
    if (multipleWinners.length == 0) {
    alert('Gratulálunk ' + winner + ' Nyertél!!');
    } else {
        alert('Döntetlen! A nyertesek: ' + winner + ' ' + multipleWinners)
    }
}


function undo() {
    if (undoable) {
    playerCounter != 0 ? playerCounter--  : playerCounter = playersInGame;
    score[playerCounter] -= lastScore;
    renderScore();
    renderActivePlayer();
    return undoable = false;}
    else {
        alert ('Csak a legutóbb beírt pont vonható vissza');
    }
}

function newGame() {
document.querySelector('.js-active-player').innerHTML = null;
players = { 1 : 0, 2 : 0, 3 : 0, 4:0 };
score = { 1 : 0, 2 : 0, 3 : 0, 4:0 };
playerCounter = 0;
playersInGame = 0;
document.querySelector('.js-setup').style.visibility = 'visible';
document.querySelector('.js-score').innerHTML = null;
document.querySelector('.add-score-container').style.visibility= "hidden"
}

document.querySelector('.js-add').addEventListener('click', addPlayer);
document.querySelector('.js-start').addEventListener('click', start);
document.querySelector('.js-add-score').addEventListener('click', addScore);
document.querySelector('.js-gameOver').addEventListener('click', gameOver);
document.querySelector('.js-new-game').addEventListener('click', newGame);
document.querySelector('.js-back').addEventListener('click', undo);


