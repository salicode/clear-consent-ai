import { useState } from "react";
import { PERMISSIONS } from "../data/permissionModel";

export default function PermissionDashboard() {
  const [granted, setGranted] = useState(() =>
    Object.fromEntries(PERMISSIONS.map((p) => [p.id, p.defaultGranted]))
  );

  function toggle(id) {
    setGranted((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section className="panel">
      <h2>Your permissions</h2>
      <p className="panel__intro">
        These toggles are simulated — they demonstrate what would happen,
        they don't change any real account or service.
      </p>

      <div className="permission-list">
        {PERMISSIONS.map((p) => {
          const isGranted = granted[p.id];
          return (
            <div className="permission-row" key={p.id}>
              <div className="permission-row__top">
                <div>
                  <div className="permission-row__label">{p.label}</div>
                  <div className="permission-row__desc">{p.description}</div>
                </div>
                <button
                  type="button"
                  className="toggle"
                  role="switch"
                  aria-checked={isGranted}
                  aria-pressed={isGranted}
                  aria-label={`${isGranted ? "Revoke" : "Grant"} ${p.label}`}
                  onClick={() => toggle(p.id)}
                >
                  <span className="toggle__knob" />
                </button>
              </div>

              <div className="whatchanges">
                <span
                  className={`whatchanges__badge ${
                    isGranted
                      ? "whatchanges__badge--granted"
                      : "whatchanges__badge--revoked"
                  }`}
                >
                  {isGranted ? "Granted" : "Revoked"}
                </span>
                <span>{isGranted ? p.whenGranted : p.whenRevoked}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
