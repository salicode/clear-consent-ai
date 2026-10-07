import { useState } from "react";
import { SAMPLE_POLICIES } from "../data/samplePolicies";

export default function PolicyInput({ onAnalyze }) {
  const [text, setText] = useState("");
  const [selectedSampleId, setSelectedSampleId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function pickSample(sample) {
    setText(sample.text);
    setSelectedSampleId(sample.id);
  }

  function handleTextChange(e) {
    setText(e.target.value);
    setSelectedSampleId(null);
  }

  async function handleAnalyze() {
    const matched = SAMPLE_POLICIES.find((s) => s.id === selectedSampleId);
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      onAnalyze({ id: matched?.id ?? "custom", text, items: data.items });
    } catch (err) {
      console.error(err);
      setError(
        "Could not reach the extraction server. Is it running on localhost:3001?"
      );
      // Fall back to prepared demo data so the rest of the interface still
      // has something to show while the server is down.
      if (matched) onAnalyze(matched);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel">
      <h2>Paste a privacy statement</h2>
      <p className="panel__intro">
        Paste the text of a privacy policy or a passage from one. Two sample
        passages are provided below for testing.
      </p>

      <div className="sample-picker">
        {SAMPLE_POLICIES.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={selectedSampleId === s.id}
            onClick={() => pickSample(s)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Paste policy text here…"
        aria-label="Privacy statement text"
      />

      <div className="policy-input__actions">
        <button
          type="button"
          className="btn-primary"
          disabled={!text.trim() || loading}
          onClick={handleAnalyze}
        >
          {loading ? "Analyzing…" : "Analyze"}
        </button>
        <span className="policy-input__hint">
          {error
            ? error
            : selectedSampleId
            ? "Sending this sample to the extraction server."
            : text.trim()
            ? "Sending your text to the extraction server."
            : "Choose a sample or paste your own text."}
        </span>
      </div>
    </section>
  );
}
