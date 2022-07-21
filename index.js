// parallelogram at top

const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
const four = document.querySelector('#four');

let bond1 = true;
let bond2 = true;
let bond3 = true;
let bond6 = true;

function stay(event) {
    const wrapperList = document.querySelectorAll('.wrapper');

    if (event.target.className === 'single') {
        wrapperList[0].style.backgroundColor = '#e4a101';
        wrapperList[1].style.backgroundColor = 'transparent';
        wrapperList[2].style.backgroundColor = 'transparent';
        wrapperList[3].style.backgroundColor = 'transparent';
        bond1 = false;
        bond2 = true;
        bond3 = true;
        bond6 = true;
    } else if (event.target.className === 'multi') {
        wrapperList[1].style.backgroundColor = '#e4a101';
        wrapperList[0].style.backgroundColor = 'transparent';
        wrapperList[2].style.backgroundColor = 'transparent';
        wrapperList[3].style.backgroundColor = 'transparent';
        bond2 = false;
        bond1 = true;
        bond3 = true;
        bond6 = true;
    } else if (event.target.className === 'gaame') {
        wrapperList[2].style.backgroundColor = '#e4a101';
        wrapperList[0].style.backgroundColor = 'transparent';
        wrapperList[1].style.backgroundColor = 'transparent';
        wrapperList[3].style.backgroundColor = 'transparent';
        bond2 = true;
        bond1 = true;
        bond3 = false;
        bond6 = true;
    } else {
        wrapperList[3].style.backgroundColor = '#e4a101';
        wrapperList[0].style.backgroundColor = 'transparent';
        wrapperList[1].style.backgroundColor = 'transparent';
        wrapperList[2].style.backgroundColor = 'transparent';
        bond2 = true;
        bond1 = true;
        bond3 = true;
        bond6 = false;
    }
}

function mouseOver(event) {
    const wrapper = document.querySelectorAll('.wrapper');

    if (event.target.nodeName === 'A') {
        if (event.target.offsetParent.id === 'one') {
            wrapper[0].style.backgroundColor = '#e4a101';
        }

        if (event.target.offsetParent.id === 'two') {
            wrapper[1].style.backgroundColor = '#e4a101';
        }

        if (event.target.offsetParent.id === 'three') {
            wrapper[2].style.backgroundColor = '#e4a101';
        }

        if (event.target.offsetParent.id === 'four') {
            wrapper[3].style.backgroundColor = '#e4a101';
        }
    }
}

function mouseOut(event) {
    const wrapper = document.querySelectorAll('.wrapper');

    if (event.target.nodeName === 'A') {
        if (event.target.offsetParent.id === 'one' && bond1 === true) {
            wrapper[0].style.backgroundColor = 'transparent';
        }

        if (event.target.offsetParent.id === 'two' && bond2 === true) {
            wrapper[1].style.backgroundColor = 'transparent';
        }

        if (event.target.offsetParent.id === 'three' && bond3 === true) {
            wrapper[2].style.backgroundColor = 'transparent';
        }

        if (event.target.offsetParent.id === 'four' && bond6 === true) {
            wrapper[3].style.backgroundColor = 'transparent';
        }
    }
}

// navbar scrolling

const filter2 = document.querySelector('.filter2');
const navElements = document.querySelector('.nav-ul');

function navScroll() {
    if (document.body.scrollTop > 200) {
        filter2.style.opacity = '1';
        filter2.style.height = '50px';
        navElements.style.top = '-30px';
    }

    if (document.body.scrollTop < 100) {
        filter2.style.opacity = '0.4';
        filter2.style.height = '110px';
        navElements.style.top = '0px';
    }
}

window.onscroll = navScroll;

// was at top first, but i guess it has to be at bottom, so the functions are already defined when this is getting calles
one.addEventListener('mouseover', mouseOver);
two.addEventListener('mouseover', mouseOver);
three.addEventListener('mouseover', mouseOver);
four.addEventListener('mouseover', mouseOver);

one.addEventListener('mouseout', mouseOut);
two.addEventListener('mouseout', mouseOut);
three.addEventListener('mouseout', mouseOut);
four.addEventListener('mouseout', mouseOut);

one.addEventListener('click', stay);
two.addEventListener('click', stay);
three.addEventListener('click', stay);
four.addEventListener('click', stay);

// make the nav navigation
// const mainLink = document.querySelector('#main-link');
// const rules = document.querySelector('#main');

// function setAbsoluteTop() {
//     const rulesStyle = window.getComputedStyle(rules);
//     let height = rulesStyle.getPropertyValue('height');
//     height = parseInt(height) - 50;
//     mainLink.style.top = `${height}px`;
// }

// setAbsoluteTop();
