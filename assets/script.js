const questions = [
    {
        question: "what does js stand for?",
        answers: [
            {text: "Just Static", correct: false},
            {text: "Java Standard", correct: false},
            {text: "Java Sorting", correct: false},
            {text: "Java Script", correct: true},
        ]
    },
    {
        question: "what does HTML stand for?",
        answers: [
            {text: "Hypertext Makeup Language", correct: false},
            {text: "Hypertext Markup Language", correct: true},
            {text: "Hyperspeed Markup Language", correct: false},
            {text: "Hypertext Markup Log", correct: false},
        ]
    },
    {
        question: "what does CSS stand for?",
        answers: [
            {text: "Cascading Super Style", correct: false},
            {text: "Cascading Show Style", correct: false},
            {text: "Cascading Style Showing", correct: false},
            {text: "Cascading Style Sheets", correct: true},
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
var timeEle = document.getElementById('time-left');
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("display-container");
const answerElement1 = document.getElementById("abtn1");
const answerElement2 = document.getElementById("abtn2");
const answerElement3 = document.getElementById("abtn3");
const answerElement4 = document.getElementById("abtn4");
const nameSubmitter = document.getElementById("final-form");
var currentQuestionIndex = 0;
var score =0;
const aea = [answerElement1, answerElement2, answerElement3, answerElement4];

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    startButton.style.display = "none";
    quizContainer.style.display = "inline-block"
    showQuestion();
    
    var timeLeft = 30;
    timeEle.style.display = "block"
    var timerId = setInterval(countdown, 1000);
    
    function countdown() {
      if (timeLeft == 0) {
        clearTimeout(timerId);
        showScore();
      } else {
        timeEle.innerHTML = timeLeft ;
        timeLeft--;
      }
    }
}

function showQuestion(){
    var currentQuestion = questions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

        
        answerElement1.innerHTML = currentQuestion.answers[0].text;
        answerElement2.innerHTML = currentQuestion.answers[1].text;
        answerElement3.innerHTML = currentQuestion.answers[2].text;
        answerElement4.innerHTML = currentQuestion.answers[3].text;

            answerElement1.dataset.correct = currentQuestion.answers[0].correct;
            answerElement2.dataset.correct = currentQuestion.answers[1].correct;
            answerElement3.dataset.correct = currentQuestion.answers[2].correct;
            answerElement4.dataset.correct = currentQuestion.answers[3].correct;

            answerElement1.addEventListener("click", selectAnswer);
            answerElement2.addEventListener("click", selectAnswer);
            answerElement3.addEventListener("click", selectAnswer);
            answerElement4.addEventListener("click", selectAnswer);


    };

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        score++
        selectedBtn.classList.add("btn-success");
        nextQuestion()
        
    }else{
        selectedBtn.classList.add("btn-danger");
        nextQuestion()
        
    };
     
    }

function showScore(){
    clearHouse(quizContainer);
    timeEle.style.display = "none";
    const finalScore = document.createElement("h1");
    finalScore.textContent = ("Congratulations you got " + score+ "! save your score below");
    quizContainer.appendChild(finalScore);
    
      var highscoreform = document.createElement('form');
    

      highscoreform.setAttribute('id', 'highscoreform');
      highscoreform.setAttribute('action', '#'); // '#' represents the current page

        // Creating label element
  var myLabel = document.createElement('label');

  // Setting label attributes
  myLabel.setAttribute('for', 'nameInput');
  myLabel.textContent = 'Initials: '; // Label text
    
      var nameInput = document.createElement('input');
    
      // Setting input attributes
      nameInput.setAttribute('type', 'text');
      nameInput.setAttribute('id', 'nameInput');
      nameInput.setAttribute('name', 'nameInput');
      nameInput.setAttribute('placeholder', 'Type initials...');
    
      // Creating submit button
      var submitButton = document.createElement('input');
    
      // Setting button attributes
      submitButton.setAttribute('type', 'submit');
      submitButton.setAttribute('value', 'Submit');
    
      // Adding an event listener for form submission
      highscoreform.addEventListener('submit', handleSubmit);
    
      // Appending input and button to the form
      highscoreform.appendChild(myLabel)
      highscoreform.appendChild(nameInput);
      highscoreform.appendChild(submitButton);
    
      // Appending form to the body
      quizContainer.appendChild(highscoreform);
    
}


startButton.addEventListener("click", startQuiz)

function clearHouse(parent) {
    while (parent.firstChild) { 
        parent.removeChild(parent.firstChild);
    }
}


function nextQuestion(){
    const nextBtn = document.createElement("button");
    nextBtn.classList.add("btn", "btn-primary");
    nextBtn.textContent = ("show next question");
    nextBtn.id = "next";
    answerButton.appendChild(nextBtn)
    nextBtn.addEventListener("click", goNext);
}

function goNext(){
    let nxt = document.getElementById('next')
    answerElement1.classList.remove("btn-success", "btn-danger");
    answerElement2.classList.remove("btn-success", "btn-danger");
    answerElement3.classList.remove("btn-success", "btn-danger");
    answerElement4.classList.remove("btn-success", "btn-danger");
    currentQuestionIndex++;
    answerButton.removeChild(nxt)
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();        
}
}


function handleSubmit(event) {
    event.preventDefault(); 
    console.log("Form submitted!");
  }