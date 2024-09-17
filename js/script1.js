let QUIZ_TIME = 300;
const QUIZ_INTERVAL = 1000;

const quizData = [
  {
    question: "HTML stands for -",
    options: [
      "HighText Machine Language",
      "HyperText and links Markup Language",
      "HyperText Markup Language",
      "None of these"
    ],
    correct: 2,
  },
  
  {
      question:"The correct sequence of HTML tags for starting a webpage is -",
     options: [
      "Head, Title, HTML, body",
       "HTML, Body, Title, Head ",
       "HTML, Head, Title, Body ",
       "Title, Head, HTML, Body"
     ] ,
     correct : 2,
  },

  {
      question:"Which of the following tag is used to insert a line-break in HTML?",
      options:[
           "<br>",
           "<a>", 
           "<pre>",
           "<b>"
      ],
      correct : 0,
  },

  {
      question:"Which character is used to represent the closing of a tag in HTML?",
      options:[
          "astrisk",
          "/",
          "!",
          "@"
      ],
      correct : 1,
  },

  {
      question:" How to insert an image in HTML?",
      options:[
          "<img> tag","<a> tag ","<picture> tag ", "<image> tag"
      ],
      correct : 0,
  },

  {
    question:"  Which of the following tag is used to make the underlined text?",
    options:[
      " <i>", "<ul>", "<u> ", "<pre>"
    ],
    correct : 2,
  },
  {
    question:"The <hr> tag in HTML is used for -",
options:[
  "new line","vertical ruler","new paragraph","horizontal ruler"

    ],
    correct : 3,
  },
  {
    question:"Which of the following HTML tag is used to display the text with scrolling effect?",
    options:[
      "<marquee>","<scroll>","<div>","None of the above"
    ],
    correct :0,
  },
  {
    question:"Which of the following tag is used for inserting the largest heading in HTML?",
    options:[
      "<h3>","<h1>","<h5>","<h6>"
    ],
    correct :1,
  },
  {
    question:"How to create an unordered list (a list with the list items in bullets) in HTML?",
    options:[
    "<ul>","<ol>","<li>","<l> "
    ],
    correct :0,
  },
  {
    question: "What is the correct syntax of doctype in HTML5?",
    options: [
      "</doctype html>",
      "<doctype html>",
      "<doctype html!>",
      "<!doctype html>"
    ],
    correct: 3,
  },
  
  {
      question:"Which of the following is used to read an HTML page and render it?",
     options: [
      "Web server",
       "Web network ",
       "Web browser ",
       "Web matrix"
     ] ,
     correct : 2,
  },

  {
      question:"Which element is used for or styling HTML5 layout?",
      options:[
           "CSS",
           "jQuery ", 
           "Javascript ",
            "PHP "
      ],
      correct : 0,
  },

  {
      question:"HTML is a subset of _____",
      options:[
          "SGMT",
          "SGML",
          "SGME",
          "XHTML"
      ],
      correct : 1,
  },

  {
      question:"Which HTML element is used for abbreviation or acronym? ",
      options:[
          " <abbr>"," <blockquote> ","<q> ", "<em>"
      ],
      correct : 0,
  },

  {
    question:"What is the work of <address> element in HTML5? ",
    options:[
      "contains IP address ", "contains home address", "contains url ", "contains contact details for author"
    ],
    correct : 3,
  },
  {
    question:"To show deleted text, which HTML element is used?",
options:[
  "<del>","<em>","<strong>","<ins>"
    ],
    correct : 0,
  },
  {
    question:"Which tag is used to create a dropdown in HTML Form?",
    options:[
      " <input>","<select>"," <text>","<textarea>"
    ],
    correct :1,
  },
  {
    question:"Which HTML tag is used to convert the plain text into italic format?",
    options:[
      "<b>","<p>","<i>","<a>"
    ],
    correct :2,
  },
  {
    question:"Which of the following extension is used to save an HTML file?",
    options:[
    ".h",".hl",".htl",".html "
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
      window.open('result1.html', '_blank');
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
