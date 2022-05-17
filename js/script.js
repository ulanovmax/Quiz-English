
const mainQuestion = document.querySelector('.question'),
      answerList = document.querySelector('.answer_list'),
      answers = document.querySelectorAll('.answer'),
      answer = document.querySelector('.answer'),
      answer1 = answerList.querySelector('.a'),
      answer2 = answerList.querySelector('.b'),
      answer3 = answerList.querySelector('.c'),
      nextBtn = document.querySelector('.next_btn'),
      progressBar = document.querySelector('.indicator'),
      progressCount = document.querySelector('.progress_count'),
      resultsPage = document.querySelector('.results'),
      scoreElement = document.querySelector('.score');

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
  },
  {
    question: 'Susie .... in England for her holiday last winter.',
    options: [
      "were",
      "was",
      "is"
    ],
    correct: 1
  }
]

window.addEventListener('load', () => {
  randowQuestion();
}) 

console.log((questionIndex + 1 )/ questions.length);

  
// Data output
function loadContent() {
  progressCount.innerHTML = `${pageIndex + 1}/${questions.length}`

  mainQuestion.innerHTML = questions[questionIndex].question;
  answer1.innerHTML = questions[questionIndex].options[0];
  answer2.innerHTML = questions[questionIndex].options[1];
  answer3.innerHTML = questions[questionIndex].options[2];

  pageIndex++;

}

// Random question
let completed = [];

function randowQuestion() {
  let random = Math.floor(Math.random() * questions.length);
  let dublicate = false;

  if (pageIndex == questions.length) {
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



answerList.addEventListener('click', e => {
  const targ = e.target;
  if (targ && targ.matches('.answer')) {
    if (targ.dataset.number == questions[questionIndex].correct) {
      targ.classList.add('correct');
      score++;
    } else {
      targ.classList.add('mistake')
    }
  }
  disabled();
  answerList.querySelector('.warning').classList.remove('show');
 
})


function disabled() {
  answers.forEach(answer => {
    answer.classList.add('disabled');
    if (answer.dataset.number == questions[questionIndex].correct ) {
      answer.classList.add('correct');
    }
  })
  nextBtn.classList.add('confirm')
}

function enabled() {
  answers.forEach(answer => {
    answer.classList.remove('disabled', 'correct', 'mistake')
  });
  nextBtn.classList.remove('confirm');
}

function validate() {
  if (!answers[0].classList.contains('disabled')) {
    answerList.querySelector('.warning').classList.add('show');
  } else {
    randowQuestion()
    enabled()
  }
}

nextBtn.addEventListener('click', validate)

function finish() {
  resultsPage.classList.add('finish');
  scoreElement.innerHTML = `${score} / ${questions.length}`;
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

