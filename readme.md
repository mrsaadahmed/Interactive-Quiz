### 1. **HTML (index.html)**

```html
<div class="quiz-container">
    <div id="quiz"></div> <!-- Container where the questions and answers will appear -->
    <button id="submit">Submit</button> <!-- Button to submit an answer -->
    <div id="result"></div> <!-- This will display the result (score) at the end -->
</div>
```

- The `quiz` div is where the current question and its answer options will be dynamically loaded.
- The `submit` button will allow the user to submit their selected answer.
- The `result` div will be used to show the final score after all questions have been answered.

### 2. **CSS (style.css)**

The CSS provides basic styling for the quiz app. Here's what happens:

- **Body Styling**:
  - The `body` has styles to center the quiz on the screen and provide a pleasant user experience.
  - `display: flex`, `justify-content: center`, and `align-items: center` make the quiz container align both horizontally and vertically in the viewport.

- **Quiz Container Styling**:
  - The `.quiz-container` has padding, a background color, and a slight shadow to give it a card-like appearance.

- **Button Styling**:
  - The button is styled to look more interactive with background color, padding, and hover effects.

### 3. **JavaScript (script.js)**

This is where the actual logic of the quiz happens.

#### Variables and Data
```javascript
const quizData = [
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Rome",
        correct: "c"
    },
    // more questions...
];
```

- `quizData`: This is an array of objects where each object represents a quiz question. Every object contains:
  - `question`: The question to be displayed.
  - `a`, `b`, `c`, `d`: The possible answer options for the question.
  - `correct`: The correct answer (as the letter corresponding to the option).

```javascript
const quiz = document.getElementById("quiz");
const submitBtn = document.getElementById("submit");
const result = document.getElementById("result");

let currentQuiz = 0;
let score = 0;
```

- We get references to key HTML elements (`quiz`, `submitBtn`, and `result`) using `getElementById`.
- `currentQuiz`: This tracks the current question index.
- `score`: This tracks how many correct answers the user has given.

#### Loading the Quiz

```javascript
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
```

- The `loadQuiz()` function dynamically inserts the current question and its answer options into the `quiz` div.
- It retrieves the current question from `quizData[currentQuiz]` (e.g., the first question when `currentQuiz = 0`).
- It builds HTML elements (radio buttons for answer options) using JavaScript string templates and inserts them into the `quiz` div via `quiz.innerHTML`.

#### Selecting an Answer

```javascript
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
```

- `getSelected()` function is used to figure out which answer option the user has selected.
- It uses `document.querySelectorAll()` to get all the radio buttons (`input` elements) where `name="answer"`.
- It loops through the radio buttons and checks if any of them are selected using `input.checked`. If a radio button is selected, it assigns the `value` (i.e., the corresponding letter `a`, `b`, `c`, or `d`) to the `answer` variable.

#### Submitting an Answer

```javascript
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
```

- We add a click event listener to the `submit` button. When the user clicks "Submit":
  1. **Get the selected answer**: It calls `getSelected()` to get the user's answer.
  2. **Check if the answer is correct**: If an answer is selected, it checks if the selected answer matches the `correct` value in `quizData`.
     - If the answer is correct, the `score` is incremented.
  3. **Move to the next question**: `currentQuiz++` increments the question index.
  4. **Load the next question**: If there are more questions left (`currentQuiz < quizData.length`), it calls `loadQuiz()` again to display the next question.
  5. **End of the quiz**: If there are no more questions, it hides the quiz content (`quiz.innerHTML = ""`), hides the submit button (`submitBtn.style.display = "none"`), and shows the result (final score) in the `result` div.
  6. **Alert for no selection**: If the user doesn't select an answer, an alert will pop up asking them to select one before proceeding.

### How the Quiz Flows:
1. When the page loads, `loadQuiz()` is called, displaying the first question and its answers.
2. The user selects an answer and clicks "Submit".
3. The script checks if the selected answer is correct, increments the score if necessary, and moves to the next question.
4. After all questions have been answered, the final score is displayed.

### Key JavaScript Concepts Covered:
- **DOM Manipulation**: We use `innerHTML` to dynamically update the webpage with new content (the questions and answers).
- **Event Handling**: The `submit` button listens for clicks, and the associated function handles the logic for processing the quiz.
- **Loops**: The `forEach()` loop is used to check which radio button is selected.
- **Conditionals**: `if-else` conditions are used to check whether the user has selected an answer and whether the selected answer is correct.
- **State Management**: We track the state of the quiz using variables (`currentQuiz` and `score`).
