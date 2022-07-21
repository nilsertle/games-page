// global variables

let blackTurn = true;

// end of global variables

function setFigure(event, indexLetter, indexNum, possibleMoves) {
    const allDivs = document.querySelectorAll('.horiz button div');
    for (let i = 0; i < allDivs.length; i++) {
        allDivs[i].classList.remove('mark-possible-moves');
        allDivs[i].classList.remove('chess-highlighted-button');
    }

    const oldBox = `${indexLetter + indexNum}`; // string
    const newButton = event.target.parentElement; // button

    const oldButton = document.querySelector(`[data-index=${oldBox}]`);

    // wenn geschlagen werden kann -> zu schlagendes Objekt neutral machen
    if (
        (newButton.className.includes('-w') && oldButton.className.includes('-b')) ||
        (newButton.className.includes('-b') && oldButton.className.includes('-w'))
    ) {
        // das zu schlagende Feld neutral machen
        newButton.classList.remove(`${newButton.className}`);
        const insideDiv = newButton.childNodes[0];
        insideDiv.remove();

        const theMove = document.querySelector(
            `[data-index=${possibleMoves[possibleMoves.indexOf(newButton.getAttribute('data-index'))]}]`
        );
        const newObj = document.createElement('div');
        theMove.appendChild(newObj);
        const newDiv = theMove.childNodes[0];
        newDiv.classList.add('moving-box');
    }

    // Zug setzen
    if ((newButton.className !== '') === false) {
        newButton.classList.add(`${oldButton.className}`);
        oldButton.classList.remove(`${oldButton.className}`);

        newButton.childNodes[0].classList.add(`${oldButton.childNodes[0].classList[1]}`);

        const lastChild = oldButton.childNodes[0];
        lastChild.remove();

        // this is false in white stuff and true in black stuff
        if (newButton.className.includes('-b')) {
            blackTurn = true;
        } else {
            blackTurn = false;
        }
    }

    // wenn schlagen

    // delete the fields which have not been chosen (but marked as possible moves)
    for (let i = 0; i < allDivs.length; i++) {
        if (allDivs[i].classList.length === 1) {
            allDivs[i].remove();
        }
    }
}

// testes ob die Figur die gleiche Farbe hat (nicht schlagen) oder die andere Farbe (schlagen)
function whoCanBeBeat(theMove) {
    if (blackTurn === true) {
        if (theMove.className.includes('-w')) {
            return false;
        }

        return true;
    }

    if (blackTurn === false) {
        if (theMove.className.includes('-b')) {
            return false;
        }

        return true;
    }
    return false;
}

function markPossibleMoves(possibleMoves, indexLetter, indexNum) {
    const allDivs = document.querySelectorAll('.horiz button div');
    for (let i = 0; i < allDivs.length; i++) {
        allDivs[i].classList.remove('mark-possible-moves');
    }

    for (let i = 0; i < possibleMoves.length; i++) {
        const theMove = document.querySelector(`[data-index=${possibleMoves[i]}]`);
        theMove.classList.remove('chess-highlighted-button');
        const newObj = document.createElement('div');
        theMove.appendChild(newObj);
        const newDiv = theMove.childNodes[0];
        newDiv.classList.add('moving-box');

        // whoCanBeBeat gibt true oder false zurück für jeweiliges Feld ob schlagbar oder nicht
        const schlagen = whoCanBeBeat(theMove);
        // nur ausführen wenn kein anderer im Weg ist
        if (newDiv.classList.length < 2 || schlagen === true) {
            newDiv.classList.add('mark-possible-moves');

            newDiv.addEventListener(
                'click',
                function (event) {
                    setFigure(event, indexLetter, indexNum, possibleMoves);
                },
                { once: true } // bin mir nicht sicher ob das was bringt
            );
        }
    }
}

// needed for handles
function ord(str) {
    return str.charCodeAt(0);
}

// wie ein Läufer schräg laufen

function schraegLaufen(indexLetter, indexNum) {
    const possibleMoves = [];

    const fieldNotInList = document.querySelector(`[data-index=${indexLetter + indexNum}]`);

    let letter = ord(indexLetter);
    let num = parseInt(indexNum);
    let g = 0;
    while (letter >= 65 && num <= 8) {
        const field = document.querySelector(`[data-index=${String.fromCharCode(letter) + num}]`);

        if (!field.className.includes(`${fieldNotInList.className}`)) {
            possibleMoves.push(`${String.fromCharCode(letter) + num}`);
            if (field.className.includes('-w') || (field.className.includes('-b') && g > 0)) {
                break;
            }
        }

        num += 1;
        letter -= 1;
        g += 1;
    }

    letter = ord(indexLetter);
    num = parseInt(indexNum);
    g = 0;
    while (letter <= 72 && num <= 8) {
        const field = document.querySelector(`[data-index=${String.fromCharCode(letter) + num}]`);

        if (!field.className.includes(`${fieldNotInList.className}`)) {
            possibleMoves.push(`${String.fromCharCode(letter) + num}`);
            if (field.className.includes('-w') || (field.className.includes('-b') && g > 0)) {
                break;
            }
        }

        num += 1;
        letter += 1;
        g += 1;
    }

    letter = ord(indexLetter);
    num = parseInt(indexNum);
    g = 0;
    while (letter >= 65 && num >= 1) {
        const field = document.querySelector(`[data-index=${String.fromCharCode(letter) + num}]`);

        if (!field.className.includes(`${fieldNotInList.className}`)) {
            possibleMoves.push(`${String.fromCharCode(letter) + num}`);
            if (field.className.includes('-w') || (field.className.includes('-b') && g > 0)) {
                break;
            }
        }

        num -= 1;
        letter -= 1;
        g += 1;
    }

    letter = ord(indexLetter);
    num = parseInt(indexNum);
    g = 0;
    while (letter <= 72 && num >= 1) {
        const field = document.querySelector(`[data-index=${String.fromCharCode(letter) + num}]`);

        if (!field.className.includes(`${fieldNotInList.className}`)) {
            possibleMoves.push(`${String.fromCharCode(letter) + num}`);
            if (field.className.includes('-w') || (field.className.includes('-b') && g > 0)) {
                break;
            }
        }

        num -= 1;
        letter += 1;
        g += 1;
    }
    return possibleMoves;
}

// vertikal und horizontal wie ein Trum laufen
function geradeLaufen(indexLetter, indexNum) {
    const possibleMoves = [];

    const fieldNotInList = document.querySelector(`[data-index=${indexLetter + indexNum}]`);

    let letter = ord(indexLetter);
    let num = parseInt(indexNum);
    let g = 0;
    while (letter >= 65 && num < 8) {
        const field = document.querySelector(`[data-index=${String.fromCharCode(letter) + num}]`);

        if (!field.className.includes(`${fieldNotInList.className}`)) {
            possibleMoves.push(`${String.fromCharCode(letter) + num}`);
            if (field.className.includes('-w') || (field.className.includes('-b') && g > 0)) {
                break;
            }
        }

        letter -= 1;
        g += 1;
    }

    letter = ord(indexLetter);
    num = parseInt(indexNum);
    g = 0;
    while (letter <= 72 && num < 8) {
        const field = document.querySelector(`[data-index=${String.fromCharCode(letter) + num}]`);

        if (!field.className.includes(`${fieldNotInList.className}`)) {
            possibleMoves.push(`${String.fromCharCode(letter) + num}`);
            if (field.className.includes('-w') || (field.className.includes('-b') && g > 0)) {
                break;
            }
        }

        letter += 1;
        g += 1;
    }

    letter = ord(indexLetter);
    num = parseInt(indexNum);
    g = 0;
    while (num >= 1) {
        const field = document.querySelector(`[data-index=${String.fromCharCode(letter) + num}]`);

        if (!field.className.includes(`${fieldNotInList.className}`)) {
            possibleMoves.push(`${String.fromCharCode(letter) + num}`);
            if (field.className.includes('-w') || (field.className.includes('-b') && g > 0)) {
                break;
            }
        }

        num -= 1;
        g += 1;
    }

    letter = ord(indexLetter);
    num = parseInt(indexNum);
    g = 0;
    while (num <= 8) {
        const field = document.querySelector(`[data-index=${String.fromCharCode(letter) + num}]`);

        if (!field.className.includes(`${fieldNotInList.className}`)) {
            possibleMoves.push(`${String.fromCharCode(letter) + num}`);
            if (field.className.includes('-w') || (field.className.includes('-b') && g > 0)) {
                break;
            }
        }

        num += 1;
        g += 1;
    }
    return possibleMoves;
}

function dameLaufen(indexLetter, indexNum) {
    const gerade = geradeLaufen(indexLetter, indexNum);
    const schraeg = schraegLaufen(indexLetter, indexNum);
    const possibleMoves = [];

    for (let i = 0; i < gerade.length; i++) {
        possibleMoves.push(gerade[i]);
    }

    for (let i = 0; i < schraeg.length; i++) {
        possibleMoves.push(schraeg[i]);
    }

    return possibleMoves;
}

function springerLaufen(indexLetter, indexNum) {
    const possibleMoves = [];

    if (ord(indexLetter) - 1 >= 65 && parseInt(indexNum) + 2 <= 8) {
        possibleMoves.push(`${String.fromCharCode(ord(indexLetter) - 1) + (parseInt(indexNum) + 2)}`);
    }
    if (ord(indexLetter) + 1 <= 72 && parseInt(indexNum) + 2 <= 8) {
        possibleMoves.push(`${String.fromCharCode(ord(indexLetter) + 1) + (parseInt(indexNum) + 2)}`);
    }
    if (ord(indexLetter) - 1 >= 65 && parseInt(indexNum) - 2 >= 1) {
        possibleMoves.push(`${String.fromCharCode(ord(indexLetter) - 1) + (parseInt(indexNum) - 2)}`);
    }
    if (ord(indexLetter) + 1 <= 72 && parseInt(indexNum) - 2 >= 1) {
        possibleMoves.push(`${String.fromCharCode(ord(indexLetter) + 1) + (parseInt(indexNum) - 2)}`);
    }
    if (ord(indexLetter) - 2 >= 65 && parseInt(indexNum) + 1 <= 8) {
        possibleMoves.push(`${String.fromCharCode(ord(indexLetter) - 2) + (parseInt(indexNum) + 1)}`);
    }
    if (ord(indexLetter) + 2 <= 72 && parseInt(indexNum) + 1 <= 8) {
        possibleMoves.push(`${String.fromCharCode(ord(indexLetter) + 2) + (parseInt(indexNum) + 1)}`);
    }
    if (ord(indexLetter) - 2 >= 65 && parseInt(indexNum) - 1 >= 1) {
        possibleMoves.push(`${String.fromCharCode(ord(indexLetter) - 2) + (parseInt(indexNum) - 1)}`);
    }
    if (ord(indexLetter) + 2 <= 72 && parseInt(indexNum) - 1 >= 1) {
        possibleMoves.push(`${String.fromCharCode(ord(indexLetter) + 2) + (parseInt(indexNum) - 1)}`);
    }

    return possibleMoves;
}

function königLaufen(indexLetter, indexNum) {
    const possibleMoves = [];

    for (let i = -1; i < 2; i++) {
        for (let a = -1; a < 2; a++) {
            const letterNum = ord(indexLetter) - a;
            const num = parseInt(indexNum) + i;
            if (num >= 1 && num <= 8 && letterNum >= 65 && letterNum <= 72) {
                possibleMoves.push(`${String.fromCharCode(letterNum) + num}`);
            }
        }
    }
    possibleMoves.splice(`${possibleMoves.indexOf(indexLetter + indexNum)}`, 1);
    return possibleMoves;
}
// end of needed for handles

// handle all WHITE pieces
function handleBauerW(indexLetter, indexNum) {
    const possibleMoves = [];

    const letter = ord(indexLetter);
    const num = parseInt(indexNum);

    const field = document.querySelector(`[data-index=${String.fromCharCode(letter) + (num + 1)}]`);

    if (!field.className.includes('-w') && !field.className.includes('-b')) {
        if (indexNum === '2') {
            possibleMoves.push(`${indexLetter + (parseInt(indexNum) + 1)}`);
            possibleMoves.push(`${indexLetter + (parseInt(indexNum) + 2)}`);
        } else {
            possibleMoves.push(`${indexLetter + (parseInt(indexNum) + 1)}`);
        }
    }

    if (letter > 65) {
        const fieldLeft = document.querySelector(`[data-index=${String.fromCharCode(letter - 1) + (num + 1)}]`);

        if (fieldLeft !== null) {
            if (fieldLeft.className.includes('-b')) {
                possibleMoves.push(`${String.fromCharCode(letter - 1) + (num + 1)}`);
            }
        }
    }

    if (letter <= 72) {
        const fieldRight = document.querySelector(`[data-index=${String.fromCharCode(letter + 1) + (num + 1)}]`);

        if (fieldRight !== null) {
            if (fieldRight.className.includes('-b')) {
                possibleMoves.push(`${String.fromCharCode(letter + 1) + (num + 1)}`);
            }
        }
    }

    return possibleMoves;
}

function handleTurmW(indexLetter, indexNum) {
    const possibleMoves = geradeLaufen(indexLetter, indexNum);
    return possibleMoves;
}

function handleSpringerW(indexLetter, indexNum) {
    const possibleMoves = springerLaufen(indexLetter, indexNum);
    return possibleMoves;
}

function handleLäuferW(indexLetter, indexNum) {
    const possibleMoves = schraegLaufen(indexLetter, indexNum);
    return possibleMoves;
}

function handleDameW(indexLetter, indexNum) {
    const possibleMoves = dameLaufen(indexLetter, indexNum);
    return possibleMoves;
}

function handleKönigW(indexLetter, indexNum) {
    const possibleMoves = königLaufen(indexLetter, indexNum);
    return possibleMoves;
}
// end of handle all WHITE pieces

//

// handle all BLACK pieces
function handleBauerB(indexLetter, indexNum) {
    const possibleMoves = [];

    const letter = ord(indexLetter);
    const num = parseInt(indexNum);

    const field = document.querySelector(`[data-index=${String.fromCharCode(letter) + (num - 1)}]`);

    if (!field.className.includes('-w') && !field.className.includes('-b')) {
        if (indexNum === '7') {
            possibleMoves.push(`${indexLetter + (parseInt(indexNum) - 1)}`);
            possibleMoves.push(`${indexLetter + (parseInt(indexNum) - 2)}`);
        } else {
            possibleMoves.push(`${indexLetter + (parseInt(indexNum) - 1)}`);
        }
    }

    if (letter > 65) {
        const fieldLeft = document.querySelector(`[data-index=${String.fromCharCode(letter - 1) + (num - 1)}]`);

        if (fieldLeft !== null) {
            if (fieldLeft.className.includes('-w')) {
                possibleMoves.push(`${String.fromCharCode(letter - 1) + (num - 1)}`);
            }
        }
    }

    if (letter <= 72) {
        const fieldRight = document.querySelector(`[data-index=${String.fromCharCode(letter + 1) + (num - 1)}]`);

        if (fieldRight !== null) {
            if (fieldRight.className.includes('-w')) {
                possibleMoves.push(`${String.fromCharCode(letter + 1) + (num - 1)}`);
            }
        }
    }

    return possibleMoves;
}

function handleTurmB(indexLetter, indexNum) {
    const possibleMoves = geradeLaufen(indexLetter, indexNum);
    return possibleMoves;
}

function handleSpringerB(indexLetter, indexNum) {
    const possibleMoves = springerLaufen(indexLetter, indexNum);
    return possibleMoves;
}

function handleLäuferB(indexLetter, indexNum) {
    const possibleMoves = schraegLaufen(indexLetter, indexNum);
    return possibleMoves;
}

function handleDameB(indexLetter, indexNum) {
    const possibleMoves = dameLaufen(indexLetter, indexNum);
    return possibleMoves;
}

function handleKönigB(indexLetter, indexNum) {
    const possibleMoves = königLaufen(indexLetter, indexNum);
    return possibleMoves;
}
// end of handle all BLACK pieces

function whereToGo(event) {
    const button = event.target.parentElement;

    if (button == null) {
        return [null, [null, null]];
    }
    const dataIndex = button.getAttribute('data-index');
    const buttonClass = button.className;

    // die dataindex if schleife ist da, damit nur die Felder mit Figur aufgerufen werden
    let indexNum = null;
    let indexLetter = null;
    let listOfMoves = null;

    if (dataIndex !== null) {
        indexNum = dataIndex[1];
        indexLetter = dataIndex[0];

        if (blackTurn === true) {
            // all white
            if (buttonClass === 'bauer-w') {
                listOfMoves = handleBauerW(indexLetter, indexNum);
            }

            if (buttonClass === 'turm-w') {
                listOfMoves = handleTurmW(indexLetter, indexNum);
            }

            if (buttonClass === 'springer-w') {
                listOfMoves = handleSpringerW(indexLetter, indexNum);
            }

            if (buttonClass === 'läufer-w') {
                listOfMoves = handleLäuferW(indexLetter, indexNum);
            }

            if (buttonClass === 'dame-w') {
                listOfMoves = handleDameW(indexLetter, indexNum);
            }

            if (buttonClass === 'könig-w') {
                listOfMoves = handleKönigW(indexLetter, indexNum);
            }
        } else {
            // all black
            if (buttonClass === 'bauer-b') {
                listOfMoves = handleBauerB(indexLetter, indexNum);
            }

            if (buttonClass === 'turm-b') {
                listOfMoves = handleTurmB(indexLetter, indexNum);
            }

            if (buttonClass === 'springer-b') {
                listOfMoves = handleSpringerB(indexLetter, indexNum);
            }

            if (buttonClass === 'läufer-b') {
                listOfMoves = handleLäuferB(indexLetter, indexNum);
            }

            if (buttonClass === 'dame-b') {
                listOfMoves = handleDameB(indexLetter, indexNum);
            }

            if (buttonClass === 'könig-b') {
                listOfMoves = handleKönigB(indexLetter, indexNum);
            }
        }
    }
    return [listOfMoves, [indexNum, indexLetter]];
}

// Felder markieren und Zug machen
function showMoves(event) {
    const list = whereToGo(event);
    const listOfMoves = list[0];
    const indexNum = list[1][0];
    const indexLetter = list[1][1];

    if (listOfMoves !== null) {
        markPossibleMoves(listOfMoves, indexLetter, indexNum);
    }

    // eslint-disable-next-line no-use-before-define
    startTheGame();
}

// highlighting the cells with 'Figuren'
function startTheGame() {
    const horiz = document.querySelectorAll('.horiz');
    const horizDiv = document.querySelectorAll('.moving-box');

    function deleteAllMarking() {
        for (let i = 0; i < horizDiv.length; i++) {
            horizDiv[i].classList.remove('chess-highlighted-button');
        }
    }

    function setActiveOfFigure(event) {
        deleteAllMarking();
        event.target.classList.add('chess-highlighted-button');
    }

    for (let i = 0; i < horiz.length; i++) {
        horiz[i].addEventListener('click', setActiveOfFigure, {
            once: true, // bin mir nicht sicher ob das was bringt
        });
        horiz[i].addEventListener('click', showMoves, {
            once: true, // bringt was
        });
    }
}

startTheGame();
// end of highlighting the cells

//
//
//
//

// Notizen

// 3. Rochade
