"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const supabase = createClient();

  async function handleReset() {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Revisa tu correo para restablecer la contraseña.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_30%),linear-gradient(135deg,#030712_0%,#050816_45%,#0b1220_100%)] p-6">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-cyan-950/20">
        <h1 className="text-3xl font-semibold text-white">Recuperar contraseña</h1>
        <p className="mt-3 text-sm text-zinc-400">Te enviaremos un enlace para restablecerla.</p>

        <div className="mt-6 space-y-4">
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="Correo electrónico"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button
            onClick={handleReset}
            className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Enviar enlace
          </button>
          {message ? <p className="text-sm text-cyan-200">{message}</p> : null}
        </div>

        <p className="mt-6 text-center text-sm text-zinc-400">
          <Link href="/login" className="text-cyan-300">
            Volver al login
          </Link>
        </p>
      </div>
    </main>
  );
}
