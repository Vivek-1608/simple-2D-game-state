// src/initialState.js

/**
 * Initial game state.
 * This represents the default configuration of the game world
 * before any player actions are performed.
 */

const initialState = {
  player: {
    position: { x: 0, y: 0 }, // Player starts at top-left corner
    health: 100,             // Health is capped at 100
    inventory: []            // Stores item IDs
  },

  items: {
    item1: {
      id: "item1",
      name: "Health Potion",
      position: { x: 2, y: 2 },
      picked: false
    },
    item2: {
      id: "item2",
      name: "Key",
      position: { x: 4, y: 1 },
      picked: false
    }
  },

  environment: {
    door1: {
      id: "door1",
      type: "door",
      open: false
    }
  },

  world: {
    width: 10,
    height: 10
  }
};

module.exports = initialState;
