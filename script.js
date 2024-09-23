const quizData = [
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Rome",
        correct: "c"
    },
    {
        question: "Who is the current President of the United States?",
        a: "Joe Biden",
        b: "Donald Trump",
        c: "Barack Obama",
        d: "George Bush",
        correct: "a"
    },
    {
        question: "What is the largest planet in our solar system?",
        a: "Earth",
        b: "Jupiter",
        c: "Saturn",
        d: "Mars",
        correct: "b"
    },
    {
        question: "Which language is used for web development?",
        a: "Python",
        b: "Java",
        c: "JavaScript",
        d: "C++",
        correct: "c"
    },
];

const quiz = document.getElementById("quiz");
const submitBtn = document.getElementById("submit");
const result = document.getElementById("result");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    
    quiz.innerHTML = `
        <h2>${currentQuizData.question}</h2>
        <label>
            <input type="radio" name="answer" value="a">
            ${currentQuizData.a}
        </label><br>
        <label>
            <input type="radio" name="answer" value="b">
            ${currentQuizData.b}
        </label><br>
        <label>
            <input type="radio" name="answer" value="c">
            ${currentQuizData.c}
        </label><br>
        <label>
            <input type="radio" name="answer" value="d">
            ${currentQuizData.d}
        </label>
    `;
}

function getSelected() {
    const answers = document.querySelectorAll('input[name="answer"]');
    let answer;
    
    answers.forEach((input) => {
        if (input.checked) {
            answer = input.value;
        }
    });
    return answer;
}

submitBtn.addEventListener("click", () => {
    const selectedAnswer = getSelected();
    
    if (selectedAnswer) {
        if (selectedAnswer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = "";
            submitBtn.style.display = "none";
            result.innerHTML = `You scored ${score} out of ${quizData.length}!`;
        }
    } else {
        alert("Please select an answer!");
    }
});
