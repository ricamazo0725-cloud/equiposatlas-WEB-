import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY. Revisa tus variables de entorno (ver .env.example)."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    // Fuerza "no-store" en cada petición: Next.js intercepta el fetch global
    // durante el renderizado en servidor y lo cachearía por defecto, lo que
    // haría que los cambios publicados desde /admin no se reflejaran al
    // instante en el Home (que se renderiza dinámico en cada visita).
    fetch: (url, options) => fetch(url, { ...options, cache: "no-store" }),
  },
});
