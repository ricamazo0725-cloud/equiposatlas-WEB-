import { supabase } from "@/lib/supabaseClient";

export async function getCourses() {
  const { data, error } = await supabase
    .from("course_items")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createCourse(item) {
  const { data, error } = await supabase.from("course_items").insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateCourse(id, item) {
  const { error } = await supabase.from("course_items").update(item).eq("id", id);
  if (error) throw error;
}

export async function deleteCourse(id) {
  const { error } = await supabase.from("course_items").delete().eq("id", id);
  if (error) throw error;
}
