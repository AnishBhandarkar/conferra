# ADR-0003: Logout Session Strategy

Status: Accepted
Date: 2026-03-05

## Context

Conferra uses JWT access tokens and database-backed refresh tokens stored in HTTP-only cookies.
Users may authenticate from multiple devices simultaneously (e.g., laptop, phone, tablet).

A design decision was required to determine how logout should behave when multiple refresh tokens exist for the same user.

The refresh token system supports multiple active sessions because each login generates a new refresh token stored in the database.

## Options Considered

### Option 1: Logout Current Session Only (Chosen)

Logout invalidates only the refresh token associated with the current device/session.

Implementation steps:

1. Read refresh token from cookie.
2. Hash the refresh token.
3. Delete the corresponding refresh token document from the database.
4. Clear authentication cookies from the browser.

Example:
Laptop → RT1
Phone → RT2
Tablet → RT3

User logs out on Phone → RT2 deleted.
Other sessions remain active.

Pros:
* Good user experience
* Users stay logged in on other devices
* Aligns with most SaaS authentication behavior
* Simple and predictable implementation

Cons:
* Other sessions remain active unless manually logged out

---

### Option 2: Logout All Sessions

Logout invalidates every refresh token belonging to the user.

Implementation:
Delete all refresh tokens for the user:
```
RefreshToken.deleteMany({ user: userId })
```

Pros:
* Stronger security
* Useful if account compromise is suspected

Cons:
* Logging out from one device logs out every other device
* Poorer user experience

---

### Option 3: Dual Logout Options

Provide two logout options:
* Logout
* Logout from all devices

Pros:
* Maximum flexibility
* Better security control for users

Cons:
* More complex API and UI implementation

## Decision

Conferra will use **Option 1: Logout Current Session Only**.

The logout endpoint invalidates only the refresh token associated with the current browser session.

Authentication cookies are cleared and the corresponding refresh token record is removed from the database.

## Consequences

Positive:
* Users remain logged in on other devices
* Matches behavior of common SaaS platforms
* Simplifies logout implementation

Negative:
* Users must manually log out from other devices if desired

Future Consideration:
A "Logout from all devices" feature may be added in the future by deleting all refresh tokens associated with the user.
