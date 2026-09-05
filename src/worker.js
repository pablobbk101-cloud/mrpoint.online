import { runAIJson, runAIRaw } from "./ai.js";
import { SUBJECTS, STUDY_PROMPTS, chatSystemPrompt } from "./prompts.js";
import { STUDY_HTML } from "./studypage.js";
import { CHAT_HTML } from "./chatpage.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (path === "/api/study" && request.method === "POST") {
      try {
        const { mode, subject, text } = await request.json();
        const clean = String(text || "").slice(0, 6000).trim();
        const subj = String(subject || "general").slice(0, 40);
        const build = STUDY_PROMPTS[mode];
        if (!build) return json({ error: "bad_mode" }, 400);
        if (clean.length < 15) return json({ error: "too_short" }, 400);
        const v = await runAIJson(env, build(subj, clean), mode === "plan" ? 1800 : 1200);
        v.mode = mode;
        return json(v);
      } catch (e) {
        console.error("STUDY FAILED:", e && e.message, e);
        return json({ error: "failed", detail: String((e && e.message) || e) }, 500);
      }
    }

    if (path === "/api/chat" && request.method === "POST") {
      try {
        const { subject, messages } = await request.json();
        const subj = SUBJECTS.indexOf(subject) !== -1 ? subject : "Maths";
        const history = (Array.isArray(messages) ? messages : [])
          .slice(-12)
          .filter((m) => m && (m.role === "user" || m.role === "assistant") && m.content)
          .map((m) => ({ role: m.role, content: String(m.content).slice(0, 2000) }));
        if (!history.length || history[history.length - 1].role !== "user") {
          return json({ error: "no_message" }, 400);
        }
        const convo = [{ role: "system", content: chatSystemPrompt(subj) }].concat(history);
        const r = await runAIRaw(env, convo, 700);
        const reply = String(typeof r === "object" ? JSON.stringify(r) : r || "").trim();
        if (!reply) throw new Error("empty reply");
        return json({ reply: reply.slice(0, 4000) });
      } catch (e) {
        console.error("CHAT FAILED:", e && e.message, e);
        return json({ error: "failed", detail: String((e && e.message) || e) }, 500);
      }
    }

    if (path === "/chat") return page(CHAT_HTML);
    return page(STUDY_HTML);
  }
};

function page(html) {
  return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
