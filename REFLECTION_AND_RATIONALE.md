# 🧠 Reflection and Rationale

## Design Choices

### Game State Representation
I chose to represent the entire game using a single centralized state object that contains the player, items, environment, and world boundaries. Items and environment objects are stored as maps keyed by unique IDs rather than arrays. This allows constant-time lookup and mirrors how entities are typically referenced in larger game or backend systems. The player inventory stores item IDs instead of full item objects to avoid duplication and maintain a single source of truth.

### Encapsulation of State
All state mutations are encapsulated within the `GameState` class. External code cannot directly modify the state and must instead use defined transition methods such as `movePlayer` or `pickupItem`. This design prevents accidental or invalid state changes and makes the system easier to reason about, debug, and extend.

### Simplicity Over Complexity
I intentionally kept the game concept and mechanics simple. The goal of the assignment is state management, not gameplay complexity or rendering. By limiting the scope to a small set of entities and actions, I was able to focus on correctness, clarity, and robustness of the state transitions.

---

## Trade-offs

### Readability vs Performance
I prioritized readability and maintainability over micro-optimizations. For example, deep copying the state when exposing it or resetting the game introduces some overhead, but it ensures safety and clarity. Given the small scope of the system, this trade-off is acceptable and improves correctness.

### Simplicity vs Flexibility
The current design does not use advanced architectural patterns such as ECS (Entity Component System) or event sourcing. While such patterns offer more flexibility for large games, they would add unnecessary complexity for this assignment. The chosen approach strikes a balance between being simple and still extensible.

---

## Areas of Uncertainty

One area I considered was whether to integrate persistence directly into the `GameState` class or keep it separate. I ultimately chose to separate persistence logic into its own module to maintain clear separation of concerns. I also considered returning error objects instead of throwing exceptions, but throwing clear errors felt more appropriate for demonstrating invalid state transitions in a simple system.

---

## AI Assistance

I used ChatGPT as a supporting tool during this assignment. Specifically, it was used to:
- Brainstorm the overall structure of the solution
- Validate design decisions such as state encapsulation and persistence separation
- Refine wording and clarity in documentation

All core implementation logic, data modeling decisions, and edge-case handling were written, reviewed, and adjusted by me. I evaluated all AI-assisted suggestions critically and modified them to fit the requirements and my own understanding of the system.
