let RandomNumber = Math.floor(Math.random() * 100) + 1;
let Tries = 0;
const refreshBtn = document.getElementById("btnRefresh");
let highscore = localStorage.getItem('highscore');
let winSound = new Audio('sounds/win.mp3');
let highscoreSound = new Audio('sounds/highscore.mp3');
let clickSound = new Audio('sounds/click.mp3');
let soundAn = true;
let musikAn = true;

document.getElementById('bgMusic').volume = 0.5;

const slider = document.getElementById('volume');
const music = document.getElementById('bgMusic');

slider.addEventListener('input', () => {
    if (!music) return;
    music.volume = slider.value;
});

if (highscore === null) {
    highscore = Infinity;
} else {
    highscore = Number(highscore);
}

document.getElementById('highscore').innerHTML =
    'Highscore: ' + (highscore === Infinity ? '-' : highscore);

function toggleSound() {
    soundAn = !soundAn;

    if (soundAn) {
        document.getElementById('sound').innerHTML = '🔊 Sound: An';
    } else {
        document.getElementById('sound').innerHTML = '🔇 Sound: Aus';
    }
}

function toggleMusic() {
    musikAn = !musikAn;

    if (!musikAn) {
        document.getElementById('music').innerHTML = '🎵 Musik: An';
        document.getElementById('bgMusic').play();
    } else {
        document.getElementById('music').innerHTML = '🎵 Musik: Aus';
        document.getElementById('bgMusic').pause();
    }
}
    

function handleClick() {
  window.location.reload();
}

function Easy() {
    if (soundAn) {
    clickSound.play();
    }

    RandomNumber = Math.floor(Math.random() * 50) + 1;
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = '#38CC1D';
}

function Medium() {
    if (soundAn) {
    clickSound.play();
    }

    RandomNumber = Math.floor(Math.random() * 100) + 1;
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = '#c4a733';
}

function Hard() {
    if (soundAn) {
    clickSound.play();
    }

    RandomNumber = Math.floor(Math.random() * 500) + 1;
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = '#a93a3a';
}

refreshBtn.addEventListener("click", handleClick);

function GuessTheNumber() {

    Tries = Tries + 1;
    TriesNumber.innerHTML = 'Versuche: ' + Tries 

    if(RandomNumber == Guess.value){
        Headline.innerHTML = 'Du hast Gewonnen!!!';
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
        if(soundAn) {
        winSound.play();
        }
        if (Tries < highscore) {
    highscore = Tries;
    localStorage.setItem('highscore', highscore);
    document.getElementById('highscore').innerHTML =
        'Highscore: ' + highscore;
        highscoreSound.play();
}
    }

    if(RandomNumber > Guess.value){
    if (soundAn) {
    clickSound.play();
    }
        Headline.innerHTML = 'Zu Niedrig!!!';
    }

    if(RandomNumber < Guess.value){
    if (soundAn) {
    clickSound.play();
    }
        Headline.innerHTML = 'Zu Hoch!!!';
    }

    Guess.value = '';
}



