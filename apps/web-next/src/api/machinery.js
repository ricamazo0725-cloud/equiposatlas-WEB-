import { supabase } from "@/lib/supabaseClient";

export async function getMachinery() {
  const { data, error } = await supabase
    .from("machinery_items")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createMachinery(item) {
  const { data, error } = await supabase.from("machinery_items").insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateMachinery(id, item) {
  const { error } = await supabase.from("machinery_items").update(item).eq("id", id);
  if (error) throw error;
}

export async function deleteMachinery(id) {
  const { error } = await supabase.from("machinery_items").delete().eq("id", id);
  if (error) throw error;
}
