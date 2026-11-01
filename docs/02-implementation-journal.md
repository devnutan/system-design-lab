
# System Design Lab — Implementation Journal

This document tracks the implementation progress of the
Order Management API.

## Milestone 1 — Project Initialization

### Completed
- Initialized Node.js project using npm.
- Configured TypeScript.
- Installed Express and development dependencies.
- Configured tsx for running TypeScript directly.
- Added npm scripts for development, build, and type checking.
- Initialized Git and created a public GitHub repository.

### Key Commands
```bash
npm install
npm run dev
npm run typecheck
npm run build
```

### Learning
- Node.js runs JavaScript outside the browser.
- npm manages project dependencies and scripts.
- TypeScript adds static type checking.
- tsx executes TypeScript during development.

---

## Milestone 2 — Express Server

### Completed
- Created `src/server.ts`.
- Initialized Express.
- Started the server on port 3000.
- Implemented `GET /health`.

### Verification
- GET /health returns HTTP 200.

### Learning
- Express is a web application framework.
- A route maps an HTTP method and path to a handler.
- A health endpoint helps verify that an application responds.

---

## Milestone 3 — Retrieve Orders

### Completed
- Defined the Order TypeScript type.
- Created an in-memory orders array.
- Implemented GET /orders.
- Implemented GET /orders/:id.
- Added ID validation.
- Returned HTTP 400 for invalid IDs.
- Returned HTTP 404 for missing orders.

### Verification
- GET /orders — 200
- GET /orders/1 — 200
- GET /orders/999 — 404
- GET /orders/abc — 400

### Git Commit
9f5ab4b

---

## Milestone 4 — Create Orders

Date: November 1, 2026

### Completed
- Enabled JSON body parsing using express.json().
- Implemented POST /orders.
- Validated item and quantity.
- Generated an order ID.
- Assigned initial status "created".
- Returned HTTP 201 with a Location header.

### Verification
- Valid order creation — 201 PASS
- Retrieve created order — 200 PASS
- Negative quantity — 400 PASS
- Missing item — 400 PASS

### Example Request
```json
{
  "item": "Monitor",
  "quantity": 2
}
```

### Example Response
```json
{
  "id": 3,
  "item": "Monitor",
  "quantity": 2,
  "status": "created"
}
```

### Design Considerations
- Data is stored in memory.
- Restarting the server resets the orders.
- Current ID generation is not safe across multiple instances.
- PostgreSQL will be introduced for persistent storage.

---

## Next Milestone — Update Orders

Implement PUT /orders/:id.

Topics:
- PUT vs PATCH
- Full replacement vs partial updates
- HTTP idempotency
- Request validation
- Error handling
