# ClearConsent — AI Privacy Understanding Assistant

React + Vite frontend, Express + Ollama backend, for the AI-assisted privacy
policy interface assignment.

## Setup

### 1. Install Ollama (free local model, no API key needed)

- Download from https://ollama.com
- Pull a model: `ollama pull llama3.1`
- Ollama runs automatically as a background service on `localhost:11434`
  once installed — no need to start it manually.

### 2. Start the backend

```
cd server
npm install
npm start
```

Runs on `http://localhost:3001`. Set `OLLAMA_MODEL` in the environment if
you pulled a different model than `llama3.1`.

### 3. Start the frontend

```
npm install
npm run dev
```

Open the printed localhost URL, paste or pick a sample policy, click
Analyze. The extraction now comes from the live model.

## How the extraction is kept honest

- The model is instructed (`server/extract.js`) to output `"Not stated"`
  for any field the text doesn't explicitly mention, and never a legal
  conclusion.
- The server re-checks this: any missing/empty field is forced to
  `"Not stated"` in code, not just trusted from the prompt.
- The model must also return a verbatim `quote` per item. The server
  searches for that exact quote in the original text — if it's not found
  (i.e. the model fabricated it), the item's source span is set to `null`
  instead of showing a fake supporting link.

## Not yet built

- Rendering the source-span highlighting in the UI (the data for it is
  now returned by the server — `item.sourceSpan` — just not drawn yet)
- Correction controls for flagging a wrong extraction
- Swapping in a paid/approved cloud model instead of the local one, if
  your program later gives you access — only `server/extract.js`'s
  `callOllama` function needs to change; the rest of the app is unaffected

## If you get approved API access later

Replace `callOllama()` in `server/extract.js` with a call to that
provider's chat/completion endpoint, keeping the same system prompt and
the same `validateAndBuildItems()` step. Put the API key in a `.env` file
in `server/` (never in the frontend) and load it with `process.env`.
