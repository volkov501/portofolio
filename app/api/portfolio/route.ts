// app/api/portfolio/route.ts
import { getPortfolioData, savePortfolioData } from "@/lib/portfolioData";
import type { PortfolioData } from "@/lib/defaultData";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = getPortfolioData();
  return Response.json(data);
}

export async function POST(request: Request) {
  try {
    const body: PortfolioData = await request.json();
    savePortfolioData(body);
    return Response.json({ success: true });
  } catch (err) {
    console.error("[api/portfolio] Save error:", err);
    return Response.json({ success: false, error: "Failed to save" }, { status: 500 });
  }
}
