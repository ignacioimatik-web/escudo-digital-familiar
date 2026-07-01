// API route for Sentinel AI Assistant
// Calls OpenCode ZEN API directly via HTTPS
// Uses OPENCODE_ZEN_API_KEY env var (set in Vercel & .env.local)

import { NextRequest, NextResponse } from "next/server"

const ZEN_API_URL = "https://opencode.ai/zen/v1/chat/completions"
const MODEL = "north-mini-code-free"

export async function POST(request: NextRequest) {
  try {
    const { messages, system } = await request.json()
    const apiKey = process.env.OPENCODE_ZEN_API_KEY || ""

    if (!apiKey) {
      return NextResponse.json({ response: "", fallback: true }, { status: 200 })
    }

    const apiMessages = [
      {
        role: "system",
        content: system || "Eres un asistente amable que ayuda con protección digital infantil.",
      },
      ...(messages || []),
    ]

    const res = await fetch(ZEN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: apiMessages,
        max_tokens: 4096,
        temperature: 0.7,
        stream: false,
      }),
    })

    if (!res.ok) {
      const errBody = await res.text().catch(() => "unknown")
      console.error("ZEN API error:", res.status, errBody.slice(0, 200))
      return NextResponse.json({ response: "", fallback: true }, { status: 200 })
    }

    const data = await res.json()
    const content = data?.choices?.[0]?.message?.content?.trim() || ""

    // Log if ZEN returned empty content
    if (!content) {
      console.error("ZEN API returned empty content:", JSON.stringify(data).slice(0, 300))
    }

    return NextResponse.json({ response: content })
  } catch {
    return NextResponse.json({ response: "", fallback: true }, { status: 200 })
  }
}
