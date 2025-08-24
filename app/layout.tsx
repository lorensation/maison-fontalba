import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE PORTFOLIO · 2025 — Lucía Fontalba",
  description: "Architect & Interiors — editorial portfolio site."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
