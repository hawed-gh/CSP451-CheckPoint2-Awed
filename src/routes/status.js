/**
 * Status API Routes
 * Provides system health and uptime information.
 * Branch: feature/api-endpoints
 */
const express = require("express");

const router = express.Router();

const startTime = Date.now();

/**
 * GET /api/status
 * Returns detailed server status information.
 */
router.get("/", (req, res) => {
  const uptimeMs = Date.now() - startTime;
  const uptimeSec = Math.floor(uptimeMs / 1000);
  const uptimeMin = Math.floor(uptimeSec / 60);

  res.json({
    status: "operational",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    uptime: {
      milliseconds: uptimeMs,
      seconds: uptimeSec,
      minutes: uptimeMin,
      formatted: `${uptimeMin}m ${uptimeSec % 60}s`,
    },
    node: process.version,
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/status/ready
 * Readiness probe for health checks.
 */
router.get("/ready", (req, res) => {
  res.json({ ready: true, checks: { server: "ok", routes: "ok" } });
});

module.exports = { router };
