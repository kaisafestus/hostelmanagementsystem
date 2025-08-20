export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      complaint_comments: {
        Row: {
          complaint_id: string
          content: string
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          complaint_id: string
          content: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          complaint_id?: string
          content?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "complaint_comments_complaint_id_fkey"
            columns: ["complaint_id"]
            isOneToOne: false
            referencedRelation: "complaints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaint_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      complaints: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          description: string
          id: string
          resolved_at: string | null
          resolved_by: string | null
          room_id: string | null
          status: Database["public"]["Enums"]["complaint_status"] | null
          student_id: string
          submitted_at: string | null
          title: string
          type: Database["public"]["Enums"]["complaint_type"]
          updated_at: string | null
          urgency: Database["public"]["Enums"]["urgency_level"] | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          description: string
          id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          room_id?: string | null
          status?: Database["public"]["Enums"]["complaint_status"] | null
          student_id: string
          submitted_at?: string | null
          title: string
          type: Database["public"]["Enums"]["complaint_type"]
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_level"] | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          description?: string
          id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          room_id?: string | null
          status?: Database["public"]["Enums"]["complaint_status"] | null
          student_id?: string
          submitted_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["complaint_type"]
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_level"] | null
        }
        Relationships: [
          {
            foreignKeyName: "complaints_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaints_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaints_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_contacts: {
        Row: {
          created_at: string
          department: string | null
          email: string | null
          id: string
          is_available_24_7: boolean | null
          name: string
          phone: string
          position: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          email?: string | null
          id?: string
          is_available_24_7?: boolean | null
          name: string
          phone: string
          position: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string | null
          id?: string
          is_available_24_7?: boolean | null
          name?: string
          phone?: string
          position?: string
          updated_at?: string
        }
        Relationships: []
      }
      internet_usage: {
        Row: {
          bandwidth_limit_mb: number | null
          created_at: string
          data_consumed_mb: number | null
          id: string
          room_id: string
          student_id: string
          usage_date: string
        }
        Insert: {
          bandwidth_limit_mb?: number | null
          created_at?: string
          data_consumed_mb?: number | null
          id?: string
          room_id: string
          student_id: string
          usage_date: string
        }
        Update: {
          bandwidth_limit_mb?: number | null
          created_at?: string
          data_consumed_mb?: number | null
          id?: string
          room_id?: string
          student_id?: string
          usage_date?: string
        }
        Relationships: []
      }
      maintenance_requests: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          description: string
          id: string
          priority: string | null
          room_id: string
          status: string | null
          student_id: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          description: string
          id?: string
          priority?: string | null
          room_id: string
          status?: string | null
          student_id: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string
          id?: string
          priority?: string | null
          room_id?: string
          status?: string | null
          student_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      meal_plans: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          meals_included: Json | null
          name: string
          price_per_month: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          meals_included?: Json | null
          name: string
          price_per_month: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          meals_included?: Json | null
          name?: string
          price_per_month?: number
          updated_at?: string
        }
        Relationships: []
      }
      notices: {
        Row: {
          content: string
          created_at: string
          created_by: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          title: string
          type: string | null
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          title: string
          type?: string | null
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          title?: string
          type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          academic_year: string
          amount: number
          created_at: string | null
          id: string
          notes: string | null
          payment_date: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          recorded_at: string | null
          recorded_by: string
          room_id: string
          semester: string
          status: Database["public"]["Enums"]["payment_status"] | null
          student_id: string
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          academic_year: string
          amount: number
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          recorded_at?: string | null
          recorded_by: string
          room_id: string
          semester: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          student_id: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          academic_year?: string
          amount?: number
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          recorded_at?: string | null
          recorded_by?: string
          room_id?: string
          semester?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          student_id?: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      room_assignments: {
        Row: {
          academic_year: string
          assigned_at: string | null
          created_at: string | null
          id: string
          payment_status: string | null
          room_id: string
          semester: string
          status: string | null
          student_id: string
          updated_at: string | null
        }
        Insert: {
          academic_year: string
          assigned_at?: string | null
          created_at?: string | null
          id?: string
          payment_status?: string | null
          room_id: string
          semester: string
          status?: string | null
          student_id: string
          updated_at?: string | null
        }
        Update: {
          academic_year?: string
          assigned_at?: string | null
          created_at?: string | null
          id?: string
          payment_status?: string | null
          room_id?: string
          semester?: string
          status?: string | null
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "room_assignments_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_assignments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      room_change_requests: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          current_room_id: string
          id: string
          processed_at: string | null
          processed_by: string | null
          reason: string
          requested_at: string | null
          requested_room_id: string
          status: string | null
          student_id: string
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          current_room_id: string
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          reason: string
          requested_at?: string | null
          requested_room_id: string
          status?: string | null
          student_id: string
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          current_room_id?: string
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          reason?: string
          requested_at?: string | null
          requested_room_id?: string
          status?: string | null
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "room_change_requests_current_room_id_fkey"
            columns: ["current_room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_change_requests_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_change_requests_requested_room_id_fkey"
            columns: ["requested_room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_change_requests_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          building_name: string | null
          capacity: number
          created_at: string | null
          current_occupancy: number | null
          description: string | null
          floor_number: number | null
          id: string
          price_per_semester: number
          room_number: string
          status: Database["public"]["Enums"]["room_status"] | null
          type: Database["public"]["Enums"]["room_type"]
          updated_at: string | null
        }
        Insert: {
          building_name?: string | null
          capacity: number
          created_at?: string | null
          current_occupancy?: number | null
          description?: string | null
          floor_number?: number | null
          id?: string
          price_per_semester: number
          room_number: string
          status?: Database["public"]["Enums"]["room_status"] | null
          type: Database["public"]["Enums"]["room_type"]
          updated_at?: string | null
        }
        Update: {
          building_name?: string | null
          capacity?: number
          created_at?: string | null
          current_occupancy?: number | null
          description?: string | null
          floor_number?: number | null
          id?: string
          price_per_semester?: number
          room_number?: string
          status?: Database["public"]["Enums"]["room_status"] | null
          type?: Database["public"]["Enums"]["room_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          contact_info: Json | null
          created_at: string
          department: string | null
          employee_id: string
          hire_date: string | null
          id: string
          position: string
          salary: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          contact_info?: Json | null
          created_at?: string
          department?: string | null
          employee_id: string
          hire_date?: string | null
          id?: string
          position: string
          salary?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          contact_info?: Json | null
          created_at?: string
          department?: string | null
          employee_id?: string
          hire_date?: string | null
          id?: string
          position?: string
          salary?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      student_meal_subscriptions: {
        Row: {
          created_at: string
          end_date: string
          id: string
          meal_plan_id: string
          start_date: string
          status: string | null
          student_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          meal_plan_id: string
          start_date: string
          status?: string | null
          student_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          meal_plan_id?: string
          start_date?: string
          status?: string | null
          student_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          academic_year: string | null
          address: string | null
          created_at: string | null
          date_of_birth: string | null
          department: string | null
          emergency_contact: Json | null
          gender: string | null
          id: string
          phone: string | null
          student_id: string
          updated_at: string | null
        }
        Insert: {
          academic_year?: string | null
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department?: string | null
          emergency_contact?: Json | null
          gender?: string | null
          id: string
          phone?: string | null
          student_id: string
          updated_at?: string | null
        }
        Update: {
          academic_year?: string | null
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department?: string | null
          emergency_contact?: Json | null
          gender?: string | null
          id?: string
          phone?: string | null
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      visitor_logs: {
        Row: {
          approved_by: string | null
          check_in_time: string
          check_out_time: string | null
          created_at: string
          id: string
          purpose: string | null
          status: string | null
          student_id: string
          updated_at: string
          visitor_contact: string | null
          visitor_name: string
        }
        Insert: {
          approved_by?: string | null
          check_in_time?: string
          check_out_time?: string | null
          created_at?: string
          id?: string
          purpose?: string | null
          status?: string | null
          student_id: string
          updated_at?: string
          visitor_contact?: string | null
          visitor_name: string
        }
        Update: {
          approved_by?: string | null
          check_in_time?: string
          check_out_time?: string | null
          created_at?: string
          id?: string
          purpose?: string | null
          status?: string | null
          student_id?: string
          updated_at?: string
          visitor_contact?: string | null
          visitor_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_room: {
        Args: {
          p_academic_year: string
          p_room_id: string
          p_semester: string
          p_student_id: string
        }
        Returns: Json
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_student: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      complaint_status: "submitted" | "in_progress" | "resolved" | "rejected"
      complaint_type: "maintenance" | "cleanliness" | "noise" | "other"
      payment_method: "cash" | "bank_transfer" | "card" | "mobile_money"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      room_status: "available" | "occupied" | "maintenance"
      room_type: "single" | "double" | "dormitory"
      urgency_level: "low" | "medium" | "high"
      user_role: "student" | "admin" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      complaint_status: ["submitted", "in_progress", "resolved", "rejected"],
      complaint_type: ["maintenance", "cleanliness", "noise", "other"],
      payment_method: ["cash", "bank_transfer", "card", "mobile_money"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      room_status: ["available", "occupied", "maintenance"],
      room_type: ["single", "double", "dormitory"],
      urgency_level: ["low", "medium", "high"],
      user_role: ["student", "admin", "staff"],
    },
  },
} as const
