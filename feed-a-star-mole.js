// for time (wait some seconds)
// let rafCount = 0;
// let runAgainAt = Date.now();
// function rafCounter() {
//     if (Date.now() > runAgainAt) {
//         rafCount++;
//         runAgainAt = Date.now() + 1000; //diese Zahl ist wie lange gewartet werden soll (1000 = 1s)
//     }
//     requestAnimationFrame(rafCounter);
//     console.log('eins', rafCount);
// }

// rafCounter();

// setInterval(function() {
//     clearInterval(rafCounter);
// }, 2000);

let score = 0;
let minInterval;
let maxInterval;
let MAX_SCORE = 10;

function getSadInterval() {
    return Date.now() + 1000;
}

function getGoneInterval() {
    return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function getHungryInterval() {
    return Date.now() + Math.floor(Math.random() * maxInterval) + minInterval;
}

let moles;

function setMoles() {
    moles = [
        {
            status: 'sad',
            next: getSadInterval(),
            king: false,
            node: document.querySelector('#hole-0'),
        },
        {
            status: 'sad',
            next: getSadInterval(),
            king: false,
            node: document.querySelector('#hole-1'),
        },
        {
            status: 'sad',
            next: getSadInterval(),
            king: false,
            node: document.querySelector('#hole-2'),
        },
        {
            status: 'sad',
            next: getSadInterval(),
            king: false,
            node: document.querySelector('#hole-3'),
        },
        {
            status: 'sad',
            next: getSadInterval(),
            king: false,
            node: document.querySelector('#hole-4'),
        },
        {
            status: 'sad',
            next: getSadInterval(),
            king: false,
            node: document.querySelector('#hole-5'),
        },
        {
            status: 'sad',
            next: getSadInterval(),
            king: false,
            node: document.querySelector('#hole-6'),
        },
        {
            status: 'sad',
            next: getSadInterval(),
            king: false,
            node: document.querySelector('#hole-7'),
        },
        {
            status: 'sad',
            next: getSadInterval(),
            king: false,
            node: document.querySelector('#hole-8'),
        },
        {
            status: 'sad',
            next: getSadInterval(),
            king: false,
            node: document.querySelector('#hole-9'),
        },
    ];
}

function getKingStatus() {
    return Math.random() > 0.9;
}

function getNextStatus(mole) {
    switch (mole.status) {
        case 'sad':
        case 'fed':
            mole.next = getSadInterval();
            mole.status = 'leaving';
            if (mole.king) {
                mole.node.children[0].src = './img/mole-game/king-mole-leaving.png';
            } else {
                mole.node.children[0].src = './img/mole-game/mole-leaving.png';
            }
            break;
        case 'leaving':
            mole.status = 'gone';
            mole.next = getGoneInterval();
            mole.node.children[0].classList.add('gone');
            break;
        case 'gone':
            mole.status = 'hungry';
            mole.king = getKingStatus();
            mole.next = getHungryInterval();
            mole.node.children[0].classList.add('hungry');
            mole.node.children[0].classList.remove('gone');
            if (mole.king) {
                mole.node.children[0].src = './img/mole-game/king-mole-hungry.png';
            } else {
                mole.node.children[0].src = './img/mole-game/mole-hungry.png';
            }
            break;
        case 'hungry':
            mole.status = 'sad';
            mole.next = getSadInterval();
            mole.node.children[0].classList.remove('hungry');
            if (mole.king) {
                mole.node.children[0].src = './img/mole-game/king-mole-sad.png';
            } else {
                mole.node.children[0].src = './img/mole-game/mole-sad.png';
            }
            break;
    }
}

const cursorArea = document.querySelector('.cursor-area');

function win() {
    document.querySelector('.bg').classList.add('hide');
    document.querySelector('.win').classList.remove('hide');
    setTimeout(function () {
        cursorArea.classList.add('cursor-area-hidden');
        document.querySelector('.bg').classList.remove('hide');
        document.querySelector('.win').classList.add('hide');
        score = 0;
        document.querySelector('.worm-container').style.width = '5%';
        setMoles();
    }, 4000);
}

function feed(event) {
    if (event.target.tagName !== 'IMG' || !event.target.classList.contains('hungry')) {
        return;
    }

    const mole = moles[parseInt(event.target.dataset.index)];

    mole.status = 'fed';
    mole.next = getSadInterval();
    if (mole.king) {
        score += 2;
        mole.node.children[0].src = './img/mole-game/king-mole-fed.png';
    } else {
        score += 1; // ESLint disable no ++
        mole.node.children[0].src = './img/mole-game/mole-fed.png';
    }
    mole.node.children[0].classList.remove('hungry');

    if (score >= MAX_SCORE) {
        win();
    }

    document.querySelector('.worm-container').style.width = `${(score / MAX_SCORE) * 100}%`;
}

let runAgainAt = Date.now() + 100;
function nextFrame() {
    const now = Date.now();

    if (runAgainAt <= now) {
        for (let i = 0; i < moles.length; i++) {
            if (moles[i].next <= now) {
                getNextStatus(moles[i]);
            }
        }
        runAgainAt = now + 100;
    }
    requestAnimationFrame(nextFrame);
}

document.querySelector('.bg').addEventListener('click', feed);

function showTheGame() {
    cursorArea.classList.remove('cursor-area-hidden');
}

const gameLeftImg = document.querySelector('.container2');
gameLeftImg.addEventListener('click', showTheGame);

// border stay
const difEasy = document.querySelector('#dif-easy');
const difMedium = document.querySelector('#dif-medium');
const difHard = document.querySelector('#dif-hard');
const difExpert = document.querySelector('#dif-expert');
const difImpossible = document.querySelector('#dif-impossible');

const subtitle2 = document.querySelector('.subtitle');

function showRulesSide2(event) {
    const ruleFirst = event.target.id;
    const ruleRulesFirst = event.target.classList;

    if (ruleFirst === 'dif-easy' || ruleRulesFirst.contains('rules__first2')) {
        difEasy.classList.add('rules-color2');
        difMedium.classList.remove('rules-color2');
        difHard.classList.remove('rules-color2');
        difExpert.classList.remove('rules-color2');
        difImpossible.classList.remove('rules-color2');

        minInterval = 3000;
        maxInterval = 5000;

        subtitle2.innerText = 'easy';
    } else if (ruleFirst === 'dif-medium' || ruleRulesFirst.contains('rules__second2')) {
        difMedium.classList.add('rules-color2');
        difEasy.classList.remove('rules-color2');
        difHard.classList.remove('rules-color2');
        difExpert.classList.remove('rules-color2');
        difImpossible.classList.remove('rules-color2');

        minInterval = 1500;
        maxInterval = 2000;

        subtitle2.innerText = 'medium';
    } else if (ruleFirst === 'dif-hard' || ruleRulesFirst.contains('rules__third2')) {
        difHard.classList.add('rules-color2');
        difMedium.classList.remove('rules-color2');
        difEasy.classList.remove('rules-color2');
        difExpert.classList.remove('rules-color2');
        difImpossible.classList.remove('rules-color2');

        minInterval = 700;
        maxInterval = 1200;

        subtitle2.innerText = 'hard';
    } else if (ruleFirst === 'dif-expert' || ruleRulesFirst.contains('rules__fourth2')) {
        difExpert.classList.add('rules-color2');
        difMedium.classList.remove('rules-color2');
        difHard.classList.remove('rules-color2');
        difEasy.classList.remove('rules-color2');
        difImpossible.classList.remove('rules-color2');

        minInterval = 400;
        maxInterval = 700;

        subtitle2.innerText = 'expert';
    } else {
        difImpossible.classList.add('rules-color2');
        difMedium.classList.remove('rules-color2');
        difHard.classList.remove('rules-color2');
        difEasy.classList.remove('rules-color2');
        difExpert.classList.remove('rules-color2');

        minInterval = 300;
        maxInterval = 600;

        subtitle2.innerText = 'impossible';
    }
}

difEasy.addEventListener('click', showRulesSide2);
difMedium.addEventListener('click', showRulesSide2);
difHard.addEventListener('click', showRulesSide2);
difExpert.addEventListener('click', showRulesSide2);
difImpossible.addEventListener('click', showRulesSide2);

// function setBubbles(ranges, bubble) {
//     const val = ranges.value;
//     const min = ranges.min ? ranges.min : 0;
//     const max = ranges.max ? ranges.max : 100;
//     const newVal = Number(((val - min) * 100) / (max - min));
//     bubble.innerHTML = val;

//     // Sorta magic numbers based on size of the native UI thumb
//     bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
// }

// const allRanges = document.querySelectorAll('.rangeslider__fill');
// allRanges.forEach((wrap) => {
//     const ranges = wrap.querySelector('.range');
//     const bubble = wrap.querySelector('.output');

//     ranges.addEventListener('input', () => {
//         setBubbles(ranges, bubble);
//     });
//     setBubbles(ranges, bubble);
// });

const range = document.querySelector('.range');
const output = document.querySelector('.output');

range.addEventListener('input', function () {
    output.value = this.value;
    MAX_SCORE = output.value;
});

setMoles();
nextFrame();
