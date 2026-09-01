import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | Portfolio CMS",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-slate-200 antialiased">
      {children}
    </div>
  );
}
