const audioNvideo = require("./js/audioNvid");
const audioMerger = require("./js/mergeAudio");
const getSpeech = require("./js/getData");
const addSubtitles = require("./js/renderText");
const sub = require("./js/toText");
const speech = require("./js/voiceover");
const audioNvid = require("./js/audioNvid");
//

//
const timer = (ms) => new Promise((r) => setTimeout(r, ms));
function getRandomNumber() {
  return Math.floor(Math.random() * 8) + 1;
}

//
const topic = [
  "motivational speech about life",
  "short story about living best life",
  "short story about courage",
  "short story about true love",
  "short story about taking chances",
  "short story with greek myth",
  "short story about friendship",
  "short story about not living in past",
];

//
(async function () {
  //pick a topic

  let contextNumRandom = getRandomNumber();

  //get data

  let text = await getSpeech(`${topic[contextNumRandom]} and title for it`);
  const title = text.title;
  const data = text.speech;
  console.log("got data");

  //voice over data by one

  for (let i = 0; i < data.length; i++) {
    await speech(data[i], `./audio/speech${i}.mp3`);
    await timer(60000);
    console.log(i + 1, "audio done");
  }
  console.log("audio finish");

  //merge audio

  let audioFile = [];
  for (let i = 0; i < data.length; i++) {
    audioFile.push(`speech${i}.mp3`);
  }
  audioMerger(audioFile);
  await timer(10000);
  console.log("merge audio");

  //sub to audio

  let audio = "./audio.mp3";
  await sub(audio);
  await timer(10000);
  console.log("got sub");

  let imgNum = getRandomNumber();
  const image = `./image/image (${imgNum}).jpg`;
  const output = "./video.mp4";
  // const subtitleFile = "./subtitle.srt";
  // const finalOutput = "./content.mp4";

  // Create video from image and audio
  console.log("Creating video...");
  await audioNvideo(image, audio, output, title);
})();
