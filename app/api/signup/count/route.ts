import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // Get count of email signups
    const { count, error } = await supabase
      .from("email_signups")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to get count", code: "DB_ERROR" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { count: count || 0 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Count API error:", error);
    return NextResponse.json(
      { error: "Internal server error", code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
