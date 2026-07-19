"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { getProfile, upsertProfile } from "@/lib/supabase/services";

export default function ProfileForm() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [niche, setNiche] = useState("");
  const [platform, setPlatform] = useState("");
  const [objective, setObjective] = useState("");
  const [plan, setPlan] = useState("Free");
  const [credits, setCredits] = useState(20);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadProfile() {
      if (!user?.id) return;
      const { data } = await getProfile(user.id);
      if (!active || !data) return;
      setName(data.full_name ?? "");
      setBrand(data.brand_name ?? "");
      setNiche(data.niche ?? "");
      setPlatform(data.main_platform ?? "");
      setObjective(data.objective ?? "");
      setPlan(data.plan ?? "Free");
      setCredits(data.ai_credits ?? 20);
    }

    loadProfile();
    return () => {
      active = false;
    };
  }, [user]);

  async function save() {
    if (!user?.id) {
      setMessage("Debes iniciar sesión para guardar el perfil.");
      return;
    }

    setIsSaving(true);
    setMessage(null);

    const { error } = await upsertProfile({
      id: user.id,
      full_name: name,
      brand_name: brand,
      niche,
      main_platform: platform,
      objective,
      plan,
      ai_credits: credits,
    });

    setIsSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Perfil guardado correctamente.");
  }

  return (
    <div className="max-w-2xl space-y-5 rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
      <input
        className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 p-3 text-sm text-zinc-100 outline-none"
        placeholder="Nombre"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 p-3 text-sm text-zinc-100 outline-none"
        placeholder="Marca o empresa"
        value={brand}
        onChange={(event) => setBrand(event.target.value)}
      />

      <input
        className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 p-3 text-sm text-zinc-100 outline-none"
        placeholder="Nicho"
        value={niche}
        onChange={(event) => setNiche(event.target.value)}
      />

      <input
        className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 p-3 text-sm text-zinc-100 outline-none"
        placeholder="Plataforma principal"
        value={platform}
        onChange={(event) => setPlatform(event.target.value)}
      />

      <input
        className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 p-3 text-sm text-zinc-100 outline-none"
        placeholder="Objetivo"
        value={objective}
        onChange={(event) => setObjective(event.target.value)}
      />

      <select
        className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 p-3 text-sm text-zinc-100 outline-none"
        value={plan}
        onChange={(event) => setPlan(event.target.value)}
      >
        <option value="Free">Free</option>
        <option value="Pro">Pro</option>
        <option value="Business">Business</option>
      </select>

      <input
        className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 p-3 text-sm text-zinc-100 outline-none"
        type="number"
        value={credits}
        onChange={(event) => setCredits(Number(event.target.value))}
        placeholder="Créditos IA"
      />

      <button
        onClick={save}
        disabled={isSaving}
        className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-60"
      >
        {isSaving ? "Guardando..." : "Guardar perfil"}
      </button>

      {message ? <p className="text-sm text-cyan-300">{message}</p> : null}
    </div>
  );
}
