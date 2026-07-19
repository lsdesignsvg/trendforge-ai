"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { createClient } from "@/lib/supabase/client";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let active = true;
    async function check() {
      if (!user) return;
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .maybeSingle();

      if (!active) return;
      setAllowed(Boolean(data?.is_admin));
      setChecking(false);
    }

    if (!isLoading) {
      if (!user) {
        router.replace("/login");
        return;
      }
      check();
    }
  }, [user, isLoading, router]);

  if (isLoading || checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-zinc-400">
        Verificando acceso...
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#030712] px-6 text-center">
        <h1 className="text-2xl font-semibold text-white">Acceso restringido</h1>
        <p className="max-w-md text-sm text-zinc-400">
          Esta sección es exclusiva para administradores. Si crees que deberías tener acceso, contacta con el equipo.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/5"
        >
          Volver al panel
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
