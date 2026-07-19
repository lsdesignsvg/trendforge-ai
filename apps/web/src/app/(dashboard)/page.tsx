import UserProfile from "@/components/UserProfile";

const highlights = [
  { title: "Tendencias hoy", value: "+18.4%", detail: "Crecimiento de interés" },
  { title: "Viral score", value: "92/100", detail: "Puntuación de impacto" },
  { title: "Ideas IA", value: "124", detail: "Generadas esta semana" },
];

const actions = [
  "Analizar tendencias",
  "Generar contenido",
  "Revisar competidores",
  "Programar publicación",
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl lg:p-8">
        <div className="mb-6">
          <UserProfile />
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Tu motor de tendencias y contenido</h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-zinc-400">
              Observa oportunidades, descubre qué está creciendo y convierte señales en contenido listo para publicar.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
            Estado: activo · Última actualización hace 5 min
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
            <p className="text-sm text-zinc-400">{item.title}</p>
            <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
            <p className="mt-2 text-sm text-zinc-500">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-cyan-300">Tendencias principales</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Lo más relevante del día</h2>
            </div>
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">Live</span>
          </div>
          <div className="mt-6 space-y-3">
            {[
              "Jerseys de edición limitada",
              "Contenidos en formato short",
              "Reels con storytelling",
            ].map((trend) => (
              <div key={trend} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
                {trend}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold text-cyan-300">Acciones rápidas</p>
          <div className="mt-4 space-y-3">
            {actions.map((action) => (
              <div key={action} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-zinc-300">
                {action}
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
