import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FallingLeaves, Navbar } from "@/components";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Landing",
  description: "Landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Navbar />
        <div className="relative flex-1">
          <FallingLeaves />
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
