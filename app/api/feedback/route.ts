import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, email, pageUrl } = body;

    // Validate content
    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Feedback content is required", code: "MISSING_CONTENT" },
        { status: 400 }
      );
    }

    // Validate content length
    if (content.length > 5000) {
      return NextResponse.json(
        { error: "Feedback is too long (max 5000 characters)", code: "CONTENT_TOO_LONG" },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Invalid email format", code: "INVALID_EMAIL" },
          { status: 400 }
        );
      }
    }

    // Get user agent for debugging purposes
    const userAgent = request.headers.get("user-agent") || undefined;

    // Insert into Supabase
    const { data, error } = await supabase
      .from("feedback")
      .insert([
        {
          content: content.trim(),
          email: email?.trim().toLowerCase() || null,
          page_url: pageUrl || null,
          user_agent: userAgent,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save feedback", code: "DB_ERROR" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your feedback!",
        id: data.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Feedback API error:", error);
    return NextResponse.json(
      { error: "Internal server error", code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
