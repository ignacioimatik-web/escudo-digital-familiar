// API route for the Sentinel AI Assistant
// Uses Hermes CLI to call BigPickle via opencode-zen provider
// Knowledge base content is injected as system context

import { NextRequest, NextResponse } from "next/server"
import { execSync } from "child_process"

export async function POST(request: NextRequest) {
  try {
    const { messages, system } = await request.json()

    // Build the prompt from the conversation
    const conversation = [
      ...(system ? [{ role: "system", content: system }] : []),
      ...messages,
    ]

    // Format for Hermes CLI: each message on its own line
    const prompt = conversation
      .map((m: any) => {
        if (m.role === "system") return `[Sistema: ${m.content}]`
        if (m.role === "user") return `[Usuario: ${m.content}]`
        if (m.role === "assistant") return `[Asistente: ${m.content}]`
        return m.content
      })
      .join("\n") + "\n[Asistente:"

    // Call Hermes CLI with BigPickle model
    const result = execSync(
      `hermes -z ${JSON.stringify(prompt)} -m "opencode-zen/big-pickle" --provider opencode-zen 2>/dev/null`,
      {
        timeout: 30000,
        encoding: "utf-8",
        maxBuffer: 10 * 1024 * 1024,
      }
    )

    const response = result.trim()

    return NextResponse.json({ response })
  } catch (error: any) {
    console.error("Assistant API error:", error.message)
    return NextResponse.json(
      { error: "Failed to generate response", details: error.message },
      { status: 500 }
    )
  }
}
