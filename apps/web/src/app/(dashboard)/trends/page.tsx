const trends = [
  { source: "Google Trends", topic: "Moda sostenible", growth: "+35%" },
  { source: "YouTube", topic: "Reels de antes y después", growth: "+22%" },
  { source: "Reddit", topic: "Ideas de merchandising", growth: "+17%" },
  { source: "TikTok", topic: "Contenido de transición", growth: "+29%" },
];

export default function TrendsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Módulo tendencias</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Observa qué está creciendo</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {['País', 'Idioma', 'Fecha', 'Categoría', 'Industria'].map((filter) => (
              <span key={filter} className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-sm text-zinc-300">
                {filter}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {trends.map((item) => (
          <article key={item.topic} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-cyan-300">{item.source}</p>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-sm text-emerald-300">{item.growth}</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white">{item.topic}</h2>
            <p className="mt-2 text-sm leading-7 text-zinc-400">Señales de crecimiento en las últimas 24 horas con alta probabilidad de viralización.</p>
          </article>
        ))}
      </section>
    </div>
  );
}
