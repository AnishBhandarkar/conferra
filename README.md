# Conferra

Conferra is a full-stack **event discovery and registration platform** built with **Next.js (App Router), TypeScript, and MongoDB**.

Users can discover tech events, register for them, and organizers can create and manage events with rich details and banner images.

The project is designed with **production-grade backend architecture**, including secure authentication, validation, structured logging, monitoring, and automated maintenance jobs.

This project focuses not only on features but also on **engineering practices used in real production systems**.

---

# Features

## Authentication

* Secure **JWT authentication**
* Access token + refresh token strategy
* Refresh token rotation
* HttpOnly cookie based authentication

---

## Event Discovery

Users can:

* Browse tech events
* View detailed event pages
* Discover **featured events**
* Search and filter events

Each event includes:

* title
* description
* venue
* location
* start and end time
* tags
* agenda
* organizer information

---

## Event Creation

Authenticated users can create events including:

* event title and description
* event banner image
* location and venue
* agenda and tags
* capacity

Event banner images are uploaded to **Cloudinary**.

---

## Event Registration

Users can register for events with:

* capacity validation
* duplicate registration prevention
* attendee count tracking
* automatic login redirect for unauthenticated users

---

## User Profile

Each user has a profile dashboard displaying:

* events they created
* events they registered for

---

## Automated Maintenance

A scheduled background job automatically:

* deletes expired events
* removes associated registrations
* deletes event banner images from Cloudinary

This prevents stale data and unused storage.

---

## Observability

The platform includes observability features used in production systems.

### Logging

Structured logging using **Pino**.

Logs capture:

* event creation
* registrations
* authentication events
* system errors

### Monitoring

Error monitoring using **Sentry**.

Sentry captures:

* server errors
* API failures
* client crashes
* stack traces for debugging production issues

---

# Tech Stack

## Frontend

* Next.js (App Router)
* React Server Components
* TypeScript
* Tailwind CSS

## Backend

* Next.js Route Handlers
* MongoDB
* Mongoose ODM

## Authentication

* JWT
* Refresh token rotation
* HttpOnly cookies

## Storage

* Cloudinary (image hosting)

## Observability

* Pino logging
* Sentry monitoring

## Background Jobs

* node-cron for scheduled cleanup tasks

---

# Getting Started

Clone the repository.

```
git clone https://github.com/your-username/conferra.git
cd conferra
```

Install dependencies.

```
npm install
```

Run the development server.

```
npm run dev
```

Open:

```
http://localhost:3000
```

---

# Environment Variables

Create a `.env.local` file.

Example configuration:

```
MONGODB_URI=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

SENTRY_DSN=
SENTRY_ENABLED=false
NEXT_PUBLIC_SENTRY_ENABLED=false
```

---

# Architecture Decisions (ADR)

Important architecture decisions are documented using **Architecture Decision Records**.

See:

```
docs/adr
```

Examples include:

* JWT authentication strategy
* refresh token storage design
* event registration data model
* Cloudinary image storage approach
* background job cleanup strategy

Documenting these decisions makes the architecture easier to understand and evolve.

---

# Roadmap

Planned improvements are documented in:

```
docs/ROADMAP.md
```


---

# Engineering Focus

This project demonstrates practices used in production systems:

* secure authentication patterns
* background job scheduling
* structured logging
* error monitoring
* API validation and sanitization
* scalable database modeling

---

# License

This project is built for **learning and portfolio purposes**.

```

---
