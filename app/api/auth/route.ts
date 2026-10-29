// app/api/auth/route.ts
// Password-based auth for the admin panel.
// Returns a signed, expiring token stored in the browser's localStorage.

import { checkPassword, isAdminConfigured, makeToken } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return Response.json(
      { success: false, error: "Admin login is disabled: set ADMIN_PASSWORD in .env.local." },
      { status: 503 }
    );
  }
  const { password } = await request.json().catch(() => ({}));
  if (checkPassword(password)) {
    return Response.json({ success: true, token: makeToken() });
  }
  return Response.json({ success: false, error: "Invalid password" }, { status: 401 });
}
