//initial state
document.querySelector('.js-active-player').innerHTML = null;
let players = { 0 : 0, 1 : 0, 2 : 0, 3:0 };
let score = { 0 : 0, 1 : 0, 2 : 0, 3:0 };
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
    renderPlayerTemplate();}
    else {
       alert('Maximum 4 játékos játszhatja a játékot'); 
    }
}

function renderPlayerTemplate () {
    let playerTemplate = '';
    for(let i = 0; i<=playersInGame; i++) {
        playerTemplate += `
        <div class="player player${i+1} js-player${i+1}">
            <h3>${players[i]}</h3>
            <p>${score[i]}</p>
        </div>`;}
        document.querySelector('.js-score').innerHTML = playerTemplate;    
    }
    


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
    renderPlayerTemplate();
    document.querySelector('.js-new-score').value = 0;
    playerCounter < playersInGame ? playerCounter++ : playerCounter=0;
    renderActivePlayer();
    return lastScore, undoable = true;
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
    renderPlayerTemplate();
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


