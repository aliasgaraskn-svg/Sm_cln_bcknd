const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = "AIzaSyBlSaDbqqTKdYn8RNujnxnhR9MyH6FdSH0";

async function listModels() {
  const genAI = new GoogleGenerativeAI(apiKey);
  try {
    const models = await genAI.listModels();
    console.log("Available Models:");
    models.models.forEach(m => console.log(m.name));
  } catch (e) {
    console.error("Error listing models:", e);
  }
}

listModels();
