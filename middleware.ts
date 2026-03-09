/**
 * Global middleware.
 * Required because Next expects a `middleware` export.
 */

import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const response = NextResponse.next();

  // Content Security Policy (CSP)
  // Prevents XSS attacks by restricting where resources can be loaded from.
  // - default-src 'self' → Only allow resources from the same origin by default
  // - img-src → Allow images from your domain and Cloudinary CDN
  // - script-src 'self' → Only allow JS from your own domain
  // - style-src 'self' 'unsafe-inline' → Allow styles from your domain (inline needed for some frameworks)
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' https://res.cloudinary.com data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
  );

  // Prevents clickjacking attacks by blocking your site from being embedded in iframes
  response.headers.set("X-Frame-Options", "DENY");

  // Prevents MIME type sniffing which can cause browsers to execute malicious files as scripts
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Controls how much referrer information is shared when navigating to other sites
  // strict-origin-when-cross-origin = full referrer for same origin, only origin for cross-origin
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Restricts access to powerful browser features (camera, mic, geolocation etc.)
  // Prevents abuse from embedded content or third-party scripts
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // Enforces HTTPS for future requests (only effective on HTTPS sites)
  // Protects against protocol downgrade attacks and cookie hijacking
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  // Controls how much information the browser exposes about the user’s environment
  // Reduces fingerprinting surface slightly
  response.headers.set("X-DNS-Prefetch-Control", "off");

  return response;
}