// src/app/api/signup/route.ts
import { hashPassword } from "../../../utils/auth";
import { authOptions } from "../../../../utils/authOptions";
import { D1Database } from "@cloudflare/d1";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password || !name) {
      return Response.json(
        { message: "Please fill in all fields." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Connect to Cloudflare D1 Database
    const d1 = new D1Database({ binding: "DB" }); // Replace "DB" with your D1 binding name

    // Check if the email already exists
    const { results: existingUsers } = await d1
      .prepare("SELECT * FROM users WHERE email = ?")
      .bind(email)
      .all();

    if (existingUsers.length > 0) {
      return Response.json(
        { message: "A user with this email already exists." },
        { status: 409 }
      );
    }

    // Insert the new user into the database
    await d1
      .prepare("INSERT INTO users (email, password, name) VALUES (?, ?, ?)")
      .bind(email, hashedPassword, name)
      .run();

    // Return success response
    return Response.json({ message: "User created successfully." }, { status: 201 });
  } catch (error) {
    console.error("Error during signup:", error);
    return Response.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}