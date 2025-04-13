// src/app/layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar";

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
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}