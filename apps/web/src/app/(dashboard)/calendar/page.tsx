export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Calendario editorial</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Planifica publicaciones mes a mes</h1>
        <p className="mt-3 text-lg leading-8 text-zinc-400">
          Vista mensual, arrastrar publicaciones, recordatorios y objetivos de campaña.
        </p>
      </section>

      <section className="rounded-[24px] border border-white/10 bg-slate-950/70 p-6">
        <div className="grid gap-3 md:grid-cols-7">
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
            <div key={day} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center text-sm text-zinc-400">
              {day}
            </div>
          ))}
          {Array.from({ length: 14 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
              {index + 1}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
