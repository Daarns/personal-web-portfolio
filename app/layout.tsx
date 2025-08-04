import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { Radius } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M Nandana Aruna Apta Baswara - Web Developer",
  description:
    "Portfolio of M Nandana Aruna Apta Baswara, Backend-focused Web Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Favicon dan Icons */}
        <link rel="icon" href="data:," />
        
        {/* Force your custom icon */}
        <link rel="icon" type="image/png" href="/assets/logo/daarn.png" />
        <link rel="shortcut icon" type="image/png" href="/assets/logo/daarn.png" />
        <link rel="apple-touch-icon" href="/assets/logo/daarn.png" />
        
        {/* Additional force methods */}
        <link rel="icon" type="image/x-icon" href="/assets/logo/daarn.png" />
        <link rel="bookmark" href="/assets/logo/daarn.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="relative min-h-screen bg-background text-foreground">
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
