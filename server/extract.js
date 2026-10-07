const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
const API_KEY = process.env.GROQ_API_KEY;

const SYSTEM_PROMPT = `You extract facts from privacy policy text. Follow these rules exactly:

1. Only use information that is explicitly stated in the text you are given.
2. If the purpose, recipient, or retention period for a data category is not
   explicitly stated, its value must be exactly the string "Not stated".
   Do not infer, estimate, or assume a typical/industry-standard value.
3. Never state a legal conclusion (e.g. "this complies with GDPR",
   "this is legal"). Only describe what the text says.
4. For every item, include "quote": the exact, verbatim sentence or
   clause from the source text that supports the "category" field. Do not
   paraphrase the quote. If you cannot find a supporting sentence, set
   "quote" to "Not stated".
5. Respond with ONLY a JSON object with one key "items", whose value is an
   array. Each array element must have this shape:
   {
     "category": string,
     "purpose": string,
     "recipient": string,
     "retention": string,
     "quote": string
   }`;

function buildUserPrompt(policyText) {
  return `Privacy policy text:\n"""\n${policyText}\n"""\n\nJSON object:`;
}

async function callGROQ(policyText) {
  if (!API_KEY) {
    throw new Error("GROQ_API_KEY is not set. Add it to your .env file.");
  }

  async function attempt() {
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(policyText) },
        ],
        response_format: { type: "json_object" },
        temperature: 0,
        max_completion_tokens: 8192,
        reasoning_effort: "low",
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      throw new Error(
        `Groq request failed: ${response.status} ${response.statusText} ${errText}`,
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  try {
    return await attempt();
  } catch (err) {
    console.warn("[Groq] First attempt failed, retrying once:", err.message);
    return await attempt();
  }
}
const REQUIRED_FIELDS = ["category", "purpose", "recipient", "retention"];

/**
 * Validates the model's raw output against the extraction schema and
 * enforces the "Not stated" rule at the code level too — never trust the
 * prompt alone. Also re-derives each item's source span by searching for
 * its quote in the *original* text, so a fabricated quote (one that
 * doesn't actually appear in the source) can't silently pass through as
 * "supported".
 */
function validateAndBuildItems(rawJson, originalText) {
  let parsed;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    throw new Error("Model did not return valid JSON.");
  }
  const items = parsed.items;
  if (!Array.isArray(items)) {
    throw new Error("Model output did not contain an 'items' array.");
  }

  return items.map((raw, i) => {
    const item = { id: `item-${i + 1}`, status: "extracted" };

    for (const field of REQUIRED_FIELDS) {
      const value = typeof raw[field] === "string" ? raw[field].trim() : "";
      item[field] = value || "Not stated";
    }

    const quote = typeof raw.quote === "string" ? raw.quote.trim() : "";
    const idx = quote ? originalText.indexOf(quote) : -1;

    item.sourceSpan =
      idx >= 0 ? { start: idx, end: idx + quote.length, quote } : null; // quote missing OR not actually found in the source text

    return item;
  });
}

export async function extractFromPolicy(policyText) {
  const raw = await callGROQ(policyText);
  return validateAndBuildItems(raw, policyText);
}
