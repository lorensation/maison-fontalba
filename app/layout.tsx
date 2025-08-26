import type { Metadata } from "next";
import "./globals.css";
import { display, text } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "THE PORTFOLIO · 2025 — Lucía Fontalba",
  description: "Architect & Interiors — editorial portfolio site."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body className="antialiased font-text">{children}</body>
    </html>
  );
}
