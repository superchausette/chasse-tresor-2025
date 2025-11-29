const digitMap = ["3", "8", "5", "2", "7", "4", "9", "1"];
const safeDigits = document.querySelectorAll(".safe-digit");
const safeMessage = document.getElementById("safeMessage");
const puzzleContainer = document.getElementById("puzzleContainer");
const totalSlots = digitMap.length;

const cluePool = [
  {
    title: "Indice 1 : Feu du ciel",
    prompt:
      "Je brille fort et je te donne de la lumière. Je disparais chaque nuit. Qui suis-je ?",
    answers: ["soleil"],
  },
  {
    title: "Indice 2 : Tic-tac",
    prompt:
      "J'ai des aiguilles mais je ne peux pas applaudir. Je donne l'heure sans carte. Qui suis-je ?",
    answers: ["horloge", "montre", "pendule"],
  },
  {
    title: "Indice 3 : Haut et bas",
    prompt:
      "Je reste au même endroit mais je te fais monter et descendre. Qui suis-je ?",
    answers: ["escaliers", "escalier"],
  },
  {
    title: "Indice 4 : Plouf !",
    prompt:
      "Plus je sèche, plus je suis mouillé. J'attends que tu aies besoin de moi. Qui suis-je ?",
    answers: ["serviette"],
  },
  {
    title: "Indice 5 : Bulle magique",
    prompt: "Je suis plein de trous mais je retiens l'eau sans la boire. Qui suis-je ?",
    answers: ["eponge", "éponge"],
  },
  {
    title: "Indice 6 : Voyage immobile",
    prompt: "Je fais le tour du monde en restant collé dans un coin. Qui suis-je ?",
    answers: ["timbre"],
  },
  {
    title: "Indice 7 : Voix cachée",
    prompt:
      "Je réponds quand tu appelles, mais je n'ai ni bouche ni corps. Qui suis-je ?",
    answers: ["echo", "écho"],
  },
  {
    title: "Indice 8 : Copain collé",
    prompt:
      "Je te suis partout mais je disparais dans le noir complet. Qui suis-je ?",
    answers: ["ombre"],
  },
  {
    title: "Indice 9 : Mouton du ciel",
    prompt:
      "Je flotte dans le bleu, parfois blanc, parfois gris, et j'apporte la pluie. Qui suis-je ?",
    answers: ["nuage", "nuages"],
  },
  {
    title: "Indice 10 : Veilleuse ronde",
    prompt:
      "Je garde la nuit claire et je change de forme chaque semaine. Qui suis-je ?",
    answers: ["lune"],
  },
  {
    title: "Indice 11 : Miroir magique",
    prompt: "Je te montre même quand tu ne veux pas me voir. Qui suis-je ?",
    answers: ["miroir", "glace"],
  },
  {
    title: "Indice 12 : Bibliothèque de poche",
    prompt:
      "Je suis rempli de pages et j'emmène ton imagination en voyage. Qui suis-je ?",
    answers: ["livre", "livres"],
  },
  {
    title: "Indice 13 : Aiguille du nord",
    prompt:
      "Je tourne sans danser et je pointe toujours la même direction. Qui suis-je ?",
    answers: ["boussole"],
  },
  {
    title: "Indice 14 : Souffleur de fête",
    prompt: "Je suis rond, léger et je m'envole quand tu me lâches. Qui suis-je ?",
    answers: ["ballon", "ballons"],
  },
  {
    title: "Indice 15 : Rayon ami",
    prompt: "J'illumine la nuit sur simple pression d'un bouton. Qui suis-je ?",
    answers: ["lampe", "lampe de poche"],
  },
  {
    title: "Indice 16 : Coureur coloré",
    prompt: "Je trace des lignes sans bouger de la feuille. Qui suis-je ?",
    answers: ["crayon", "crayon de couleur"],
  },
  {
    title: "Indice 17 : Dent dorée",
    prompt:
      "Je garde les portes fermées mais je les ouvre quand tu me tournes. Qui suis-je ?",
    answers: ["cle", "clé", "cles", "clés"],
  },
  {
    title: "Indice 18 : Duo pressé",
    prompt: "Je voyage toujours par paire pour protéger tes pieds. Qui suis-je ?",
    answers: ["chaussure", "chaussures"],
  },
  {
    title: "Indice 19 : Jardin de cuisine",
    prompt:
      "Je grandis dans un pot et j'aime la lumière près de la fenêtre. Qui suis-je ?",
    answers: ["plante", "plantes"],
  },
  {
    title: "Indice 20 : Douche du ciel",
    prompt: "Je tombe sur la terre mais je ne me fais jamais mal. Qui suis-je ?",
    answers: ["pluie"],
  },
  {
    title: "Indice 21 : Plumes glacées",
    prompt: "Je tombe en flocons et je fond si tu me touches. Qui suis-je ?",
    answers: ["neige"],
  },
  {
    title: "Indice 22 : Tremplin rigolo",
    prompt: "Je t'aide à toucher le ciel en te faisant rebondir. Qui suis-je ?",
    answers: ["trampoline"],
  },
  {
    title: "Indice 23 : Sourire brillant",
    prompt: "Je chatouille tes dents pour les garder propres. Qui suis-je ?",
    answers: [
      "brosse a dents",
      "brosse à dents",
      "brosses a dents",
      "brosses à dents",
    ],
  },
  {
    title: "Indice 24 : Compteur gourmand",
    prompt:
      "Je commence plein, je finis vide quand tu me manges petit à petit. Qui suis-je ?",
    answers: ["assiette", "bol"],
  },
  {
    title: "Indice 25 : Messager ailé",
    prompt:
      "Je parcours la ville en tournant mes pédales et je dépose des lettres sans me reposer. Qui suis-je ?",
    answers: ["facteur", "factrice"],
  },
];

const assignedClues = Array(totalSlots).fill(null);
const usedClueIndices = new Set();

initPuzzles();

function initPuzzles() {
  for (let slot = 0; slot < totalSlots; slot += 1) {
    const clueIndex = drawClueIndex();
    if (clueIndex === null) {
      console.warn("Pas assez d'indices disponibles pour remplir tous les emplacements.");
      break;
    }
    setClue(slot, clueIndex);
    const card = createPuzzleCard(slot);
    puzzleContainer.appendChild(card);
    updatePuzzleCard(card);
  }
}

function drawClueIndex() {
  const availableIndices = cluePool
    .map((_, index) => index)
    .filter((index) => !usedClueIndices.has(index));

  if (!availableIndices.length) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableIndices.length);
  return availableIndices[randomIndex];
}

function setClue(slot, clueIndex) {
  assignedClues[slot] = clueIndex;
  usedClueIndices.add(clueIndex);
}

function createPuzzleCard(slot) {
  const article = document.createElement("article");
  article.className = "puzzle";
  article.dataset.slot = slot;

  article.innerHTML = `
    <h3></h3>
    <p class="riddle-text"></p>
    <form>
      <label for="answer-${slot + 1}">Ta réponse</label>
      <input
        id="answer-${slot + 1}"
        type="text"
        name="answer-${slot + 1}"
        autocomplete="off"
        required
      />
      <div class="actions">
        <button type="submit">Vérifier !</button>
        <button type="button" class="change-button">Changer d'indice</button>
      </div>
    </form>
    <p class="feedback" aria-live="polite"></p>
  `;

  const form = article.querySelector("form");
  const changeButton = article.querySelector(".change-button");

  form.addEventListener("submit", handleSubmit);
  changeButton.addEventListener("click", handleChangeClick);

  return article;
}

function updatePuzzleCard(article) {
  const slot = Number(article.dataset.slot);
  const clueIndex = assignedClues[slot];
  const clue = cluePool[clueIndex];
  const form = article.querySelector("form");
  const input = form.querySelector("input");
  const submitButton = form.querySelector('button[type="submit"]');
  const changeButton = form.querySelector(".change-button");
  const feedback = article.querySelector(".feedback");

  article.querySelector("h3").textContent = clue.title;
  article.querySelector(".riddle-text").textContent = clue.prompt;
  form.dataset.answers = clue.answers.join("|");

  input.value = "";
  input.disabled = false;
  submitButton.disabled = false;
  changeButton.disabled = false;

  feedback.textContent = "";
  feedback.className = "feedback";
  article.classList.remove("solved");
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const puzzleCard = form.closest(".puzzle");
  const slot = Number(puzzleCard.dataset.slot);
  const input = form.querySelector("input");
  const submitButton = form.querySelector('button[type="submit"]');
  const changeButton = form.querySelector(".change-button");
  const feedback = puzzleCard.querySelector(".feedback");
  const userAnswer = input.value.trim().toLowerCase();
  const validAnswers = form.dataset.answers
    .split("|")
    .map((answer) => answer.trim().toLowerCase())
    .filter(Boolean);

  if (!userAnswer) {
    feedback.textContent = "Tape d'abord ta réponse !";
    feedback.className = "feedback incorrect";
    return;
  }

  const isCorrect = validAnswers.some((answer) => answer === userAnswer);

  if (isCorrect) {
    if (!puzzleCard.classList.contains("solved")) {
      revealDigit(slot);
      feedback.textContent = "Oui ! Tu as trouvé un chiffre du code.";
    } else {
      feedback.textContent = "Chiffre déjà dévoilé. Bravo !";
    }
    feedback.className = "feedback correct";
    puzzleCard.classList.add("solved");
    input.disabled = true;
    submitButton.disabled = true;
    changeButton.disabled = true;
  } else {
    feedback.textContent = "Pas tout à fait. Relis l'indice !";
    feedback.className = "feedback incorrect";
  }
}

function handleChangeClick(event) {
  const button = event.currentTarget;
  const article = button.closest(".puzzle");

  if (article.classList.contains("solved")) {
    return;
  }

  const slot = Number(article.dataset.slot);
  const currentIndex = assignedClues[slot];
  if (currentIndex !== null) {
    usedClueIndices.delete(currentIndex);
    assignedClues[slot] = null;
  }

  const newIndex = drawClueIndex();
  if (newIndex === null) {
    if (currentIndex !== null) {
      setClue(slot, currentIndex);
    }
    return;
  }

  setClue(slot, newIndex);
  updatePuzzleCard(article);

  const feedback = article.querySelector(".feedback");
  feedback.textContent = "Nouvelle énigme, bonne chance !";
  feedback.className = "feedback";
}

function revealDigit(slot) {
  const digitElement = document.querySelector(
    `.safe-digit[data-safe-slot="${slot}"]`
  );

  if (!digitElement || digitElement.textContent !== "?") {
    return;
  }

  digitElement.textContent = digitMap[slot];
  digitElement.classList.add("revealed");

  if ([...safeDigits].every((digit) => digit.textContent !== "?")) {
    safeMessage.textContent =
      "Code déverrouillé ! Le trésor est à toi : 3-8-5-2-7-4-9-1";
  }
}
