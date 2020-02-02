console.log(' it works');
const answersContainer = document.querySelector('.navigation--main__answers');


const answers = document.querySelectorAll('.button--answer');

const restart = document.querySelector('.button--restart');
const back = document.querySelector('.button--back');
const start = document.querySelector('.button--start');
const words = document.querySelector('#main-text');
const theme = document.querySelector('.button--switch-theme');
const container = document.querySelector('body');

start.addEventListener('click', handleStart = () => {
    words.textContent = `${display}`;
    hide(start);
    reveal(answersContainer);
})

// Hiding and showing elements
hide = (target) => target.classList.add('hide');
reveal = (target) => target.classList.remove('hide');

//Displaying counter of results
const counter = new Map()
counter.set('keep', 0);
counter.set('relinquish', 0);

setCounter = (result) => {
    document.querySelector(".counter--" + result.toString() + "").innerHTML = `<p>${result} : </p><p>${counter.get(result)}</p>`
}

counterUpdate = (result) => counter.set(result, (counter.get(result) + 1));

// Switch to dark theme
themeSwitcher = () => container.classList.toggle('dark');
theme.addEventListener('click', themeSwitcher);

//Text to be displayed on the page
const questions = [
    'Do you use this object for a practical purpose or wear it?',
    'Reach into your memory: can you recall, clearly, the last time you made use of this object?',
    'Is this memory less than three months old?',
]
const eliminators = [
    'Picture yourself writing this object into your will. If you die tomorrow, would you want someone you know to keep this?',
    'If this object is so dear, are you willing to carry it until the day of your dying, even if you live another 100 years?',
];

const conclusions = ['Let it go.', 'Keep it.', ];

const arrays = [questions, eliminators, conclusions];


// Function that displays the correct text according to user's answer.

const answersList = []; // Keeping track of questions. 

let arrayIndex = 0;
let index = 0;
let currentArray = arrays[arrayIndex];
let display = currentArray[index];
let hash = 0;

//Utilities

updater = () => {
    currentArray = arrays[arrayIndex];
    display = currentArray[index];
    words.textContent = `${display}`;
}


function handleAnswer(e) {

    const answer = e.currentTarget.id;

    hash++;
    location.hash = hash;

    let limit = currentArray.length - 1;

    if (answer === 'yes' && index < limit) {
        index++;
    } else if (answer === 'no') {
        index = 0;
        arrayIndex++;
    } else {
        index = 1;
        arrayIndex = 2;
    }

    //Update the variables above
    updater();

    // When we get to last page...
    if (arrayIndex === arrays.length - 1) {

        // Display restart button
        hide(answersContainer);
        reveal(restart);
        // Update counter of results
        index === 1 ?
            counterUpdate('keep') :
            counterUpdate('relinquish');

        setCounter('relinquish');
        setCounter('keep');
    };

    //Track the series of answers
    answersList.push(display);
    console.log(answersList);
}

answers.forEach(handleAnswerClick = (e) => {
    e.addEventListener('click', handleAnswer);
});


restart.addEventListener('click', restarter = () => {
    arrayIndex = 0;
    index = 0;
    updater();
    hide(restart);
    reveal(answersContainer);
});

//Back Button functionality WIP
back.addEventListener('click', handleBackButton);

function handleBackButton() {
    hash--;
    location.hash = hash;
    currentArray = answersList;
    index = hash;
    display = currentArray[index];
    words.textContent = `${display}`;
    updater();
}