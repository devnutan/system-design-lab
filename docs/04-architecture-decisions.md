
# System Design Lab — Architecture Decisions

This document records important engineering decisions,
alternatives, trade-offs, and future improvements.

## Current Architecture

Client (curl / API consumer)
    |
    | HTTP
    v
Express API (Node.js + TypeScript)
    |
    v
In-Memory Orders Array

The application currently runs as a single process
on localhost:3000.

---

## ADR-001: Use Node.js, TypeScript, and Express

Status: Accepted

### Context
We need a simple backend to explore REST APIs and
system design concepts through working examples.

### Decision
Use Node.js with TypeScript and Express.

### Rationale
- TypeScript provides static type checking.
- Express provides lightweight HTTP routing.
- The stack is suitable for incremental development.
- It supports future integration with databases,
  caching, and reverse proxies.

### Trade-offs
- Express provides minimal structure by default.
- We must establish our own architecture conventions.
- TypeScript does not provide runtime request validation.

---

## ADR-002: Start With In-Memory Storage

Status: Accepted for initial development

### Context
Our initial goal is to understand API behavior without
introducing database infrastructure.

### Decision
Store orders in a TypeScript array.

### Benefits
- Fast to implement.
- Easy to inspect and debug.
- No database setup required.

### Limitations
- Data is lost on process restart.
- Multiple server instances have independent arrays.
- No durable storage.
- No transactional guarantees.

### Future Decision
Replace the array with PostgreSQL.

---

## ADR-003: Generate IDs Within the Application

Status: Temporary

### Context
Each order requires a unique identifier.

### Decision
Generate the next ID using the maximum existing
order ID plus one.

### Benefits
- Simple and deterministic for our single-process demo.
- No external dependencies.

### Risks
- Multiple API instances can generate duplicate IDs.
- IDs are not globally coordinated.
- Concurrent operations require a stronger strategy.

### Future Decision
Use database-managed IDs or another appropriate
identifier strategy.

---

## ADR-004: Validate Requests at the API Boundary

Status: Accepted

### Context
HTTP request bodies contain untrusted data.

### Decision
Validate required fields and values before creating
an order.

Current validation:
- item: non-empty string.
- quantity: positive safe integer.

### Benefits
- Prevents invalid application state.
- Provides predictable client errors.
- Establishes an explicit API contract.

### Trade-offs
- Manual validation can become repetitive.
- Complex request schemas become difficult to maintain.

### Future Decision
Evaluate schema validation using Zod.

---

## ADR-005: Use REST for Initial API Development

Status: Accepted

### Context
We need a simple, resource-oriented interface for
creating and retrieving orders.

### Decision
Expose orders using HTTP methods and resource URLs.

Current endpoints:
- GET /health
- GET /orders
- GET /orders/:id
- POST /orders

### Benefits
- Familiar HTTP semantics.
- Easy to test with curl and Playwright.
- Clear status codes and resource identifiers.

### Trade-offs
- API evolution requires contract management.
- Clients may need multiple requests for related data.
- Different endpoints may return fixed response shapes.

### Future Exploration
Compare REST and GraphQL using the same domain.

---

## Future Architecture Decisions

To be recorded as we implement them:

- Reverse proxy selection and configuration.
- Load-balancing strategy.
- Stateless API design.
- Database schema and persistence.
- Caching strategy and invalidation.
- Docker deployment.
- API test architecture.
- CI/CD pipeline design.
- Observability and failure handling.

## ADR Template

### ADR-XXX: Decision Title

Status: Proposed / Accepted / Superseded

#### Context
What problem are we solving?

#### Decision
What approach did we choose?

#### Alternatives
What other approaches did we consider?

#### Consequences
What benefits, risks, and trade-offs follow?

#### Revisit When
What conditions would cause us to reconsider?
