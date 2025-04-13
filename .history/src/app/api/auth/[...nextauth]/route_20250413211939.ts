// src/app/api/auth/[...nextauth]/route.ts
import { authOptions } from"../../../../utils/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

// Export handlers for GET and POST requests
export { handler as GET, handler as POST };