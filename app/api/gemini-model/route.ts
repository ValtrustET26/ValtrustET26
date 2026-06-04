import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request): Promise<Response> {
    try {
        const data = await req.json();
        const prompt = data.text || "Explain how AI works";
        const system = data.system || "";
        const history = data.history || [];

        // Pass systemInstruction when initializing the model
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API || "");
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: system,
        });

        // Convert history to Gemini's expected format (assistant -> model)
        const formattedHistory = history.map((msg: { role: string; content: string }) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
        }));

        // Start a chat session with the formatted history and send the new message
        const chat = model.startChat({ history: formattedHistory });
        const result = await chat.sendMessage(prompt);
        const summaryText = result.response.text();

        return new Response(
            JSON.stringify({ summary: String(summaryText) }),
            { headers: { "Content-Type": "application/json" } },
        );

    } catch (error) {
        console.error("Gemini API error:", error);
        return new Response(
            JSON.stringify({ error: String(error) }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
}