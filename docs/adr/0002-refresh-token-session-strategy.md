# ADR-0002: Refresh Token Session Strategy

Status: Accepted
Date: 2026-03-05

## Context

Conferra uses JWT access tokens and database-backed refresh tokens for authentication.
Each login generates a new refresh token stored in the database.

A design decision was required to determine how refresh tokens should behave when a user logs in multiple times across devices or browsers.

Three common session management strategies were considered.

## Options Considered

### Option 1: Allow Multiple Sessions (Chosen)

Each login creates a new refresh token without invalidating existing ones.

Example:
Laptop login → RT1
Phone login → RT2
Tablet login → RT3

All tokens remain valid until expiration or logout.

Pros:
* Allows users to stay logged in across multiple devices
* Provides better user experience for SaaS products
* Simplifies login flow

Cons:
* More refresh tokens stored in the database
* Slightly larger attack surface if tokens are compromised

### Option 2: Single Active Session

When a user logs in, all existing refresh tokens for that user are deleted and replaced with a new one.

Example:
Laptop login → RT1
Phone login → RT1 invalidated → RT2 created

Pros:
* Reduces number of valid tokens
* More secure session management

Cons:
* Logging in on a new device logs out all previous sessions
* Poor user experience for multi-device usage

### Option 3: Limited Concurrent Sessions

Allow a fixed number of active sessions per user (e.g., 5).
If the limit is exceeded, the oldest refresh token is deleted.

Pros:
* Balanced security and usability
* Prevents unlimited token accumulation

Cons:
* More complex implementation
* Requires tracking token creation order

## Decision

Conferra will use **Option 1: Allow Multiple Sessions**.

Each login generates a new refresh token that is stored in the database with an expiration time.

Refresh tokens are hashed before storage, and each token expires automatically via MongoDB TTL indexing.

## Consequences

Positive:
* Users can remain logged in on multiple devices simultaneously
* Simplifies login and session management logic
* Aligns with behavior of most SaaS applications

Negative:
* Multiple refresh tokens may exist per user
* Additional logic may be required in the future to manage excessive sessions

Future Consideration:
If session security requirements increase, the system may evolve to support limited concurrent sessions or token-family-based reuse detection.
