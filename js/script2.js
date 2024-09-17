let QUIZ_TIME = 300;
const QUIZ_INTERVAL = 1000;

const quizData = [
  {
    question: "Who is the father of C language?",
    options: [
      "Steve Jobs",
      " James Gosling",
      " Dennis Ritchie",
      "Rasmus Lerdorf"
    ],
    correct: 2,
  },
  
  {
      question:"Which of the following is not a valid C variable name?",
     options: [
      " int number;",
       " float rate; ",
       "int variable_count; ",
       "int $main;"
     ] ,
     correct : 3,
  },

  {
      question:"All keywords in C are in ____",
      options:[
           "LowerCase letters",
           "UpperCase letters ", 
           "CamelCase letters ",
            "None of the mentioned "
      ],
      correct : 0,
  },

  {
      question:"Which is valid C expression?",
      options:[
          " int my_num = 100,000;",
          "int my_num = 100000;",
          " int my num = 1000;",
          "int $my_num = 10000;"
      ],
      correct : 1,
  },

  {
      question:" Which keyword is used to prevent any changes in the variable within a C program?",
      options:[
          " immutable","mutable "," const", "volatile"
      ],
      correct : 2,
  },

  {
    question:"What is #include <stdio.h>?",
    options:[
      " Preprocessor directive ", " Inclusion directive", "File inclusion directive ", " None of the mentioned"
    ],
    correct : 0,
  },
  {
    question:"scanf() is a predefined function in____header file.",
options:[
  "stdlib. h"," ctype. h","stdio. h","stdarg. h"
    ],
    correct : 2,
  },
  {
    question:"Which of the following are C preprocessors?",
    options:[
      " #ifdef"," #define","#endif","all of the mentioned"
    ],
    correct :1,
  },
  {
    question:"Which of the following is true for variable names in C?",
    options:[
      " They can contain alphanumeric characters as well as special characters","It is not an error to declare a variable to be one of the keywords(like goto, static)","Variable names cannot start with a digit"," Variable can be of any length"
    ],
    correct :2,
  },
  {
    question:"What is an example of iteration in C?",
    options:[
    "for","while","do-while"," all of the mentioned"
    ],
    correct :3,
  },
  {
    question: "What is the result of logical or relational expression in C?",
    options: [
      "True or False",
      "0 or 1",
      "0 if an expression is false and any positive number if an expression is true",
      "None of the mentioned"
    ],
    correct: 1,
  },
  
  {
      question:"What is the main function of a compiler in programming?",
     options: [
      "To write code",
       "To interpret code ",
       "To convert code into machine language ",
       "To debug code"
     ] ,
     correct : 2,
  },

  {
      question:"Which of the following is not a keyword in C?",
      options:[
           "int",
           "char ", 
           "include ",
            "float "
      ],
      correct : 2,
  },

  {
      question:"Which of the following is a valid identifier in C?",
      options:[
          "2ndName",
          "_name",
          "#name",
          "none of these"
      ],
      correct : 1,
  },

  {
      question:"What is the difference between 'float' and 'double' data types in C? ",
      options:[
          "Syntax only","Precision ","Usage ", "No difference"
      ],
      correct : 1,
  },

  {
    question:"What is the purpose of the printf function in C? ",
    options:[
      "To print output", "To read input ", "To perform calculations ", "To control program flow"
    ],
    correct : 0,
  },
  {
    question:"What does the '+' operator do in C?",
options:[
  "Addition","sustraction","multiplication","division"
    ],
    correct : 0,
  },
  {
    question:"What does the '!' operator do in C?",
    options:[
      "Addition","Multiplication","Negation","None"
    ],
    correct :2,
  },
  {
    question:"What does the break statement do in a loop?",
    options:[
      "Repeats the loop","Does nothing","Skips the current iteration","Exits the loop"
    ],
    correct :3,
  },
  {
    question:"What is the primary purpose of a function in C?",
    options:[
    "Error handling","Memory managemen","Code reuse and modularity","User interface creation "
    ],
    correct :2,
  },

];



let currentQuiz = 0;
let score = 0;
let intervalId;
let timeLeft = QUIZ_TIME;

const questionElm = document.getElementById("question");
const optionsElm = document.getElementById("options");
const previousBtn = document.getElementById("previous-btn");
const submitBtn = document.getElementById("submit-btn");
const resultElm = document.getElementById("result");
const timeElm = document.getElementById("time");

function createRadioInput(index, option) {
  const li = document.createElement("li");
  const input = document.createElement("input");
  const label = document.createElement("label");
  input.type = "radio";
  input.id = `${option}${index + 1}`;
  input.name = "option";
  label.htmlFor = `${option}${index + 1}`;
  label.innerText = option;
  li.appendChild(input);
  li.appendChild(label);
  return li;
}

function loadQuiz() {
  try {
    const currentQuizData = quizData[currentQuiz];
    questionElm.innerText = `Question ${currentQuiz + 1}: ${currentQuizData.question}`;
    optionsElm.innerHTML = "";
    currentQuizData.options.forEach((option, index) => {
      const li = createRadioInput(index, option);
      optionsElm.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading quiz:", error);
  }
}

function checkAnswer() {
  try {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
      const selectedOptionIndex = Array.prototype.indexOf.call(optionsElm.children, selectedOption.parentNode);
      if (selectedOptionIndex === quizData[currentQuiz].correct) {
        score++;
      }
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      clearInterval(intervalId);
      storeResultInLocalStorage();
      window.open('result2.html', '_blank');
    }
  } catch (error) {
    console.error("Error checking answer:", error);
  }
}

function storeResultInLocalStorage() {
  const result = `Your final score is ${score} out of ${quizData.length}. ${score >= (quizData.length / 2) ? "Well done! You passed the quiz." : "Don't worry, you can try again."}`;
  localStorage.setItem("score", score);
  localStorage.setItem("quizLength", quizData.length);
  localStorage.setItem("result", result);
}

function startTimer() {
  const timerElement = document.getElementById('time');
  
  intervalId = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      questions.forEach(question => {
        if (!question.classList.contains('answered')) {
          question.classList.add('missed');
        }
      });
    } else {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
  }, 1000);
}

function goToPreviousQuestion() {
  try {
    if (currentQuiz > 0) {
      currentQuiz--;
      loadQuiz();
    }
  } catch (error) {
    console.error("Error going to previous question:", error);
  }
}

submitBtn.addEventListener("click", checkAnswer);
previousBtn.addEventListener("click", goToPreviousQuestion);
loadQuiz();
startTimer();
