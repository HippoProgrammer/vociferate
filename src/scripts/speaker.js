const synth = window.speechSynthesis;
const sentences = document.querySelector("#sentences");
const sentenceSubmit = document.querySelector("#sentenceSubmit");

const defaultPitch = 1;
const defaultRate = 1;

function getBestVoice() {
  const availableVoices = synth.getVoices();

  var bestVoice;
  var bestVoiceScore = 0;

  for (const voice of availableVoices) {
    var voiceScore = 0;
    if (voice.lang == "fr_FR") {
      voiceScore += 10
    };
    if (voice.default) {
      voiceScore += 1
    };

    if (voiceScore >= bestVoiceScore) {
      bestVoice = voice;
      bestVoiceScore = voiceScore;
    };
  };
  return bestVoice
}

function getRandomSentence() {
  const possibleSentences = sentences.value.split("\n");
  const randomSentence = possibleSentences[Math.floor(Math.random() * possibleSentences.length)];
  return randomSentence;
}

/* fetch  */
sentenceSubmit.addEventListener("click", function (e) {
  sentenceSubmit.disabled = true;
  const sentenceSpeak = new SpeechSynthesisUtterance(getRandomSentence());
  const voice = getBestVoice();
  if (voice == "0") {
    console.error("No speech synthesis voices found.")
    return
  };
  sentenceSpeak.voice = voice;
  sentenceSpeak.pitch = defaultPitch;
  sentenceSpeak.rate = defaultRate;
  synth.speak(sentenceSpeak);
  sentenceSpeak.onend = () => {
    sentenceSubmit.disabled = false;
  };
});
