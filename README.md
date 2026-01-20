# 📘 Simple 2D Game State Management System

## Project Overview

This project implements a **basic game state management system** for a simple 2D game.  
The focus is on how game data is **represented, updated, validated, and persisted**, rather than on graphics or rendering.

The system models a small game world containing:
- A player with position, health, and inventory
- Items that can be picked up and used
- Environment objects such as a door
- A bounded world grid

All game logic is driven entirely by changes to the game state through controlled methods.

---

## Game State Design

The entire game is represented by a **single state object**, which acts as the source of truth.

### Core Components

#### Player
- `position {x, y}`: Current location in the world
- `health`: Integer value capped between 0 and 100
- `inventory`: Array of item IDs the player currently owns

#### Items (Map by ID)
Items are stored as an object keyed by item ID for fast lookup.

Each item contains:
- `id`
- `name`
- `position {x, y}`
- `picked`: Flag indicating whether the item has been collected

Item IDs are stored in the player inventory instead of full objects to avoid duplication and maintain a single source of truth.

#### Environment (Map by ID)
Environment objects (e.g., doors) are stored as objects keyed by ID.

Each environment object contains:
- `id`
- `type` (e.g., door)
- State properties such as `open`

#### World
- `width` and `height` define the valid boundaries of the game world
- Used for validating player movement

### Design Rationale
- Objects keyed by ID provide **O(1) lookup**
- Clear separation between player, items, and environment
- Easy to extend with new entities or properties
- State is normalized and avoids redundancy

---

## State Transition Functions

All state changes are encapsulated inside the `GameState` class.  
External code cannot modify the state directly.

### Implemented Actions

- **`movePlayer(x, y)`**  
  Moves the player if the target position is within world bounds.

- **`pickupItem(itemId)`**  
  Allows the player to pick up an item if:
  - The item exists
  - The item has not already been picked
  - The player is at the same position as the item

- **`useItem(itemId)`**  
  Applies the effect of an item from the player’s inventory.  
  For example, a health potion restores health while enforcing valid limits.

- **`interactWithEnvironment(objectId)`**  
  Interacts with environment objects such as toggling a door’s open/closed state.

- **`resetState()`**  
  Restores the game state back to its initial configuration.

### Design Rationale
- All transitions validate input before mutating state
- Invalid actions are rejected early
- State invariants (e.g., valid health range) are always preserved

---

## Edge Case Handling

The system defensively handles invalid or unexpected actions, including:
- Preventing player movement outside world boundaries
- Preventing use of items not present in the inventory
- Preventing picking up an already picked item
- Preventing interaction with non-existent environment objects
- Ensuring player health never drops below 0 or exceeds the maximum

Clear error messages are thrown to make debugging and reasoning about failures easier.

---

## State Persistence

The system supports **saving and loading game state** using JSON files.

### Why JSON?
- Human-readable and easy to debug
- Naturally compatible with JavaScript objects
- Simple and sufficient for basic persistence needs

### Implementation
- `saveGameState(state, filename)` serializes the state to a pretty-printed JSON file
- `loadGameState(filename)` deserializes the state with basic error handling

Basic safeguards are included for:
- Missing files
- Corrupted or invalid JSON data

Persistence logic is separated from game logic to maintain clean separation of concerns.

---

## Extensibility

The design makes it easy to add new features without modifying existing logic.

Examples:
- Adding enemies as a new map (`enemies`) similar to items
- Adding new player attributes (e.g., stamina, level)
- Adding new environment objects (e.g., switches, chests)
- Introducing new item effects without changing inventory structure

Because state changes are centralized, new mechanics can be added by introducing new transition functions.

---

## Scalability in a Real Game

In a larger or live game:
- State transition methods could act like backend APIs
- Persistence could be replaced with a database
- Concurrent updates could be serialized through an event queue or lock mechanism
- Multiple systems (AI, player input, networking) could safely interact with the state through controlled interfaces

This approach mirrors real-world game backend and server-side design patterns.

---

## How to Run the Project

### Requirements
- Node.js (v14+ recommended)

### Steps
```bash
git clone <repository-url>
cd simple-2d-game-state
node src/index.js
