export default function ContentCard({
  title,
  type,
  content,
}: {
  title: string;
  type: string;
  content: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300">{type}</span>
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-zinc-400">{content}</p>

      <button className="mt-5 rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/5">
        Usar contenido
      </button>
    </div>
  );
}
