/**
 * Authentication Service
 * Handles user validation, password checking, and session management.
 */

/**
 * IMPORTANT: Simulated user store for checkpoint purposes ONLY.
 * In production, passwords MUST be hashed using bcrypt or argon2.
 * Never store plain-text passwords in a real application.
 */
const users = [
  { id: 1, email: "admin@seneca.ca", password: "admin123", role: "admin" },
  { id: 2, email: "student@seneca.ca", password: "student123", role: "user" },
  { id: 3, email: "hawed@myseneca.ca", password: "secure456", role: "user" },
];

/**
 * Validate email format using a basic regex pattern.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if valid email format.
 */
function validateEmail(email) {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate password meets minimum requirements.
 * @param {string} password - The password to validate.
 * @returns {{ valid: boolean, message: string }}
 */
function validatePassword(password) {
  if (!password || typeof password !== "string") {
    return { valid: false, message: "Password is required." };
  }
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters." };
  }
  if (password.length > 128) {
    return { valid: false, message: "Password must be under 128 characters." };
  }
  return { valid: true, message: "Password meets requirements." };
}

/**
 * Authenticate a user by email and password.
 * @param {string} email - User email.
 * @param {string} password - User password.
 * @returns {{ success: boolean, user?: object, error?: string }}
 */
function authenticate(email, password) {
  if (!validateEmail(email)) {
    return { success: false, error: "Invalid email format." };
  }

  const passwordCheck = validatePassword(password);
  if (!passwordCheck.valid) {
    return { success: false, error: passwordCheck.message };
  }

  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return { success: false, error: "Invalid email or password." };
  }

  // Return user info without password
  const { password: _, ...safeUser } = user;
  return { success: true, user: safeUser };
}

module.exports = { validateEmail, validatePassword, authenticate };
