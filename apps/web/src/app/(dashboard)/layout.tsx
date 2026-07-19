import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "TrendForge AI Dashboard",
  description: "Panel inteligente para tendencias, competidores, IA y calendario editorial.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
