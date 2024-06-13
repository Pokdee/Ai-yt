const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

// List of audio files to merge
// const audioFiles = ["audio1.mp3", "audio2.mp3", "audio3.mp3"];

// Create a temporary file to store the list of audio files

module.exports = function audioMerger(audioFilesArray) {
  const fileList = "filelist.txt";
  fs.writeFileSync(
    fileList,
    audioFilesArray.map((file) => `file './audio/${file}'`).join("\n")
  );

  // Output file name
  const outputFile = "audio.mp3";

  // Use FFmpeg to concatenate the audio files
  ffmpeg()
    .input(fileList)
    .inputOptions("-f", "concat", "-safe", "0")
    .outputOptions("-c", "copy")
    .on("end", () => {
      console.log("Merging finished!");
      // Clean up temporary file
      fs.unlinkSync(fileList);
    })
    .on("error", (err) => {
      console.error("An error occurred: " + err.message);
    })
    .save(outputFile);
};
