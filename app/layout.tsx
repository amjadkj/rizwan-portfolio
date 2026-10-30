import type { Metadata } from "next";
import { Inter, Space_Grotesk, Playfair_Display, Archivo, Geist } from "next/font/google";
import { CurtainLoader } from "@/components/tds/curtain-loader/CurtainLoader";
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

const archivo = Archivo({
  variable: "--tds-display",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const geist = Geist({
  variable: "--tds-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rizwanshaji.com"),
  title: "Rizwan Shaji | Business Analyst",
  description:
    "Executive portfolio of Rizwan Shaji, Business Analyst specializing in high-stakes quantitative analytics, business process engineering, and strategic enterprise systems.",
  keywords: [
    "Business Analyst",
    "Analytics Portfolio",
    "Data Strategy",
    "Business Intelligence",
    "Process Engineering",
  ],
  authors: [{ name: "Rizwan Shaji" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${playfair.variable} ${archivo.variable} ${geist.variable}`}
    >
      <body className="min-h-screen text-[#F5EDED] selection:bg-[#E5484D]/30 selection:text-[#F5EDED] antialiased">
        <CurtainLoader>
          {children}
        </CurtainLoader>
      </body>
    </html>
  );
}


