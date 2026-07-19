const items = [
  { category: "Ideas", value: "24" },
  { category: "Imágenes", value: "12" },
  { category: "Videos", value: "8" },
  { category: "Prompts", value: "31" },
];

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Biblioteca</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Guarda recursos y plantillas</h1>
        <p className="mt-3 text-lg leading-8 text-zinc-400">
          Ideas, imágenes, videos, prompts y plantillas organizados para acelerar tus campañas.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <article key={item.category} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
            <p className="text-sm text-zinc-400">{item.category}</p>
            <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
