# Node.js Practice — Express Products API

A simple Node.js + Express REST API for browsing products, with request logging, route-level middleware, and centralized error handling. Includes a Docker Compose setup for PostgreSQL + pgAdmin.

---

## Project Structure

```
index.js               App entry point — mounts middleware and starts server
product.routes.js      Product route definitions
middleware.js          Request logger and brand-blocking middleware
error.middleware.js    Centralized error handler
products.js            In-memory product data (12 items, 3 brands)
index.html             Static HTML page served via Nginx (Docker)
dockerfile             Nginx container serving index.html
docker-compose.yml     PostgreSQL + pgAdmin services
package.json           Dependencies
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /products | Return all products |
| GET | /products/:brand | Return products filtered by brand |
| GET | /products/id/:id | Return a single product by ID |
| GET | /productswitherror | Always throws a 400 error (test route) |

### Notes

- GET /products/:brand blocks Brand C — returns 403 Forbidden.
- GET /products/id/:id returns 400 if the ID does not exist.
- All errors are handled centrally by errorResponder in error.middleware.js.

---

## Middleware

logRequest — logs every incoming request method and URL to the console.

blockSpecialBrand — applied to /products/:brand; rejects requests for Brand C with 403 Unavailable Brand.

errorResponder — catches any thrown Error with a statusCode field and returns it as a JSON response with the matching HTTP status.

---

## In-Memory Data

12 products across three brands:

| Brand | IDs |
|-------|-----|
| Brand A | 1, 4, 6, 9, 10, 12 |
| Brand B | 2, 5, 8 |
| Brand C | 3, 7, 11 (blocked) |

---

## Running Locally

```bash
npm install
node index.js
# Server starts at http://localhost:3000

# Or with auto-reload:
npx nodemon index.js
```

---

## Docker

### Nginx (static HTML)

```bash
docker build -t nginx-app .
docker run -p 80:80 nginx-app
```

### PostgreSQL + pgAdmin

```bash
docker-compose up -d
```

| Service | URL | Credentials |
|---------|-----|-------------|
| PostgreSQL | localhost:5432 | nodejs_course_admin / my_password |
| pgAdmin | http://localhost:8080 | admin@example.com / admin_password |

Database name: nodejs_course_database

---

## Dependencies

| Package | Purpose |
|---------|---------|
| express | HTTP server and routing |
| nodemon | Auto-restart on file changes (dev) |
