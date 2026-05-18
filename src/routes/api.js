/**
 * API Router — main entry point for all /api routes.
 * Mounts sub-route modules for users, status, and health.
 * Branch: feature/api-endpoints
 */
const express = require("express");
const { router: usersRouter } = require("./users");
const { router: statusRouter } = require("./status");

const router = express.Router();

/**
 * GET /api/health
 * Basic health check endpoint.
 */
router.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Mount sub-route modules
router.use("/users", usersRouter);
router.use("/status", statusRouter);

module.exports = { router };
