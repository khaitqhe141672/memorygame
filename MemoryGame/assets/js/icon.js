const btnStartGame = document.querySelector('#btn-start-game');
const btnRestart = document.querySelector('#btnRestart');
const playAgain = document.querySelector('#btn-play-again');
const reload = document.querySelector('#btn-reload');
let matchedCard = document.getElementsByClassName("match");
var openedCards = [];

// lấy icon từ icon.json
const getIcons = async () => {
    try {
        const icon = await fetch("./assets/data/icon.json");
        const data = await icon.json();
        const nameIcon = data.icons;
        return nameIcon;
    } catch (e) {
        alert(e);
    }
}


const duplicateIcon = arr => {
    return arr.concat(arr);
}

// window.addEventListener("DOMContentLoaded", async function () {
//     const products = await getIcons();
//     const icon = duplicateIcon(products);
//     let count = 0;
//     for (let i = 0; i < 10; i++) {
//         // alert(icon[i].id);
//     }
// });
// add danh sách icon vào html
let arr = [];

function randomArr(dupIcon) {
    let currentIndex = dupIcon.length,
        temporaryValue, html = ``;
    while (currentIndex !== 0) {
        let random = Math.floor(Math.random() * currentIndex);
        html += `<li class="card" type="${dupIcon[random].id}">${dupIcon[random].name}</li>`
        currentIndex -= 1;
        temporaryValue = dupIcon[currentIndex];
        dupIcon[currentIndex] = dupIcon[random];
        dupIcon[random] = temporaryValue;
    }
    document.getElementById('card-deck').innerHTML = html;
}

function numberIcons(arrayItem, numberSize) {
    let icon = [];
    for (let i = 0; i < numberSize; i++) {
        icon[i] = arrayItem[i];
        // card[i] = arrayItem[i];
    }
    const dupIcon = duplicateIcon(icon);
    randomArr(dupIcon);
    move();
}

function checkWin() {
    let size = arr.length;
    let cardIcon = [...matchedCard];
    if (cardIcon.length == size) {
        second = 0;
        minute = 0;
        hour = 0;
        var timer = document.querySelector(".timer");
        timer.innerHTML = "0 mins 0 secs";
        document.getElementById('game').style.display = 'none';
        document.getElementById('end-game').style.display = 'block';
    }
}

var displayCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

function disable() {
    Array.prototype.filter.call(arr, function (card) {
        card.classList.add('disabled');
    });
}

function enable() {
    Array.prototype.filter.call(arr, function (card) {
        card.classList.remove('disabled');
        for (let i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add('disabled');
        }
    })
}

function unMatched() {
    openedCards[0].classList.add('unmatched');
    openedCards[1].classList.add('unmatched');
    disable();
    setTimeout(function () {
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
        enable();
        openedCards = [];
    }, 1500);
}

function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

function cardOpen() {
    openedCards.push(this);
    let show = openedCards.length;
    let size = arr.length;

    if (show == 2) {
        if (openedCards[0].type === openedCards[1].type) {
            let cardIcon = [...matchedCard];
            if (cardIcon.length == size) {
                document.getElementById('game').style.display = 'none';
                document.getElementById('end-game').style.display = 'block';
            } else {
                matched();
            }
        } else {
            unMatched();
        }
    }
}

// thời gian chơi game
var second = 0,
    minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + "    mins    " + second + "    secs";
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

function move(){
    let card = document.getElementsByClassName("card");
    let cards = [...card];
    let cardIcon = [...matchedCard];
    for (let i = 0; i < cards.length; i++) {
        card = cards[i];
        arr[i] = cards[i];
        card.addEventListener("click", displayCard);
        card.addEventListener("click", cardOpen);
        card.addEventListener("click", checkWin);
    };
}

btnStartGame.addEventListener('click', async function () {
    startTimer();
    const level = document.getElementById('level-option').value;
    document.getElementById('game').style.display = 'block';
    document.getElementById('start-game').style.display = 'none';
    const s = await getIcons();
    if (level == 1) {
        numberIcons(s, 4);
    } else if (level == 2) {
        numberIcons(s, 6);
    } else {
        numberIcons(s, 8);
    }
});

btnRestart.addEventListener('click', function () {
    document.getElementById('end-game').style.display = 'block';
    document.getElementById('game').style.display = 'none';
})

playAgain.addEventListener('click',  async function () {
    const s = await getIcons();
    randomArr(s)
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    move();
    document.getElementById('game').style.display = 'block';
    document.getElementById('end-game').style.display = 'none';
})

reload.addEventListener('click', function () {
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    document.getElementById('start-game').style.display = 'block';
    document.getElementById('end-game').style.display = 'none';
})