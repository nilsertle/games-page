let n = 0;
let bond4 = false;
const players = ['o', 'x'];
const source = ['./img/circle1.svg', './img/cross-sign.svg'];
let bond = false;
let ai;
let human;
let bondi = false;
const xxx = document.querySelector('.xxx');
const ooo = document.querySelector('.ooo');
const gameboard = document.querySelector('#gameboard');
const start = document.querySelector('#start');
const gegCom = document.querySelector('.gegen');
const gegSpi = document.querySelector('.fuer');

let current = 1;

let scores;
// reset button
function reset() {
    const buttons = document.querySelectorAll('#gameboard button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeAttribute('disabled', 'disabled');
        buttons[i].setAttribute('aria-label', '');
        buttons[i].classList.remove('highlighted');
        const winner = document.querySelector('.winner');
        winner.innerText = 'No winner yet';
    }

    // resets images (fields)
    const image = document.querySelector('.tic-tac-toe #gameboard').getElementsByTagName('img');
    while (image.length > 0) {
        for (let i = 0; i < image.length; i++) {
            image[i].remove();
        }
    }
    n = 0;
    // reset border of left-show-circle and cross

    document.querySelector('#hint').querySelectorAll('div')[0].classList.remove('focus');
    document.querySelector('#hint').querySelectorAll('div')[1].classList.remove('focus');
    document.querySelector('#hint').querySelectorAll('div')[0].classList.remove('not-focus');
    document.querySelector('#hint').querySelectorAll('div')[1].classList.remove('not-focus');

    document.querySelector('#hint').querySelectorAll('div')[0].classList.remove('winner-border');
    document.querySelector('#hint').querySelectorAll('div')[1].classList.remove('winner-border');

    bond4 = false;
}

function handleEnd(check) {
    const winner = document.querySelector('.winner');
    if (check === 'draw') {
        winner.innerText = 'Draw!';
    } else {
        winner.innerText = `The winner is ${check}`;
    }
    const alle = document.querySelectorAll('#gameboard button');
    for (let i = 0; i < alle.length; i++) {
        alle[i].setAttribute('disabled', 'disabled');
    }
}

function checkIfCompletedForKI(boardList) {
    let winner = 'a';
    let full = true;

    for (let i = 0; i < 3; i++) {
        // senkrecht
        if (
            boardList[0 + i] !== 'free' &&
            boardList[0 + i] === boardList[i + 3] &&
            boardList[i + 3] === boardList[i + 6]
        ) {
            winner = boardList[0 + i];
        }

        // waagerecht
        if (
            boardList[i * 3] !== 'free' &&
            boardList[i * 3] === boardList[i * 3 + 1] &&
            boardList[i * 3 + 1] === boardList[i * 3 + 2]
        ) {
            winner = boardList[i * 3];
        }

        // diagonal
        if (boardList[0] !== 'free' && boardList[0] === boardList[4] && boardList[4] === boardList[8]) {
            winner = boardList[0];
        }

        // diagonal
        if (boardList[2] !== 'free' && boardList[2] === boardList[4] && boardList[4] === boardList[6]) {
            winner = boardList[2];
        }

        for (let d = 0; d < boardList.length; d++) {
            if (boardList[d] === 'free') {
                full = false;
            }
        }

        if (i > 1) {
            if (full === true && winner === 'a') {
                // game is over
                return 'draw';
            }
        }
    }
    return winner;
}

function minimax(boardList, depth, isMaximazing) {
    const result = checkIfCompletedForKI(boardList);
    if (result !== 'a') {
        return scores[result];
    }

    // if it is maximizing (max-min-max-min-... --->>> and this is max´s turn)
    if (isMaximazing) {
        let bestScore = -Infinity;
        for (let i = 0; i < boardList.length; i++) {
            if (boardList[i] === 'free') {
                boardList[i] = ai;
                const score = minimax(boardList, depth + 1, false);
                boardList[i] = 'free';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    }
    let bestScore2 = Infinity;
    for (let i = 0; i < boardList.length; i++) {
        if (boardList[i] === 'free') {
            boardList[i] = human;
            const score = minimax(boardList, depth + 1, true);
            boardList[i] = 'free';
            bestScore2 = Math.min(score, bestScore2);
        }
    }
    return bestScore2;

    // if it is minimizing
}

function bestMove(boardList) {
    let bestScore = -Infinity;
    let bMove;

    for (let i = 0; i < boardList.length; i++) {
        if (boardList[i] === 'free') {
            boardList[i] = ai;
            const score = minimax(boardList, 0, false);
            boardList[i] = 'free';
            if (score > bestScore) {
                bestScore = score;
                bMove = i;
            }
        }
    }

    if (checkIfCompletedForKI(boardList) !== 'a') {
        bMove = undefined;
    }
    return bMove;
}

function setAiAndHuman() {
    if (ai === 'x') {
        scores = {
            o: -1,
            x: 1,
            draw: 0,
        };
    } else {
        scores = {
            o: 1,
            x: -1,
            draw: 0,
        };
    }
}

function highlightCells(theFields) {
    for (let i = 0; i < 3; i++) {
        theFields[i].classList.add('highlighted');
    }
}

function checkIfCompleted() {
    const fields = document.querySelectorAll('#gameboard button');
    let full = true;
    let winner = 'a';

    for (let i = 0; i < 3; i++) {
        // 3 senkrecht
        if (
            fields[0 + i].getAttribute('aria-label') !== '' &&
            fields[0 + i].getAttribute('aria-label') === fields[3 + i].getAttribute('aria-label') &&
            fields[3 + i].getAttribute('aria-label') === fields[6 + i].getAttribute('aria-label')
        ) {
            // we have a winner
            winner = fields[0 + i].getAttribute('aria-label');
            highlightCells([fields[0 + i], fields[3 + i], fields[6 + i]]);
        }

        // 3 waagerecht
        if (
            fields[i * 3].getAttribute('aria-label') !== '' &&
            fields[i * 3].getAttribute('aria-label') === fields[i * 3 + 1].getAttribute('aria-label') &&
            fields[i * 3 + 1].getAttribute('aria-label') === fields[i * 3 + 2].getAttribute('aria-label')
        ) {
            // we have a winner
            winner = fields[i * 3].getAttribute('aria-label');
            highlightCells([fields[i * 3], fields[i * 3 + 1], fields[i * 3 + 2]]);
        }

        // diagonal links oben nach rechts unten
        if (
            fields[0].getAttribute('aria-label') !== '' &&
            fields[0].getAttribute('aria-label') === fields[4].getAttribute('aria-label') &&
            fields[4].getAttribute('aria-label') === fields[8].getAttribute('aria-label')
        ) {
            // we have a winner
            winner = fields[0].getAttribute('aria-label');
            highlightCells([fields[0], fields[4], fields[8]]);
        }

        // diagonal rechts oben nach links unten
        if (
            fields[2].getAttribute('aria-label') !== '' &&
            fields[2].getAttribute('aria-label') === fields[4].getAttribute('aria-label') &&
            fields[4].getAttribute('aria-label') === fields[6].getAttribute('aria-label')
        ) {
            // we have a winner
            winner = fields[2].getAttribute('aria-label');
            highlightCells([fields[2], fields[4], fields[6]]);
        }

        for (let d = 0; d < fields.length; d++) {
            if (!fields[d].hasAttribute('disabled')) {
                full = false;
            }
        }

        if (i > 1) {
            if (full === true && winner === 'a') {
                // game is over
                return 'draw';
            }
        }
    }
    return winner;
}

function markField(event) {
    let field = '';
    if (bond === false) {
        field = event.target;
    } else {
        field = event;
    }

    field.setAttribute('aria-label', players[current]);
    field.setAttribute('disabled', 'disabled');
    if (n === 0) {
        human = players[current];
        ai = players[1 - current];
        setAiAndHuman();
    }
    n += 1;

    const img = document.createElement('img');
    img.src = source[current];
    field.appendChild(img);

    current = 1 - current;

    const check = checkIfCompleted();

    if (check !== 'a') {
        if (check !== 'draw') {
            if (players[current] === 'o') {
                document.querySelector('#hint').querySelectorAll('div')[1].classList.add('winner-border');
            } else {
                document.querySelector('#hint').querySelectorAll('div')[0].classList.add('winner-border');
            }
        }

        handleEnd(check);
    } else {
        // nächsten 2 Zeilen markieren links das kreuz oder kreis (je nach dem wer dran ist)
        if (players[current] === 'o') {
            document.querySelector('#hint').querySelectorAll('div')[0].classList.add('focus');
            document.querySelector('#hint').querySelectorAll('div')[1].classList.add('not-focus');
            document.querySelector('#hint').querySelectorAll('div')[1].classList.remove('focus');
            document.querySelector('#hint').querySelectorAll('div')[0].classList.remove('not-focus');
        } else {
            document.querySelector('#hint').querySelectorAll('div')[1].classList.add('focus');
            document.querySelector('#hint').querySelectorAll('div')[0].classList.add('not-focus');
            document.querySelector('#hint').querySelectorAll('div')[0].classList.remove('focus');
            document.querySelector('#hint').querySelectorAll('div')[1].classList.remove('not-focus');
        }
    }
}

// random picks of the computer
function computer() {
    const buttonss = document.querySelectorAll('#gameboard button');

    const array = Array.from(buttonss);

    // KI
    const boardList = [];

    for (let i = 0; i < array.length; i++) {
        if (array[i].disabled !== true) {
            boardList.push('free');
        } else if (array[i].getAttribute('aria-label') === 'o') {
            boardList.push('o');
        } else if (array[i].getAttribute('aria-label') === '') {
            boardList.push('free');
        } else {
            boardList.push('x');
        }
    }

    const theMove = bestMove(boardList);
    let event;

    if (theMove !== undefined) {
        event = array[theMove];
    } else {
        event = undefined;
    }

    // die drei unteren Zeilen würden nur funktionieren wenn die boardListe aktuell wäre (irgendwas anderes schreiben oder die Liste mit der Funktion zurückgeben)
    // if (checkIfCompletedForKI(boardList) !== 'a' && checkIfCompletedForKI(boardList) !== 'draw') {
    //     event = undefined;
    // }

    // end of ki

    // random choose

    // let a = 0;
    // let lst = [];

    // while (a < array.length) {
    //     if (array[a].disabled !== true) {
    //         const index = array.indexOf(array[a]);
    //         if (index > -1) {
    //             lst.push(array[index])
    //         }
    //     }
    //     a = a + 1;
    // }

    // let num = Math.floor(Math.random()*lst.length);
    // const event = lst[num];

    if (event !== undefined) {
        bond = true;
        markField(event);
        bond = false;
    }
}

// the game

function itsX() {
    if (bond4 === false) {
        current = 1;
        bond4 = true;
    }
}

function itsO() {
    if (bond4 === false) {
        current = 0;
        bond4 = true;
    }
}

xxx.addEventListener('click', itsX);
ooo.addEventListener('click', itsO);

function markField2(event) {
    markField(event);
    if (bondi === true) {
        computer();
    }
}

reset();

// setSubtitle

function setSubTitle(event) {
    const subtitle = document.querySelector('.subtitle');

    // optional noch --->>> event.target.className[0] === 'f'
    if (event.target.className[0] === 'g') {
        subtitle.innerText = 'SinglePlayer';
    } else {
        subtitle.innerText = 'MultiPlayer';
    }
}

function bonds() {
    bondi = true;
    reset();
}

function spi() {
    bondi = false;
    reset();
}

gegCom.addEventListener('click', setSubTitle);
gegSpi.addEventListener('click', setSubTitle);

// from beginning

gameboard.addEventListener('click', markField2);
start.addEventListener('click', reset);

gegCom.addEventListener('click', bonds);
gegSpi.addEventListener('click', spi);
