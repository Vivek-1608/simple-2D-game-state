// src/persistence.js

const fs = require("fs");

/**
 * Saves the game state to a JSON file.
 * JSON is chosen because it is human-readable,
 * easy to debug, and maps naturally to JavaScript objects.
 */
function saveGameState(state, filename) {
  try {
    const data = JSON.stringify(state, null, 2); // Pretty-printed JSON
    fs.writeFileSync(filename, data, "utf-8");
  } catch (error) {
    throw new Error("Failed to save game state");
  }
}

/**
 * Loads the game state from a JSON file.
 * Includes basic error handling for invalid or corrupted files.
 */
function loadGameState(filename) {
  try {
    if (!fs.existsSync(filename)) {
      throw new Error("Save file does not exist");
    }

    const data = fs.readFileSync(filename, "utf-8");
    const parsedState = JSON.parse(data);

    return parsedState;
  } catch (error) {
    throw new Error("Failed to load game state: corrupted or invalid file");
  }
}

module.exports = {
  saveGameState,
  loadGameState
};
