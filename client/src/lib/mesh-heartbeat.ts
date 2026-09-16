const TRUNK = "https://core-api.dominic-calandro1991.workers.dev";
const SOURCE = "causalrail";
const INTERVAL_MS = 60_000;

export function startMeshBeat() {
  if (typeof window === "undefined") return 0;
  const tick = () => {
    if (document.visibilityState === "hidden") return;
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
          interval_s: 60,
          incomplete: false,
          missing_dependencies: [],
          required_build_specs: [],
        },
      }),
      keepalive: true,
    }).catch(() => {});
  };
  tick();
  return window.setInterval(tick, INTERVAL_MS);
}
