const audio = document.createElement("audio");
const audioSource = "DUSK27April2015.mp3";
const playButton = document.getElementById("playButton");
let context = new AudioContext();
let animationId = null;
const soundBar1 = document.getElementById("soundbar1");
const soundBar2 = document.getElementById("soundbar2");
const soundBar3 = document.getElementById("soundbar3");
const soundBar4 = document.getElementById("soundbar4");
const soundBar5 = document.getElementById("soundbar5");
const soundBar6 = document.getElementById("soundbar6");
const soundBar7 = document.getElementById("soundbar7");
const soundBar8 = document.getElementById("soundbar8");
const soundBar9 = document.getElementById("soundbar9");
const soundBar10 = document.getElementById("soundbar10");
const soundBar11 = document.getElementById("soundbar11");

fetch(audioSource, { mode: "no-cors" })
    .then((response) => response.blob())
    .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        audio.src = objectURL;
        playButton.innerHTML = "Play";
    })
    .catch((error) => {
        console.error("Error fetching audio:", error);
    });

playButton.innerHTML = "Play";

document.body.appendChild(audio);

const toggleAudio = () => {
    if (!audio) return;
    if (audio.paused) {
        audio.play();
        startVisualiser();
        playButton.innerHTML = "Pause";
    } else {
        audio.pause();
        playButton.innerHTML = "Play";
        stopVisualiser();
    }
};

playButton.addEventListener("click", toggleAudio);

const startVisualiser = () => {
    source = context.createMediaElementSource(audio);
    analyser = context.createAnalyser();
    source.connect(context.destination);
    source.connect(analyser);
    animationId = updateVisual(analyser);
};

const updateVisual = (analyser) => {
    const fbcArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbcArray);
    const level1 = fbcArray[0];
    const level2 = fbcArray[1];
    const level3 = fbcArray[2];
    const level4 = fbcArray[3];
    const level5 = fbcArray[4];
    const level6 = fbcArray[5];
    const level7 = Math.floor(fbcArray[6] * 0.5);
    const level8 = Math.floor(fbcArray[7] * 0.5);
    const level9 = Math.floor(fbcArray[8] * 0.5);
    const level10 = Math.floor(fbcArray[9] * 0.5);
    const level11 = fbcArray[10];

    soundBar1.style.width = `${level1}%`;
    soundBar2.style.width = `${level2}%`;
    soundBar3.style.width = `${level3}%`;
    soundBar4.style.width = `${level4}%`;
    soundBar5.style.width = `${level5}%`;
    soundBar6.style.width = `${level6}%`;
    soundBar7.style.width = `${level7}%`;
    soundBar8.style.width = `${level8}%`;
    soundBar9.style.width = `${level9}%`;
    soundBar10.style.width = `${level10}%`;
    soundBar11.style.width = `${level11}%`;

    animationId = requestAnimationFrame(() => updateVisual(analyser));
};

const stopVisualiser = () => {
    cancelAnimationFrame(animationId);
    animationId = null;
    audio.pause();
};

audio.addEventListener("ended", stopVisualiser);

const startContext = async () => {
    await context.resume();
};
