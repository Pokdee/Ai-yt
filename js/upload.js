const { upload } = require("youtube-videos-uploader");
const fs = require("fs");

module.exports = async function uploader(
  mail,
  password,
  recoveryMail,
  titleText
) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const credentials = {
        email: mail,
        pass: password,
        recoveryemail: recoveryMail,
      };
      // const content = {
      //   path: "./content/main.mp4",
      //   title: `${metaData.title}`,
      //   description: `${metaData.disc}`,
      //   tags: ["howto"],
      //   isNotForKid: true,
      //   publishType: "PUBLIC",
      //   thumbnail: `${metaData.thumbnail}`,
      // };
      // minimum required options to upload video
      const video1 = {
        path: "./content.mp4",
        title: titleText,
        description: "something new for life",
        tags: ["life", "wisdom"],
        isNotForKid: true,
        publishType: "PUBLIC",
      };
      upload(credentials, [video1], { headless: false }).then(console.log());
      resolve();
    }, 20000);
  });
};

// uploader(email, pass, recovery);
///
//
///
///
//
//

// fs.rm(
//   "C:/Users/losel/OneDrive/Desktop/Wikihow/audio",
//   { recursive: true },
//   (err) => {
//     if (err) {
//       return console.error("Error creating directory:", err);
//     }
//     console.log("Directory created successfully!");
//   }
// );
// fs.rm(
//   "C:/Users/losel/OneDrive/Desktop/Wikihow/video",
//   { recursive: true },
//   (err) => {
//     if (err) {
//       return console.error("Error creating directory:", err);
//     }
//     console.log("Directory created successfully!");
//   }
// );
// fs.rm(
//   "C:/Users/losel/OneDrive/Desktop/Wikihow/image",
//   { recursive: true },
//   (err) => {
//     if (err) {
//       return console.error("Error creating directory:", err);
//     }
//     console.log("Directory created successfully!");
//   }
// );
