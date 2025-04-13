// src/app/api/auth/[...nextauth]/route.ts
import { authOptions } from "../../../../utils/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

// Export handlers for GET and POST requests
export { handler as GET, handler as POST };

// Add CORS headers
handler.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});