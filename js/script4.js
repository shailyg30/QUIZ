let QUIZ_TIME = 300;
const QUIZ_INTERVAL = 1000;

const quizData = [
  {
    question: "Which of the following is not a Java features?",
    options: [
      "Dynamic",
      "Architecture Neutra",
      "Use of pointers",
      "Object-oriented"
    ],
    correct: 2,
  },
  
  {
      question:"Who invented Java Programming?",
     options: [
      "Guido van Rossum",
       "James Gosling",
       "Dennis Ritchie ",
       "Bjarne Stroustrup"
     ] ,
     correct : 1,
  },

  {
      question:"Which statement is true about Java?",
      options:[
           "Java is a sequence-dependent programming language",
           "Java is a code dependent programming language", 
           "Java is a platform-dependent programming language",
           " Java is a platform-independent programming language"
      ],
      correct : 3,
  },

  {
      question:"Which of these cannot be used for a variable name in Java?",
      options:[
          "identifier & keyword",
          "identifier",
          "keyword",
          "none"
      ],
      correct : 2,
  },

  {
      question:"What is the extension of java code files? ",
      options:[
          ".js",".txt ",".java ", ".class"
      ],
      correct : 2,
  },

  {
    question:"Which of the following is not an OOPS concept in Java? ",
    options:[
      "Polymorphism ", "Compilation", "Inheritance", "Encapsulation"
    ],
    correct : 1,
  },
  {
    question:"Which of the following is a type of polymorphism in Java Programming?",
options:[
  "Multiple polymorphism","Compile time polymorphism","Multilevel polymorphism","Execution time polymorphism"

    ],
    correct : 1,
  },
  {
    question:"Which of these keywords are used for the block to be examined for exceptions?",
    options:[
      "check","throw","catch","try"
    ],
    correct :3,
  },
  {
    question:"Which one of the following is not an access modifier?",
    options:[
      "protected","void","public","private"
    ],
    correct :1,
  },
  {
    question:" Which component is used to compile, debug and execute the java programs?",
    options:[
    " JRE"," JIT"," JDK", "JVM"
    ],
    correct :2,
  },
  {
    question:" What is the return type of the hashCode() method in the Object class?",
    options:[
    " Object",
     "int",
      "long",
      "void"
    ],
    correct :1,
  },
  {
    question:" Which of the following is a valid long literal?",
    options:[
    " ABH8097",
     "L990023",
     "904423",
     "0xnf029L"
    ],
    correct :3,
  },
  {
    question:"Which of the following tool is used to generate API documentation in HTML format from doc comments in source code?",
    options:[
    "javap tool",
    "javaw command",
    "Javadoc tool",
   "javah command"
    ],
    correct :2,
  },
  {
    question:"Which of the following is true about the anonymous inner class?",
    options:[
    "It has only methods",
     "Objects can't be created",
    "It has a fixed class name", 
     "It has no class name"
    ],
    correct :3,
  },
  {
    question:"In which process, a local variable has the same name as one of the instance variables?",
    options:[
   "Serialization",
    "Variable Shadowing",
    "Abstraction",
    "Multi-threading"
    ],
    correct :1,
  },
  {
    question:" Which package contains the Random class?",
    options:[
    "java.util package",
  "java.lang package",
  "java.awt package",
  "java.io package"
    ],
    correct :0,
  },
  {
    question:"What do you mean by nameless objects?",
    options:[
    "An object created by using the new keyword.",
  "An object of a superclass created in the subclass.",
  "An object without having any name but having a reference.",
  "An object that has no reference."
    ],
    correct :3,
  },
  {
    question:" An interface with no fields or methods is known as a ______.",
    options:[
    "Runnable Interface",
  "Marker Interface",
    "Abstract Interface",
  "CharSequence Interface"
    ],
    correct :1,
  },
  {
    question:"Which option is false about the final keyword?",
    options:[
    "A final method cannot be overridden in its subclasses.",
  "A final class cannot be extended.",
  "A final class cannot extend other classes.",
  "A final method can be inherited."
    ],
    correct :2,
  },
  {
    question:" In which memory a String is stored, when we create a string using new operator?",
    options:[
    "Stack",
  "String memory",
  "Heap memory",
  "Random storage space"

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
      window.open('result4.html', '_blank');
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
