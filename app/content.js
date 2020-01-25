console.log(' it works');
const answers = document.querySelectorAll('nav>button');
const words = document.querySelector('#main-text');
const theme = document.querySelector('.button--switch-theme');
const container = document.querySelector('.container');

const themeSwitcher = function () {
    const variable = 'red';
    container.setAttribute('style', `--background: ${variable}`);
    console.log('switch theme')
};

theme.addEventListener('click', themeSwitcher);

//Text to be displayed on the page

const questions = [
    'Do you use this object for a practical purpose or wear it?',
    'Reach into your memory: can you recall, clearly, the last time you made use of this object?',
    'Is this memory less than three months old?',
]
const eliminators = [
    'Picture yourself writing this object into your will. If you die tomorrow, would you want someone you know to keep this?',
    'If this object is so dear, are you willing to carry it until the day of your dying, even if you like another 100 years?',
];

const conclusions = ['Let it gox.', 'Keep it.', ];

const arrays = [questions, eliminators, conclusions];

// Function that displays the correct text according to user's answer.

let arrayIndex = 0;
let index = 0;
let currentArray = arrays[arrayIndex];
let display = currentArray[index];
words.textContent = `${display}`;

function handleAnswer(e) {
    const answer = e.currentTarget.id;
    let lastArray = currentArray;
    let yesLimit = lastArray.length - 1;

    if (answer === 'back') {
        console.log('back')
    } else if (answer === 'yes' && index < yesLimit) {
        index++;
    } else if (answer === 'no') {
        index = 0;
        arrayIndex++;
    } else {
        index = 1;
        arrayIndex = 2;
    }
    currentArray = arrays[arrayIndex];
    display = currentArray[index];
    words.textContent = `
                $ {
                    display
                }
                `;
    // console.log(`ArrayIndex: ${arrayIndex}`);
    // console.log(`index: ${index}`);
    // console.log(currentArray);
    // console.log(currentArray[index]);
    // console.log(`-- -- -- -- --`);
}
handleClick = function (e) {
    e.addEventListener('click', handleAnswer);
}

answers.forEach(handleClick);