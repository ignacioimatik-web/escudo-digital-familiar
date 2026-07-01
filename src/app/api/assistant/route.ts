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

    let zenResponse = ""
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt > 0) await new Promise(r => setTimeout(r, 500))

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
        console.error("ZEN API error:", res.status, errBody.slice(0, 300))
        continue
      }

      const rawText = await res.text()
      let data: any
      try {
        data = JSON.parse(rawText)
      } catch {
        console.error("ZEN API invalid JSON:", rawText.slice(0, 300))
        continue
      }

      const content = data?.choices?.[0]?.message?.content?.trim() || ""
      if (content) {
        zenResponse = content
        break
      }
      console.error("ZEN API empty content, attempt", attempt + 1)
    }

    if (!zenResponse) {
      return NextResponse.json({ response: "", fallback: true, debug: "all ZEN retries returned empty" }, { status: 200 })
    }

    return NextResponse.json({ response: zenResponse })
  } catch (e: any) {
    console.error("Assistant API fatal error:", e?.message)
    return NextResponse.json({ response: "", fallback: true, debug: `exception: ${e?.message}` }, { status: 200 })
  }
}
