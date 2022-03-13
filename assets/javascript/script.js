//Get references to existing elements within HTML document
var bodyEl = document.getElementById('body')
var allcontentEl = document.getElementById('allcontent')
var timerandvhsEl = document.getElementById('timerandvhs')
var quizintrosectionEl = document.getElementById('quizintro')
var questionsectionEl = document.getElementById('quizquestions')
var quizendEl = document.getElementById('quizend')
var highscoresEl = document.getElementById('highscores')

//create HTML elements to be altered 
//Global Variable for viewing High score and Timer
var viewhighscoreEl = document.createElement('button')
var timerEl = document.createElement('h2')
var timerscoresarr = [viewhighscoreEl, timerEl]

//adds initial value to timer and appends
var timervalue = 60
timerEl.textContent = timervalue
timerandvhsEl.appendChild(timerEl)

//gives textcontent to highscore button and appends
viewhighscoreEl.textContent = "View High Scores"
timerandvhsEl.appendChild(viewhighscoreEl)



//Stage 1 Quiz Introduction and start button/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//All needed stage 1 HTML elements created
 var quizintroEl = document.createElement('h1')
 var quizdescriptionEl = document.createElement('p')
 var StartquizbtnEl = document.createElement('button')

 //Adds starting text content to Stage 1 Elements
 quizintroEl.textContent = 'Coding Quiz'
 quizdescriptionEl.textContent = 'This is a quiz on coding. Press the start button to begin the quiz and start the timer. Your score is whatever time is leftover by the time you finish all the questions. Each Wrong Answer will deduct 10 seconds from the timer. The quiz will end when the timer runs out. '
 StartquizbtnEl.textContent = 'Start Quiz'

 //Appends children of allcontentEl with whatever value the parantheses is attached to
 
 quizintrosectionEl.appendChild(quizintroEl)
 quizintrosectionEl.appendChild(quizdescriptionEl)
 quizintrosectionEl.appendChild(StartquizbtnEl)


 //array of all created stage 1 elements
 var stage1El = [quizintroEl, quizdescriptionEl, StartquizbtnEl]

//Values for elements in stage 1

//Stage 2 Questions and Answers////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//All needed stage 2 HTML elements created
var questionEl = document.createElement('div')
var correctornotEl = document.createElement('footer')
//empty array to include potential answers from questionandAnswers.choices(MAYBE NEED THIS NOT SURE)
var answerbtnscontainer = document.createElement('div')
//array of all created stage 2 elements
var stage2El = [questionEl, correctornotEl, answerbtnscontainer]
//Appends children of quizquestions

//Array of possible questions (Stage 2)
let currentQuestionIndex = 0
let questionsandAnswers = [
    {
        question: "What is the most basic language for altering text content of a page?",
        choices: ["HTML", "CSS", "Javascript", "Python", "LUA"],
        rightAnswer: "HTML",
    },
    {
        question: "What do we use to write logic into our web applications in this bootcamp?",
        choices: ["HTML", "CSS", "Javascript", "Python", "LUA"],
        rightAnswer: "Javascript",
    },
    {
        question: "What language do we use to style a page's content?",
        choices: ["HTML", "CSS", "Javascript", "Python", "LUA"],
        rightAnswer: "CSS",
    },
    {
        question: "What language is the most recently developed?",
        choices: ["HTML", "CSS", "Javascript", "Python", "LUA"],
        rightAnswer: "Python",
    },
    {
        question: "What language has not been mentioned in the bootcamp so far?",
        choices: ["HTML", "CSS", "Javascript", "Python", "LUA"],
        rightAnswer: "LUA",
    }
]
//



//Stage 3 Finish/Submit score/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//All needed Stage 3 HTML elements created 
var finalscoreEl = document.createElement('h2')
var initialsinputEl = document.createElement('input')
var submitbtnEl = document.createElement('button')
var restartbtnEl = document.createElement('button')
var initialsinputlabelEl = document.createElement('h2')

//array contained all created stage 3 elements
var stage3El = [finalscoreEl, initialsinputEl, submitbtnEl, restartbtnEl, initialsinputlabelEl]

//Stage 4 View High Scores///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var highscoretitleEl = document.createElement('h1')
var highscoreslistEl = document.createElement('ol')
var resetbuttonEl = document.createElement('button')

resetbuttonEl.textContent = "Try Again"

highscoretitleEl.textContent = "All Time High Scores"


//array containing all create stage 4 html elements
var stage4El = [highscoretitleEl, highscoreslistEl, resetbuttonEl]

//FUNCTIONS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function to create buttons

function random_sort() {
    return Math.random() - 0.5;
   }

function answerbtncreate(choice) {
    var answerbtn = document.createElement('button')
    answerbtnscontainer.appendChild(answerbtn)
    answerbtn.textContent = choice
    
}

//Functions to hide and show

//Hide Function
function hideElement(element) {
element.style.display = 'none'
};

//Show Function
function showElement(element) {
    element.setAttribute('style', "display: block")
    console.log(element)
 };
//checks the validity of the answer
 function onChoiceSelected(event) {
     var currentQuestion = questionsandAnswers[currentQuestionIndex]
    if (event.target.textContent === currentQuestion.rightAnswer) {
        console.log("weda best");
        //Go to next question
        correctornotEl.textContent="CORRECT"
        questionsectionEl.appendChild(correctornotEl)
        
    } else {
        console.log("wrong, you should feel bad aboutyourself")
         //display INCORRECT in footer
        correctornotEl.textContent="INCORRECT"
        questionsectionEl.appendChild(correctornotEl)
        
        //deduct 10 from timer
        timervalue -= 10
        updateTimer()
        //go to next question
        
    }
 }

//Function to remove children
 function removeChildren(parentElement, element) {
parentElement.removeChild(element)
 }

// Function to go to next question
function nextquestion(event) {
    currentQuestionIndex += 1
    if (currentQuestionIndex < 5) {
 
 console.log(currentQuestionIndex)
 questionsectionEl.appendChild(answerbtnscontainer)
    questionEl.textContent = questionsandAnswers[currentQuestionIndex].question
    questionsectionEl.appendChild(questionEl)
    stage2El.forEach(showElement)
    }
    else if (currentQuestionIndex > 4) {
        quizEnd()
        return
    } if (timerEl.textContent === 0) {
        quizEnd()
        return
    }
}

//Timer Functions
function startTimer() {
    setInterval(function() {
        timervalue --
        updateTimer()
        if (timervalue <= 0){
            timervalue = 0
            quizEnd()
        }
    }, 1000) 
}

function updateTimer() {
    timerEl.textContent = timervalue

}

//Function to start quiz
function startQuiz () {
    //Hides intro section
    stage1El.forEach(hideElement)

    //starts timer
    startTimer()

    //Gets random choices from questionsandAnswers.choices and sorts them and creates buttons
    var randChoices = questionsandAnswers[currentQuestionIndex].choices.sort(random_sort)
    randChoices.forEach(answerbtncreate)
   

    //Append quizquestions section with newly created question and answer content
    questionsectionEl.appendChild(answerbtnscontainer)
    questionEl.textContent = questionsandAnswers[currentQuestionIndex].question
    questionsectionEl.appendChild(questionEl)
    stage2El.forEach(showElement)

};

/// function to end quiz
function quizEnd () {
    stage2El.forEach(hideElement)
    stage3El.forEach(showElement)
    timerandvhsEl.querySelector("h2").style.display = 'none'
    
    initialsinputlabelEl.textContent = "Enter your intials and submit your score"
    quizendEl.appendChild(initialsinputlabelEl)
    finalscoreEl.textContent = timerEl.textContent
    quizendEl.appendChild(initialsinputEl)
    submitbtnEl.textContent = "Submit Score"
    quizendEl.appendChild(submitbtnEl)
    quizendEl.appendChild(finalscoreEl)
    console.log(timerEl.value)
    
//submits user score
}
 function submitscore(){
     //score submission logic goes here
    var finalscorevalue = timerEl.textContent
    var initialsvalue = initialsinputEl.value
    var scoredata = {initials: initialsvalue, score:finalscorevalue}
    var retrieveddata = localStorage.getItem('highscore3')
    if (!retrieveddata){
        retrieveddata = []
    } else {
        retrieveddata = JSON.parse(retrieveddata)
    } console.log(retrieveddata)
    retrieveddata.push(scoredata)
    localStorage.setItem('highscore3', JSON.stringify(retrieveddata))
    viewhighscores()
 }
//creates a <LI> for score initials
 function createli (scoredata1) {
     var scoreitem = document.createElement('li')
     scoreitem.textContent = scoredata1.initials + "---" + scoredata1.score
     highscoreslistEl.appendChild(scoreitem)

 }
// function to view the high scores from local storage
 function viewhighscores() {
     var highscoreslistchildren = highscoreslistEl.children
     for (var i=highscoreslistchildren.length-1; i>= 0; i--) {
         highscoreslistchildren[i].remove()
     }
     
        var savedatastring = localStorage.getItem('highscore3')
        console.log(savedatastring)
       var savedatavalue = JSON.parse(savedatastring)
       stage3El.forEach(hideElement)
       stage1El.forEach(hideElement)
       stage2El.forEach(hideElement)
       highscoresEl.appendChild(highscoreslistEl)
       highscoresEl.appendChild(highscoretitleEl)
       highscoresEl.appendChild(resetbuttonEl)

       console.log(savedatavalue)
       savedatavalue.forEach(createli)
       
       



 }

 function restartQuiz() {
    window.location.reload();

 }

//Event Listeners
StartquizbtnEl.addEventListener('click' , startQuiz)
answerbtnscontainer.addEventListener('click', onChoiceSelected)
answerbtnscontainer.addEventListener('click', nextquestion)
submitbtnEl.addEventListener('click', submitscore)
viewhighscoreEl.addEventListener('click', viewhighscores)
resetbuttonEl.addEventListener('click' , restartQuiz)
