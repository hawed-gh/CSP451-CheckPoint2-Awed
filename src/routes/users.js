/**
 * Users API Routes
 * Provides CRUD-like endpoints for user management.
 * Branch: feature/api-endpoints
 */
const express = require("express");

const router = express.Router();

// In-memory user store (simulated)
const users = [
  { id: 1, name: "Hussein Awed", email: "hawed@myseneca.ca", role: "student" },
  { id: 2, name: "Admin User", email: "admin@seneca.ca", role: "admin" },
];

/**
 * Validate user input for POST requests.
 * @param {object} body - The request body.
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateUserInput(body) {
  const errors = [];

  if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
    errors.push("Name is required and must be at least 2 characters.");
  }

  if (!body.email || typeof body.email !== "string") {
    errors.push("Email is required.");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email.trim())) {
      errors.push("Email must be a valid format.");
    }
  }

  if (!body.role || !["student", "admin", "instructor"].includes(body.role)) {
    errors.push("Role must be one of: student, admin, instructor.");
  }

  return { valid: errors.length === 0, errors };
}

/**
 * GET /api/users
 * Returns all users.
 */
router.get("/", (req, res) => {
  res.json({ success: true, count: users.length, data: users });
});

/**
 * GET /api/users/:id
 * Returns a single user by ID.
 */
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ success: false, error: "User not found." });
  }

  res.json({ success: true, data: user });
});

/**
 * POST /api/users
 * Create a new user with input validation.
 */
router.post("/", (req, res) => {
  const validation = validateUserInput(req.body);

  if (!validation.valid) {
    return res.status(400).json({ success: false, errors: validation.errors });
  }

  const newUser = {
    id: users.length + 1,
    name: req.body.name.trim(),
    email: req.body.email.trim().toLowerCase(),
    role: req.body.role,
  };

  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

module.exports = { router };
