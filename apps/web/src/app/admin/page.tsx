export default function AdminPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">🛠️ Admin Dashboard</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-zinc-400">
          Panel interno para controlar usuarios, planes y métricas de TrendForge AI.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-4">
        <Card title="Usuarios" value="1,245" />
        <Card title="Planes Pro" value="320" />
        <Card title="Uso IA" value="84K" />
        <Card title="Tendencias" value="5,430" />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-6">
      <p className="text-sm text-zinc-400">{title}</p>
      <h2 className="mt-3 text-3xl font-semibold text-white">{value}</h2>
    </div>
  );
}
