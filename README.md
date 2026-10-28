
# System Design Lab

A hands-on project for learning system design by building and evolving a real backend application.

Instead of studying architecture diagrams alone, this project explores how systems work through practical implementations using Node.js, TypeScript, Express, and other technologies.

## Goals

- Understand how HTTP requests travel through a system
- Build REST APIs using Node.js and TypeScript
- Explore reverse proxies and load balancing
- Understand horizontal scaling and stateless services
- Introduce caching and database persistence
- Implement automated API tests
- Explore Docker and CI/CD

## Tech Stack

- Node.js
- TypeScript
- Express.js
- Git and GitHub

Additional technologies will be introduced as the project evolves.

## Current Architecture

Client (Browser / curl)
        |
        | HTTP Request
        v
Express API Server
        |
        v
Route Handler
        |
        v
JSON Response

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/devnutan/system-design-lab.git
cd system-design-lab
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The server runs at:

http://localhost:3000

## API Endpoints

### GET /health

Checks whether the API server is responding.

Example:

```bash
curl http://localhost:3000/health
```

Response:

```json
{
  "status": "ok",
  "message": "Order Management API is running"
}
```

## Learning Roadmap

- [x] Set up Node.js, TypeScript, and Express
- [x] Create the first HTTP endpoint
- [x] Initialize Git and publish the repository
- [ ] Build an Order Management REST API
- [ ] Introduce NGINX as a reverse proxy
- [ ] Run multiple API instances
- [ ] Implement load balancing
- [ ] Introduce caching
- [ ] Add database persistence
- [ ] Add Playwright API tests
- [ ] Containerize the application using Docker
- [ ] Set up CI/CD

## Learning Approach

Each milestone includes:

1. Understanding the system design concept
2. Implementing a working example
3. Testing the behavior
4. Exploring limitations and tradeoffs
5. Documenting what we learned

## Repository

https://github.com/devnutan/system-design-lab
