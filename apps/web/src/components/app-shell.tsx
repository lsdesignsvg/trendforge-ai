"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  CalendarDays,
  Library,
  Menu,
  PanelLeftClose,
  Sparkles,
  TrendingUp,
  Users2,
  WandSparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/trends", label: "Tendencias", icon: TrendingUp },
  { href: "/ai", label: "IA", icon: WandSparkles },
  { href: "/competitors", label: "Competidores", icon: Users2 },
  { href: "/calendar", label: "Calendario", icon: CalendarDays },
  { href: "/library", label: "Biblioteca", icon: Library },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100">
      <div className="flex">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-slate-950/90 p-6 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between lg:justify-start">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.3em] text-cyan-300 uppercase">TF</p>
                <p className="text-sm text-zinc-400">TrendForge AI</p>
              </div>
            </div>
            <button className="rounded-full border border-white/10 p-2 text-zinc-400 lg:hidden" onClick={() => setIsOpen(false)}>
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                    active ? "bg-cyan-400/10 text-cyan-200" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-zinc-400">
            <p className="font-semibold text-white">Motor inteligente</p>
            <p className="mt-2 leading-6">IA generando ideas, scoring y recomendaciones en tiempo real.</p>
          </div>
        </aside>

        {isOpen ? <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setIsOpen(false)} /> : null}

        <div className="flex-1">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 px-4 py-4 backdrop-blur-xl lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="rounded-full border border-white/10 p-2 text-zinc-400 lg:hidden" onClick={() => setIsOpen(true)}>
                  <Menu className="h-4 w-4" />
                </button>
                <div>
                  <p className="text-sm font-semibold text-white">Panel de control</p>
                  <p className="text-sm text-zinc-400">Diseño listo para crecer</p>
                </div>
              </div>
              <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
                Modo oscuro · Premium
              </div>
            </div>
          </header>

          <div className="p-4 lg:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
