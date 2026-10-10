// Personaliza aquí las preguntas y el tono de las reacciones.
const questions = [
  { text: '¿Alguna vez te he hecho enojar?' },
  { text: '¿Alguna vez te he hecho reír cuando estabas seria?' },
  { text: '¿Crees que a veces soy demasiado molesto?' },
  { text: '¿Alguna vez te he contado algo demasiado random?' },
  { text: '¿Crees que nuestra amistad tiene momentos bien raros?' },
  { text: '¿Soy una buena amistad?', escape: 'no' },
  { text: '¿Soy más pro que tú?', escape: 'no' },
  { text: '¿Te caigo mal?', escape: 'yes' }
];

// La lista se conserva en el mismo orden del texto original. La última aparece destacada.
const qualities = [
  'No rendirte aunque todo se complique.',
  'Seguir adelante incluso en los días difíciles.',
  'Tu valentía frente a todo lo que has vivido.',
  'Enfrentar la vida con fuerza.',
  'No darte por vencida.',
  'Luchar cada día.',
  'Ser más fuerte de lo que crees.',
  'No dejar de intentarlo.',
  'Sonreír a pesar de todo.',
  'No dejar que los problemas te definan.',
  'Ser constante.',
  'Seguir cuando sería fácil parar.',
  'Enfrentar tus miedos.',
  'No rendirte con tu proceso.',
  'Luchar por tu bienestar.',
  'No perder la esperanza.',
  'Encontrar la forma de seguir.',
  'Tu resiliencia.',
  'Levantarte una y otra vez.',
  'No dejarte vencer.',
  'Ser fuerte en silencio.',
  'Seguir incluso cuando estás cansada.',
  'No abandonar lo que importa.',
  'Tener coraje.',
  'Enfrentar la realidad.',
  'No esconderte de lo difícil.',
  'Creer en ti.',
  'Avanzar paso a paso.',
  'No detenerte.',
  'Tu fortaleza interior.',
  'Aprender de cada situación.',
  'Seguir creciendo.',
  'No conformarte.',
  'Adaptarte.',
  'Enfrentar cambios constantes.',
  'No rendirte ante la incertidumbre.',
  'Construir tu vida día a día.',
  'No perder tu esencia.',
  'Ser auténtica.',
  'Seguir siendo tú.',
  'Luchar por tu salud.',
  'Enfrentar procesos largos.',
  'Ser paciente contigo misma.',
  'No desesperarte fácilmente.',
  'Mantener la calma.',
  'Tu madurez.',
  'No compararte con otros.',
  'Seguir tu propio camino.',
  'No rendirte en lo importante.',
  'Seguir adelante sin importar qué.',
  'Hacer lo mejor que puedes.',
  'Luchar aunque duela.',
  'No perder tu valor.',
  'Mantenerte firme.',
  'No dejar de avanzar.',
  'Ser fuerte a tu manera.',
  'No detenerte por el miedo.',
  'Enfrentar lo difícil.',
  'Intentar mejorar cada día.',
  'No abandonar tu camino.',
  'No dejar que nada te apague.',
  'Seguir adelante con todo.',
  'Enfrentar cada día.',
  'No darte por vencida.',
  'Tu mentalidad fuerte.',
  'Creer que puedes.',
  'Enfrentar la vida con valor.',
  'No quedarte atrás.',
  'Avanzar poco a poco.',
  'No rendirte completamente.',
  'Seguir incluso cuando nadie lo ve.',
  'Luchar en silencio.',
  'No buscar excusas.',
  'Enfrentar lo que venga.',
  'Seguir adelante sin rendirte.',
  'No dejarte caer fácilmente.',
  'Tu fuerza mental.',
  'Mantener tu esencia.',
  'Seguir siendo fuerte.',
  'No detenerte.',
  'Seguir intentando.',
  'No abandonar.',
  'Enfrentar tus días.',
  'Seguir adelante.',
  'No rendirte.',
  'Luchar por ti.',
  'No detenerte.',
  'Seguir avanzando.',
  'No darte por vencida.',
  'Seguir luchando.',
  'Ser un ejemplo real.',
  'Inspirar sin darte cuenta.',
  'La fuerza de tu historia.',
  'Construir tu camino.',
  'No dejar de intentar.',
  'Tu valentía.',
  'No perder la esperanza.',
  'Seguir adelante.',
  'No rendirte ante nada.',
  'Ser tú, porque eso ya es suficiente.'
];

const reactions = [
  'Apuntado en el expediente de nuestra amistad :D',
  'Respuesta registrada por el comité de amikitas UWU',
  'Interesante... continuaré con mis investigaciones OwO',
  'Esta respuesta queda entre nos y este bot :3',
  'Anotado con total seriedad (más o menos) ^^'
];
const screens = [...document.querySelectorAll('.screen')];
const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const answerArea = document.querySelector('#answer-area');
const questionText = document.querySelector('#question-text');
const reactionText = document.querySelector('#reaction');
const counter = document.querySelector('#counter');
const progress = document.querySelector('#progress-fill');
const progressBar = document.querySelector('[role="progressbar"]');
const toast = document.querySelector('#toast');
let currentQuestion = 0;
let toastTimer;

function showScreen(id) {
  screens.forEach(screen => {
    const active = screen.id === id;
    screen.classList.toggle('active', active);
    screen.setAttribute('aria-hidden', String(!active));
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 1800);
}

function resetAnswerButtons() {
  [yesButton, noButton].forEach(button => {
    button.classList.remove('escaping');
    button.style.left = '';
    button.style.top = '';
  });
  answerArea.style.minHeight = '';
}

function renderQuestion() {
  const question = questions[currentQuestion];
  resetAnswerButtons();
  questionText.textContent = question.text;
  counter.textContent = `${currentQuestion + 1} / ${questions.length}`;
  const done = currentQuestion;
  progress.style.width = `${(done / questions.length) * 100}%`;
  progressBar.setAttribute('aria-valuenow', String(done));
  reactionText.textContent = '';
  const escapeButton = question.escape === 'yes' ? yesButton : question.escape === 'no' ? noButton : null;
  if (escapeButton) {
    escapeButton.classList.add('escaping');
    answerArea.style.minHeight = '126px';
    escapeButton.onpointerenter = evade;
    escapeButton.onpointerdown = evade;
  }
  [yesButton, noButton].forEach(button => {
    if (button !== escapeButton) {
      button.onpointerenter = null;
      button.onpointerdown = null;
    }
  });
  yesButton.onclick = () => answer('Sí');
  noButton.onclick = () => answer('No');
}

function evade(event) {
  event.preventDefault();
  event.stopPropagation();
  const button = event.currentTarget;
  const bounds = answerArea.getBoundingClientRect();
  const buttonWidth = button.offsetWidth;
  const buttonHeight = button.offsetHeight;
  const safeButton = button === yesButton ? noButton : yesButton;
  const safe = safeButton.getBoundingClientRect();
  const maxX = Math.max(0, bounds.width - buttonWidth);
  const maxY = Math.max(0, bounds.height - buttonHeight);
  let x = 0, y = 0;
  // Busca una posición aleatoria sin tapar el botón que sí se puede pulsar.
  for (let attempt = 0; attempt < 30; attempt++) {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
    const candidate = { left: bounds.left + x, right: bounds.left + x + buttonWidth, top: bounds.top + y, bottom: bounds.top + y + buttonHeight };
    const overlaps = candidate.left < safe.right + 8 && candidate.right > safe.left - 8 && candidate.top < safe.bottom + 8 && candidate.bottom > safe.top - 8;
    if (!overlaps) break;
  }
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
  if (Math.random() < .28) showToast('¡Uy, ese botón tiene sus propios planes! xD');
}

function answer(choice) {
  const question = questions[currentQuestion];
  if ((question.escape === 'no' && choice === 'No') || (question.escape === 'yes' && choice === 'Sí')) return;
  if (Math.random() < .58) reactionText.textContent = reactions[Math.floor(Math.random() * reactions.length)];
  currentQuestion++;
  progress.style.width = `${(currentQuestion / questions.length) * 100}%`;
  progressBar.setAttribute('aria-valuenow', String(currentQuestion));
  if (currentQuestion >= questions.length) {
    counter.textContent = `${questions.length} / ${questions.length}`;
    window.setTimeout(() => showScreen('interlude'), 330);
    return;
  }
  const quiz = document.querySelector('#quiz');
  quiz.classList.remove('active');
  window.setTimeout(() => {
    renderQuestion();
    quiz.classList.add('active');
  }, 170);
}

function startGame() {
  currentQuestion = 0;
  progress.style.width = '0%';
  progressBar.setAttribute('aria-valuenow', '0');
  renderQuestion();
  showScreen('quiz');
}

document.querySelector('#qualities-list').innerHTML = qualities.map((quality, index) => `<li${index === qualities.length - 1 ? ' class="final-quality-item"' : ''}>${quality}</li>`).join('');
document.querySelector('#start-button').addEventListener('click', startGame);
document.querySelector('#surprise-button').addEventListener('click', () => showScreen('letter'));
document.querySelector('#replay-button').addEventListener('click', startGame);
document.querySelector('#home-button').addEventListener('click', () => {
  currentQuestion = 0;
  resetAnswerButtons();
  showScreen('welcome');
});

// Initial state is explicit for assistive technology and direct file opening.
screens.forEach(screen => screen.setAttribute('aria-hidden', String(!screen.classList.contains('active'))));
