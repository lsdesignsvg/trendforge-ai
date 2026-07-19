const users = [
  { name: "Usuario Demo", plan: "Pro", credits: 430 },
  { name: "Marca Deportiva", plan: "Free", credits: 12 },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-white">Usuarios</h1>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.name} className="flex flex-col gap-2 rounded-[24px] border border-white/10 bg-slate-950/70 p-5 md:flex-row md:items-center md:justify-between">
            <span className="text-zinc-200">{user.name}</span>
            <span className="text-cyan-300">{user.plan}</span>
            <span className="text-zinc-400">🤖 {user.credits}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
