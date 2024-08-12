import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://dgutpaazmciinuuwqtwt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRndXRwYWF6bWNpaW51dXdxdHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxNTY0ODEsImV4cCI6MjAzODczMjQ4MX0.7XgBIzltlZBtZbgZeBzA2p0bd1nMGnc3MTGzMgguzRk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
