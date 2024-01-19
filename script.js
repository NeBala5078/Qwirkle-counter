newGame();

function addPlayer () {
    if (players.length < 4) {
        players.push(document.querySelector('#player').value);
        score.push(0);
        document.querySelector('#player').value = null;
        renderPlayerTemplate();
        }
    else {
       alert('Maximum 4 játékos játszhatja a játékot'); 
    }
}

function renderPlayerTemplate () {
    let playerTemplate = '';
    for(let i = 0; i<players.length; i++) {
        playerTemplate += `
        <div class="player player${i+1} js-player${i+1}">
            <h3>${players[i]}</h3>
            <p>${score[i]}</p>
        </div>`;}
        document.querySelector('.js-score').innerHTML = playerTemplate;    
    }
    


function start() {
    document.querySelector('.js-setup').style.visibility = "hidden";
    renderActivePlayer();
    document.querySelector('.add-score-container').style.visibility= "visible";
    document.querySelector('#player').value = null;
}

function renderActivePlayer() {
    document.querySelector('.js-active-player').innerHTML = `
    <div class="active-container player${nextPlayerIndex+1}">
    <h2>${players[nextPlayerIndex]} köre</h2>
    </div>
    `;
}

function addScore() {
    lastScore = Number(document.querySelector('.js-new-score').value);
    score[nextPlayerIndex] += lastScore;
    renderPlayerTemplate();
    document.querySelector('.js-new-score').value = 0;
    nextPlayerIndex < players.length-1 ? nextPlayerIndex++ : nextPlayerIndex=0;
    renderActivePlayer();
    undoable = true;
    }


function gameOver() {
    let winner = [];
    let maxScore = Math.max(...score);
    
    for (let i = 0; i<= players.length - 1; i++) {
        if ( score[i] === maxScore) {
            winner.push( players[i] );
        }
    }
        
    if (winner.length === 1) {
    alert('Gratulálunk ' + winner + ' Nyertél!!');
    } else {
        alert('Döntetlen! A nyertesek: ' + winner );
    }
}


function undo() {
    if (undoable) {
    nextPlayerIndex != 0 ? nextPlayerIndex--  : nextPlayerIndex = players.length - 1;
    score[nextPlayerIndex] -= lastScore;
    renderPlayerTemplate();
    renderActivePlayer();
    undoable = false;}
    else {
        alert ('Csak a legutóbb beírt pont vonható vissza');
    }
}

function newGame() {
document.querySelector('.js-active-player').innerHTML = null;
players = [];
score = [];
nextPlayerIndex = 0;
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


