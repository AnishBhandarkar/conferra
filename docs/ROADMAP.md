# Conferra – Roadmap

This document outlines planned improvements and upcoming features for the Conferra platform.

The current version supports:

- User authentication
- Event creation
- Event discovery and search
- Event registration
- User profile with created and registered events
- Image uploads via Cloudinary
- Background job cleanup for expired events
- Structured logging
- Error monitoring

The following improvements are planned.

---

# 1. Feature Improvements

## Event Registration Enhancements

- Allow users to cancel registration
- Prevent cancellation after event start
- Show "Registered" badge on event cards
- Show remaining seats for events

## Event Management

- Edit event functionality for organizers
- Delete event functionality for organizers
- Organizer dashboard
- Event attendee list for organizers

## User Profile

- Profile editing
- Change password
- Display upcoming vs past events
- Avatar/profile picture support

## Event Discovery Improvements

- Event sorting (Upcoming, Popular, Recently Added)
- Tag-based filtering
- Location-based filtering
- Calendar view for events

---

# 2. Security Improvements

## Authentication Security

- Implement CSRF protection for cookie-based authentication
- Rate limit authentication endpoints
- Add account lockout for repeated failed login attempts

## API Security

- Rate limiting for critical APIs (event creation, registration)
- Request size limits for uploads
- Input validation hardening

## Content Security

- Configure Content Security Policy (CSP)
- Add security headers (Helmet-style protections)
- Prevent clickjacking via X-Frame-Options

## Data Protection

- Encrypt sensitive environment variables
- Improve password hashing parameters if needed
- Add audit logging for important actions

---

# 3. Performance Improvements

## Database Optimization

- Add indexes for frequently queried fields:

    - `startDate`
    - `tags`
    - `organizer`
    - `location`

## Query Optimization

- Reduce unnecessary `.populate()` usage
- Use projections to limit returned fields

## Caching

- Cache featured events
- Cache event listing queries
- Use Redis or Next.js cache

## Image Optimization

- Use Cloudinary transformations for optimized images
- Serve responsive images

---

# 4. Observability Improvements

## Logging

- Add request-id tracing for logs
- Correlate logs with user sessions

## Monitoring

- Track API latency
- Track registration failures
- Monitor background job performance

---

# 5. Testing

## Unit Testing

Test utility functions:

- token generation
- input sanitization
- validation schemas

## API Testing

Test critical API endpoints:

- signup
- login
- event creation
- event registration
- event search

## Integration Testing

- Authentication flow
- Registration flow
- Event lifecycle

Tools planned:

- Vitest
- Supertest
- Mongo Memory Server

---

# 6. Future Architecture Improvements

## Background Jobs

- Move scheduled jobs to dedicated worker service
- Introduce queue system (BullMQ / Redis)

## Deployment

- Production hosting
- Environment-based configuration
- CI/CD pipeline

## Scalability

- CDN caching
- Horizontal scaling
- Database connection pooling

---

# Status

Current stage: **MVP complete**

Focus now shifts toward:

- reliability
- security
- observability
- testing