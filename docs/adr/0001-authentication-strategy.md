# ADR-0001: Authentication Strategy

Status: Accepted
Date: 2026-03-04

## Context

Conferra is a Next.js full-stack SaaS application where the frontend and backend run within the same origin.
We needed to design an authentication mechanism that balances security, simplicity, and maintainability.

Two common approaches were considered:

1. Access token in Authorization header + refresh token in HTTP-only cookie
2. Access token and refresh token both stored in HTTP-only cookies

## Decision

We decided to store both the access token and refresh token in **HTTP-only secure cookies**.

Access Token:
* Short-lived JWT (10–15 minutes)

Refresh Token:
* Long-lived token stored hashed in database
* Sent via HTTP-only cookie
* Rotated on refresh
* Expiration managed using MongoDB TTL index

Security configurations:
* HttpOnly
* Secure
* SameSite=Strict

## Rationale

This approach was selected because:
* Conferra is a same-origin monolith application
* Cookies are automatically sent by the browser
* HTTP-only cookies prevent JavaScript access, reducing token theft via XSS
* Eliminates the need for frontend token management
* Simplifies middleware authentication in Next.js

Bearer token strategies are typically used for public APIs, mobile clients, or multi-service architectures, which are not part of Conferra's current scope.

## Consequences

Positive:
* Simpler frontend logic
* Strong protection against token exfiltration via XSS
* Middleware can authenticate requests directly using cookies

Negative:
* Requires CSRF mitigation (handled via SameSite cookies)
* Slightly less flexible if third-party clients are introduced in the future

If Conferra later exposes public APIs or mobile clients, the authentication strategy may evolve to support Bearer tokens.
