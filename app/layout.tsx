import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/providers";
import Navbar from "@/components/core/navbar/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contelizer - zadania rekrutacyjne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`overflow-x-clip w-full ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="dark flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 mx-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
