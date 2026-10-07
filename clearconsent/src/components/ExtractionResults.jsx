import { NOT_STATED } from "../data/extractionSchema";

function Field({ label, value }) {
  const isNotStated = value === NOT_STATED;
  return (
    <>
      <dt>{label}</dt>
      <dd>{isNotStated ? <span className="not-stated">{value}</span> : value}</dd>
    </>
  );
}

export default function ExtractionResults({ extraction }) {
  const items = extraction?.items ?? [];

  return (
    <section className="panel">
      <h2>What this means</h2>
      <p className="panel__intro">
        Fields the text does not mention are marked{" "}
        <span className="not-stated">{NOT_STATED}</span> rather than guessed.
      </p>

      {items.length === 0 ? (
        <p className="empty-state">
          Analyze a policy above to see its data requests broken down here.
        </p>
      ) : (
        <div className="extraction-grid">
          {items.map((item) => (
            <article className="extraction-card" key={item.id}>
              <h3 className="extraction-card__category">{item.category}</h3>
              <dl className="extraction-fields">
                <Field label="Category" value={item.category} />
                <Field label="Purpose" value={item.purpose} />
                <Field label="Recipient" value={item.recipient} />
                <Field label="Retention" value={item.retention} />
              </dl>
            </article>
          ))}
        </div>
      )}

      <p className="week1-note">
        Extraction is now live from the local model via the server endpoint.
        Correction controls (flagging a wrong item) are not built yet.
      </p>
    </section>
  );
}
