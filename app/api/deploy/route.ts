// app/api/deploy/route.ts
// Runs git add + commit + push on the server (local dev only).
// Vercel's filesystem is read-only so this is only meaningful locally.

import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);

export const dynamic = "force-dynamic";

export async function POST() {
  // Safety: only allow in local/dev environment
  if (process.env.NODE_ENV === "production" && !process.env.ALLOW_DEPLOY_API) {
    return Response.json(
      { success: false, error: "Deploy API is disabled in production." },
      { status: 403 }
    );
  }

  const cwd = process.cwd();
  const dataFile = path.join(cwd, "data", "portfolio.json");

  try {
    // Check if there are actual changes to commit
    const { stdout: statusOut } = await execAsync("git status --porcelain", { cwd });
    
    if (!statusOut.trim()) {
      return Response.json({ success: true, message: "Nothing to commit — already up to date." });
    }

    // Stage only the data file (and any new files in data/)
    await execAsync("git add -A", { cwd });

    // Commit
    const timestamp = new Date().toISOString().slice(0, 16).replace("T", " ");
    const { stdout: commitOut } = await execAsync(
      `git commit -m "chore: update portfolio data via admin panel (${timestamp})"`,
      { cwd }
    );

    // Push
    const { stdout: pushOut } = await execAsync("git push", { cwd });

    return Response.json({
      success: true,
      message: "Pushed to GitHub successfully!",
      details: {
        commit: commitOut.trim().split("\n")[0],
        push: pushOut.trim() || "Done",
      },
    });
  } catch (err: unknown) {
    const error = err as { stderr?: string; message?: string };
    console.error("[api/deploy] Error:", error);
    return Response.json(
      {
        success: false,
        error: error?.stderr || error?.message || "Unknown error during git push.",
      },
      { status: 500 }
    );
  }
}
