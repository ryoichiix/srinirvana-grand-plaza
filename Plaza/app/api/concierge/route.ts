import { NextRequest, NextResponse } from "next/server";
import { HOTEL_SYSTEM_PROMPT } from "@/lib/hotelKnowledge";

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  role: "user" | "model";
  parts: GeminiPart[];
}

interface RequestBody {
  messages: ConversationMessage[];
  userMessage: string;
}

export async function POST(request: NextRequest) {
  console.log("API Key exists:", !!process.env.GEMINI_API_KEY);
  console.log(
    "API Key first 10 chars:",
    process.env.GEMINI_API_KEY?.substring(0, 10)
  );

  try {
    const body: RequestBody = await request.json();
    const { messages, userMessage } = body;

    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Build Gemini conversation history
    // Gemini uses "user" / "model" roles (not "assistant")
    // History must alternate: user → model → user → model...
    const conversationHistory: GeminiContent[] = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    // Ensure the final message is the current user message
    const lastMsg = conversationHistory[conversationHistory.length - 1];
    if (!lastMsg || lastMsg.parts[0].text !== userMessage || lastMsg.role !== "user") {
      conversationHistory.push({
        role: "user",
        parts: [{ text: userMessage }],
      });
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: HOTEL_SYSTEM_PROMPT }],
        },
        contents: conversationHistory,
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini error response:", errorText);
      return NextResponse.json(
        { error: "Failed to get AI response" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content: string =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "I apologize, I couldn't process that request.";

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Concierge API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
