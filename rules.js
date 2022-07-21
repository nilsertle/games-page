const sideImages = document.querySelectorAll('.rules__side-img');

function showRulesSide(event) {
    const ruleFirst = event.target.parentElement.id;
    const ruleRulesFirst = event.target.parentElement.classList;
    const listImg1 = document.querySelectorAll('.list-img')[0];
    const listImg2 = document.querySelectorAll('.list-img')[1];
    const listImg3 = document.querySelectorAll('.list-img')[2];
    const listImg4 = document.querySelectorAll('.list-img')[3];

    if (ruleFirst === 'first' || ruleRulesFirst.contains('rules__first')) {
        sideImages[0].classList.remove('rules__side-hidden');
        sideImages[1].classList.add('rules__side-hidden');
        sideImages[2].classList.add('rules__side-hidden');
        sideImages[3].classList.add('rules__side-hidden');

        listImg1.classList.add('rules-color');
        listImg2.classList.remove('rules-color');
        listImg3.classList.remove('rules-color');
        listImg4.classList.remove('rules-color');
    } else if (ruleFirst === 'second' || ruleRulesFirst.contains('rules__second')) {
        sideImages[1].classList.remove('rules__side-hidden');
        sideImages[0].classList.add('rules__side-hidden');
        sideImages[2].classList.add('rules__side-hidden');
        sideImages[3].classList.add('rules__side-hidden');

        listImg2.classList.add('rules-color');
        listImg1.classList.remove('rules-color');
        listImg3.classList.remove('rules-color');
        listImg4.classList.remove('rules-color');
    } else if (ruleFirst === 'third' || ruleRulesFirst.contains('rules__third')) {
        sideImages[2].classList.remove('rules__side-hidden');
        sideImages[0].classList.add('rules__side-hidden');
        sideImages[1].classList.add('rules__side-hidden');
        sideImages[3].classList.add('rules__side-hidden');

        listImg3.classList.add('rules-color');
        listImg2.classList.remove('rules-color');
        listImg1.classList.remove('rules-color');
        listImg4.classList.remove('rules-color');
    } else {
        sideImages[3].classList.remove('rules__side-hidden');
        sideImages[0].classList.add('rules__side-hidden');
        sideImages[1].classList.add('rules__side-hidden');
        sideImages[2].classList.add('rules__side-hidden');

        listImg4.classList.add('rules-color');
        listImg2.classList.remove('rules-color');
        listImg3.classList.remove('rules-color');
        listImg1.classList.remove('rules-color');
    }
}

const rulesPrepare = document.querySelector('#first');
const rulesSinglePlayer = document.querySelector('#second');
const rulesMultiPlayer = document.querySelector('#third');
const rulesGameplay = document.querySelector('#fourth');

rulesPrepare.addEventListener('click', showRulesSide);
rulesSinglePlayer.addEventListener('click', showRulesSide);
rulesMultiPlayer.addEventListener('click', showRulesSide);
rulesGameplay.addEventListener('click', showRulesSide);
