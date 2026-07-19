const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["20 generaciones IA", "Tendencias básicas"],
  },
  {
    name: "Pro",
    price: "$19",
    features: ["500 generaciones IA", "Competidores", "Calendario"],
  },
  {
    name: "Business",
    price: "$49",
    features: ["Equipos", "IA avanzada", "Analíticas"],
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Planes</p>
        <h1 className="mt-2 text-4xl font-semibold text-white">Elige el plan que mejor se adapte a tu marca</h1>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-8">
            <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>
            <p className="mt-4 text-4xl font-semibold text-cyan-300">{plan.price}</p>
            <ul className="mt-6 space-y-3 text-sm text-zinc-400">
              {plan.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>
            <button className="mt-8 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200">
              Elegir plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
