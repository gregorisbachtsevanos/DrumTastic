function createDrumKey(keyCode, keyLabel, soundName, audioSrc) {
    const container = document.getElementById('drumKitContainer');
    const keyDiv = document.createElement('div');
    keyDiv.classList.add('row', 'key');
    keyDiv.setAttribute('data-key', keyCode);

    const keyLabelElement = document.createElement('kbd');
    keyLabelElement.textContent = keyLabel;
    keyDiv.appendChild(keyLabelElement);

    const soundSpan = document.createElement('span');
    soundSpan.classList.add('sound');
    soundSpan.textContent = soundName;
    keyDiv.appendChild(soundSpan);

    const audioElement = document.createElement('audio');
    audioElement.setAttribute('data-key', keyCode);
    audioElement.src = audioSrc;

    keyDiv.addEventListener('transitionend', removeTransition);

    container.appendChild(keyDiv);
    document.body.appendChild(audioElement);
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

const drumKitData = [
    { keyCode: 65, keyLabel: 'A', soundName: 'hihat', audioSrc: 'public/sounds/clap.wav' },
    { keyCode: 83, keyLabel: 'S', soundName: 'crash', audioSrc: 'public/sounds/Hi-Hat-Closed.mp3' },
    { keyCode: 68, keyLabel: 'D', soundName: 'openhat', audioSrc: 'public/sounds/Kick.mp3' },
    { keyCode: 70, keyLabel: 'F', soundName: 'rackTom', audioSrc: 'public/sounds/High-Hat-Open.mp3' },
    { keyCode: 71, keyLabel: 'G', soundName: 'snare', audioSrc: 'public/sounds/Big-Rack-Tom.mp3' },
    { keyCode: 72, keyLabel: 'H', soundName: 'clap', audioSrc: 'public/sounds/Crash.mp3' },
    { keyCode: 74, keyLabel: 'J', soundName: 'tom', audioSrc: 'public/sounds/Snare.mp3' },
    { keyCode: 75, keyLabel: 'K', soundName: 'floorTom', audioSrc: 'public/sounds/Tom.mp3' },
    { keyCode: 76, keyLabel: 'L', soundName: 'kick', audioSrc: 'public/sounds/Floor-Tom.mp3' },
];

drumKitData.forEach((drumKeyData) => {
    createDrumKey(drumKeyData.keyCode, drumKeyData.keyLabel, drumKeyData.soundName, drumKeyData.audioSrc);
});

const container = document.getElementById("sound-wave-container");
const waveIds = ["firstWave", "secondWave", "thirdWave"];

function createWaveElement(id) {
    const waveDiv = document.createElement("div");
    waveDiv.classList.add("sound-wave");
    waveDiv.setAttribute("id", id);
    container.appendChild(waveDiv);
}

waveIds.forEach(createWaveElement);

function playSound(e) {
    const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
    const key = document.querySelector(`.key[data-key='${e.keyCode}']`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach((key) => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);

const firstWave = document.getElementById("firstWave");
const secondWave = document.getElementById("secondWave");
const thirdWave = document.getElementById("thirdWave");

const firstWaveKeys = [65, 70, 74];
const secondWaveKeys = [83, 71, 75];
const thirdWaveKeys = [68, 72, 76];

window.addEventListener("keydown", function (event) {
    if (firstWaveKeys.includes(event.which)) {
        firstWave.style.animation = "soundWave 1s";
        firstWave.addEventListener("animationend", function () {
            firstWave.style.animation = "";
        });
    } else if (secondWaveKeys.includes(event.which)) {
        secondWave.style.animation = "soundWave 1s";
        secondWave.addEventListener("animationend", function () {
            secondWave.style.animation = "";
        });
    } else if (thirdWaveKeys.includes(event.which)) {
        thirdWave.style.animation = "soundWave 1s";
        thirdWave.addEventListener("animationend", function () {
            thirdWave.style.animation = "";
        });
    }
});