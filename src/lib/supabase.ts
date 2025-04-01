import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      todos: {
        Row: {
          id: number;
          title: string;
          content: string;
          completed: boolean;
          due_date: string | null;
          start_date: string | null;
          has_start_date: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["todos"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["todos"]["Insert"]>;
      };
      sub_todos: {
        Row: {
          id: number;
          todo_id: number;
          title: string;
          content: string;
          completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["sub_todos"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["sub_todos"]["Insert"]>;
      };
    };
  };
};
