
# System Design Lab — Learning Notes

A living technical reference for concepts learned while
building the Order Management API.

## 1. Node.js

Node.js is a JavaScript runtime that allows JavaScript
to execute outside a web browser.

In this project, Node.js runs our Express API server.

## 2. npm and npx

- npm: Installs dependencies and runs package scripts.
- npx: Executes commands provided by npm packages.

Examples:

```bash
npm install
npm run dev
npx tsc --version
```

## 3. TypeScript

TypeScript adds static typing to JavaScript.

Example from our project:

```ts
type Order = {
  id: number;
  item: string;
  quantity: number;
  status: 'created' | 'shipped' | 'delivered';
};
```

Benefits:
- Detects type errors before execution.
- Improves editor support.
- Makes API data structures easier to understand.

Important: TypeScript types do not validate incoming
HTTP request data at runtime.

## 4. tsx vs tsc

tsx executes TypeScript directly during development.

```bash
npm run dev
```

tsc performs type checking and can compile TypeScript
into JavaScript.

```bash
npm run typecheck
npm run build
```

`tsx watch` restarts the application when source files
change, but does not replace TypeScript type checking.

## 5. Express.js

Express is a Node.js web framework used to build APIs.

Example:

```ts
app.get('/orders', (_req, res) => {
  res.status(200).json(orders);
});
```

A route combines an HTTP method, URL path, and handler.

## 6. Express Middleware

Middleware executes during the request-response lifecycle.

Example:

```ts
app.use(express.json());
```

This parses JSON request bodies and makes the parsed
content available through `req.body`.

Middleware order matters.

## 7. REST and HTTP Methods

GET:
Retrieve a resource without modifying it.

POST:
Submit data to create a resource or trigger processing.

PUT:
Replace the state of a resource at a known URI.

PATCH:
Apply partial changes to a resource.

DELETE:
Remove a resource.

## 8. HTTP Status Codes

200 OK:
The request succeeded.

201 Created:
A new resource was created.

400 Bad Request:
The request is invalid.

404 Not Found:
The requested resource does not exist.

500 Internal Server Error:
An unexpected server-side failure occurred.

## 9. Request Validation

Our POST endpoint validates:
- item must be a non-empty string.
- quantity must be a positive safe integer.

Validation protects application state from invalid input.

TypeScript does not replace runtime validation.

## 10. curl

curl is a command-line tool for sending HTTP requests.

Example:

```bash
curl -i http://localhost:3000/orders
```

Useful options:
- `-i`: Include response headers.
- `-X`: Specify HTTP method.
- `-H`: Add a request header.
- `-d`: Send request body data.

## 11. Idempotency

An operation is idempotent when repeating it has the
same intended effect on server state as executing it once.

GET, PUT, and DELETE have idempotent HTTP semantics.

POST is not generally idempotent.

Example:
Repeating POST /orders may create multiple orders.

Idempotency keys can help prevent duplicate creations
during client retries.

## 12. In-Memory Storage

Our application currently stores orders in an array.

Advantages:
- Simple to implement.
- No database configuration.
- Useful for learning API behavior.

Limitations:
- Data disappears on restart.
- Multiple instances do not share state.
- No durable persistence.
- ID generation is not safe across instances.

We will introduce PostgreSQL to address persistence
and shared data storage.

## 13. Git and Version Control

Git tracks changes to project files.

Useful commands:

```bash
git status
git diff
git add .
git commit -m "message"
git push origin main
```

We use small, focused commits to document project progress.

## Topics to Learn Next

- PUT vs PATCH
- API error handling
- API contract testing
- Reverse proxies
- Load balancing
- Stateless services
- Database persistence
- Caching
- Docker
- CI/CD
