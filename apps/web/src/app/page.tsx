import Link from "next/link";
import { BarChart3, Bot, CalendarDays, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-8 py-24 text-center">
        <h1 className="text-5xl font-bold md:text-7xl">
          Descubre tendencias.
          <br />
          Crea contenido con IA.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-xl text-zinc-400">
          TrendForge AI analiza redes sociales, encuentra oportunidades y genera contenido listo para publicar.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className="rounded-xl bg-white px-8 py-4 font-semibold text-black transition hover:bg-zinc-200"
          >
            Comenzar Gratis
          </Link>

          <button className="rounded-xl border border-zinc-700 px-8 py-4 transition hover:bg-zinc-900">
            Ver Demo
          </button>
        </div>
      </section>

      <section className="px-8 pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-4">
          <Feature icon={<TrendingUp />} title="Tendencias" text="Encuentra temas que están creciendo." />
          <Feature icon={<Bot />} title="IA Creativa" text="Genera ideas y publicaciones." />
          <Feature icon={<BarChart3 />} title="Competidores" text="Analiza estrategias ganadoras." />
          <Feature icon={<CalendarDays />} title="Calendario" text="Planifica tu contenido." />
        </div>
      </section>

      <footer className="border-t border-zinc-900 py-8 text-center text-zinc-500">
        © 2026 TrendForge AI
      </footer>
    </main>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 p-6 transition hover:bg-zinc-900">
      <div className="mb-4 text-blue-400">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-zinc-400">{text}</p>
    </div>
  );
}
