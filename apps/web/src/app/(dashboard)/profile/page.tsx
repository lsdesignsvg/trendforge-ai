import ProfileForm from "./components/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Perfil</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Mi perfil</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-zinc-400">
          Personaliza tu experiencia con IA para recibir recomendaciones más precisas.
        </p>
      </section>

      <ProfileForm />
    </div>
  );
}
