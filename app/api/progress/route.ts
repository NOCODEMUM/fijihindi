import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// GET - Fetch user progress
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID required" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") { // PGRST116 = no rows found
      throw error;
    }

    // Return empty progress if none exists
    if (!data) {
      return NextResponse.json({
        conversations_completed: [],
        phrases_learned: [],
        current_streak: 0,
        longest_streak: 0,
        last_activity_date: null,
        total_calls: 0,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}

// POST - Update user progress
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      conversation_id,
      phrases_learned,
      call_duration,
    } = body;

    // Get existing progress
    const { data: existingProgress } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .single();

    const today = new Date().toISOString().split("T")[0];

    // Calculate streak
    let currentStreak = existingProgress?.current_streak || 0;
    let longestStreak = existingProgress?.longest_streak || 0;

    if (existingProgress?.last_activity_date !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (existingProgress?.last_activity_date === yesterdayStr) {
        currentStreak += 1;
      } else {
        currentStreak = 1;
      }

      longestStreak = Math.max(currentStreak, longestStreak);
    }

    // Merge conversations completed
    const completedConversations = new Set([
      ...(existingProgress?.conversations_completed || []),
      conversation_id,
    ]);

    // Merge phrases learned
    const learnedPhrases = new Set([
      ...(existingProgress?.phrases_learned || []),
      ...phrases_learned,
    ]);

    // Upsert progress
    const { data, error } = await supabase
      .from("user_progress")
      .upsert({
        user_id: userId,
        conversations_completed: Array.from(completedConversations),
        phrases_learned: Array.from(learnedPhrases),
        current_streak: currentStreak,
        longest_streak: longestStreak,
        last_activity_date: today,
        total_calls: (existingProgress?.total_calls || 0) + 1,
        total_minutes: (existingProgress?.total_minutes || 0) + Math.ceil((call_duration || 0) / 60),
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "user_id",
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Also log to call history
    if (conversation_id) {
      await supabase.from("call_history").insert({
        user_id: userId,
        conversation_id,
        duration_seconds: call_duration || 0,
        completed: true,
        completed_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      progress: data,
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 }
    );
  }
}

// DELETE - Reset user progress
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID required" },
        { status: 401 }
      );
    }

    const { error } = await supabase
      .from("user_progress")
      .delete()
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error resetting progress:", error);
    return NextResponse.json(
      { error: "Failed to reset progress" },
      { status: 500 }
    );
  }
}
