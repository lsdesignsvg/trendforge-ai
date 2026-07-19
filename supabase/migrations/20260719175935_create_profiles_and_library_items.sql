/*
# Create profiles and library_items tables

1. New Tables
- `profiles`
  - `id` (uuid, primary key, references auth.users) — one row per user.
  - `full_name` (text) — display name.
  - `avatar_url` (text) — profile picture URL.
  - `brand_name` (text) — user's brand or company.
  - `niche` (text) — market niche.
  - `main_platform` (text) — primary social platform.
  - `objective` (text) — marketing objective.
  - `plan` (text, default 'Free') — subscription plan.
  - `ai_credits` (integer, default 20) — available AI credits.
  - `is_admin` (boolean, default false) — admin flag.
  - `created_at` / `updated_at` (timestamptz) — timestamps.
- `library_items`
  - `id` (uuid, primary key).
  - `user_id` (uuid, not null, default auth.uid(), references auth.users) — owner.
  - `title` (text, not null).
  - `type` (text, not null) — e.g. Reel, Copy, Hashtags, IA.
  - `content` (text, not null).
  - `created_at` (timestamptz, default now()).

2. Security
- Enable RLS on both tables.
- profiles: owner-scoped CRUD (select/insert/update/delete) for authenticated users.
- library_items: owner-scoped CRUD for authenticated users.
- user_id defaults to auth.uid() so inserts that omit it succeed.

3. Important Notes
1. Owner columns default to auth.uid() so frontend inserts work without threading user_id.
2. Policies are dropped first to keep the migration idempotent.
3. No destructive operations on existing data (tables are new).
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  brand_name text,
  niche text,
  main_platform text,
  objective text,
  plan text NOT NULL DEFAULT 'Free',
  ai_credits integer NOT NULL DEFAULT 20,
  is_admin boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "delete_own_profile" ON profiles;
CREATE POLICY "delete_own_profile" ON profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

CREATE TABLE IF NOT EXISTS library_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  type text NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE library_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_library_items" ON library_items;
CREATE POLICY "select_own_library_items" ON library_items FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_library_items" ON library_items;
CREATE POLICY "insert_own_library_items" ON library_items FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_library_items" ON library_items;
CREATE POLICY "update_own_library_items" ON library_items FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_library_items" ON library_items;
CREATE POLICY "delete_own_library_items" ON library_items FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS library_items_user_id_idx ON library_items(user_id);
