let Tries = 0;
const refreshBtn = document.getElementById("btnRefresh");
let highscore = localStorage.getItem('highscore');
let winSound = new Audio('sounds/win.mp3');
let highscoreSound = new Audio('sounds/highscore.mp3');
let clickSound = new Audio('sounds/click.mp3');
let soundAn = true;
let musikAn = true;
let difficulty = '';
let winsEasy = Number(localStorage.getItem('winsEasy')) || 0;
let winsMedium = Number(localStorage.getItem('winsMedium')) || 0;
let winsHard = Number(localStorage.getItem('winsHard')) || 0;
let rounds = Number(localStorage.getItem('rounds')) || 0;

document.getElementById('bgMusic').volume = 0.2;

document.getElementById('highscoreEasy').innerHTML =
    'Leicht: ' + (localStorage.getItem('highscoreEasy') || '-');

document.getElementById('highscoreMedium').innerHTML =
    'Mittel: ' + (localStorage.getItem('highscoreMedium') || '-');

document.getElementById('highscoreHard').innerHTML =
    'Schwer: ' + (localStorage.getItem('highscoreHard') || '-');

    document.getElementById('rounds').innerHTML =
    '🎮 Spiele: ' + rounds;

    document.getElementById('winsEasy').innerHTML =
    '🟢 Siege Leicht: ' + winsEasy;

document.getElementById('winsMedium').innerHTML =
    '🟡 Siege Mittel: ' + winsMedium;

document.getElementById('winsHard').innerHTML =
    '🔴 Siege Schwer: ' + winsHard;


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

    if (musikAn) {
        document.getElementById('music').innerHTML = '🎵 Musik: Aus';
        document.getElementById('bgMusic').pause();
    } else {
        document.getElementById('music').innerHTML = '🎵 Musik: An';
        document.getElementById('bgMusic').play();
    }
}
    

function handleClick() {
  window.location.reload();
}

function Easy() {
    rounds++;
localStorage.setItem('rounds', rounds);

document.getElementById('rounds').innerHTML =
    '🎮 Spiele: ' + rounds;
    difficulty = 'easy';
    if (soundAn) {
    clickSound.play();
    }

    RandomNumber = Math.floor(Math.random() * 50) + 1;
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = '#38CC1D';
}

function Medium() {
        rounds++;
localStorage.setItem('rounds', rounds);

document.getElementById('rounds').innerHTML =
    '🎮 Spiele: ' + rounds;
    difficulty = 'medium';
    if (soundAn) {
    clickSound.play();
    }

    RandomNumber = Math.floor(Math.random() * 100) + 1;
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = '#c4a733';
}

function Hard() {
        rounds++;
localStorage.setItem('rounds', rounds);

document.getElementById('rounds').innerHTML =
    '🎮 Spiele: ' + rounds;
    difficulty = 'hard';
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
        
if (difficulty === 'easy') {
    let highscoreEasy = Number(localStorage.getItem('highscoreEasy'));

    if (!highscoreEasy || Tries < highscoreEasy) {
        localStorage.setItem('highscoreEasy', Tries);
    }
}

if (difficulty === 'medium') {
    let highscoreMedium = Number(localStorage.getItem('highscoreMedium'));

    if (!highscoreMedium || Tries < highscoreMedium) {
        localStorage.setItem('highscoreMedium', Tries);
    }
}

if (difficulty === 'hard') {
    let highscoreHard = Number(localStorage.getItem('highscoreHard'));

    if (!highscoreHard || Tries < highscoreHard) {
        localStorage.setItem('highscoreHard', Tries);
    }
}

if (difficulty === 'easy') {
    winsEasy++;
    localStorage.setItem('winsEasy', winsEasy);
}

if (difficulty === 'medium') {
    winsMedium++;
    localStorage.setItem('winsMedium', winsMedium);
}

if (difficulty === 'hard') {
    winsHard++;
    localStorage.setItem('winsHard', winsHard);
}

document.getElementById('winsEasy').innerHTML =
    '🟢 Siege Leicht: ' + winsEasy;
document.getElementById('winsMedium').innerHTML =
    '🟡 Siege Mittel: ' + winsMedium;
document.getElementById('winsHard').innerHTML =
    '🔴 Siege Schwer: ' + winsHard;

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



    document.getElementById('Guess').value = '';
}
