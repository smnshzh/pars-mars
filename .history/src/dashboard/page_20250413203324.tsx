// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-lg">
          You must be logged in to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Dashboard</h1>
        <p className="text-gray-700 mb-4">
          Welcome, {session.user?.name || "User"}!
        </p>
      </div>
    </div>
  );
}