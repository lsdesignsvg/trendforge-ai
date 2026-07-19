"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    setMessage(null);
    setIsSubmitting(true);
    try {
      await signUp(email, password);
      setMessage("Cuenta creada. Revisa tu correo para confirmar el registro.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "No se pudo crear la cuenta.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_30%),linear-gradient(135deg,#030712_0%,#050816_45%,#0b1220_100%)] p-6">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-cyan-950/20">
        <h1 className="text-3xl font-semibold text-white">Crear cuenta</h1>
        <p className="mt-3 text-sm text-zinc-400">Regístrate para entrar a TrendForge AI.</p>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
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
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
          >
            {isSubmitting ? "Creando..." : "Registrarme"}
          </button>
          {message ? <p className="text-sm text-cyan-200">{message}</p> : null}
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-cyan-300">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
