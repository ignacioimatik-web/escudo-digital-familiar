// API route for Sentinel AI Assistant
// TWO modes:
//   1. Local: uses hermes CLI (finds binary by absolute path)
//   2. Vercel: calls ZEN API directly via HTTPS (needs OPENCODE_ZEN_API_KEY env var)
import { NextRequest, NextResponse } from "next/server"
import { execSync } from "child_process"
import { existsSync } from "fs"

const ZEN_API_URL = "https://opencode.ai/zen/v1/chat/completions"
const MODEL = "big-pickle"

// Find hermes binary for local mode
function findHermes(): string | null {
  const candidates = [
    "/Users/jistev/.hermes/hermes-agent/venv/bin/hermes",
    "/opt/homebrew/bin/hermes",
    "/usr/local/bin/hermes",
    process.env.HOME + "/.local/bin/hermes",
  ]
  for (const p of candidates) {
    if (existsSync(p)) return p
  }
  try {
    const which = execSync("which hermes 2>/dev/null", { encoding: "utf-8", timeout: 5 }).trim()
    if (which) return which
  } catch {}
  return null
}

// Mode 1: call via hermes CLI (local development)
function callViaHermes(messages: any[], system: string): string | null {
  const hermes = findHermes()
  if (!hermes) return null

  let prompt = ""
  if (system) prompt += `[Sistema: ${system}]\n\n`
  for (const msg of messages || []) {
    if (msg.role === "user") prompt += `[Usuario: ${msg.content}]\n`
    else if (msg.role === "assistant") prompt += `[Asistente: ${msg.content}]\n`
  }
  prompt += "\n[Asistente:"

  try {
    const result = execSync(
      `${hermes} -z ${JSON.stringify(prompt)} -m "opencode-zen/big-pickle" --provider opencode-zen 2>/dev/null`,
      { timeout: 60000, encoding: "utf-8", maxBuffer: 10 * 1024 * 1024 }
    )
    return result.trim()
  } catch {
    return null
  }
}

// Mode 2: call ZEN API directly via HTTPS (Vercel production)
async function callDirectAPI(messages: any[], system: string): Promise<string | null> {
  const apiKey = process.env.OPENCODE_ZEN_API_KEY || process.env.OPENCODE_GO_API_KEY || ""
  if (!apiKey) return null

  const apiMessages = [
    { role: "system", content: system || "Eres un asistente amable." },
    ...(messages || []),
  ]

  try {
    const res = await fetch(ZEN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: apiMessages,
        max_tokens: 8192,
        temperature: 0.7,
        stream: false,
      }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data?.choices?.[0]?.message?.content?.trim() || null
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages, system } = await request.json()

    // Try local mode first (hermes CLI)
    let response = callViaHermes(messages, system)

    // If local failed, try direct API (Vercel with env var)
    if (!response) {
      response = await callDirectAPI(messages, system)
    }

    if (response) {
      return NextResponse.json({ response })
    }

    // Both failed — signal fallback to hardcoded engine responses
    return NextResponse.json({ response: "", fallback: true }, { status: 200 })
  } catch (error: any) {
    console.error("Assistant API error:", error?.message?.slice(0, 200))
    return NextResponse.json({ response: "", fallback: true }, { status: 200 })
  }
}
