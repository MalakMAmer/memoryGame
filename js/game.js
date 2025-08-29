
//flipping and matchnf logic

const cards = document.querySelectorAll(".cardItems");
const movesCounter = document.getElementById("movesCounter");
const timerCounter = document.getElementById("timerCounter");
const restartBtn = document.getElementById("restartBtn");
const playBtn = document.getElementById("playBtn");


let lockBoard = false;
let firstCard = null;
let secondCard = null;
let moves = 0;
let gameStarted = false;
let btnClicked = false;
restartBtn.disabled = true;
restartingCards();

//starting the game
playBtn.addEventListener("click", ()=>{
  if (!gameStarted) {
    startGame();
    playBtn.disabled = true;
    restartBtn.disabled = false;
  }
});

//restarting the game
restartBtn.addEventListener("click" , ()=>{
  if (!restartBtn.disabled) {
    playBtn.disabled = true;
    gameStarted = true;
    startGame();
  }
});

function startGame(){
  lockBoard = false;
  firstCard = null;
  secondCard = null;
  moves = 0;
  movesCounter.textContent = "00";
  timeLeft = (5 * 60) + 1;
  gameStarted = true;
  btnClicked = true;

  restartingCards();

  clearInterval(timeId);
  startTimer();
}
 
function restartingCards(){
  cards.forEach(card => {
    card.classList.remove("matched", "match-animation");
    card.querySelector("img").src = "images/theCards/questionCard.png";
  })
  // shuffling
  cards.forEach(card => {
    const randomOrder = Math.floor(Math.random() * cards.length)
    card.style.order = randomOrder;
  })
}


// flipping cards and matching them
cards.forEach(card =>{
  card.addEventListener("click", ()=>{
    flipCard(card)
  })
});

function flipCard(card){
  if(lockBoard) {return;}
  if(card === firstCard){return;}
  if (card.classList.contains("matched")) {return;}
  
  const img = card.querySelector("img");
  if(img.src.includes(card.dataset.image)) {return;}
  card.classList.add("flipped");
  img.src = card.dataset.image;

  if(!gameStarted && !btnClicked){
    gameStarted = true;
    playBtn.disabled = true;
    restartBtn.disabled = false;
    startTimer();
  }
  if(!firstCard){
    firstCard = card;
    return;
  }
  secondCard = card;
  moves++;
  movesCounter.textContent = moves.toString().padStart(2, "0");
  
  checkMatch();
}

function checkMatch(){
  const firstImg = firstCard.dataset.image;
  const secondImg = secondCard.dataset.image;

  if(firstImg === secondImg){
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    firstCard.classList.add("match-animation");
    secondCard.classList.add("match-animation");

    if(document.querySelectorAll(".cardItems.matched").length == cards.length){
      clearInterval(timeId);
      endGame(true);
    }

    resetTurn();
  }
  else{
    lockBoard=true;
    setTimeout(()=>{
      firstCard.querySelector("img").src = "images/theCards/questionCard.png";
      secondCard.querySelector("img").src = "images/theCards/questionCard.png";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 1000)
  }
}
function resetTurn(){
  firstCard =null;
  secondCard =null;
  lockBoard=false;
}


//timer logic

let timeLeft = 5 * 60;
let timeId = null;

function startTimer(){
  timeId = setInterval(()=>{
    if(timeLeft<=0){
      clearInterval(timeId);
      endGame(false);
    }
    else{
      timeLeft--;
      updateTimerDisplay();
    }
  }, 1000)
}

function updateTimerDisplay(){
  let minuts = Math.floor(timeLeft/60);
  let seconds = timeLeft % 60;

  timerCounter.textContent = `${minuts.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`
}



// end game results
function endGame(won) {
  setTimeout(() => {
    if (won) {
      alert(`Conrats!`);
    } else {
      alert("Time's up! Game Over");
    }
    btnClicked = false;
    gameStarted = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    moves = 0;
    movesCounter.textContent = "00";
    timeLeft = (5 * 60);
    updateTimerDisplay();
    restartingCards();
    playBtn.disabled = false;
    restartBtn.disabled = true;

  }, 500);
}

//mode
const mode = document.getElementById("mode");
const nav = document.querySelector("nav");
const header = document.querySelector("header");


let darkMode = false;

mode.addEventListener("click", changeMode);

function changeMode() {
  if (!darkMode) {
    nav.style.backgroundColor = "#000";
    header.style.backgroundColor = "#000000ca";
  } else {
    nav.style.backgroundColor = "";
    header.style.backgroundColor = "";
  }
  darkMode = !darkMode;
}