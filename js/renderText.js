const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");
const uploader = require("./upload.js");
const { email, pass, recovery } = require("../keys/keysData.js");

// Set the path to the FFmpeg binary
ffmpeg.setFfmpegPath(ffmpegPath);

// Input video and subtitle files
const inputVideo = "./input.mp4";
const inputSubtitles = "./subtitle.srt";
const outputVideo = "./output.mp4";
const font = "Reddit Mono Regular";

// Function to add subtitles to video
module.exports = async function addSubtitles(
  videoPath,
  subtitlesPath,
  outputPath,
  title
) {
  return new Promise((resolve, reject) => {
    let proc = ffmpeg(videoPath)
      .outputOptions(
        "-vf",
        `subtitles=${subtitlesPath}:force_style='Alignment=10,FontName=${font},FontSize=30'`
      )
      .output(outputPath)
      .on("end", async () => {
        console.log("Subtitles added successfully.");
        await uploader(email, pass, recovery, title);
      })
      .on("error", (err) => {
        console.error("Error adding subtitles: " + err.message);
      })
      .on("progress", (progress) => {
        if (progress.percent) {
          console.log(`Processing: ${progress.percent.toFixed(2)}% done`);
        }
      });

    proc.run();
    resolve();
  });
  console.log("add sub to vid");
};

// Call the function
// addSubtitles(inputVideo, inputSubtitles, outputVideo);
