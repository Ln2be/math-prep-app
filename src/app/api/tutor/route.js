import axios from "axios";
import http from "http";
import https from "https";
import { buildSystemPrompt } from "@/lib/prompts";

// Force IPv4 to avoid ENETUNREACH / ETIMEDOUT errors on Linux
const httpAgent = new http.Agent({ family: 4 });
const httpsAgent = new https.Agent({ family: 4 });

const CURRENT_MODEL = process.env.AI_MODEL || "openai/gpt-4o-mini";

export async function POST(req) {
  try {
    const { chatHistory, lessonContext, question } = await req.json();
    
    const systemPrompt = buildSystemPrompt(lessonContext);

    let messagesArray = [
      { role: "system", content: systemPrompt }
    ];

    if (chatHistory && chatHistory.length > 0) {
      const formattedHistory = chatHistory.map(m => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.content
      }));
      messagesArray = [...messagesArray, ...formattedHistory];
    } else if (question) {
      messagesArray.push({ role: "user", content: question });
    }

    console.log("Using AI Model:", CURRENT_MODEL);

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
      httpAgent,   // Force IPv4
      httpsAgent,  // Force IPv4
      timeout: 30000
    });

    const text = response.data.choices[0].message.content;

    return Response.json({ reply: text });
  } catch (error) {
    console.error("Server Error:", error.message);
    if (error.code === 'ECONNABORTED' || error.code === 'ENETUNREACH' || error.code === 'ETIMEDOUT') {
      return Response.json({ error: "Network connection issue. Please try again." }, { status: 504 });
    }
    return Response.json({ error: error.message || "Failed to get response from AI" }, { status: 500 });
  }
}