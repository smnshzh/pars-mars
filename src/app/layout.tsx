// src/app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import SessionWrapper from "../components/SessionWrapper";
import Navbar from "../components/Navbar";

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
        {/* Wrap the app with SessionWrapper */}
        <SessionWrapper>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}