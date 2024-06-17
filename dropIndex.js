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
const soundBarWrapper = document.getElementsByClassName("soundbar-wrapper");

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

console.log(soundBarWrapper);

const handleClassChangeToRect = () => {
    audio.pause();
    soundBarArray.forEach((soundBar) => {
        soundBar.className = "rectangle";
    });
    audio.play();
};
const handleClassChangeToCircle = () => {
    audio.pause();
    soundBarArray.forEach((soundBar) => {
        soundBar.className = "circle";
    });
    audio.play();
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
        const level1 = Math.floor(fbcArray[0] * 0.6);
        const level2 = Math.floor(fbcArray[1] * 0.6);
        const level3 = Math.floor(fbcArray[2] * 0.6);
        const level4 = Math.floor(fbcArray[3] * 0.6);
        const level5 = Math.floor(fbcArray[4] * 0.6);
        const level6 = Math.floor(fbcArray[5] * 0.6);
        const level7 = Math.floor(fbcArray[6] * 0.6);
        const level8 = Math.floor(fbcArray[7] * 0.6);
        const level9 = Math.floor(fbcArray[8] * 0.6);
        const level10 = Math.floor(fbcArray[9] * 0.6);
        const level11 = Math.floor(fbcArray[10] * 0.6);

        const levelsArray = [
            level1,
            level2,
            level3,
            level4,
            level5,
            level6,
            level7,
            level8,
            level9,
            level10,
            level11
        ];

        if (soundBar1.classList.contains("circle")) {
            soundBarArray.forEach((soundBar, index) => {
                const level = levelsArray[index];
                soundBar.style.width = "5px";
                soundBar.style.transform = `translate(-50%, -50%) scale(${level})`;
                soundBarWrapper[0].style.display = "flex";
                soundBarWrapper[0].style.gap = "100px";
                soundBarWrapper[0].style.marginLeft = "20vw";
                soundBarWrapper[0].style.marginTop = "20%";
                soundBarWrapper[0].style.marginRight = "auto";
                soundBar.style.margin = `${level}`;
            });
        } else {
            soundBarArray.forEach((soundBar, index) => {
                const level = levelsArray[index];
                soundBar.style.transform = "none";
                soundBar.style.margin = "10px";
                soundBar.style.width = `${level}%`;
                soundBarWrapper[0].style.display = "block";
                soundBarWrapper[0].style.gap = "100px";
                soundBarWrapper[0].style.marginLeft = "0";
                soundBarWrapper[0].style.marginTop = "0";
                soundBarWrapper[0].style.marginRight = "0";
            });
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
