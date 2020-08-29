// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var startScreenEl = document.querySelector("#start-screen");
var questionTitleEl = document.querySelector("#question-title");
var endScreenEl = document.querySelector("#end-screen");
var finalScoreEL = document.querySelector("#final-score");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");


function quizTimer() {
  timerId = setInterval(function () {
    time--;
    timerEl.textContent = time;
    if (time === 0) {
      clearInterval(timerId);
    }

  }, 1000);

}


function startQuiz() {
  // hide start screen
  startScreenEl.setAttribute("class", "hide");
  // un-hide questions section
  questionsEl.setAttribute("class", "start");

  // start timer
  quizInterval = setInterval(quizTimer(), 1000);
  // show starting time

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  questionTitleEl.textContent = currentQuestion.title;
  // clear out any old question choices
  choicesEl.innerHTML = "";
  // loop over choices
  for (var choice of currentQuestion.choices) {
    // create new button for each choice
    var choiceBtn = document.createElement("button");
    choiceBtn.textContent = choice;
    choiceBtn.setAttribute("id", choice);
    // attach click event listener to each choice
    choiceBtn.addEventListener("click", questionClick);
    // display on the page
    choicesEl.appendChild(choiceBtn);
  }

}

function questionClick() {
  // check if user guessed wrong
  if (event.target.id !== questions[currentQuestionIndex].answer) {

    // penalize time
    clockTick();
    // display new time on page
    // flash right/wrong feedback on page for half a second
    giveFeedback(false);

    // play "wrong" sound effect
    sfxWrong.play();



  } else if (event.target.id === questions[currentQuestionIndex].answer) {
    // else 
    // flash right/wrong feedback on page for half a second
    giveFeedback(true)
    // play "right" sound effect
    sfxRight.play();


  }


  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex >= questions.length) {
    quizEnd();
    // quizEnd
  } else {
    // else 
    // getQuestion
    getQuestion();

  }

}

function giveFeedback(answer) {
  if (answer) {
    var displayText = "Right!";
  } else {
    var displayText = "Wrong!";
  }
  feedbackEl.textContent = displayText;
  feedbackEl.setAttribute("class", "feedback start");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "hide");
    feedbackEl.textContent = "";
  }, 500);

}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  questionsEl.setAttribute("class", "hide");
  endScreenEl.setAttribute("class", "start")

  // show final score
  finalScoreEL.textContent = time;
  // hide questions section
}

function clockTick() {
  // update time
  time -= 10;

  // check if user ran out of time
  if (time === 0) {
    quizEnd();
  } else {
    return;
  }
}

function saveHighscore() {
  // get value of input box
  myInitials = initialsEl.value;
  // make sure value wasn't empty
  if (myInitials) {
    // get saved scores from localstorage, or if not any, set to empty array
    var localHighScores = localStorage.getItem("highScores");
    if (!localHighScores) {
      var highScores = [];

    } else {
      highScores = JSON.parse(localHighScores);
    }


    // format new score object for current user
    var score = { myInitials, time };
    highScores.push(score);
    // save to localstorage
    localStorage.setItem("highScores", JSON.stringify(highScores));

  }
  // redirect to next page
  window.location.href = "highscores.html";
}

function checkForEnter(event) {
  // check if event key is enter
  if (event.keyCode === 13) {
    // saveHighscore
    saveHighscore();
  }
}

finalScoreEL.addEventListener("keyup", checkForEnter);

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
