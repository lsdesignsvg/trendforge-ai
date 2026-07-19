export default function CompetitorsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Módulo competidores</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Analiza cuentas públicas</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-zinc-400">
          Pega una cuenta y obtén engagement, frecuencia de publicación, hashtags y contenido con mayor interacción.
        </p>
      </section>

      <section className="rounded-[24px] border border-white/10 bg-slate-950/70 p-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
            Cuenta analizada: @brandstudio
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
            Engagement promedio: 6.8%
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
            Frecuencia: 5 publicaciones/semana
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
            Hashtags más usados: #fashion #reels #marketing
          </div>
        </div>
      </section>
    </div>
  );
}
