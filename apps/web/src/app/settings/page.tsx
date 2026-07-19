export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Configuración</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Ajustes de usuario y plataforma</h1>
        <p className="mt-3 text-lg leading-8 text-zinc-400">
          Prepárate para gestionar perfil, plan, idioma, zona horaria y preferencias de notificaciones.
        </p>
      </section>
    </div>
  );
}
