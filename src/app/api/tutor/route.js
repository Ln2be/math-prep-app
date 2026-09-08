import OpenAI from "openai";

export async function POST(req) {
  try {
    const { question } = await req.json();

    // We initialize the OpenAI client, but point it to DeepSeek's or GLM's servers
    const client = new OpenAI({
      // USE ONE OF THE FOLLOWING BASE URLs:
      baseURL: "https://api.deepseek.com", // For DeepSeek
      // baseURL: "https://open.bigmodel.cn/api/paas/v4", // For GLM (uncomment if using GLM)
      
      apiKey: process.env.AI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      // USE ONE OF THE FOLLOWING MODELS:
      model: "deepseek-chat", // For DeepSeek
      // model: "glm-4-flash", // For GLM (uncomment if using GLM - it's free!)
      
      messages: [
        {
          role: "system",
          content: "You are an expert Mauritanian primary school math teacher. Your job is to help students prepare for the teaching exam. The student will ask you a question or provide a wrong answer. Explain the concept clearly in Arabic. Do NOT give the final direct answer. Guide them step-by-step using the Mauritanian curriculum methods (e.g., using the 7-column table for conversions, Delta for quadratic equations). Keep answers concise and encouraging."
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.7,
    });

    const text = completion.choices[0].message.content;

    return Response.json({ reply: text });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to get response from AI" }, { status: 500 });
  }
}