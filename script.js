const questionPool = [
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "How To Make Love"],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "Which company developed JavaScript?",
      options: ["Microsoft", "Netscape", "Google", "Apple"],
      answer: "Netscape"
    },
    {
      question: "What does CSS stand for?",
      options: ["Cascading Style Sheets", "Creative Style System", "Colorful Style Sheet", "Computer Style Sheet"],
      answer: "Cascading Style Sheets"
    },
    {
      question: "Which HTML element is used to define important text?",
      options: ["<important>", "<b>", "<strong>", "<em>"],
      answer: "<strong>"
    },
    {
      question: "Which is a JavaScript framework?",
      options: ["React", "Laravel", "Django", "Flask"],
      answer: "React"
    },
    {
      question: "Which is used for database?",
      options: ["MongoDB", "CSS", "HTML", "Bootstrap"],
      answer: "MongoDB"
    },
    {
      question: "Which operator is used to assign a value?",
      options: ["==", "=", "===", "!="],
      answer: "="
    },
    {
      question: "Which method is used to print in JavaScript?",
      options: ["log()", "print()", "console.log()", "echo()"],
      answer: "console.log()"
    },
    {
      question: "JavaScript is ____ language.",
      options: ["Programming", "Scripting", "Markup", "Styling"],
      answer: "Scripting"
    },
    {
      question: "Which tag is used for line break?",
      options: ["<line>", "<br>", "<break>", "<lb>"],
      answer: "<br>"
    }
  ];
  
  let questions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionBox = document.getElementById("question");
  const optionsBox = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");
  const resultBox = document.getElementById("result-box");
  const scoreText = document.getElementById("score");
  const quizBox = document.getElementById("quiz-box");
  
  // Shuffle helper
  function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
  
  // Get new random questions every time
  function generateQuestions(count = 5) {
    const shuffled = shuffleArray([...questionPool]);
    return shuffled.slice(0, count);
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
      button.style.backgroundColor = "#22c55e";
      score++;
    } else {
      button.style.backgroundColor = "#ef4444";
      buttons.forEach(btn => {
        if (btn.textContent === correctAnswer) {
          btn.style.backgroundColor = "#22c55e";
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
    questions = generateQuestions(5); // <- new random questions each restart!
    quizBox.classList.remove("hidden");
    resultBox.classList.add("hidden");
    showQuestion();
  }
  
  // Initial quiz load
  restartQuiz();
  