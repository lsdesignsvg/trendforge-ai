"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";

export function AuthForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      if (mode === "signup") {
        await signUp(name, email, password);
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ha ocurrido un error.");
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-cyan-950/20">
      <div className="mb-6 flex gap-2 rounded-full border border-white/10 bg-white/5 p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${mode === "login" ? "bg-cyan-400 text-slate-950" : "text-zinc-400"}`}
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${mode === "signup" ? "bg-cyan-400 text-slate-950" : "text-zinc-400"}`}
        >
          Registrarse
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {mode === "signup" ? (
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="Tu nombre"
          />
        ) : null}

        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
          placeholder="Correo electrónico"
        />

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
          placeholder="Contraseña"
        />

        {error ? <p className="text-sm text-rose-400">{error}</p> : null}

        <button
          type="submit"
          className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          {mode === "login" ? "Entrar" : "Crear cuenta"}
        </button>
      </form>

      <div className="mt-6 space-y-3 text-sm text-zinc-400">
        <p>Continuar con Google</p>
        <p>Continuar con GitHub</p>
        <p>Recuperar contraseña</p>
      </div>
    </div>
  );
}
