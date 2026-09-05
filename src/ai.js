const MODELS = [
  "@cf/qwen/qwen3-30b-a3b-fp8", // primary: reasoning model, best for step-by-step work
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast", // backup 1
  "@cf/meta/llama-3.1-8b-instruct" // backup 2: most widely available
];
const MIN_TOKENS = 1800;

function stripThinking(text) {
  return String(text)
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/^[\s\S]*?<\/think>/i, "")
    .trim();
}

function extractContent(ai) {
  if (!ai) return null;
  let r = ai.response;
  if ((r === undefined || r === null) && ai.choices && ai.choices[0] && ai.choices[0].message) {
    r = ai.choices[0].message.content;
  }
  if (r === undefined || r === null) return null;
  if (typeof r === "object") return r;
  const cleaned = stripThinking(r);
  return cleaned.length ? cleaned : null;
}

export async function runAIJson(env, prompt, maxTokens) {
  const r = await runAIRaw(env, [{ role: "user", content: prompt }], maxTokens);
  if (r && typeof r === "object") return r;
  let raw = String(r || "").replace(/```json|```/g, "").trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("no json in: " + raw.slice(0, 120));
  return JSON.parse(raw.slice(start, end + 1));
}

export async function runAIRaw(env, messages, maxTokens) {
  if (!env.AI) throw new Error("AI binding missing — add Workers AI binding named AI in Settings");
  const tokens = Math.max(maxTokens || 0, MIN_TOKENS);
  let lastErr = null;
  for (const model of MODELS) {
    try {
      const ai = await env.AI.run(model, { messages, max_tokens: tokens });
      const content = extractContent(ai);
      if (content !== null) return content;
      lastErr = new Error("empty response from " + model);
      console.error("Empty response, trying next model:", model);
    } catch (err) {
      lastErr = err;
      console.error("Model failed:", model, err && err.message);
    }
  }
  throw lastErr || new Error("all models failed");
}
