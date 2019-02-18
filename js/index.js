console.log('hello');

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

function errorShakeTransform(x, y) {
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
}

function inputPass() {

}
