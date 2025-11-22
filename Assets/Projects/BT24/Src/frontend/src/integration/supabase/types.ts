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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string
          created_at: string | null
          description: string
          icon: string
          id: string
          name: string
          reward_points: number | null
          threshold_type: string
          threshold_value: number
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          icon: string
          id?: string
          name: string
          reward_points?: number | null
          threshold_type: string
          threshold_value: number
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          icon?: string
          id?: string
          name?: string
          reward_points?: number | null
          threshold_type?: string
          threshold_value?: number
        }
        Relationships: []
      }
      ai_predictions: {
        Row: {
          accuracy: number | null
          actual_value: number | null
          confidence: number | null
          created_at: string
          id: string
          metadata: Json | null
          nanogrid_id: number
          predicted_value: number | null
          prediction_type: string
          user_id: string
        }
        Insert: {
          accuracy?: number | null
          actual_value?: number | null
          confidence?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          nanogrid_id: number
          predicted_value?: number | null
          prediction_type: string
          user_id: string
        }
        Update: {
          accuracy?: number | null
          actual_value?: number | null
          confidence?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          nanogrid_id?: number
          predicted_value?: number | null
          prediction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_predictions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      alert_config: {
        Row: {
          alert_type: string
          conditions: Json | null
          created_at: string
          enabled: boolean | null
          id: string
          notification_methods: Json | null
          threshold_value: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          alert_type: string
          conditions?: Json | null
          created_at?: string
          enabled?: boolean | null
          id?: string
          notification_methods?: Json | null
          threshold_value?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          alert_type?: string
          conditions?: Json | null
          created_at?: string
          enabled?: boolean | null
          id?: string
          notification_methods?: Json | null
          threshold_value?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alert_config_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_reports: {
        Row: {
          created_at: string
          id: string
          insights: Json | null
          metrics: Json
          nanogrid_id: number | null
          period_end: string
          period_start: string
          report_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          insights?: Json | null
          metrics: Json
          nanogrid_id?: number | null
          period_end: string
          period_start: string
          report_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          insights?: Json | null
          metrics?: Json
          nanogrid_id?: number | null
          period_end?: string
          period_start?: string
          report_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_rules: {
        Row: {
          actions: Json
          conditions: Json
          created_at: string
          enabled: boolean | null
          id: string
          last_triggered: string | null
          nanogrid_id: number | null
          rule_name: string
          rule_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          actions: Json
          conditions: Json
          created_at?: string
          enabled?: boolean | null
          id?: string
          last_triggered?: string | null
          nanogrid_id?: number | null
          rule_name: string
          rule_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          actions?: Json
          conditions?: Json
          created_at?: string
          enabled?: boolean | null
          id?: string
          last_triggered?: string | null
          nanogrid_id?: number | null
          rule_name?: string
          rule_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_rules_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      carbon_footprint: {
        Row: {
          carbon_emitted_kg: number | null
          carbon_saved_kg: number
          created_at: string | null
          date: string
          grid_consumption_kwh: number | null
          id: string
          nanogrid_id: number
          net_carbon_kg: number
          solar_generation_kwh: number
          trees_equivalent: number
          user_id: string
        }
        Insert: {
          carbon_emitted_kg?: number | null
          carbon_saved_kg: number
          created_at?: string | null
          date: string
          grid_consumption_kwh?: number | null
          id?: string
          nanogrid_id: number
          net_carbon_kg: number
          solar_generation_kwh: number
          trees_equivalent: number
          user_id: string
        }
        Update: {
          carbon_emitted_kg?: number | null
          carbon_saved_kg?: number
          created_at?: string | null
          date?: string
          grid_consumption_kwh?: number | null
          id?: string
          nanogrid_id?: number
          net_carbon_kg?: number
          solar_generation_kwh?: number
          trees_equivalent?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carbon_footprint_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_feed: {
        Row: {
          activity_type: string
          content: Json
          created_at: string | null
          id: string
          likes_count: number | null
          user_id: string
          visibility: string | null
        }
        Insert: {
          activity_type: string
          content: Json
          created_at?: string | null
          id?: string
          likes_count?: number | null
          user_id: string
          visibility?: string | null
        }
        Update: {
          activity_type?: string
          content?: Json
          created_at?: string | null
          id?: string
          likes_count?: number | null
          user_id?: string
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_feed_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      energy_metrics: {
        Row: {
          battery_soc: number
          id: string
          load_demand: number
          nanogrid_id: string
          power_balance: number | null
          solar_output: number
          timestamp: string
        }
        Insert: {
          battery_soc?: number
          id?: string
          load_demand?: number
          nanogrid_id: string
          power_balance?: number | null
          solar_output?: number
          timestamp?: string
        }
        Update: {
          battery_soc?: number
          id?: string
          load_demand?: number
          nanogrid_id?: string
          power_balance?: number | null
          solar_output?: number
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "energy_metrics_nanogrid_id_fkey"
            columns: ["nanogrid_id"]
            isOneToOne: false
            referencedRelation: "nanogrids"
            referencedColumns: ["id"]
          },
        ]
      }
      market_orders: {
        Row: {
          amount_kwh: number
          created_at: string
          filled_kwh: number
          id: string
          nanogrid_id: string
          order_type: string
          price_per_kwh: number
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_kwh: number
          created_at?: string
          filled_kwh?: number
          id?: string
          nanogrid_id: string
          order_type: string
          price_per_kwh: number
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_kwh?: number
          created_at?: string
          filled_kwh?: number
          id?: string
          nanogrid_id?: string
          order_type?: string
          price_per_kwh?: number
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "market_orders_nanogrid_id_fkey"
            columns: ["nanogrid_id"]
            isOneToOne: false
            referencedRelation: "nanogrids"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "market_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nanogrid_history: {
        Row: {
          battery_soc: number
          created_at: string
          id: string
          load_demand: number
          nanogrid_id: number
          power_balance: number
          solar_output: number
          timestamp: string
          user_id: string
        }
        Insert: {
          battery_soc: number
          created_at?: string
          id?: string
          load_demand: number
          nanogrid_id: number
          power_balance: number
          solar_output: number
          timestamp?: string
          user_id: string
        }
        Update: {
          battery_soc?: number
          created_at?: string
          id?: string
          load_demand?: number
          nanogrid_id?: number
          power_balance?: number
          solar_output?: number
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nanogrid_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nanogrids: {
        Row: {
          battery_capacity: number
          created_at: string
          id: string
          location: string | null
          name: string
          nanogrid_id: number
          owner_id: string
          solar_capacity: number
          status: Database["public"]["Enums"]["nanogrid_status"]
          updated_at: string
          wallet_address: string
        }
        Insert: {
          battery_capacity?: number
          created_at?: string
          id?: string
          location?: string | null
          name: string
          nanogrid_id: number
          owner_id: string
          solar_capacity?: number
          status?: Database["public"]["Enums"]["nanogrid_status"]
          updated_at?: string
          wallet_address: string
        }
        Update: {
          battery_capacity?: number
          created_at?: string
          id?: string
          location?: string | null
          name?: string
          nanogrid_id?: number
          owner_id?: string
          solar_capacity?: number
          status?: Database["public"]["Enums"]["nanogrid_status"]
          updated_at?: string
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "nanogrids_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          wallet_address: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
          wallet_address: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          wallet_address?: string
        }
        Relationships: []
      }
      prosumer_stats: {
        Row: {
          achievements: Json | null
          carbon_offset_kg: number | null
          created_at: string | null
          energy_efficiency_score: number | null
          id: string
          last_trade_date: string | null
          rank: number | null
          total_energy_traded: number | null
          total_revenue: number | null
          trading_streak_days: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          achievements?: Json | null
          carbon_offset_kg?: number | null
          created_at?: string | null
          energy_efficiency_score?: number | null
          id?: string
          last_trade_date?: string | null
          rank?: number | null
          total_energy_traded?: number | null
          total_revenue?: number | null
          trading_streak_days?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          achievements?: Json | null
          carbon_offset_kg?: number | null
          created_at?: string | null
          energy_efficiency_score?: number | null
          id?: string
          last_trade_date?: string | null
          rank?: number | null
          total_energy_traded?: number | null
          total_revenue?: number | null
          trading_streak_days?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prosumer_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount_kwh: number
          block_number: number | null
          completed_at: string | null
          created_at: string
          id: string
          price_per_kwh: number
          receiver_address: string
          receiver_id: string
          sender_address: string
          sender_id: string
          status: Database["public"]["Enums"]["transaction_status"]
          total_cost: number | null
          transaction_hash: string
        }
        Insert: {
          amount_kwh: number
          block_number?: number | null
          completed_at?: string | null
          created_at?: string
          id?: string
          price_per_kwh: number
          receiver_address: string
          receiver_id: string
          sender_address: string
          sender_id: string
          status?: Database["public"]["Enums"]["transaction_status"]
          total_cost?: number | null
          transaction_hash: string
        }
        Update: {
          amount_kwh?: number
          block_number?: number | null
          completed_at?: string | null
          created_at?: string
          id?: string
          price_per_kwh?: number
          receiver_address?: string
          receiver_id?: string
          sender_address?: string
          sender_id?: string
          status?: Database["public"]["Enums"]["transaction_status"]
          total_cost?: number | null
          transaction_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      nanogrid_status: "online" | "offline" | "maintenance"
      transaction_status: "pending" | "completed" | "failed" | "cancelled"
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
      nanogrid_status: ["online", "offline", "maintenance"],
      transaction_status: ["pending", "completed", "failed", "cancelled"],
    },
  },
} as const
