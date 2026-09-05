# mrpoint.online
mrpoint website — "Study Buddy", an AI matric (Grade 12 NSC/CAPS) study helper, deployed as a Cloudflare Worker.

## Structure

- `src/worker.js` — request routing (`/`, `/chat`, `/api/study`, `/api/chat`)
- `src/studypage.js` — the Study Tools page (`/`)
- `src/chatpage.js` — the Study Rooms live chat page (`/chat`)
- `src/prompts.js` — subject list and AI prompt templates
- `src/ai.js` — Workers AI call wrapper with model fallback
- `wrangler.toml` — Worker config (name `mrpoint`, Workers AI binding)

## Deploy

```
wrangler deploy
```

This source was reconstructed from the live deployed Worker bundle, since the repo previously had no source checked in. Double-check `wrangler.toml` (compatibility date, bindings, routes/custom domain) against your actual Cloudflare dashboard settings before deploying, since those weren't all visible from the bundle.
