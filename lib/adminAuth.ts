// lib/adminAuth.ts
// Password login + HMAC-signed, expiring tokens for the admin panel.
// Server-only: call from Route Handlers.

import crypto from "crypto";

// No hardcoded fallback: this repo is public, so any default password would be public too.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
const SECRET = process.env.ADMIN_SECRET || ADMIN_PASSWORD;
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function sign(payload: string): string {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

export function isAdminConfigured(): boolean {
  return ADMIN_PASSWORD.length > 0;
}

export function checkPassword(password: unknown): boolean {
  return isAdminConfigured() && typeof password === "string" && safeEqual(password, ADMIN_PASSWORD);
}

export function makeToken(): string {
  const expires = String(Date.now() + TOKEN_TTL_MS);
  return `${expires}.${sign(expires)}`;
}

export function validateToken(token: string | null | undefined): boolean {
  if (!isAdminConfigured() || !token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || !safeEqual(signature, sign(expires))) return false;
  return Number(expires) > Date.now();
}

// Route Handler guard: expects "Authorization: Bearer <token>".
// The custom header also blocks cross-site form/fetch posts (CSRF) against the local dev server.
export function isAuthorized(request: Request): boolean {
  const header = request.headers.get("authorization") ?? "";
  return validateToken(header.replace(/^Bearer\s+/i, ""));
}
