// src/app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js Auth with Cloudflare D1",
  description: "A secure authentication system using NextAuth.js and Cloudflare D1.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the session on the server side
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={inter.className}>
      <body>
        {/* Pass the session to SessionProvider */}
        <SessionProvider session={session}>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}