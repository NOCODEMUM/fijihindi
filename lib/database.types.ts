export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string | null;
          name: string | null;
          current_city: string | null;
          current_country: string | null;
          fiji_origin: string | null;
          lat: number | null;
          lng: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email?: string | null;
          name?: string | null;
          current_city?: string | null;
          current_country?: string | null;
          fiji_origin?: string | null;
          lat?: number | null;
          lng?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          name?: string | null;
          current_city?: string | null;
          current_country?: string | null;
          fiji_origin?: string | null;
          lat?: number | null;
          lng?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      family_members: {
        Row: {
          id: string;
          user_id: string;
          name: string | null;
          relationship_type: string;
          parent_member_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name?: string | null;
          relationship_type: string;
          parent_member_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string | null;
          relationship_type?: string;
          parent_member_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
