import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Developer",
  description: "A passionate full-stack developer creating beautiful and functional web experiences.",
  keywords: ["developer", "portfolio", "full-stack", "react", "next.js", "python"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Portfolio | Full-Stack Developer",
    description: "A passionate full-stack developer creating beautiful and functional web experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
