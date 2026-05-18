/**
 * Authentication Routes
 * POST /api/auth/login — authenticate a user
 */
const express = require("express");
const { authenticate } = require("../services/auth");

const router = express.Router();

/**
 * POST /api/auth/login
 * Accepts { email, password } in request body.
 * Returns success status and user info (or error).
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Email and password are required.",
    });
  }

  const result = authenticate(email, password);

  if (result.success) {
    return res.status(200).json(result);
  }

  return res.status(401).json(result);
});

module.exports = { router };