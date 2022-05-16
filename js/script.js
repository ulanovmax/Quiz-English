
const mainQuestion = document.querySelector('.question'),
      answerList = document.querySelector('.answer_list'),
      answers = document.querySelectorAll('.answer'),
      answer = document.querySelector('.answer'),
      answer1 = answerList.querySelector('.a'),
      answer2 = answerList.querySelector('.b'),
      answer3 = answerList.querySelector('.c'),
      nextBtn = document.querySelector('.next_btn'),
      scoreElement = document.querySelector('.score'),
      progressBar = document.querySelector('.indicator'),
      progressCount = document.querySelector('.progress_count');

let pageIndex = 0, // Index of page
    questionIndex = 0, // Index of question
    score = 0; // Amount of correct answers


const questions = [
  {
    question: 'Last night we .... to disco',
    options: [
      'went',
      'goes',
      'go'
    ],
    correct: 0
  },
  {
    question: ' I .... the play we saw at Drama Theatre on Wednesday.',
    options: [
      "doesn't like",
      "didn't like",
      "haven't liked"
    ],
    correct: 1
  }
]

  
// Data output
function loadContent() {
  progressCount.innerHTML = `${pageIndex + 1}/${questions.length}`

  mainQuestion.innerHTML = questions[questionIndex].question;
  answer1.innerHTML = questions[questionIndex].options[0];
  answer2.innerHTML = questions[questionIndex].options[1];
  answer3.innerHTML = questions[questionIndex].options[2];

  questionIndex++;

}

// Random question
let completed = [];

function randowQuestion() {
  let random = Math.floor(Math.random() * questions.length);
  let dublicate = false;

  if (questionIndex == questions.length) {
    finish()
  } else {
    if (completed.length > 0) {
      completed.forEach(answer => {
        if (answer == random) {
          dublicate = true;
        } 
      });
 
      if (dublicate) {
        randowQuestion();
      } else {
        questionIndex = random;
        loadContent()
      }
    } else if (completed.length == 0) {
      questionIndex = random;
      loadContent()
    }
  }
  completed.push(questionIndex);
}



window.addEventListener('load', () => {
  randowQuestion()
}) 

function finish() {
  console.log('finish');
}

