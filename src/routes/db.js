/**
 * Database Routes
 * Provides endpoints for database health and status checks.
 */
const express = require("express");
const { connect, getClient, query } = require("../db");

const router = express.Router();

/**
 * GET /api/db/status
 * Returns current database connection status.
 */
router.get("/status", (req, res) => {
  const client = getClient();
  res.json({
    status: client.connected ? "connected" : "disconnected",
    config: client.config,
    connectedSince: client.connectedSince,
  });
});

/**
 * GET /api/db/connect
 * Establishes database connection.
 */
router.get("/connect", (req, res) => {
  const result = connect();
  res.json(result);
});

/**
 * GET /api/db/users
 * Returns all users from the database.
 */
router.get("/users", (req, res) => {
  const result = query("users", "select");
  if (result.success) {
    res.json({ users: result.data });
  } else {
    res.status(500).json({ error: result.error });
  }
});

module.exports = { router };
