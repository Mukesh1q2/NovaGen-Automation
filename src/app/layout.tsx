import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NovaGen Automation - Systems and Solutions",
  description: "NovaGen Automation provides comprehensive automation solutions including AC drives, Siemens products, electrical panels, and industrial automation systems.",
  keywords: ["NovaGen Automation", "Systems and Solutions", "AC Drives", "Siemens", "Industrial Automation", "Electrical Panels"],
  authors: [{ name: "NovaGen Automation" }],
  openGraph: {
    title: "NovaGen Automation - Systems and Solutions",
    description: "Comprehensive automation solutions for industries",
    url: "https://novagenautomation.com",
    siteName: "NovaGen Automation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaGen Automation - Systems and Solutions",
    description: "Comprehensive automation solutions for industries",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ChatBot />
        <Toaster />
      </body>
    </html>
  );
}
