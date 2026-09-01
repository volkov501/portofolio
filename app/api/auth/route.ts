// app/api/auth/route.ts
// Simple password-based auth for the admin panel.
// Returns a signed token stored in the browser's localStorage.

export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "arrashi2026";
// Very lightweight "token" — just a base64 of timestamp + secret.
// Good enough for a personal portfolio; not production-grade auth.
const SECRET = process.env.ADMIN_SECRET ?? "portfolio-cms-secret-2026";

function makeToken(): string {
  return Buffer.from(`${Date.now()}::${SECRET}`).toString("base64");
}

export function validateToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    return decoded.endsWith(`::${SECRET}`);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const { password } = await request.json();
  if (password === ADMIN_PASSWORD) {
    return Response.json({ success: true, token: makeToken() });
  }
  return Response.json({ success: false, error: "Invalid password" }, { status: 401 });
}
