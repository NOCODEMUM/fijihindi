import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// User type
export interface User {
  id: string;
  email: string | null;
  name: string | null;
  current_city: string | null;
  current_country: string | null;
  fiji_origin: string | null;
  faith: string | null; // hindu, muslim, christian, sikh, other
  lat: number | null;
  lng: number | null;
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  id?: string;
  email?: string | null;
  name?: string | null;
  current_city?: string | null;
  current_country?: string | null;
  fiji_origin?: string | null;
  faith?: string | null;
  lat?: number | null;
  lng?: number | null;
}

// Family member type
export interface FamilyMember {
  id: string;
  user_id: string;
  name: string | null;
  relationship_type: string;
  parent_member_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateFamilyMemberData {
  id?: string;
  user_id: string;
  name?: string | null;
  relationship_type: string;
  parent_member_id?: string | null;
}

// User operations
export async function createUser(userData: CreateUserData): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .insert(userData)
    .select()
    .single();

  if (error) throw error;
  return data as User;
}

export async function getUserById(id: string): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as User;
}

export async function updateUser(id: string, userData: Partial<CreateUserData>): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .update(userData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as User;
}

// Family member operations
export async function createFamilyMember(memberData: CreateFamilyMemberData): Promise<FamilyMember> {
  const { data, error } = await supabase
    .from("family_members")
    .insert(memberData)
    .select()
    .single();

  if (error) throw error;
  return data as FamilyMember;
}

export async function getFamilyMembers(userId: string): Promise<FamilyMember[]> {
  const { data, error } = await supabase
    .from("family_members")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data || []) as FamilyMember[];
}

export async function updateFamilyMember(
  id: string,
  memberData: Partial<CreateFamilyMemberData>
): Promise<FamilyMember> {
  const { data, error } = await supabase
    .from("family_members")
    .update(memberData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as FamilyMember;
}

export async function deleteFamilyMember(id: string): Promise<void> {
  const { error } = await supabase.from("family_members").delete().eq("id", id);
  if (error) throw error;
}

// Diaspora statistics
export async function getDiasporaStats() {
  const { data, error } = await supabase
    .from("users")
    .select("current_country, current_city, fiji_origin, lat, lng")
    .not("lat", "is", null)
    .not("lng", "is", null);

  if (error) throw error;

  type UserLocation = {
    current_country: string | null;
    current_city: string | null;
    fiji_origin: string | null;
    lat: number | null;
    lng: number | null;
  };

  // Aggregate by country/city
  const stats = ((data || []) as UserLocation[]).reduce(
    (acc, user) => {
      const key = `${user.current_city}, ${user.current_country}`;
      if (!acc[key]) {
        acc[key] = {
          country: user.current_country,
          city: user.current_city,
          count: 0,
          lat: user.lat,
          lng: user.lng,
        };
      }
      acc[key].count++;
      return acc;
    },
    {} as Record<
      string,
      {
        country: string | null;
        city: string | null;
        count: number;
        lat: number | null;
        lng: number | null;
      }
    >
  );

  return Object.values(stats).sort((a, b) => b.count - a.count);
}

// Get total user count
export async function getTotalUserCount(): Promise<number> {
  const { count, error } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  if (error) throw error;
  return count || 0;
}

// Get all user locations for map
export async function getUserLocations() {
  const { data, error } = await supabase
    .from("users")
    .select("id, lat, lng, fiji_origin, current_city, current_country")
    .not("lat", "is", null)
    .not("lng", "is", null);

  if (error) throw error;
  return data;
}

// =============================================================================
// RELATIONSHIP MASTER LIST
// =============================================================================

export interface RelationshipTermDB {
  primary: string;
  alternate?: string | null;
  formal?: string | null;
  informal?: string | null;
}

export interface RelationshipDB {
  id: string;
  english: string;
  description: string | null;
  side: "paternal" | "maternal" | "self" | "spouse" | "child";
  gender: "male" | "female" | "neutral";
  generation: number;
  can_add_from: string[];
  terms_hindu: RelationshipTermDB;
  terms_muslim: RelationshipTermDB;
  terms_christian: RelationshipTermDB;
  terms_sikh: RelationshipTermDB;
  terms_other: RelationshipTermDB;
  created_at?: string;
  updated_at?: string;
}

// Get all relationships from master list
export async function getAllRelationshipsFromDB(): Promise<RelationshipDB[]> {
  const { data, error } = await supabase
    .from("relationships_master")
    .select("*")
    .order("id");

  if (error) throw error;
  return (data || []) as RelationshipDB[];
}

// Get a single relationship by ID
export async function getRelationshipFromDB(id: string): Promise<RelationshipDB | null> {
  const { data, error } = await supabase
    .from("relationships_master")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    throw error;
  }
  return data as RelationshipDB;
}

// Upsert a relationship (insert or update)
export async function upsertRelationship(relationship: RelationshipDB): Promise<RelationshipDB> {
  const { data, error } = await supabase
    .from("relationships_master")
    .upsert(relationship, { onConflict: "id" })
    .select()
    .single();

  if (error) throw error;
  return data as RelationshipDB;
}

// Bulk upsert relationships (sync from local data)
export async function syncRelationshipsToSupabase(relationships: RelationshipDB[]): Promise<void> {
  const { error } = await supabase
    .from("relationships_master")
    .upsert(relationships, { onConflict: "id" });

  if (error) throw error;
}

// Delete a relationship
export async function deleteRelationshipFromDB(id: string): Promise<void> {
  const { error } = await supabase
    .from("relationships_master")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// Get relationship count
export async function getRelationshipCount(): Promise<number> {
  const { count, error } = await supabase
    .from("relationships_master")
    .select("*", { count: "exact", head: true });

  if (error) throw error;
  return count || 0;
}

// Search relationships by term
export async function searchRelationshipsInDB(query: string): Promise<RelationshipDB[]> {
  const { data, error } = await supabase
    .from("relationships_master")
    .select("*")
    .or(`english.ilike.%${query}%,description.ilike.%${query}%`);

  if (error) throw error;
  return (data || []) as RelationshipDB[];
}
