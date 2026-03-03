export type GenerationStatus = "pending" | "processing" | "completed" | "failed"

export type Generation = {
  id: string
  user_id: string
  prompt: string
  style: string | null
  input_image_url: string | null
  output_image_url: string | null
  status: GenerationStatus
  replicate_id: string | null
  error_message: string | null
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      generations: {
        Row: Generation
        Insert: Omit<
          Generation,
          "id" | "created_at" | "output_image_url" | "replicate_id" | "error_message"
        > & {
          id?: string
          created_at?: string
          output_image_url?: string | null
          replicate_id?: string | null
          error_message?: string | null
        }
        Update: Partial<Omit<Generation, "id" | "user_id">>
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}
