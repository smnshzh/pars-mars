// src/app/page.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function HomePage() {
  // Fetch the user's session (optional)
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-blue-600">Welcome to MyApp</h1>
        <p className="text-gray-700 text-lg">
          A secure and modern platform built with Next.js and Cloudflare D1.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex gap-4 mt-6">
          {session ? (
            // If the user is logged in, show a link to the dashboard
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              {/* If the user is not logged in, show login and signup buttons */}
              <Link
                href="/login"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full text-center py-4 bg-gray-100">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} MyApp. All rights reserved.
        </p>
      </footer>
    </div>
  );
}