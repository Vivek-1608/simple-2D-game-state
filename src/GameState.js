// src/GameState.js

const initialState = require("./initialState");

/**
 * GameState class encapsulates the entire game state
 * and provides controlled methods to modify it.
 */
class GameState {
  constructor() {
    // Deep copy to avoid mutating the original initialState
    this.state = JSON.parse(JSON.stringify(initialState));
  }

  /**
   * Internal helper to validate item existence.
   * Centralizes validation logic for readability and reuse.
   */
  _validateItemExists(itemId) {
    if (!this.state.items[itemId]) {
      throw new Error("Item does not exist");
    }
  }

  /**
   * Moves the player to a new position if within world bounds.
   * This prevents invalid state such as moving outside the map.
   */
  movePlayer(x, y) {
    const { width, height } = this.state.world;

    if (x < 0 || y < 0 || x >= width || y >= height) {
      throw new Error("Invalid move: position outside world bounds");
    }

    this.state.player.position = { x, y };
  }

  /**
   * Picks up an item if it exists, is not already picked,
   * and the player is at the same position as the item.
   */
  pickupItem(itemId) {
    this._validateItemExists(itemId);

    const item = this.state.items[itemId];

    if (item.picked) {
      throw new Error("Item already picked up");
    }

    const playerPos = this.state.player.position;
    const itemPos = item.position;

    if (playerPos.x !== itemPos.x || playerPos.y !== itemPos.y) {
      throw new Error("Player is not at the item's location");
    }

    item.picked = true;
    this.state.player.inventory.push(itemId);
  }

  /**
   * Uses an item from the player's inventory and applies its effect.
   * Health values are clamped to maintain valid state boundaries.
   */
  useItem(itemId) {
    const inventory = this.state.player.inventory;

    if (!inventory.includes(itemId)) {
      throw new Error("Item not found in inventory");
    }

    this._validateItemExists(itemId);

    const item = this.state.items[itemId];

    // Simple example logic
    if (item.name === "Health Potion") {
      this.state.player.health = Math.max(
        0,
        Math.min(this.state.player.health + 20, 100)
      );
    }

    // Remove item after use
    this.state.player.inventory = inventory.filter(id => id !== itemId);
  }

  /**
   * Interacts with an environment object (e.g., door or switch).
   * Toggles its state in a controlled and validated manner.
   */
  interactWithEnvironment(objectId) {
    const object = this.state.environment[objectId];

    if (!object) {
      throw new Error("Environment object does not exist");
    }

    if (object.type === "door") {
      object.open = !object.open;
    }
  }

  /**
   * Resets the game state back to its initial configuration.
   * Useful for restarting the game or handling fatal errors.
   */
  resetState() {
    this.state = JSON.parse(JSON.stringify(initialState));
  }

  /**
   * Returns a copy of the current state to prevent external mutation.
   */
  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }
}

module.exports = GameState;
