// src/app/api/tutor/route.js
import axios from "axios";
import http from "http";
import https from "https";
import { buildSystemPrompt } from "@/lib/prompts";

const httpAgent = new http.Agent({ family: 4 });
const httpsAgent = new https.Agent({ family: 4 });
const CURRENT_MODEL = process.env.AI_MODEL || "openai/gpt-4o-mini";

export async function POST(req) {
  try {
    const { chatHistory, lessonContext, question, userContext } = await req.json();
    
    // تمرير userContext لبناء الـ Prompt
    const systemPrompt = buildSystemPrompt(lessonContext, userContext);

    let messagesArray = [{ role: "system", content: systemPrompt }];

    if (chatHistory && chatHistory.length > 0) {
      const formattedHistory = chatHistory.map(m => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.content
      }));
      messagesArray = [...messagesArray, ...formattedHistory];
    } else if (question) {
      messagesArray.push({ role: "user", content: question });
    }

    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: CURRENT_MODEL, 
      messages: messagesArray,
      temperature: 0.7,
      stream: false
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.AI_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000", 
        "X-Title": "Math Prep App"
      },
      httpAgent, httpsAgent, timeout: 30000
    });

    const text = response.data.choices[0].message.content;
    return Response.json({ reply: text });
  } catch (error) {
    console.error("Server Error:", error.message);
    return Response.json({ error: error.message || "Failed to get response from AI" }, { status: 500 });
  }
}