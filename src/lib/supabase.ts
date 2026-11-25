
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL ou Publishable Key manquant. Vérifiez le fichier .env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
