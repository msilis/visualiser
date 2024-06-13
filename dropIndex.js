const audio = document.createElement("audio");
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
const choiceButtonCircle = document.getElementById("choiceButtonCircle");
const choiceButtonRectangle = document.getElementById("choiceButtonRectangle");

const soundBarArray = [
    soundBar1,
    soundBar2,
    soundBar3,
    soundBar4,
    soundBar5,
    soundBar6,
    soundBar7,
    soundBar8,
    soundBar9,
    soundBar10,
    soundBar11
];

document.body.appendChild(audio);

const handleClassChangeToRect = () => {
    soundBarArray.forEach((soundBar) => {
        soundBar.className = "rectangle";
    });
};
const handleClassChangeToCircle = () => {
    soundBarArray.forEach((soundBar) => {
        soundBar.className = "circle";
    });
};

choiceButtonCircle.addEventListener("click", handleClassChangeToCircle);
choiceButtonRectangle.addEventListener("click", handleClassChangeToRect);

window.onload = function () {
    function onDrop(event) {
        event.stopPropagation();
        event.preventDefault();
        let droppedFile = event.dataTransfer.files;
        const audioBlob = new Blob(droppedFile);
        startAudio(audioBlob);
    }
    ["dragenter", "dragover", "dragleave"].forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    window.addEventListener("drop", onDrop);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    const startVisualiser = () => {
        source = context.createMediaElementSource(audio);
        analyser = context.createAnalyser();
        console.log(analyser);
        source.connect(context.destination);
        source.connect(analyser);
        animationId = updateVisual(analyser);
    };

    const startAudio = (audioFile) => {
        audio.src = URL.createObjectURL(audioFile);
        audio.autoplay = true;
        startContext();
        audio.play();
        startVisualiser();
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

        if (soundBar1.classList.contains("circle")) {
            soundBar1.style.transform = `translate(-50%, -50%) scale(${level1})`;
            soundBar2.style.transform = `translate(-50%, -50%) scale(${level2})`;
            soundBar3.style.transform = `translate(-50%, -50%) scale(${level3})`;
            soundBar4.style.transform = `translate(-50%, -50%) scale(${level4})`;
            soundBar5.style.transform = `translate(-50%, -50%) scale(${level5})`;
            soundBar6.style.transform = `translate(-50%, -50%) scale(${level6})`;
            soundBar7.style.transform = `translate(-50%, -50%) scale(${level7})`;
            soundBar8.style.transform = `translate(-50%, -50%) scale(${level8})`;
            soundBar9.style.transform = `translate(-50%, -50%) scale(${level9})`;
            soundBar10.style.transform = `translate(-50%, -50%) scale(${level10})`;
            soundBar11.style.transform = `translate(-50%, -50%) scale(${level11})`;
        } else {
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
        }

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
};
