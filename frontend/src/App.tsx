import { useEffect, useState } from "react";

type ProjectStatus = {
  service: "spamwatch-api";
  phase: "scaffold";
  model_serving: boolean;
  database_integration: boolean;
  autonomous_actions: boolean;
};

type Connection =
  | { state: "loading" }
  | { state: "connected"; status: ProjectStatus }
  | { state: "unavailable" };

function isProjectStatus(value: unknown): value is ProjectStatus {
  if (typeof value !== "object" || value === null) return false;
  const payload = value as Record<string, unknown>;
  return (
    payload.service === "spamwatch-api" &&
    payload.phase === "scaffold" &&
    typeof payload.model_serving === "boolean" &&
    typeof payload.database_integration === "boolean" &&
    typeof payload.autonomous_actions === "boolean"
  );
}

const milestones = [
  ["01", "Reproducible baseline", "Validate data, prevent split leakage, and evaluate a saved classifier."],
  ["02", "Versioned serving", "Serve real predictions, persist results, and collect trusted feedback."],
  ["03", "Evidence and monitoring", "Measure latency, labeled quality, and changes in incoming data."],
  ["04", "Autonomous recovery", "Evaluate candidates, test limited releases, and verify or reverse changes."],
];

export default function App() {
  const [connection, setConnection] = useState<Connection>({ state: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    let active = true;

    async function loadStatus() {
      try {
        const response = await fetch("/api/v1/status", { signal: controller.signal });
        if (!response.ok) throw new Error("API unavailable");
        const payload: unknown = await response.json();
        if (!isProjectStatus(payload)) throw new Error("Unexpected API response");
        if (active) setConnection({ state: "connected", status: payload });
      } catch {
        if (active) setConnection({ state: "unavailable" });
      } finally {
        window.clearTimeout(timeout);
      }
    }

    void loadStatus();
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const capabilities = connection.state === "connected" ? connection.status : null;

  return (
    <main>
      <header>
        <a className="wordmark" href="/" aria-label="SpamWatch home">SpamWatch<span> / </span></a>
        <span className="phase">Initial scaffold</span>
      </header>

      <section className="intro">
        <p className="eyebrow">AUTONOMOUS ML OPERATIONS · IN DEVELOPMENT</p>
        <h1>Detect. Adapt.<br /><span>Verify the outcome.</span></h1>
        <p className="description">
          Building a spam detection platform that observes changing conditions,
          evaluates its options, and verifies every release and recovery.
        </p>
      </section>

      <section className="status-panel" aria-labelledby="status-heading">
        <div>
          <h2 id="status-heading">Current implementation</h2>
          <p>The application shell is available. Classification and autonomous workflows are planned.</p>
        </div>
        <dl aria-live="polite">
          <div>
            <dt>API connection</dt>
            <dd className={connection.state === "connected" ? "connected" : ""}>
              {connection.state === "loading" ? "Checking…" : connection.state === "connected" ? "Connected" : "Unavailable — start the backend"}
            </dd>
          </div>
          <div><dt>Model serving</dt><dd>{capabilities ? (capabilities.model_serving ? "Available" : "Not implemented") : "Unknown"}</dd></div>
          <div><dt>Database integration</dt><dd>{capabilities ? (capabilities.database_integration ? "Available" : "Not implemented") : "Unknown"}</dd></div>
          <div><dt>Autonomous actions</dt><dd>{capabilities ? (capabilities.autonomous_actions ? "Enabled" : "Disabled") : "Unknown"}</dd></div>
        </dl>
      </section>

      <section className="roadmap" aria-labelledby="roadmap-heading">
        <h2 id="roadmap-heading">The build ahead</h2>
        <div className="milestones">
          {milestones.map(([number, title, description]) => (
            <article key={number}>
              <span className="number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="planned">Planned</span>
            </article>
          ))}
        </div>
      </section>

      <footer>React · FastAPI · PostgreSQL <span>Model and controller implementation to follow</span></footer>
    </main>
  );
}
