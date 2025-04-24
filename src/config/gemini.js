import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyDj3dByQ3z19xSfTMlpQnDcxodnOcyLrUk";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
      const chatSession = model.startChat({
          generationConfig,
          history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      if (result?.response?.text) {
          return result.response.text;
      } else {
          throw new Error("No text response received from the API.");
      }
  } catch (error) {
      console.error("Error in API call:", error);
      throw error; // rethrow the error to handle it at the caller
  }
}

export default run;
