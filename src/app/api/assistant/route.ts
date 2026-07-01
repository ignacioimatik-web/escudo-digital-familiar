// API route for Sentinel AI Assistant
// Uses Hermes CLI to call BigPickle via opencode-zen provider
// Hermes handles auth internally - no API key needed in env

import { NextRequest, NextResponse } from "next/server"
import { execSync } from "child_process"
import { existsSync } from "fs"

// Find hermes binary in known locations
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
  // Try PATH
  try {
    const which = execSync("which hermes 2>/dev/null", { encoding: "utf-8", timeout: 5 }).trim()
    if (which) return which
  } catch {}
  return null
}

const HERMES = findHermes()

export async function POST(request: NextRequest) {
  try {
    const { messages, system } = await request.json()

    if (!HERMES) {
      return NextResponse.json({ response: "", fallback: true }, { status: 200 })
    }

    // Build the prompt for Hermes CLI
    // System instruction first, then conversation history
    let prompt = ""
    if (system) {
      prompt += `[Sistema: ${system}]\n\n`
    }
    for (const msg of messages || []) {
      if (msg.role === "user") {
        prompt += `[Usuario: ${msg.content}]\n`
      } else if (msg.role === "assistant") {
        prompt += `[Asistente: ${msg.content}]\n`
      }
    }
    prompt += "\n[Asistente:"

    const result = execSync(
      `${HERMES} -z ${JSON.stringify(prompt)} -m "opencode-zen/big-pickle" --provider opencode-zen 2>/dev/null`,
      {
        timeout: 30000,
        encoding: "utf-8",
        maxBuffer: 10 * 1024 * 1024,
      }
    )

    const response = result.trim()
    return NextResponse.json({ response })
  } catch (error: any) {
    console.error("Assistant API error:", error?.message?.slice(0, 200))
    return NextResponse.json({ response: "", fallback: true }, { status: 200 })
  }
}
