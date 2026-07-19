import Link from "next/link";
import {
  Bot,
  Calendar,
  CreditCard,
  Flame,
  LayoutDashboard,
  Library,
  LogOut,
  Settings,
  User,
  Users,
} from "lucide-react";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/components/auth-provider";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, link: "/dashboard" },
  { name: "Perfil", icon: User, link: "/profile" },
  { name: "Tendencias", icon: Flame, link: "/trends" },
  { name: "IA Studio", icon: Bot, link: "/ai" },
  { name: "Competidores", icon: Users, link: "/competitors" },
  { name: "Calendario", icon: Calendar, link: "/calendar" },
  { name: "Biblioteca", icon: Library, link: "/library" },
  { name: "Planes", icon: CreditCard, link: "/pricing" },
  { name: "Configuración", icon: Settings, link: "/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuth();

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[#030712] text-white">
      <aside className="hidden w-72 border-r border-white/10 bg-slate-950/90 p-6 lg:block">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold">TrendForge AI</p>
            <p className="text-sm text-zinc-400">SaaS de tendencias</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.link}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={signOut}
          className="mt-8 flex w-full items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </aside>

      <main className="flex-1">
        <header className="border-b border-white/10 bg-slate-950/70 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Panel</p>
              <h2 className="text-xl font-semibold text-white">TrendForge AI</h2>
            </div>
            <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
              Diseño SaaS profesional
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8">{children}</div>
      </main>
      </div>
    </ProtectedRoute>
  );
}
