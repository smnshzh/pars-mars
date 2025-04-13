// src/app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js Auth with Cloudflare D1",
  description: "A secure authentication system using NextAuth.js and Cloudflare D1.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {/* Wrap the entire app with SessionProvider */}
        <SessionProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}