//QUESTIONS ARRAY
//simple regex expression for anystring@anystring.anystring
const questions = [
	{ question: 'Enter Your First Name' },
	{ question: 'Enter Your Last Name' },
	{ question: 'Enter Your Email Address', pattern: /\S+@\S+\.\S+/},
	{ question: 'Create A Secure Password', type: 'password'}
];

//VARIABLES
const shakeTime = 100;
const switchTime = 200; //time to switch between fields
let position = 0; //set the first question value

const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

//EVENTS
document.addEventListener('DOMContentLoaded', getQuestion);
nextBtn.addEventListener('click', validate); //validate BEFORE moving to next question
inputField.addEventListener('keyup', e => {
	if(e.keyCode == 13) {
		validate();
	}
}); //if the enter key is pressed, validate input

//FUNCTIONS
function getQuestion() {
	//grab a question from the array, add to the markup
	inputLabel.innerHTML = questions[position].question;

	//if it doesn't have a type, it should be set as text
	inputField.type = questions[position].type || 'text';

	//get the current answer, add it to question as 'answer'
	inputField.value = questions[position].answer || '';

	inputField.focus();

	//set progress bar width, which is variable to questions array length
	progress.style.width = (position * 100) / questions.length + '%';

	//if first question, icon should be user. Else, it should be our back button icon
	prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

	showQuestion()
}

function showQuestion() {
	inputGroup.style.opacity = 1;
	inputProgress.style.transition = '';
	inputProgress.style.width = '100%';
}

function hideQuestion() {
	inputGroup.style.opacity = 0;
	inputLabel.style.marginLeft = 0;
	inputProgress.style.width = 0;
	inputProgress.style.transition = 'none';
	inputGroup.style.border = null;
}

function ShakeTransform(x, y) {
	formBox.style.transform = `translate(${x}px, ${y}px)`;
}

function validate() {
	//make sure answer not empty, make sure pattern matches for email
	if(!inputField.value.match(questions[position].pattern || /.+/)) {
		inputFail();
	} else {
		inputPass();
	}
}

function inputFail() {
	//trigger the failed animation, error class
	formBox.className = 'error';

	//repeat the shake transform
	for(let i = 0; i < 6; i++) {
		setTimeout(ShakeTransform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
		setTimeout(ShakeTransform, shakeTime * 6, 0, 0);
		inputField.focus();
	}
}

function inputPass() {
	//move to the next question
	formBox.className = ''; //this would remove the error class
	setTimeout(ShakeTransform, shakeTime * 0, 0, 10);
	setTimeout(ShakeTransform, shakeTime * 1, 0, 0);

	//store answer in array
	questions[position].answer = inputField.value;

	//change the question
	position++;

	//hide current question, get next
	if (questions[position]) {
		hideQuestion();
		getQuestion();
	} else {
		//if no more questions
		hideQuestion();
		formBox.className = 'close';
		progress.style.width = '100%';

		//complete form
		formComplete();
	}
}

function formComplete() {
	console.log(questions);
	//show the h1 element with the class of 'end'
	const h1 = document.createElement('h1');
	h1.classList.add('end');
	h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer}! You are now registered and should receive an email shortly.`))
	setTimeout(() => {
		formBox.parentElement.appendChild(h1);
		setTimeout(() => h1.style.opacity = 1, 50);
	}, 1000);
}
