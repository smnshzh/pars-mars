// src/utils/authOptions.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { hashPassword, verifyPassword } from "../utils/auth";
import { D1Database } from "@cloudflare/d1";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to Cloudflare D1 Database
        const d1 = new D1Database({ binding: "DB" }); // Replace "DB" with your D1 binding name

        try {
          // Check if the user exists in the database
          const { results: users } = await d1
            .prepare("SELECT * FROM users WHERE email = ?")
            .bind(credentials?.email)
            .all();

          if (users.length === 0) {
            // User does not exist, so create a new user (sign-up)
            const hashedPassword = await hashPassword(credentials?.password);

            await d1
              .prepare(
                "INSERT INTO users (email, password, name) VALUES (?, ?, ?)"
              )
              .bind(credentials?.email, hashedPassword, credentials?.email.split("@")[0]) // Use email prefix as name
              .run();

            return { id: "new", email: credentials?.email }; // Return the new user object
          }

          // User exists, so verify the password (sign-in)
          const user = users[0];
          const isValidPassword = await verifyPassword(
            credentials?.password,
            user.password
          );

          if (!isValidPassword) {
            throw new Error("Invalid password.");
          }

          return { id: user.id, email: user.email, name: user.name };
        } catch (error) {
          console.error("Authentication error:", error);
          return null; // Authentication failed
        }
      },
    }),
  ],
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