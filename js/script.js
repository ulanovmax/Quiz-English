
const mainQuestion = document.querySelector('.question'),
      answerList = document.querySelector('.answer_list'),
      answers = document.querySelectorAll('.answer'),
      answer = document.querySelector('.answer'),
      answer1 = answerList.querySelector('.a'),
      answer2 = answerList.querySelector('.b'),
      answer3 = answerList.querySelector('.c'),
      nextBtn = document.querySelector('.next_btn'),
      resultsPage = document.querySelector('.results'),
      scoreResult = document.querySelector('.review_text'),
      scoreElement = document.querySelector('.score'),
      progressBar = document.querySelector('.indicator'),
      progressScore = document.querySelector('.indicator_score'),
      progressCount = document.querySelector('.progress_count');

let pageIndex = 0, // Index of page
    questionIndex = 0, // Index of question
    score = 0; // Amount of correct answers


const getQuestions = async (url) => {
  const data = await fetch(url);
  return await data.json();
}

getQuestions('js/questions.json')
  .then(data => {
    const questions = data.questions;
      
    // Data output
    function loadContent() {
      progressCount.innerHTML = `${pageIndex + 1}/${questions.length}`
    
      mainQuestion.innerHTML = questions[questionIndex].question;
      answer1.innerHTML = questions[questionIndex].options[0];
      answer2.innerHTML = questions[questionIndex].options[1];
      answer3.innerHTML = questions[questionIndex].options[2];
    
      // Progress bar 
      progressBar.style.width = 100 * ((pageIndex + 1 ) / questions.length) + '%';
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
    
    randowQuestion();
    
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
      document.querySelector('.warning').classList.remove('show');
    });
    
    
    function disabled() {
      answers.forEach(answer => {
        answer.classList.add('disabled');
        if (answer.dataset.number == questions[questionIndex].correct ) {
          answer.classList.add('correct');
        }
      })
      nextBtn.classList.add('confirm');
    }
    
    function enabled() {
      answers.forEach(answer => {
        answer.classList.remove('disabled', 'correct', 'mistake')
      });
      nextBtn.classList.remove('confirm');
    }
    
    function validate() {
      if (!answers[0].classList.contains('disabled')) {
        document.querySelector('.warning').classList.add('show');
      } else {
        randowQuestion()
        enabled()
      }
    }
    
    nextBtn.addEventListener('click', validate)
    
    function finish() {
      resultsPage.classList.add('finish');
      scoreElement.innerHTML = `${score} / ${questions.length}`;
      progressScore.style.width = 100 * (score / questions.length) + '%';
    
      if (score == questions.length) {
        scoreResult.textContent = 'Incredible!'
      } else if (score >= Math.round(questions.length / 2)) {
        scoreResult.textContent = 'Well done!'
      } else if (score == 0) {
        scoreResult.textContent = 'Maybe another time...'
      } else if (score < Math.round(questions.length / 2)) {
        scoreResult.textContent = 'You can do better!'
      }
      
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  })




