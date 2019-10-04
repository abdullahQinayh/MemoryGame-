
let card = document.getElementsByClassName("card");
const cards = [...card]; 
const deck = document.getElementById("card-deck");
let movesNum = 0;
let counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");
let matchedCards = document.getElementsByClassName("match");
let closeIcon = document.querySelector(".close");
let modal = document.getElementById("popup")
var chosenCards = [];
const playerScore = 0;


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }
  return array;
}



window.onload = startGame();
function startGame() {
    movesNum = 0;
    var shuffleCards = shuffle(cards);
    for (var i = 0; i < shuffleCards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function(item){
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");

    }
    movesNum = 0;
    counter.innerHTML = movesNum;
    for (var i = 0; i < stars.length; i++) {
    stars[i].style.color = "fff";
    stars[i].style.visibility = "visible";
}
    second = 0;
    minute = 0;
    hour = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}
  


function movesCounter() {
movesNum++;
counter.innerHTML = movesNum;
if (movesNum == 1) {
      second = 0;
      minute = 0;
      hour = 0;
      startTimer();
} 
// movesNum++;
    // moves.innerHTML = movesNum;

    if (movesNum > 8 && movesNum <= 15) {
        starsList[0].className = 'fa fa-star-o'
        stars[0].style.visibility = "hidden";

    } else if (movesNum > 16 && movesNum <= 23) {
        starsList[1].className = 'fa fa-star-o'
        stars[1].style.visibility = "hidden";

    } else if (movesNum > 24) {
        starsList[2].className = 'fa fa-star-o'
        // no need to hidden it becaouse we need the player to get at least one star 

    } 
}
   


var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
interval = setInterval(function() {
  timer.innerHTML = minute + " mins " + second + "secs";
  second++;
  if (second == 60) {
      minute++;
      second = 0;
  }
  if (minute == 60) {
      hour++;
      minute = 0;
  }
}, 1000);
}


var revealCard = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


function cardFlipper() {
    chosenCards.push(this);
    var flips = chosenCards.length;
    if(flips === 2 ) {
      movesCounter();
        if(chosenCards[0].type === chosenCards[1].type){
          matched();
        } else {
            unmatched();
        }
    }
}


function matched() {
    chosenCards[0].classList.add("match", "disabled","bounce");
    chosenCards[1].classList.add("match", "disabled","bounce");
    chosenCards[0].classList.remove("show", "open", "no-event",);
    chosenCards[1].classList.remove("show", "open", "no-event",);
    chosenCards = [];
}

function unmatched() {
    chosenCards[0].classList.add("unmatched","shake");
    chosenCards[1].classList.add("unmatched","shake");
    disabled();
    setTimeout(function() {
    chosenCards[0].classList.remove("show", "open", "no-event", "unmatched","wiggle");
    chosenCards[1].classList.remove("show", "open", "no-event", "unmatched","wiggle");
    enable();
    chosenCards = [];
    }, 1100);
}
function disabled() {
      Array.prototype.filter.call(cards, function(card){
        card.classList.add("disabled");
    });
}
function enable() {
    Array.prototype.filter.call(cards, function(card) {
      card.classList.remove("disabled");
      for (var i = 0; i < matchedCards.length; i++) {
          matchedCards[i].classList.add("disabled");
        }
    });
}
function playAgain() {
    modal.classList.remove("show");
    startGame();
}

function restartModal() {
    closeIcon.addEventListener("click", function(){
        modal.classList.remove("show");
        startGame();
    });
}
  
 var temp = 0;
    while(temp<cards.length){
        card = cards[temp];
    card.addEventListener("click", revealCard);
    card.addEventListener("click", cardFlipper);
    card.addEventListener("click", youWin);
        temp++;
    };

    function youWin() {
        if(matchedCards.length == 16) {
            clearInterval(interval);
            finalTime = timer.innerHTML;
      modal.classList.add("show");
        var starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("finalMove").innerHTML = movesNum;
        document.getElementById("star-rating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
          restartModal();
        };
    }    


