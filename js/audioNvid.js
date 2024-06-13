const ffmpeg = require("fluent-ffmpeg");
const addSubtitles = require("./renderText");
const timer = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = async function audioNvideo(image, audio, output, title) {
  ffmpeg()
    .input(image)
    .inputOption("-loop 1")
    .input(audio)
    .videoFilter("scale=1920:1080:flags=lanczos")
    .outputOptions([
      "-preset veryfast", // Use a faster preset
      "-crf 23", // Adjust constant rate factor for faster encoding
      "-c:v libx264",
      "-tune stillimage",
      "-c:a aac",
      "-b:a 192k",
      "-shortest",
      "-threads 4", // Utilize multiple CPU cores
      "-movflags +faststart", // Optimize for web streaming
    ])
    .on("start", (commandLine) => {
      console.log("Spawned FFmpeg with command: " + commandLine);
    })
    .on("progress", (progress) => {
      console.log("Processing: " + progress.percent + "% done");
    })
    .on("error", (err, stdout, stderr) => {
      console.error("An error occurred: " + err.message);
      console.error("ffmpeg stderr: " + stderr);
    })
    .on("end", async () => {
      console.log("Processing finished!");
      await timer(10000);

      const output = "./video.mp4";
      const subtitleFile = "./subtitle.srt";
      const finalOutput = "./content.mp4";

      console.log("Adding subtitles...");
      await addSubtitles(output, subtitleFile, finalOutput, title);
      console.log("Subtitles added, final video created");
    })
    .save(output);
};
