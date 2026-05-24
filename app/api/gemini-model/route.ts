import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API || "");
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    tools: [
        {
            codeExecution: {},
        },
    ],
});


/**
 * API route for generating content using Gemini AI model.
 */
export async function POST(req: Request): Promise<Response> {
    try {
        const data = await req.json();
        const prompt = data.text || "Explain how AI works";

        const result = await model.generateContent(prompt);

        const summaryText = result.response.text();

        return new Response(
            JSON.stringify({ summary: String(summaryText) }),
            { headers: { "Content-Type": "application/json" } },
        );

    } catch (error) {
        // This will now return JSON instead of crashing into an empty 500
        console.error("Gemini API error:", error);
        return new Response(
            JSON.stringify({ error: String(error) }),
            { status: 500, headers: { "Content-Type": "application/json" } },
        );
    }
}