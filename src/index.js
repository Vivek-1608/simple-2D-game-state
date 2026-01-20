// src/index.js

const GameState = require("./GameState");
const { saveGameState, loadGameState } = require("./persistence");

// Create a new game instance
const game = new GameState();

function logState(title) {
  console.log(`\n=== ${title} ===`);
  console.log(JSON.stringify(game.getState(), null, 2));
}

try {
  // Initial state
  logState("Initial State");

  // Move player to Health Potion location
  game.movePlayer(2, 2);
  logState("After Moving Player to (2, 2)");

  // Pick up Health Potion
  game.pickupItem("item1");
  logState("After Picking Up Health Potion");

  // Use Health Potion
  game.useItem("item1");
  logState("After Using Health Potion");

  // Move player to Key location
  game.movePlayer(4, 1);
  logState("After Moving Player to (4, 1)");

  // Pick up Key
  game.pickupItem("item2");
  logState("After Picking Up Key");

  // Open the door
  game.interactWithEnvironment("door1");
  logState("After Opening Door");

  // Save game state
  saveGameState(game.getState(), "save.json");
  console.log("\nGame state saved to save.json");

  // Load game state
  const loadedState = loadGameState("save.json");
  console.log("\nLoaded Game State from File:");
  console.log(JSON.stringify(loadedState, null, 2));

  // Reset game state
  game.resetState();
  logState("After Resetting Game State");

} catch (error) {
  console.error("Error during game simulation:", error.message);
}