import { createClient } from "@/lib/supabase/client";

export type ProfileRecord = {
  id?: string;
  full_name?: string | null;
  avatar_url?: string | null;
  brand_name?: string | null;
  niche?: string | null;
  main_platform?: string | null;
  objective?: string | null;
  plan?: string | null;
  ai_credits?: number | null;
};

export type LibraryItem = {
  id?: string;
  title: string;
  type: string;
  content: string;
  created_at?: string;
};

export async function upsertProfile(profile: ProfileRecord & { id?: string }) {
  const supabase = createClient();
  const { id, ...rest } = profile;

  const payload = {
    id,
    ...rest,
    ai_credits: rest.ai_credits ?? 20,
    plan: rest.plan ?? "Free",
  };

  const { data, error } = await supabase.from("profiles").upsert(payload).select().maybeSingle();
  return { data, error };
}

export async function getProfile(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("profiles").select().eq("id", userId).maybeSingle();
  return { data, error };
}

export async function saveLibraryItem(userId: string, item: LibraryItem) {
  const supabase = createClient();
  const payload = {
    id: item.id ?? crypto.randomUUID(),
    user_id: userId,
    title: item.title,
    type: item.type,
    content: item.content,
  };

  const { data, error } = await supabase.from("library_items").insert(payload).select().maybeSingle();
  return { data, error };
}

export async function getLibraryItems(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("library_items").select().eq("user_id", userId).order("created_at", { ascending: false });
  return { data, error };
}

export async function deleteLibraryItem(userId: string, itemId: string) {
  const supabase = createClient();
  const { error } = await supabase.from("library_items").delete().eq("user_id", userId).eq("id", itemId);
  return { error };
}
