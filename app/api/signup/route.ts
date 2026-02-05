import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source = "landing" } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required", code: "MISSING_EMAIL" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format", code: "INVALID_EMAIL" },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Insert into Supabase
    const { data, error } = await supabase
      .from("email_signups")
      .insert([
        {
          email: normalizedEmail,
          source: source,
        },
      ])
      .select()
      .single();

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Email already registered", code: "EMAIL_EXISTS" },
          { status: 409 }
        );
      }

      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save email", code: "DB_ERROR" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email registered successfully",
        id: data.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup API error:", error);
    return NextResponse.json(
      { error: "Internal server error", code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
