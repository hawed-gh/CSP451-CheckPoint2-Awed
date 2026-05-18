/**
 * Enhanced Login Form Handler
 * Features: real-time validation, loading states, API integration
 * Branch: feature/user-authentication
 */
const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

/**
 * Display a styled message to the user.
 * @param {string} text - Message content.
 * @param {string} type - "error", "success", or "info".
 */
function showMessage(text, type) {
  message.textContent = text;
  message.className = type === "error" ? "error-msg" : "success-msg";
}

/**
 * Validate email format on the client side.
 * @param {string} email - Email to validate.
 * @returns {boolean}
 */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

/**
 * Validate password meets minimum requirements.
 * @param {string} password - Password to validate.
 * @returns {{ valid: boolean, message: string }}
 */
function checkPassword(password) {
  if (!password) return { valid: false, message: "Password is required." };
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters." };
  }
  return { valid: true, message: "" };
}

// Real-time email validation
emailInput.addEventListener("blur", () => {
  const email = emailInput.value.trim();
  if (email && !isValidEmail(email)) {
    showMessage("Please enter a valid email address.", "error");
  } else {
    message.textContent = "";
  }
});

// Real-time password validation
passwordInput.addEventListener("input", () => {
  const result = checkPassword(passwordInput.value);
  if (!result.valid && passwordInput.value.length > 0) {
    showMessage(result.message, "error");
  } else {
    message.textContent = "";
  }
});

// Form submission handler with API call
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // Client-side validation
  if (!isValidEmail(email)) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  const passwordResult = checkPassword(password);
  if (!passwordResult.valid) {
    showMessage(passwordResult.message, "error");
    return;
  }

  // Show loading state
  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.textContent = "Signing in...";
  showMessage("Authenticating...", "info");

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      showMessage("Login successful! Welcome, " + data.user.email, "success");
    } else {
      showMessage(data.error || "Login failed.", "error");
    }
  } catch (err) {
    showMessage("Network error. Please try again.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Sign in";
  }
});
