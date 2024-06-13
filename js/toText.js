const OpenAI = require("openai");
const axios = require("axios");
const fs = require("fs");
const { start } = require("repl");

const openai = new OpenAI();

module.exports = async function sub(audio) {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(audio),
    model: "whisper-1",
    response_format: "srt",
    // timestamp_granularities: ["segment"],
  });

  // console.log(typeof transcription);
  fs.writeFile("subtitle.srt", transcription, (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("File has been written");
    }
  });
};
