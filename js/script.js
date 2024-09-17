let QUIZ_TIME = 300;
const QUIZ_INTERVAL = 1000;

const quizData = [
  {
    question: "Who invented C++?",
    options: [
      "Dennis Ritchie",
      "Ken Thompson",
      "Brian Kernighan",
      "Bjarne Stroustrup"
    ],
    correct: 3,
  },
  
  {
      question:"WHAT IS C++?",
     options: [
      "C++ is an object oriented programming language",
       " C++ is a procedural programming language",
       " C++ supports both procedural and object oriented programming language",
       "C++ is a functional programming language"
     ] ,
     correct : 2,
  },

  {
      question:"Which of the following is used for comments in C++?",
      options:[
           "/* comment */",
           " // comment */", 
           " // comment",
            " both // comment or /* comment */"
      ],
      correct : 3,
  },

  {
      question:"Which of the following extension is used for user-defined header file in c++?",
      options:[
          "cpp",
          "c++",
          "c",
          "c#"
      ],
      correct : 0,
  },

  {
      question:"In which year, the name of the language was changed from 'C with Classes' to C++? ",

      options:[
          "1979","1972","1983","1986"
      ],
      correct : 2,
  },

  {
    question:" Which of the following correctly declares an array in C++?",
    options:[
      " array{10};", "array array[10];", " int array;", "int array[10];"
    ],
    correct : 3,
  },
  {
    question:"C++ language is a successor to which language?",
    options:[
      "C", "JAVA", "SQL", "C#"
    ],
    correct : 1,
  },
  
  {
    question:"Which of the following is used to terminate the function declaration in C++?",
options:[
  ":",";","[","}"
    ],
    correct : 1,
  },
  {
    question:"Which of the following symbol is used to declare the preprocessor directives in C++?",
    options:[
      "#","%","$","!"
    ],
    correct :0,
  },
  {
    question:"What is the index number of the last element of an array with 9 elements?",
    options:[
      "9","8","0","programmer_defined"
    ],
    correct :1,
  },
  {
    question:"Which type is best suited to represent the logical values?",
    options:[
    "integer","boolean","character"," float"
    ],
    correct :1,
  },
  
  {
    question:" Which of the following is a correct identifier in C++?",
    options:[
        "VAR_1234"," $var_name"," 7VARNAME", "7var_name"
    ],
    correct : 0,
},
{
  question:" C++ follows ___.",
  options:[
      "Top-Down Design approach",
      " Bottom-Up Design approach",
      " BOTH OF THEM", "NONE"
  ],
  correct : 1,
},
{
  question:"Which of the following is not a valid keyword in C++ language?",
  options:[
      "while","for","switch", "do-while"
  ],
  correct : 3,
},
{
  question:"Which of the following statement is correct about identifiers in C++? ",
  options:[
      "Identifiers are the combination of alphanumeric characters that can be used for function and variable names.",
      "Identifiers are a combination of alphanumeric characters that can be used for looping statements.",
      "BOTH OF THEM",
       "NONE OF ABOVE"
  ],
  correct : 0,
},
{
  question:" In C++, can we put comments between the statement?",
  options:[
      "true",
      "false",
      "we can but depends on statements", 
      "none of options are correct"
  ],
  correct : 0,
},
{
  question:"Which of the following language translator is used in C++?",
  options:[
      "Assembler","Interpreter","Compiler", "Both Interpreter and Compiler"
  ],
  correct : 2,
},
{
  question:"Which of the following OOPs concepts are supported in C++?",
  options:[
      "Inheritance",
     "Encapsulation",
      "both of them","none "
  ],
  correct : 2,
},
{
  question:" Which of the following header file is used to define cin, cout?",
  options:[
      "<iomanip.h>","<iostream.h>","<iostdio.h>", "none"
  ],
  correct : 1,
},
{
  question:" The cin, cout are ___.",
  options:[
      "Library functions",
      "structures",
      "Pointers", "objects"
  ],
  correct : 3,
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
      window.open('result.html', '_blank');
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
