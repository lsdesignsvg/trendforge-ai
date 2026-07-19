"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_30%),linear-gradient(135deg,#030712_0%,#050816_45%,#0b1220_100%)] p-6">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-cyan-950/20">
        <h1 className="text-3xl font-semibold text-white">Entrar a TrendForge AI</h1>
        <p className="mt-3 text-sm text-zinc-400">Inicia sesión con tu correo y contraseña.</p>

        <div className="mt-6 space-y-4">
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="Correo electrónico"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Ingresar
          </button>
          {message ? <p className="text-sm text-rose-400">{message}</p> : null}
        </div>

        <div className="mt-6 flex flex-col gap-2 text-center text-sm text-zinc-400">
          <Link href="/register" className="text-cyan-300">
            Crear cuenta
          </Link>
          <Link href="/forgot-password" className="text-cyan-300">
            Recuperar contraseña
          </Link>
        </div>
      </div>
    </main>
  );
}
