const TRUNK = (process.env.VOLTCORE_TRUNK || "https://core-api.dominic-calandro1991.workers.dev").replace(
  /\/$/,
  "",
);
const SOURCE = process.env.VOLTCORE_SOURCE || "causalrail";
const INTERVAL_MS = Number(process.env.VOLTCORE_INTERVAL_MS || 60_000);

export function startMeshHeartbeat() {
  const tick = () => {
    void fetch(`${TRUNK}/api/v1/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: SOURCE,
        type: "health.heartbeat",
        severity: "info",
        payload: {
          status: "live",
          surface: "node",
          interval_s: Math.round(INTERVAL_MS / 1000),
          incomplete: false,
          missing_dependencies: [],
          required_build_specs: [],
        },
      }),
    }).catch(() => {});
  };
  tick();
  return setInterval(tick, INTERVAL_MS);
}
