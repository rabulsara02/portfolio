import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rahul Bulsara | Backend Developer",
  description: "A backend developer building robust, scalable systems and APIs.",
  keywords: ["developer", "portfolio", "backend", "python", "fastapi", "databases"],
  authors: [{ name: "Rahul Bulsara" }],
  openGraph: {
    title: "Rahul Bulsara | Backend Developer",
    description: "A backend developer building robust, scalable systems and APIs.",
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
