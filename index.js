import express from "express";
import bodyParser from "body-parser";
import { OpenAI } from "openai";
import cors from "cors";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/", async (req, res) => {
  const { message } = req.body;
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "user",
        content: `Get me a really funny quote from ${message} , and only return the quote remove their name from the end`,
      },
    ],
  });

  res.json({ completion: completion.choices[0].message.content });
});

app.listen(3000, () => {
  console.log(` app listening at http://localhost:3000`);
});
