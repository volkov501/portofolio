// lib/portfolioData.ts
// Server-side helpers for reading and writing portfolio.json.
// Only call these from Server Components or API Route Handlers.

import fs from "fs";
import path from "path";
import { defaultPortfolioData, type PortfolioData } from "./defaultData";

const DATA_FILE = path.join(process.cwd(), "data", "portfolio.json");

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getPortfolioData(): PortfolioData {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    // First run: write defaults so admin panel can edit them
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultPortfolioData, null, 2), "utf-8");
    return defaultPortfolioData;
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as PortfolioData;
  } catch {
    console.error("[portfolioData] Failed to parse portfolio.json — using defaults");
    return defaultPortfolioData;
  }
}

export function savePortfolioData(data: PortfolioData): void {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}
