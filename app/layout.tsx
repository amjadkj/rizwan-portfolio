import type { Metadata } from "next";
import { Inter, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "John Doe | Business Analyst — Obsidian Crimson Portfolio",
  description:
    "Executive portfolio of John Doe, Business Analyst specializing in high-stakes quantitative analytics, business process engineering, and strategic enterprise systems.",
  keywords: [
    "Business Analyst",
    "Analytics Portfolio",
    "Data Strategy",
    "Business Intelligence",
    "Process Engineering",
  ],
  authors: [{ name: "John Doe" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="min-h-screen text-[#F5EDED] selection:bg-[#E5484D]/30 selection:text-[#F5EDED] antialiased">
        {children}
      </body>
    </html>
  );
}
