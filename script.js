const questions = [
  {
    question: "What does 'ubiquitous' mean?",
    options: ["Rare", "Everywhere", "Hidden", /* correct is index 1 */],
    correct: 1
  },
  {
    question: "Choose the synonym of 'meticulous'.",
    options: ["Careless", "Precise", "Quick", /* correct is index 1 */],
    correct: 1
  },
  {
    question: "What does 'ephemeral' mean?",
    options: ["Permanent", "Short-lived", "Loud", /* correct is index 1 */],
    correct: 1
  },
  {
    question: "The opposite of 'benevolent' is",
    options: ["Kind", "Malevolent", "Neutral", /* correct is index 1 */],
    correct: 1
  },
  {
    question: "'Ambiguous' means",
    options: ["Clear", "Unclear / having multiple meanings", "Strong", /* correct is index 1 */],
    correct: 1
  }
  // Add more questions here following the same pattern
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  
  optionsEl.innerHTML = "";
  selectedAnswer = null;
  nextBtn.disabled = true;

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(index, btn));
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(index, clickedBtn) {
  if (selectedAnswer !== null) return; // prevent multiple selection

  selectedAnswer = index;
  nextBtn.disabled = false;

  // Highlight selected
  document.querySelectorAll(".option").forEach(btn => btn.classList.remove("selected"));
  clickedBtn.classList.add("selected");
}

nextBtn.addEventListener("click", () => {
  if (selectedAnswer === questions[currentQuestion].correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${questions.length} (${Math.round(score / questions.length * 100)}%)`;
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultEl.classList.add("hidden");
  quizEl.classList.remove("hidden");
  loadQuestion();
});

// Start the quiz
loadQuestion();
