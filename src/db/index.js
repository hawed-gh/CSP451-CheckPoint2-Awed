/**
 * Database Module
 * Provides connection management, query execution, and client access.
 * Reads configuration from environment variables with sensible defaults.
 *
 * Branch: feature/database-connection
 */

// Database configuration from environment variables
const config = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  name: process.env.DB_NAME || "csp451_dev",
  user: process.env.DB_USER || "app_user",
  password: process.env.DB_PASSWORD || "",
  maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || "10", 10),
};

// In-memory data store (simulates a real database for this checkpoint)
const dataStore = {
  users: [
    { id: 1, email: "admin@seneca.ca", role: "admin", created: "2026-01-01" },
    { id: 2, email: "student@seneca.ca", role: "user", created: "2026-05-01" },
  ],
  sessions: [],
  logs: [],
};

// Connection state tracking
let isConnected = false;
let connectionTime = null;

/**
 * Establish a database connection.
 * Reads config from environment variables and initializes the client.
 * @returns {{ connected: boolean, driver: string, host: string, database: string }}
 */
function connect() {
  if (isConnected) {
    return { connected: true, driver: "in-memory", host: config.host, database: config.name };
  }

  // Simulate connection establishment
  isConnected = true;
  connectionTime = new Date().toISOString();

  console.log(`[DB] Connected to ${config.name} at ${config.host}:${config.port}`);

  return {
    connected: true,
    driver: "in-memory",
    host: config.host,
    database: config.name,
  };
}

/**
 * Execute a query against the in-memory data store.
 * Supports basic SELECT, INSERT, and COUNT operations.
 * @param {string} collection - The data collection to query.
 * @param {string} operation - The operation: "select", "insert", "count".
 * @param {object} [params] - Optional parameters for the query.
 * @returns {{ success: boolean, data?: any, error?: string }}
 */
function query(collection, operation, params) {
  if (!isConnected) {
    return { success: false, error: "Database not connected. Call connect() first." };
  }

  if (!dataStore[collection]) {
    return { success: false, error: `Collection '${collection}' not found.` };
  }

  switch (operation) {
    case "select":
      return { success: true, data: dataStore[collection] };

    case "insert":
      if (!params || typeof params !== "object") {
        return { success: false, error: "Insert requires a data object." };
      }
      const newRecord = { id: dataStore[collection].length + 1, ...params };
      dataStore[collection].push(newRecord);
      return { success: true, data: newRecord };

    case "count":
      return { success: true, data: { count: dataStore[collection].length } };

    default:
      return { success: false, error: `Unknown operation: ${operation}` };
  }
}

/**
 * Get the current database client/connection info.
 * @returns {{ connected: boolean, config: object, uptime: string|null }}
 */
function getClient() {
  return {
    connected: isConnected,
    config: { host: config.host, port: config.port, database: config.name },
    connectedSince: connectionTime,
  };
}

/**
 * Disconnect from the database.
 * @returns {{ disconnected: boolean }}
 */
function disconnect() {
  isConnected = false;
  connectionTime = null;
  console.log("[DB] Disconnected.");
  return { disconnected: true };
}

module.exports = { connect, query, getClient, disconnect, config };
