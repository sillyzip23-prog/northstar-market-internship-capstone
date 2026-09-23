# Architecture and delivery notes

## Runtime shape

```text
Browser (client)
  ├─ UI controller: view state, events, accessible announcements
  ├─ API module: fetch, JSON handling, local demo fallback
  ├─ localStorage: theme and cart only
  └─ same-origin HTTP ──> Node server
                           ├─ /api/health
                           └─ /api/products (GET, POST, PATCH, DELETE)
```

The client has no framework or build step, keeping the first slice inspectable and easy to run. `server/index.js` serves the static client and a small JSON API. Catalog records are held in memory for this instructional version. The boundary makes it straightforward to replace the store with a database adapter without moving UI concerns to the server.

## Local setup

Install Node.js 18+, clone the repository, and run `node server/index.js` from the repository root. Visit `http://localhost:3000`. The server binds to `PORT` (default 3000). `DEMO_API=1` switches catalog reads to Fake Store API. Network failure displays a notice and keeps the built-in sample catalog usable.

## First vertical slice and later slices

1. Browse product catalog: API request, loading state, error fallback.
2. Search, category filtering, price sorting, and product detail dialog.
3. Persistent cart with quantity updates and a simulated checkout.
4. Admin CRUD through the API, then replace in-memory records with durable storage.

## Production boundaries

Login and checkout are simulations; there is no real identity, payment, order storage, or server-side user authorization. Do not enter real personal or payment data. Before production use, add authentication, authorization, database migrations, input validation, rate limiting, CSRF strategy, structured logging, automated tests, and deployment secrets management. The demo server is a single-process learning service.
