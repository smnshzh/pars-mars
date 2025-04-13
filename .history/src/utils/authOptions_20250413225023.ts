import CredentialsProvider from "next-auth/providers/credentials";
import { hashPassword, verifyPassword } from "./auth";
import type { D1Database } from "@cloudflare/workers-types";

interface Env {
  DB: D1Database;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Get DB from Cloudflare environment
        const db = (req as unknown as { env: Env }).env.DB;
        
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          // Check if user exists
          const { results } = await db
            .prepare("SELECT * FROM users WHERE email = ?")
            .bind(credentials.email)
            .all();

          const users = results as { id: int; email: string; password: string; name?: string }[];

          if (users.length === 0) {
            // Create new user
            const hashedPassword = await hashPassword(credentials.password);
            const insert = await db
              .prepare(
                "INSERT INTO users (email, password, name) VALUES (?, ?, ?) RETURNING *"
              )
              .bind(
                credentials.email,
                hashedPassword,
                credentials.email.split("@")[0]
              )
              .run();

            const newUser = insert.results[0] as { id: string; email: string };
            return { id: newUser.id, email: newUser.email };
          }

          // Verify existing user
          const user = users[0];
          const isValid = await verifyPassword(credentials.password, user.password);
          
          if (!isValid) throw new Error("Invalid password");
          
          return { id: user.id, email: user.email, name: user.name };
        } catch (error) {
          console.error("D1 Auth Error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  // ... rest of your config
};