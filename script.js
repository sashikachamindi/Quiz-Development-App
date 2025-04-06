const questionPool = [
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "How To Make Love"], answer: "Hyper Text Markup Language" },
  { question: "Which company developed JavaScript?", options: ["Microsoft", "Netscape", "Google", "Apple"], answer: "Netscape" },
  { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Colorful Style Sheet", "Computer Style Sheet"], answer: "Cascading Style Sheets" },
  { question: "Which HTML element is used to define important text?", options: ["<important>", "<b>", "<strong>", "<em>"], answer: "<strong>" },
  { question: "Which is a JavaScript framework?", options: ["React", "Laravel", "Django", "Flask"], answer: "React" },
  { question: "Which is used for database?", options: ["MongoDB", "CSS", "HTML", "Bootstrap"], answer: "MongoDB" },
  { question: "Which operator is used to assign a value?", options: ["==", "=", "===", "!="], answer: "=" },
  { question: "Which method is used to print in JavaScript?", options: ["log()", "print()", "console.log()", "echo()"], answer: "console.log()" },
  { question: "JavaScript is ____ language.", options: ["Programming", "Scripting", "Markup", "Styling"], answer: "Scripting" },
  { question: "Which tag is used for line break?", options: ["<line>", "<br>", "<break>", "<lb>"], answer: "<br>" }
];

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const questionBox = document.getElementById("question");
const optionsBox = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score");
const quizBox = document.getElementById("quiz-box");
const quizSection = document.getElementById("quiz-section");
const authContainer = document.querySelector(".auth-container");

// Auth toggle
function toggleForms() {
  document.getElementById("login-form").classList.toggle("hidden");
  document.getElementById("signup-form").classList.toggle("hidden");
}

// Authentication
function signup() {
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  if (!username || !password) return alert("Please fill in both fields.");

  if (confirm("Do you want to save your credentials in the browser?")) {
    localStorage.setItem("user", JSON.stringify({ username, password }));
  }
  alert("Sign up successful. Please login.");
  toggleForms();
}

function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.username !== username || user.password !== password) {
    return alert("Invalid credentials.");
  }

  // Clear login details after successful login
  document.getElementById("login-username").value = "";
  document.getElementById("login-password").value = "";

  authContainer.classList.add("hidden");
  quizSection.classList.remove("hidden");
  restartQuiz();
}

function signOut() {
  quizSection.classList.add("hidden");
  authContainer.classList.remove("hidden");
}

// Quiz Logic
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function generateQuestions(count = 5) {
  return shuffleArray([...questionPool]).slice(0, count);
}

function showQuestion() {
  const current = questions[currentQuestionIndex];
  questionBox.textContent = current.question;
  optionsBox.innerHTML = "";

  const shuffledOptions = shuffleArray([...current.options]);
  shuffledOptions.forEach(option => {
    const button = document.createElement("button");
    button.classList.add("option-btn");
    button.textContent = option;
    button.onclick = () => selectAnswer(button, current.answer);
    optionsBox.appendChild(button);
  });
}

function selectAnswer(button, correctAnswer) {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(btn => btn.disabled = true);

  if (button.textContent === correctAnswer) {
    button.style.backgroundColor = "#22c55e"; // Green for correct
    score++;
  } else {
    button.style.backgroundColor = "#ef4444"; // Red for incorrect
    buttons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.style.backgroundColor = "#22c55e"; // Highlight correct answer
      }
    });
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreText.textContent = `${score} / ${questions.length}`;
  }
});

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  questions = generateQuestions(5);
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  showQuestion();
}
