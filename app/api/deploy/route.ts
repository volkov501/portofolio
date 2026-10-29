// app/api/deploy/route.ts
// Commits data/portfolio.json and runs git push on the server (local dev only).
// Vercel's filesystem is read-only so this is only meaningful locally.

import { exec } from "child_process";
import { promisify } from "util";
import { isAuthorized } from "@/lib/adminAuth";

const execAsync = promisify(exec);

export const dynamic = "force-dynamic";

// Only the admin-panel data file is ever committed, never other work in the tree.
const DATA_PATH = "data/portfolio.json";

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  // Safety: only allow in local/dev environment
  if (process.env.NODE_ENV === "production" && !process.env.ALLOW_DEPLOY_API) {
    return Response.json(
      { success: false, error: "Deploy API is disabled in production." },
      { status: 403 }
    );
  }

  const cwd = process.cwd();

  try {
    // Check if the data file actually changed
    const { stdout: statusOut } = await execAsync(`git status --porcelain -- ${DATA_PATH}`, { cwd });

    if (!statusOut.trim()) {
      return Response.json({ success: true, message: "Nothing to commit — already up to date." });
    }

    // Stage and commit only the data file
    await execAsync(`git add -- ${DATA_PATH}`, { cwd });

    const timestamp = new Date().toISOString().slice(0, 16).replace("T", " ");
    const { stdout: commitOut } = await execAsync(
      `git commit -m "chore: update portfolio data via admin panel (${timestamp})" -- ${DATA_PATH}`,
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
