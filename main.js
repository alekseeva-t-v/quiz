const questions = [
	{
		question: "Что первым делом делает Диана сразу, как проснётся?",
		answers: ["Смотрит мультфильм", "Встаёт с кровати", "Идёт в детский сад", "Завтракает"],
		correct: 2,
	},
	{
		question: "Какое отчество у именинницы?",
		answers: [
			"Алексеевна",
			"Стасовна",
			"Вячеславовна",
			"Станиславовна",
		],
		correct: 4,
	},
	{
		question: "Какой у Дианы знак зодиака?",
		answers: [
			"Козерог",
			"Весы",
			"Скорпион",
			"Стрелец",
		],
		correct: 3,
	},
	{
		question: "Какого цвета глаза у именинницы?",
		answers: [
			"Карие",
			"Зелёные",
			"Голубые",
			"Серые",
		],
		correct: 1,
	},
  {
		question: "Любимое занятие Дианы:",
		answers: [
			"Смотреть мультфильмы",
			"Общаться с друзьями",
			"Рисовать и танцевать",
			"Ходить в детский сад",
		],
		correct: 2,
	},
];

// Находим элементы
const headerContainer = document.querySelector('#header');

const listContainer = document.querySelector('#list');

const submitBtn = document.querySelector('#submit')

// Переменные иры
let score = 0; // количество правильных ответов

let questionIndex = 0; // текущий вопрос

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

// Очистка формы
function clearPage() {
	headerContainer.innerHTML = '';
  listContainer.innerHTML = '';
}

// Отображаем вопрос с вариантами ответа
function showQuestion() {
  // Вопрос
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
  headerContainer.innerHTML = title;

  // Варианты ответа
  let answerNumber = 1;
  for (answerText of questions[questionIndex]['answers']) {
    const questionTemplate = 
      `<li>
        <label>
          <input value = "%number%" type="radio" class="answer" name="answer" />
          <span>%answer%</span>
        </label>
      </li>`;
    
    const answerHTML = questionTemplate
                      .replace('%answer%', answerText)
                      .replace('%number%', answerNumber);

    listContainer.innerHTML += answerHTML;
    answerNumber++;
  }
}

// Проверка выбранного ответа
function checkAnswer() {
  console.log('checkAnswer started');

  // Находим выбранную радио кнопку
  const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

  // Если ответ не выбран выходим из функции
  if (!checkedRadio) {
    submitBtn.blur();
    return
  }

  // Узнаём номер ответа
  const userAnswer = parseInt(checkedRadio.value);

  // Если ответил верно увеличиваем счёт
  if (userAnswer === questions[questionIndex]['correct']) {
    score++;
  }

  console.log('score = ', score);

  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
  } else {
    clearPage();
    showResults();
  }

}

function showResults() {
  console.log('showResults started');
  console.log(score);

  const resultTemplate = `
    <p class="result"><span class="res">%result%</span>: %message%</p>
    <img src="./01.png" width="100%" alt="Фиксики">
  `
  let title, message;

  // Варианты заголовков текста
  if (score === questions.length) {
    message = 'Поздравляем! Вы ответили верно на все вопросы и заслужили призы. Вы найдёте их там, где у Дианы маленький зелёный садик!'
  } else if ((score * 100) / questions.length >= 50) {
    message = 'Неплохой результат! Вы дали более половины правильных ответов! Можете переходить к следующему этапу. Но если хотите получить призы, придется ответить правильно на все вопросы!'
  } else {
    message = 'Стоит постараться! Пока у вас меньше половины правильных ответов. Плпробуйте ещё!'
  }

  // Результат
  let result = `${score} из ${questions.length}`;

  // Финальный ответ подставляет данные в шаблон
  const finalMessage = resultTemplate
                .replace('%title%', title)
                .replace('%message%', message)
                .replace('%result%', result)
  headerContainer.innerHTML = finalMessage;

  // Меняем кнопку на "Играть снова";
  submitBtn.blur();
  submitBtn.innerText = 'Начать заново';
  submitBtn.onclick = () => history.go();
}




