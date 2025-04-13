// src/components/Navbar.tsx
"use client"; // Mark this as a client component because it uses hooks

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-600 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          MyApp
        </Link>
        <div className="flex gap-4">
          {session ? (
            <>
              <Link href="/dashboard" className="hover:text-gray-200">
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="hover:text-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:text-gray-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}