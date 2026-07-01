// Diagnostic endpoint - check if API is configured properly
import { NextResponse } from "next/server"

export async function GET() {
  const apiKey = process.env.OPENCODE_ZEN_API_KEY || ""
  
  // Test ZEN API directly
  let zenStatus = "not tested"
  if (apiKey) {
    try {
      const res = await fetch("https://opencode.ai/zen/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "mimo-v2.5-free",
          messages: [{ role: "user", content: "di hola" }],
          max_tokens: 100,
        }),
      })
      const data = await res.json()
      const content = data?.choices?.[0]?.message?.content || ""
      zenStatus = res.ok
        ? `OK (${res.status}) — "${content.slice(0, 50)}"`
        : `ERROR ${res.status}: ${JSON.stringify(data).slice(0, 100)}`
    } catch (e: any) {
      zenStatus = `FETCH ERROR: ${e.message}`
    }
  }

  return NextResponse.json({
    hasApiKey: !!apiKey,
    keyLength: apiKey.length,
    keyPrefix: apiKey.slice(0, 10) + "...",
    zenApiStatus: zenStatus,
    model: "mimo-v2.5-free",
    timestamp: new Date().toISOString(),
  })
}
