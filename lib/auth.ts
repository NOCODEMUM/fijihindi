import { supabase } from "./supabase";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";

// Auth state type
export interface AuthState {
  user: SupabaseUser | null;
  session: Session | null;
  loading: boolean;
}

// Sign in with magic link (email)
export async function signInWithMagicLink(email: string, redirectTo?: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo || `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
  return data;
}

// Sign in with Google
export async function signInWithGoogle(redirectTo?: string) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) throw error;
  return data;
}

// Sign in with Apple
export async function signInWithApple(redirectTo?: string) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "apple",
    options: {
      redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
  return data;
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;

  // Clear local storage on sign out
  localStorage.removeItem("fijihindi_user");
  localStorage.removeItem("fijihindi_onboarded");
  localStorage.removeItem("fijihindi_family_tree");
}

// Get current session
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

// Get current user
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

// Listen to auth state changes
export function onAuthStateChange(
  callback: (event: string, session: Session | null) => void
) {
  return supabase.auth.onAuthStateChange(callback);
}

// Migrate localStorage data to Supabase user account
export async function migrateLocalDataToAccount(userId: string) {
  // Get data from localStorage
  const storedUser = localStorage.getItem("fijihindi_user");
  const storedFamilyTree = localStorage.getItem("fijihindi_family_tree");

  if (storedUser) {
    const userData = JSON.parse(storedUser);

    // Update user profile in Supabase
    const { error: userError } = await supabase
      .from("users")
      .upsert({
        id: userId,
        current_city: userData.city,
        current_country: userData.country,
        fiji_origin: userData.origin,
        faith: userData.faith,
        lat: userData.lat,
        lng: userData.lng,
      });

    if (userError) {
      console.error("Error migrating user data:", userError);
    }
  }

  if (storedFamilyTree) {
    const familyMembers = JSON.parse(storedFamilyTree);

    // Migrate each family member
    for (const member of familyMembers) {
      const { error: memberError } = await supabase
        .from("family_members")
        .upsert({
          id: member.id,
          user_id: userId,
          name: member.name,
          relationship_type: member.relationshipType,
          parent_member_id: member.parentMemberId,
        });

      if (memberError) {
        console.error("Error migrating family member:", memberError);
      }
    }
  }

  // Clear localStorage after successful migration
  // Keep it as backup for now
  // localStorage.removeItem("fijihindi_user");
  // localStorage.removeItem("fijihindi_family_tree");
}

// Check if user has completed onboarding
export async function hasCompletedOnboarding(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("users")
    .select("fiji_origin, faith")
    .eq("id", userId)
    .single();

  if (error || !data) return false;

  // User has completed onboarding if they have both origin and faith set
  return !!(data.fiji_origin && data.faith);
}

// Link anonymous data to authenticated user
export async function linkAnonymousData(authUserId: string) {
  const localUserId = localStorage.getItem("fijihindi_local_user_id");

  if (localUserId && localUserId !== authUserId) {
    // Update family members to point to the authenticated user
    await supabase
      .from("family_members")
      .update({ user_id: authUserId })
      .eq("user_id", localUserId);

    // Delete the old anonymous user record
    await supabase
      .from("users")
      .delete()
      .eq("id", localUserId);

    // Clear the local user ID
    localStorage.removeItem("fijihindi_local_user_id");
  }
}
