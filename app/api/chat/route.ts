import { GoogleGenAI, type GenerateContentResponse, type Part } from "@google/genai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatRole = "user" | "model";

interface ChatHistoryItem {
  role: ChatRole;
  parts: Part[];
}

interface ChatRequestBody {
  message?: string;
  history?: ChatHistoryItem[];
}

const encoder = new TextEncoder();

function writeSseChunk(controller: ReadableStreamDefaultController, data: string) {
  controller.enqueue(encoder.encode(`data: ${data}\n\n`));
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("[chat:error] Missing GEMINI_API_KEY");
    return NextResponse.json({ error: "Missing server configuration." }, { status: 500 });
  }

  let body: ChatRequestBody;

  try {
    body = await request.json();
  } catch (error) {
    console.error("[chat:error] Invalid JSON body", error);
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const message = body.message?.trim();

  if (!message) {
    console.error("[chat:error] Empty message received");
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const history = (Array.isArray(body.history) ? body.history : [])
    .filter((item): item is ChatHistoryItem => {
      if (!item) return false;
      if (item.role !== "user" && item.role !== "model") return false;
      if (!Array.isArray(item.parts)) return false;
      return item.parts.every((part) => typeof part?.text === "string");
    })
    .map((item) => ({
      role: item.role,
      parts: item.parts.map((part) => ({ text: part.text ?? "" })) as Part[],
    }));

  console.log("[chat:init]", {
    message,
    historyLength: history.length,
  });

  const ai = new GoogleGenAI({ apiKey });

  async function createStream() {
    const baseContents = history.map((item) => ({
      role: item.role,
      parts: item.parts,
    }));

    baseContents.push({
      role: "user" as const,
      parts: [{ text: message }],
    });

    return ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: baseContents,
    });
  }

  let contentStream: AsyncGenerator<GenerateContentResponse>;

  try {
    contentStream = await createStream();
  } catch (error) {
    console.error("[chat:error] Failed to create stream", error);
    return NextResponse.json({ error: "Failed to contact Gemini." }, { status: 500 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of contentStream) {
          const text = chunk.text ?? "";

          if (!text) continue;

          console.log("[chat:stream_chunk]", {
            length: text.length,
          });

          writeSseChunk(controller, text);
        }

        writeSseChunk(controller, "[DONE]");
        controller.close();
        console.log("[chat:close]");
      } catch (error) {
        console.error("[chat:error] Streaming failure", error);
        writeSseChunk(controller, "[ERROR]");
        controller.error(error);
      }
    },
    cancel(reason) {
      console.warn("[chat:cancel]", reason);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

