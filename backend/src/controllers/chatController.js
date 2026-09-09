/**
 * Ported from the original netlify/functions/chat.js.
 * Proxies the Suits Assistant chatbot to the Anthropic API so the API key
 * never reaches the browser. Same request/response contract as before:
 *   POST { system, messages: [{role, content}] } -> { reply: string }
 */
import { env } from "../config/env.js";

export async function postChat(req, res) {
  const { system, messages } = req.body || {};

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: "messages[] required" });
  }

  if (!env.anthropicApiKey) {
    return res.status(500).json({ error: "Missing ANTHROPIC_API_KEY" });
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": env.anthropicApiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6", // fast, capable; swap if you prefer another tier
        max_tokens: 600,
        system: system || "You are SUITS Assistant, a warm, professional Indian company-secretarial helper.",
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    const data = await upstream.json();
    const reply = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    return res.status(200).json({
      reply: reply || "Sorry, I didn't catch that — could you rephrase?",
    });
  } catch (err) {
    return res.status(502).json({ error: "Upstream error", detail: String(err) });
  }
}
