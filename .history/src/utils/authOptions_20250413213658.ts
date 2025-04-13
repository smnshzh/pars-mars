// src/utils/authOptions.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace this with your actual authentication logic
        if (
          credentials?.email === "user@example.com" &&
          credentials?.password === "password123"
        ) {
          return { id: "1", name: "John Doe", email: "user@example.com" };
        }
        return null; // Authentication failed
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirect to your custom login page
    error: "/error",  // Redirect to a custom error page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure you set this in your .env file
};