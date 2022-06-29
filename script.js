var questions = [
    {
        prompt: "Which answer is not a primitve data type?",
        choices: ["String", "Boolean", "Number", "Tom Brady"],
        answer: "Tom Brady",
    },
    {
        prompt: "Hoisting is the default behaviour of javascript where all the variable and function declarations are moved on top.",
        choices: ["True", "False", "Maybe", "Bananas"],
        answer: "True",
    },
    {
        prompt: " What does === mean?",
        choices: [
            "Image of a road",
            "Equal in value",
            "Space filler",
            "Equal in value and data type",
        ],
        answer: "Equal in value and data type",
    },
    {
        prompt: "Is javascript a statically typed or a dynamically typed language?",
        choices: [
            "User typed",
            "Statically typed",
            "Dynamically typed",
            "None of the above",
        ],
        answer: "Dynamically typed",
    },
    {
        prompt: "Callback is a function that will be executed after another function gets executed.",
        choices: ["True", "False", "Toaster", "None of the above"],
        answer: "True",
    },
];
const startQuizEl = document.querySelector(".startQuiz");
const beginQuizEl = document.querySelector(".beginQuiz");
const questionContainerEl = document.querySelector(".questionContainer");
let currentQuestion = 0;
const answerBtnsEl = document.querySelectorAll(".answerBtn");
const questionEl = document.querySelector(".question");
const topRankedEl = document.querySelector(".topRanked");
let timer = 60;
const timerEl = document.querySelector(".timer");
let clock;
const buttonAddon2El = document.querySelector("#buttonAddon2");
const highScores = [];

const initialsEl = document.querySelector(".initials");
const initialsInputEl = document.querySelector(".initialsInput");
const listGroupEl = document.querySelector(".listGroup");
const theBestEl = document.querySelector(".theBest");
const wrongEl = document.querySelector(".wrong");
const correctEl = document.querySelector(".correct");
const viewHighScoresEl = document.querySelector(".viewHighScores");
const restartQuizEl = document.querySelector(".restartQuiz");

function restartQuiz() {
    location.reload();
}

function viewHighScores() {
    const highScoresStorage = JSON.parse(localStorage.getItem("highScores"));
    if (startQuizEl) startQuizEl.classList.add("d-none");
    if (questionContainerEl) questionContainerEl.classList.add("d-none");
    topRankedEl.classList.remove("d-none");
    initialsInputEl.classList.add("d-none");
    theBestEl.classList.remove("d-none");
    if (!highScoresStorage) return;
    highScoresStorage.forEach((item) => {
        const newLi = document.createElement("li");
        newLi.innerText = `${item.initials}:${item.score}`;
        newLi.classList.add("list-group-item");
        listGroupEl.appendChild(newLi);
    });
}

function saveHighScore() {
    console.log(initialsEl.value);
    const scoreObj = {
        initials: initialsEl.value,
        score: timer,
    };
    highScores.push(scoreObj);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    initialsInputEl.classList.add("d-none");

    const highScoresStorage = JSON.parse(localStorage.getItem("highScores"));
    console.log(highScoresStorage);
    theBestEl.classList.remove("d-none");
    highScoresStorage.forEach((item) => {
        const newLi = document.createElement("li");
        newLi.innerText = `${item.initials}:${item.score}`;
        newLi.classList.add("list-group-item");
        listGroupEl.appendChild(newLi);
    });
}

function showNextQuestion() {
    currentQuestion++;
    questionEl.innerText = questions[currentQuestion].prompt;
    answerBtnsEl.forEach(
        (button, i) =>
            (button.innerText = questions[currentQuestion].choices[i])
    );
}
function endQuiz() {
    clearInterval(clock);
    questionContainerEl.classList.add("d-none");
    topRankedEl.classList.remove("d-none");
    console.log("Thanks for playing!");
}

function checkAnswer(e) {
    console.log(currentQuestion);
    if (questions[currentQuestion].answer == e.target.innerText) {
        correctEl.classList.remove("d-none");
        if (currentQuestion < questions.length - 1) {
            setTimeout(() => {
                showNextQuestion();
                correctEl.classList.add("d-none");
            }, 1000);
        } else {
            endQuiz();
        }
        console.log("correctAnswer");
    } else {
        timer = timer - 5;
        wrongEl.classList.remove("d-none");
        if (currentQuestion < questions.length - 1) {
            setTimeout(() => {
                showNextQuestion();
                wrongEl.classList.add("d-none");
            }, 1000);
        } else {
            endQuiz();
        }
        console.log("wrongAnswer");
    }
}

function startTest() {
    clock = setInterval(() => {
        timer--;
        if (timer <= 0) {
            endQuiz();
        }
        timerEl.innerText = timer;
    }, 1000);

    startQuizEl.classList.add("d-none");
    questionContainerEl.classList.remove("d-none");
    answerBtnsEl.forEach((button) =>
        button.addEventListener("click", checkAnswer)
    );
}
restartQuizEl.addEventListener("click", restartQuiz);
viewHighScoresEl.addEventListener("click", viewHighScores);
beginQuizEl.addEventListener("click", startTest);
buttonAddon2El.addEventListener("click", saveHighScore);
