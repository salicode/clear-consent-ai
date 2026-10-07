import { useState } from "react";
import "./App.css";
import PolicyInput from "./components/PolicyInput";
import ExtractionResults from "./components/ExtractionResults";
import PermissionDashboard from "./components/PermissionDashboard";

export default function App() {
  const [extraction, setExtraction] = useState(null);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Clear Consent AI — Privacy Understanding Assistant
</h1>
        <p>
          Paste a privacy statement to see what data it asks for, in plain
          language — then see what changing a permission would actually mean.
        </p>
      </header>

      <PolicyInput onAnalyze={setExtraction} />
      <ExtractionResults extraction={extraction} />
      <PermissionDashboard />
    </div>
  );
}
