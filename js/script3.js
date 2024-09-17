let QUIZ_TIME = 300;
const QUIZ_INTERVAL = 1000;

const quizData = [
  {
    question: "CSS stands for -",
    options: [
      "Cascade style sheets",
      "Color and style sheets",
      "Cascading style sheets",
      "none"
    ],
    correct: 2,
  },
  
  {
      question:"The CSS property used to control the element's font-size is -",
     options: [
      "text-style",
       "text-size ",
       "font-size ",
       "none"
     ] ,
     correct : 2,
  },

  {
      question:"The HTML attribute used to define the inline styles is -",
      options:[
           "style",
           "styles", 
           "class",
           "none"
      ],
      correct : 0,
  },

  {
      question:"The CSS property used to set the distance between the borders of the adjacent cells in the table is -",
      options:[
          "border-collapse",
          "border-radius",
          "border-spacing ",
          "none"
      ],
      correct : 2,
  },

  {
      question:"The CSS property used to specify the transparency of an element is - ",
      options:[
          "Hover","opacity ","clearfix ", "overlay"
      ],
      correct : 1,
  },

  {
    question:"what type of CSS generally recomended for designing large webpages ",
    options:[
      "inline ", "internal", "external", "none"
    ],
    correct : 2,
  },
  {
    question:"How can we select an element with a specific ID in CSS?",
options:[
  "#",".","<","*"

    ],
    correct : 0,
  },
  {
    question:"How can we select an element with a specific Class in CSS?",
    options:[
      "#","&",".","*"
    ],
    correct :2,
  },
  {
    question:"Which of the following are valid ways to represent a colour in CSS?",
    options:[
      "A valid color name","RGB values","HEX values","All of the above"
    ],
    correct :3,
  },
  {
    question:"Which of the following CSS property specifies the type of list item marker?",
    options:[
    "list","list-style-type","ul","ol "
    ],
    correct :1,
  },
  {
    question: "Which of the following tag is used to embed css in html page?",
    options: [
      "<css>",
      "<!DOCTYPE html>",
      " <script>",
      "<style>"
    ],
    correct: 3,
  },
  
  {
      question:"Which of the following CSS selectors are used to specify a group of elements?",
     options: [
      " tag",
       "id ",
       "class ",
       "class and tag"
     ] ,
     correct : 2,
  },

  {
      question:"Which of the following CSS framework is used to create a responsive design?",
      options:[
           "django",
           "rails ", 
           " larawell",
            "bootstrap"
      ],
      correct : 3,
  },

  {
      question:"Which of the following CSS property is used to make the text bold?",
      options:[
          "text-decoration: bold",
          " font-weight: bold",
          "font-style: bold",
          " text-align: bold"
      ],
      correct : 1,
  },

  {
      question:"Which of the following is the correct way to apply CSS Styles? ",
      options:[
          " in an external CSS file"," inside an HTML element ","inside the <head> section of an HTML page ", "all of the mentioned"
      ],
      correct : 3,
  },

  {
    question:"Which of the following CSS property is used to set the color of the text? ",
    options:[
      "text-decoration ", "pallet", "colour ", " color"
    ],
    correct : 3,
  },
  {
    question:"Which of the following property is used to align the text in a table?",
options:[
  " text-align","align"," text","none of the mentioned"
    ],
    correct : 0,
  },
  {
    question:"Which of the following CSS property defines the space between cells in a table?",
    options:[
      "border-spacing"," border-style","border"," none of the mentioned"
    ],
    correct :0,
  },
  {
    question:"Which property is used to set the background color of an element?",
    options:[
      "color","background-color","bgcolor","D.background"
    ],
    correct :1,
  },
  {
    question:"What is the primary purpose of CSS in web development?",
    options:[
    "To program web applications","To store data","To create web pages","To style web pages "
    ],
    correct :3,
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
      window.open('result3.html', '_blank');
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
