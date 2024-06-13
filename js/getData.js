const OpenAI = require("openai");

const openai = new OpenAI();

module.exports = async function getSpeech(text) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: text }],
    model: "gpt-3.5-turbo",
  });

  // const data = completion.choices[0];
  const data = completion.choices[0].message.content.trim();
  let arr = data.split("\n");
  arr = arr.filter((t) => t.length !== 0);
  const title = arr.shift().replace("Title:", "");
  const speech = arr;
  return {
    title,
    speech,
  };
};
// (async () => {
//   await getSpeech();
// })();
