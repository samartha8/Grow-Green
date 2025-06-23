const axios = require("axios");

const SYSTEM_PROMPT = `
You are Chori, a friendly and supportive virtual companion who helps with menstrual health and wellness.
Keep responses under 2 sentences and reply quickly upto 5sec.
Use simple language and emojis when helpful.
Avoid long answers or unnecessary detail — just give what's essential quickly.
`;

exports.askChori = async (req, res) => {
  const userQuestion = req.body.question;
  if (!userQuestion) {
    return res.status(400).json({ error: "Question is required." });
  }

  try {
    const response = await axios.post("http://localhost:11434/api/chat", {
      model: "llama3",
      stream: false,
      messages: [
        { role: "system", content: SYSTEM_PROMPT.trim() },
        { role: "user", content: userQuestion },
      ],
    });

    const answer = response.data.message.content;
    res.json({ answer });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to generate response from Chori." });
  }
};
