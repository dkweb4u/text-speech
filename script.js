const speech = new SpeechSynthesisUtterance();
let voices = [];
const voiceSelect = document.querySelector("select");

// Load voices properly
function loadVoices() {
    voices = speechSynthesis.getVoices();

    if (voices.length === 0) {
        // Voices not ready yet → wait and retry
        return setTimeout(loadVoices, 100);
    }

    voiceSelect.innerHTML = ""; // clear old list

    voices.forEach((voice, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = voice.name;
        voiceSelect.appendChild(option);
    });

    speech.voice = voices[0]; // default
}

loadVoices();

// Also trigger when voiceschange event fires
speechSynthesis.onvoiceschanged = loadVoices;

// Change voice
voiceSelect.addEventListener("change", ()=>{
    speech.voice = voices[voiceSelect.value];
});

// Speak
document.querySelector("button").addEventListener("click", ()=>{
    speech.text = document.querySelector("textarea").value;
    speechSynthesis.speak(speech);
});
