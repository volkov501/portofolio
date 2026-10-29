// app/api/portfolio/route.ts
import { getPortfolioData, savePortfolioData } from "@/lib/portfolioData";
import { isAuthorized } from "@/lib/adminAuth";
import type { PortfolioData } from "@/lib/defaultData";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = getPortfolioData();
  return Response.json(data);
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body: PortfolioData = await request.json();
    savePortfolioData(body);
    return Response.json({ success: true });
  } catch (err) {
    console.error("[api/portfolio] Save error:", err);
    return Response.json({ success: false, error: "Failed to save" }, { status: 500 });
  }
}
