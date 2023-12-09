const homeButton = document.getElementById("home-btn");
homeButton.addEventListener("click", () => {
    console.log("Home button clicked"); 
    window.location.href = "index.html"; 
});


const linuxCommandQuestions = [
    {
        question: "What function is used to sum the values in a range in Excel?",
        answers: [
            { text: "SUM", correct: true },
            { text: "TOTAL", correct: false },
            { text: "ADD", correct: false },
        ]
    },
    {
        question: "Which Excel feature allows you to automatically fill a series of data?",
        answers: [
            { text: "AutoFill", correct: true },
            { text: "AutoComplete", correct: false },
            { text: "AutoSum", correct: false },
        ]
    },
    {
        question: "In Excel, what does the formula =A1+B1 do?",
        answers: [
            { text: "Multiplies A1 and B1", correct: false },
            { text: "Subtracts B1 from A1", correct: false },
            { text: "Adds the values of A1 and B1", correct: true },
        ]
    },
    {
        question: "Which ribbon in Excel contains commands related to formatting?",
        answers: [
            { text: "Home", correct: false },
            { text: "Insert", correct: false },
            { text: "Format", correct: true },
        ]
    },
    {
        question: "What does the function VLOOKUP in Excel stand for?",
        answers: [
            { text: "Vertical Lookup", correct: true },
            { text: "Value Lookup", correct: false },
            { text: "Variable Lookup", correct: false },
        ]
    },
    {
        question: "In Excel, what does the function IFERROR do?",
        answers: [
            { text: "Checks if a cell is empty", correct: false },
            { text: "Performs a logical test", correct: false },
            { text: "Handles errors by replacing them with a specified value", correct: true },
        ]
    },
    {
        question: "Which keyboard shortcut is used to insert a new worksheet in Excel?",
        answers: [
            { text: "Ctrl + N", correct: false },
            { text: "Ctrl + Shift + N", correct: false },
            { text: "Shift + F11", correct: true },
        ]
    },
    {
        question: "What is the purpose of the Freeze Panes feature in Excel?",
        answers: [
            { text: "To lock cells for editing", correct: false },
            { text: "To freeze selected rows or columns while scrolling", correct: true },
            { text: "To hide formulas in a worksheet", correct: false },
        ]
    },
    {
        question: "How can you filter data in Excel to show only specific rows?",
        answers: [
            { text: "AutoFilter", correct: true },
            { text: "Sort", correct: false },
            { text: "Search", correct: false },
        ]
    },
    {
        question: "What is the purpose of the CONCATENATE function in Excel?",
        answers: [
            { text: "To split text into separate cells", correct: false },
            { text: "To combine multiple text strings into one", correct: true },
            { text: "To convert text to uppercase", correct: false },
        ]
    },
    {
        question: "Which Excel function is used to find the highest value in a range?",
        answers: [
            { text: "MAX", correct: true },
            { text: "HIGH", correct: false },
            { text: "TOP", correct: false },
        ]
    },
    {
        question: "What does the term 'Cell Reference' mean in Excel?",
        answers: [
            { text: "The name of a worksheet", correct: false },
            { text: "The address of a cell in a worksheet", correct: true },
            { text: "A function that references another cell", correct: false },
        ]
    },
    {
        question: "Which Excel feature allows you to create a visual representation of data using charts?",
        answers: [
            { text: "Graph Wizard", correct: false },
            { text: "Chart Builder", correct: false },
            { text: "Insert Chart", correct: true },
        ]
    },
    {
        question: "What is the purpose of the COUNTIF function in Excel?",
        answers: [
            { text: "To count the total number of cells in a range", correct: false },
            { text: "To count the number of cells that meet a specific condition", correct: true },
            { text: "To count the number of visible cells", correct: false },
        ]
    },
    {
        question: "In Excel, what does the term 'Workbook' refer to?",
        answers: [
            { text: "A single sheet within a workbook", correct: false },
            { text: "The entire Excel file that contains multiple sheets", correct: true },
            { text: "A specific range of cells", correct: false },
        ]
    },
];


 

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const summaryContainer = document.getElementById("summary-container");
const summaryList = document.getElementById("summary-list");

let currentQuestionIndex = 0;
let score = 0;
let timer;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(linuxCommandQuestions);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

const questionTimeLimit = 10;

function showQuestion() {
    resetState();
    let currentQuestion = linuxCommandQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    startTimer();
}

function startTimer() {
    let timeLeft = questionTimeLimit;
    timerElement.textContent = `Time Left: ${timeLeft} seconds`;
    timer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleNextButton();
        } else {
            timerElement.textContent = `Time Left: ${timeLeft} seconds`;
            timeLeft--;
        }
    }, 1000);
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    clearInterval(timer);
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Add the "selected" class to the clicked button
    selectedBtn.classList.add("selected");

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        // Disable all buttons to prevent further clicking
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScoreFeedback(score) {
    let feedbackMessage = "";

    if (score === linuxCommandQuestions.length) {
        feedbackMessage = "Excellent! You got all questions correct!";
    } else if (score >= Math.round(0.7 * linuxCommandQuestions.length)) {
        feedbackMessage = "Good job! You did well!";
    } else {
        feedbackMessage = "Needs improvement. Keep practicing!";
    }

    questionElement.innerHTML = `You scored ${score} out of ${linuxCommandQuestions.length}. ${feedbackMessage}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    
    // Clear the timer text and answer buttons
    timerElement.textContent = "";
    answerButtons.innerHTML = "";

    
    // Display the summary in the summary-list
    const summaryHTML = linuxCommandQuestions.map((question, index) => {
        const userAnswer = getUserAnswer(index);
        const correctAnswer = getCorrectAnswer(index);
        const isCorrect = userAnswer === correctAnswer;
    
        return `
          <li>
            Question ${index + 1}: ${question.question}
            <br>
            Your Answer: ${userAnswer}
            <br>
            Correct Answer: ${correctAnswer}
            <br>
            ${isCorrect ? "Correct" : "Incorrect"}
          </li>
        `;
    });

    summaryList.innerHTML = summaryHTML.join("");
    summaryContainer.style.display = "block";

}

function getUserAnswer(index) {
    const buttons = answerButtons.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains("selected")) { // Change "correct" to "selected"
            return buttons[i].textContent;
        }
    }
    return "N/A"; // Return "N/A" if no answer was found
}
function getCorrectAnswer(index) {
    return linuxCommandQuestions[index].answers.find((answer) => answer.correct).text;
  }




function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < linuxCommandQuestions.length) {
        showQuestion();
    } else {
        showScoreFeedback(score);
    }
}


nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < linuxCommandQuestions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz(); 