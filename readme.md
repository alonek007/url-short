# URL Shortener

A production-inspired URL shortener built with Node.js, Express, PostgreSQL, Prisma, and Redis.

## Features

* Create short URLs from long URLs
* Base62 encoding for deterministic short codes
* PostgreSQL for persistent storage
* Redis caching for fast URL lookups
* Rate limiting to prevent abuse
* URL validation using Zod
* Automatic redirects using short codes

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Prisma ORM

### Caching

* Redis

### Validation & Security

* Zod
* Express Rate Limit

---

## Architecture

```text
Client
  ↓
Express API
  ↓
Redis Cache
  ↓ miss
PostgreSQL
```

### URL Creation Flow

```text
POST /shorten
      ↓
Validate URL
      ↓
Store in PostgreSQL
      ↓
Generate Base62 code from database ID
      ↓
Update shortCode
      ↓
Return shortened URL
```

### Redirect Flow

```text
GET /:shortCode
      ↓
Check Redis Cache
      ↓
Cache Hit → Redirect
      ↓
Cache Miss
      ↓
Query PostgreSQL
      ↓
Store result in Redis
      ↓
Redirect
```

---

## API Endpoints

### Create Short URL

```http
POST /shorten
```

Request:

```json
{
  "originalUrl": "https://www.youtube.com"
}
```

Response:

```json
{
  "shortCode": "21",
  "shortUrl": "http://localhost:3000/21",
  "originalUrl": "https://www.youtube.com"
}
```

---

### Redirect

```http
GET /:shortCode
```

Example:

```http
GET /21
```

Redirects to the original URL.

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd url-shortener
```

Install dependencies:

```bash
npm install
```

Configure environment variables:

```env
DATABASE_URL=your_postgres_connection_string
PORT=3000
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Generate Prisma client:

```bash
npx prisma generate
```

Start Redis:

```bash
redis-server
```

Run the application:

```bash
npm start
```

---

## Learning Goals

This project was built to learn:

* REST API development
* Database design with PostgreSQL
* Prisma ORM
* Redis caching
* Rate limiting
* Base62 encoding
* Backend architecture and system design concepts

---

## Future Improvements

* Docker support
* Click analytics
* Snowflake-based ID generation
* Custom aliases
* Deployment with Render, Neon, and Upstash

```
```
